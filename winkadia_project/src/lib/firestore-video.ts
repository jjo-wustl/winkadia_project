// src/lib/firestore-video.ts
//
// Watch 페이지의 조회수 및 댓글 처리를 담당하는 Firestore 헬퍼 모듈임.
//
// [데이터 구조]
//   videos/{videoId}
//     viewCount: number          - 누적 조회수
//     commentCounter: number     - 다음 댓글의 v번호 발급에 쓰이는 카운터
//     createdAt: serverTimestamp - 문서가 처음 생성된 시각 (자동 기록)
//
//   videos/{videoId}/comments/{commentId}
//     authorLabel: string        - "v1", "v2", "v3" ... (자동 부여)
//     content: string            - 댓글 본문
//     userId: string             - 작성자 Firebase Auth UID (감사/모더레이션 용)
//     createdAt: serverTimestamp - 작성 시각
//
// [관리자 모더레이션]
//   firestore.rules 가 클라이언트의 update/delete 를 모두 차단하므로
//   편집/삭제는 Firebase Console (Admin SDK 권한) 에서만 가능함.

"use client";

import {
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// 화면에 노출되는 영상 통계 타입임 (viewCount 만 노출, commentCounter 는 내부용)
export type VideoStats = {
  viewCount: number;
};

// 화면에 노출되는 댓글 항목 타입임
export type VideoComment = {
  id: string; // Firestore 문서 id
  authorLabel: string; // "v1", "v2", ...
  content: string;
  createdAt: Timestamp | null; // serverTimestamp 가 반영되기 전엔 null 일 수 있음
};

// videos/{videoId} 문서의 ref 헬퍼
function getVideoRef(videoId: string) {
  return doc(db, "videos", videoId);
}

// videos/{videoId}/comments collection 의 ref 헬퍼
function getCommentsCollection(videoId: string) {
  return collection(db, "videos", videoId, "comments");
}

// 조회수를 1 증가시킴. 같은 사용자가 같은 영상을 여러 번 시청해도 누적됨 (dedup 없음).
// 호출은 호출자(useEffect)가 video.id 변경 시점에만 실행되도록 통제하므로,
// 한 페이지 마운트 = 1 카운트가 자연스럽게 보장됨.
export async function incrementViewCount(videoId: string): Promise<void> {
  if (typeof window === "undefined") return; // SSR 가드

  try {
    // setDoc + merge + increment(1) 조합은 문서가 없으면 생성하고 있으면 업데이트함.
    // 따라서 처음 시청되는 영상도 자동으로 viewCount=1 부터 시작됨.
    await setDoc(
      getVideoRef(videoId),
      {
        viewCount: increment(1),
      },
      { merge: true },
    );
  } catch (err) {
    console.error("[firestore-video] incrementViewCount failed:", err);
  }
}

// videos/{videoId} 문서를 실시간으로 구독하여 viewCount 가 갱신되는 즉시 콜백을 호출함
export function subscribeToVideoStats(
  videoId: string,
  onUpdate: (stats: VideoStats) => void,
): () => void {
  return onSnapshot(
    getVideoRef(videoId),
    (snap) => {
      const data = snap.exists() ? (snap.data() as DocumentData) : null;
      onUpdate({
        viewCount: typeof data?.viewCount === "number" ? data.viewCount : 0,
      });
    },
    (err) => {
      console.error("[firestore-video] subscribeToVideoStats error:", err);
    },
  );
}

// videos/{videoId}/comments 를 createdAt 내림차순(최신 우선) 으로 실시간 구독함
export function subscribeToComments(
  videoId: string,
  onUpdate: (comments: VideoComment[]) => void,
): () => void {
  const q = query(getCommentsCollection(videoId), orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snap) => {
      const comments: VideoComment[] = snap.docs.map((d) => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          authorLabel: typeof data.authorLabel === "string" ? data.authorLabel : "v?",
          content: typeof data.content === "string" ? data.content : "",
          // serverTimestamp 가 반영되기 전(짧은 순간) 에는 null 일 수 있어 화면에서 그래도 처리 가능하게 둠
          createdAt: data.createdAt instanceof Object && "toDate" in data.createdAt ? (data.createdAt as Timestamp) : null,
        };
      });
      onUpdate(comments);
    },
    (err) => {
      console.error("[firestore-video] subscribeToComments error:", err);
    },
  );
}

// 댓글 작성 — 동시 제출 시에도 v 번호가 충돌하지 않도록 transaction 으로 처리.
// 1) videos/{videoId} 의 commentCounter 를 atomically 증가
// 2) 같은 transaction 내에서 comments 서브컬렉션에 새 댓글 문서 생성
// 두 작업이 한 commit 으로 묶여 있어 중간에 실패하면 둘 다 롤백됨.
export async function addAnonymousComment(args: {
  videoId: string;
  userId: string;
  content: string;
}): Promise<{ authorLabel: string; commentId: string }> {
  const { videoId, userId, content } = args;
  const trimmed = content.trim();

  if (trimmed.length === 0) {
    throw new Error("Comment content is empty");
  }
  if (trimmed.length > 1000) {
    throw new Error("Comment exceeds 1000 character limit");
  }
  if (!userId) {
    throw new Error("Not authenticated");
  }

  return runTransaction(db, async (tx) => {
    const videoRef = getVideoRef(videoId);
    const snap = await tx.get(videoRef);

    const currentCounter =
      snap.exists() && typeof snap.data().commentCounter === "number"
        ? (snap.data().commentCounter as number)
        : 0;
    const nextNumber = currentCounter + 1;
    const authorLabel = `v${nextNumber}`;

    // 영상 문서 생성/갱신 — counter 만 atomically 올리고 다른 필드는 건드리지 않음
    if (snap.exists()) {
      tx.update(videoRef, { commentCounter: nextNumber });
    } else {
      // 첫 댓글 작성 시 영상 문서가 아직 없을 수 있으므로 안전하게 함께 생성
      tx.set(videoRef, {
        viewCount: 0, // 조회수는 별도 흐름에서 increment 되므로 여기서는 0 으로 시작
        commentCounter: nextNumber,
        createdAt: serverTimestamp(),
      });
    }

    // 신규 댓글 문서 생성
    const commentRef = doc(getCommentsCollection(videoId));
    tx.set(commentRef, {
      authorLabel,
      content: trimmed,
      userId,
      createdAt: serverTimestamp(),
    });

    return { authorLabel, commentId: commentRef.id };
  });
}
