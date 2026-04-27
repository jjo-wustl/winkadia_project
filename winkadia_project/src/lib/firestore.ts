// src/lib/firestore.ts

import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc,
  query, where, orderBy, limit, increment, arrayUnion, arrayRemove,
  serverTimestamp, Timestamp,
} from "firebase/firestore"; // Firestore 컬렉션, 문서, 조회, 추가, 수정, 삭제, 쿼리, 카운트, 배열, 서버 시간 기능을 가져옴
import { db } from "./firebase"; // Firestore 데이터베이스 객체를 가져옴
import type { Video, Comment, Announcement, Series, Oracle } from "@/types"; // Firestore 데이터에 사용할 타입들을 가져옴

/* ── Videos ── */ // 영상 관련 Firestore 함수들을 모아둔 구역임
export async function getVideos(options?: {
  category?: string; isExclusive?: boolean; limitCount?: number; orderField?: string;
}) { // 영상 목록을 조건에 맞게 가져오는 함수임
  const constraints: ReturnType<typeof where | typeof orderBy | typeof limit>[] = []; // Firestore 쿼리에 추가할 조건들을 저장함
  if (options?.category) constraints.push(where("category", "==", options.category)); // 카테고리 옵션이 있으면 해당 카테고리 영상만 가져오도록 조건을 추가함
  if (options?.isExclusive !== undefined) constraints.push(where("isExclusive", "==", options.isExclusive)); // 독점 영상 여부 옵션이 있으면 해당 조건을 추가함
  constraints.push(orderBy(options?.orderField || "createdAt", "desc")); // 정렬 기준이 있으면 그 필드로, 없으면 생성일 기준으로 최신순 정렬함
  if (options?.limitCount) constraints.push(limit(options.limitCount)); // 개수 제한 옵션이 있으면 가져올 개수를 제한함
  const q = query(collection(db, "videos"), ...constraints); // videos 컬렉션에 조건들을 적용한 쿼리를 만듦
  const snapshot = await getDocs(q); // 쿼리 결과 문서들을 가져옴
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Video)); // 문서 id와 데이터를 합쳐 Video 배열로 반환함
}

export async function getVideoById(id: string): Promise<Video | null> { // 영상 id로 영상 하나를 가져오는 함수임
  const snap = await getDoc(doc(db, "videos", id)); // videos 컬렉션에서 해당 id 문서를 가져옴
  if (!snap.exists()) return null; // 문서가 없으면 null을 반환함
  return { id: snap.id, ...snap.data() } as Video; // 문서 id와 데이터를 합쳐 Video로 반환함
}

export async function incrementViews(videoId: string) { // 특정 영상의 조회수를 1 증가시키는 함수임
  await updateDoc(doc(db, "videos", videoId), { views: increment(1) }); // Firestore increment 기능으로 views 값을 1 증가시킴
}

export async function toggleLikeVideo(videoId: string, userId: string) { // 특정 사용자가 영상 좋아요를 누르거나 취소하는 함수임
  const docRef = doc(db, "videos", videoId); // videos 컬렉션에서 해당 영상 문서 참조를 만듦
  const snap = await getDoc(docRef); // 영상 문서를 가져옴
  if (!snap.exists()) return; // 영상 문서가 없으면 아무것도 하지 않음
  const likedBy: string[] = snap.data().likedBy || []; // 이미 좋아요를 누른 사용자 id 목록을 가져옴
  if (likedBy.includes(userId)) { // 현재 사용자가 이미 좋아요를 눌렀으면 취소 처리함
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) }); // 좋아요 수를 줄이고 likedBy에서 사용자 id를 제거함
    return false; // 좋아요가 취소되었음을 반환함
  } else { // 현재 사용자가 아직 좋아요를 누르지 않았으면 추가 처리함
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) }); // 좋아요 수를 늘리고 likedBy에 사용자 id를 추가함
    return true; // 좋아요가 추가되었음을 반환함
  }
}

/* ── Comments ── */ // 댓글 관련 Firestore 함수들을 모아둔 구역임
export async function getComments(videoId: string): Promise<Comment[]> { // 특정 영상의 댓글 목록을 가져오는 함수임
  const q = query(collection(db, "comments"), where("videoId", "==", videoId), orderBy("createdAt", "desc")); // comments 컬렉션에서 영상 id가 일치하는 댓글을 최신순으로 조회함
  const snapshot = await getDocs(q); // 댓글 문서들을 가져옴
  return snapshot.docs.map((d) => { // 댓글 문서들을 Comment 형태로 변환함
    const data = d.data(); // 문서 데이터를 꺼냄
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Comment; // Firestore Timestamp면 문자열 날짜로 바꿔 반환함
  });
}

export async function addComment(comment: Omit<Comment, "id" | "createdAt" | "likes" | "likedBy">) { // 새 댓글을 추가하는 함수임
  const docRef = await addDoc(collection(db, "comments"), { ...comment, likes: 0, likedBy: [], createdAt: serverTimestamp() }); // 댓글 기본값과 서버 시간을 포함해 comments 컬렉션에 저장함
  return docRef.id; // 새로 생성된 댓글 문서 id를 반환함
}

export async function deleteComment(commentId: string) { await deleteDoc(doc(db, "comments", commentId)); } // 댓글 id로 댓글 문서를 삭제함

export async function toggleLikeComment(commentId: string, userId: string) { // 특정 사용자가 댓글 좋아요를 누르거나 취소하는 함수임
  const docRef = doc(db, "comments", commentId); // comments 컬렉션에서 해당 댓글 문서 참조를 만듦
  const snap = await getDoc(docRef); // 댓글 문서를 가져옴
  if (!snap.exists()) return; // 댓글 문서가 없으면 아무것도 하지 않음
  const likedBy: string[] = snap.data().likedBy || []; // 이미 좋아요를 누른 사용자 id 목록을 가져옴
  if (likedBy.includes(userId)) { // 현재 사용자가 이미 좋아요를 눌렀으면 취소 처리함
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) }); // 좋아요 수를 줄이고 likedBy에서 사용자 id를 제거함
  } else { // 현재 사용자가 아직 좋아요를 누르지 않았으면 추가 처리함
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) }); // 좋아요 수를 늘리고 likedBy에 사용자 id를 추가함
  }
}

/* ── Series ── */ // 시리즈 관련 Firestore 함수들을 모아둔 구역임
export async function getSeries(): Promise<Series[]> { // 시리즈 목록을 가져오는 함수임
  const q = query(collection(db, "series"), orderBy("title")); // series 컬렉션을 title 기준으로 정렬해서 조회함
  const snapshot = await getDocs(q); // 시리즈 문서들을 가져옴
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Series)); // 문서 id와 데이터를 합쳐 Series 배열로 반환함
}

/* ── Announcements ── */ // 공지사항 관련 Firestore 함수들을 모아둔 구역임
export async function getAnnouncements(count = 5): Promise<Announcement[]> { // 공지사항 목록을 가져오는 함수임
  const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(count)); // announcements 컬렉션을 최신순으로 count개만 조회함
  const snapshot = await getDocs(q); // 공지사항 문서들을 가져옴
  return snapshot.docs.map((d) => { // 공지사항 문서들을 Announcement 형태로 변환함
    const data = d.data(); // 문서 데이터를 꺼냄
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Announcement; // Firestore Timestamp면 문자열 날짜로 바꿔 반환함
  });
}

/* ── Oracles ── */ // 오라클 관련 Firestore 함수들을 모아둔 구역임
export async function getOracles(count = 30): Promise<Oracle[]> { // 오라클 목록을 가져오는 함수임
  const q = query(collection(db, "oracles"), orderBy("createdAt", "desc"), limit(count)); // oracles 컬렉션을 최신순으로 count개만 조회함
  const snapshot = await getDocs(q); // 오라클 문서들을 가져옴
  return snapshot.docs.map((d) => { // 오라클 문서들을 Oracle 형태로 변환함
    const data = d.data(); // 문서 데이터를 꺼냄
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Oracle; // Firestore Timestamp면 문자열 날짜로 바꿔 반환함
  });
}

export async function addOracle(oracle: Omit<Oracle, "id" | "createdAt" | "likes" | "likedBy">) { // 새 오라클 공유 글을 추가하는 함수임
  const docRef = await addDoc(collection(db, "oracles"), { ...oracle, likes: 0, likedBy: [], createdAt: serverTimestamp() }); // 오라클 기본값과 서버 시간을 포함해 oracles 컬렉션에 저장함
  return docRef.id; // 새로 생성된 오라클 문서 id를 반환함
}

export async function toggleLikeOracle(oracleId: string, userId: string) { // 특정 사용자가 오라클 좋아요를 누르거나 취소하는 함수임
  const docRef = doc(db, "oracles", oracleId); // oracles 컬렉션에서 해당 오라클 문서 참조를 만듦
  const snap = await getDoc(docRef); // 오라클 문서를 가져옴
  if (!snap.exists()) return; // 오라클 문서가 없으면 아무것도 하지 않음
  const likedBy: string[] = snap.data().likedBy || []; // 이미 좋아요를 누른 사용자 id 목록을 가져옴
  if (likedBy.includes(userId)) { // 현재 사용자가 이미 좋아요를 눌렀으면 취소 처리함
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) }); // 좋아요 수를 줄이고 likedBy에서 사용자 id를 제거함
  } else { // 현재 사용자가 아직 좋아요를 누르지 않았으면 추가 처리함
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) }); // 좋아요 수를 늘리고 likedBy에 사용자 id를 추가함
  }
}

/* ── User Profile ── */ // 사용자 프로필 관련 Firestore 함수들을 모아둔 구역임
export async function getUserProfile(uid: string) { // 사용자 id로 프로필 정보를 가져오는 함수임
  const snap = await getDoc(doc(db, "users", uid)); // users 컬렉션에서 해당 사용자 문서를 가져옴
  if (!snap.exists()) return null; // 사용자 문서가 없으면 null을 반환함
  return snap.data(); // 사용자 문서 데이터를 반환함
}

export async function updateUserProfile(uid: string, data: Record<string, unknown>) { // 사용자 프로필 정보를 수정하는 함수임
  await updateDoc(doc(db, "users", uid), data); // users 컬렉션에서 해당 사용자 문서를 전달받은 data로 업데이트함
}

/* ── Seed Demo Data ── */ // 데모 영상과 공지 데이터를 Firestore에 넣는 함수 구역임
export async function seedDemoData() { // videos 컬렉션이 비어 있을 때 데모 데이터를 넣는 함수임
  const videosSnap = await getDocs(collection(db, "videos")); // videos 컬렉션의 현재 문서들을 가져옴
  if (!videosSnap.empty) return; // 이미 영상 데이터가 있으면 데모 데이터를 넣지 않음

  const demoVideos = [ // 처음 실행 시 넣을 데모 영상 데이터 배열임
    {
      title: { ko: "운명의 첫 번째 실 — 황금 왕관의 비밀", en: "First Thread of Destiny — Secret of the Golden Crown" },
      description: { ko: "황금 왕관을 쓴 공작의 딸, 아리아는 무도회에서 정체불명의 기사와 만난다.", en: "Aria, daughter of the duke, meets a mysterious knight at the ball." },
      videoUrl: "", thumbnailUrl: "", category: "destiny", episode: 1, season: 1,
      seriesTitle: { ko: "황금 왕관의 비밀", en: "Secret of the Golden Crown" },
      views: 12453, likes: 3201, likedBy: [], createdAt: new Date().toISOString(), isExclusive: false,
    },
    {
      title: { ko: "운명의 두 번째 실 — 달빛 아래의 고백", en: "Second Thread — Confession Under the Moonlight" },
      description: { ko: "기사의 정체가 밝혀지고, 아리아는 금지된 감정 앞에 서게 된다.", en: "The knight's identity is revealed, and Aria faces a forbidden emotion." },
      videoUrl: "", thumbnailUrl: "", category: "destiny", episode: 2, season: 1,
      seriesTitle: { ko: "황금 왕관의 비밀", en: "Secret of the Golden Crown" },
      views: 9876, likes: 2540, likedBy: [], createdAt: new Date().toISOString(), isExclusive: false,
    },
    {
      title: { ko: "✦ 미방분 ✦ 세 번째 실 — 배신의 무도회", en: "✦ Exclusive ✦ Third Thread — The Ball of Betrayal" },
      description: { ko: "신전에서만 볼 수 있는 미방분 에피소드.", en: "A sanctuary-exclusive episode." },
      videoUrl: "", thumbnailUrl: "", category: "destiny", episode: 3, season: 1,
      seriesTitle: { ko: "황금 왕관의 비밀", en: "Secret of the Golden Crown" },
      views: 5432, likes: 1890, likedBy: [], createdAt: new Date().toISOString(), isExclusive: true,
    },
  ];

  for (const video of demoVideos) await addDoc(collection(db, "videos"), video); // 데모 영상 배열을 하나씩 videos 컬렉션에 저장함

  const demoAnnouncements = [ // 처음 실행 시 넣을 데모 공지사항 데이터 배열임
    { title: { ko: "신전이 개방되었습니다", en: "The Sanctuary Has Opened" }, content: { ko: "축복받은 영식·영애 여러분, 윙카디아 신전이 드디어 열렸습니다!", en: "Dear blessed ones, the Sanctuary of Winkadia has finally opened!" }, createdAt: serverTimestamp(), type: "notice" },
    { title: { ko: "새로운 운명이 기록됩니다", en: "A New Destiny Is Being Recorded" }, content: { ko: "황금 왕관의 비밀 시즌 1이 연재 중입니다.", en: "Secret of the Golden Crown Season 1 is ongoing." }, createdAt: serverTimestamp(), type: "update" },
  ];

  for (const ann of demoAnnouncements) await addDoc(collection(db, "announcements"), ann); // 데모 공지사항 배열을 하나씩 announcements 컬렉션에 저장함
}