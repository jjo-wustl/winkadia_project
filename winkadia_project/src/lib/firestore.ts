import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc,
  query, where, orderBy, limit, increment, arrayUnion, arrayRemove,
  serverTimestamp, Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Video, Comment, Announcement, Series, Oracle } from "@/types";

/* ── Videos ── */
export async function getVideos(options?: {
  category?: string; isExclusive?: boolean; limitCount?: number; orderField?: string;
}) {
  const constraints: ReturnType<typeof where | typeof orderBy | typeof limit>[] = [];
  if (options?.category) constraints.push(where("category", "==", options.category));
  if (options?.isExclusive !== undefined) constraints.push(where("isExclusive", "==", options.isExclusive));
  constraints.push(orderBy(options?.orderField || "createdAt", "desc"));
  if (options?.limitCount) constraints.push(limit(options.limitCount));
  const q = query(collection(db, "videos"), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Video));
}

export async function getVideoById(id: string): Promise<Video | null> {
  const snap = await getDoc(doc(db, "videos", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Video;
}

export async function incrementViews(videoId: string) {
  await updateDoc(doc(db, "videos", videoId), { views: increment(1) });
}

export async function toggleLikeVideo(videoId: string, userId: string) {
  const docRef = doc(db, "videos", videoId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  const likedBy: string[] = snap.data().likedBy || [];
  if (likedBy.includes(userId)) {
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) });
    return false;
  } else {
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) });
    return true;
  }
}

/* ── Comments ── */
export async function getComments(videoId: string): Promise<Comment[]> {
  const q = query(collection(db, "comments"), where("videoId", "==", videoId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Comment;
  });
}

export async function addComment(comment: Omit<Comment, "id" | "createdAt" | "likes" | "likedBy">) {
  const docRef = await addDoc(collection(db, "comments"), { ...comment, likes: 0, likedBy: [], createdAt: serverTimestamp() });
  return docRef.id;
}

export async function deleteComment(commentId: string) { await deleteDoc(doc(db, "comments", commentId)); }

export async function toggleLikeComment(commentId: string, userId: string) {
  const docRef = doc(db, "comments", commentId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  const likedBy: string[] = snap.data().likedBy || [];
  if (likedBy.includes(userId)) {
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) });
  } else {
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) });
  }
}

/* ── Series ── */
export async function getSeries(): Promise<Series[]> {
  const q = query(collection(db, "series"), orderBy("title"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Series));
}

/* ── Announcements ── */
export async function getAnnouncements(count = 5): Promise<Announcement[]> {
  const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Announcement;
  });
}

/* ── Oracles ── */
export async function getOracles(count = 30): Promise<Oracle[]> {
  const q = query(collection(db, "oracles"), orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return { id: d.id, ...data, createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt } as Oracle;
  });
}

export async function addOracle(oracle: Omit<Oracle, "id" | "createdAt" | "likes" | "likedBy">) {
  const docRef = await addDoc(collection(db, "oracles"), { ...oracle, likes: 0, likedBy: [], createdAt: serverTimestamp() });
  return docRef.id;
}

export async function toggleLikeOracle(oracleId: string, userId: string) {
  const docRef = doc(db, "oracles", oracleId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;
  const likedBy: string[] = snap.data().likedBy || [];
  if (likedBy.includes(userId)) {
    await updateDoc(docRef, { likes: increment(-1), likedBy: arrayRemove(userId) });
  } else {
    await updateDoc(docRef, { likes: increment(1), likedBy: arrayUnion(userId) });
  }
}

/* ── User Profile ── */
export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data();
}

export async function updateUserProfile(uid: string, data: Record<string, unknown>) {
  await updateDoc(doc(db, "users", uid), data);
}

/* ── Seed Demo Data ── */
export async function seedDemoData() {
  const videosSnap = await getDocs(collection(db, "videos"));
  if (!videosSnap.empty) return;

  const demoVideos = [
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

  for (const video of demoVideos) await addDoc(collection(db, "videos"), video);

  const demoAnnouncements = [
    { title: { ko: "신전이 개방되었습니다", en: "The Sanctuary Has Opened" }, content: { ko: "축복받은 영식·영애 여러분, 윙카디아 신전이 드디어 열렸습니다!", en: "Dear blessed ones, the Sanctuary of Winkadia has finally opened!" }, createdAt: serverTimestamp(), type: "notice" },
    { title: { ko: "새로운 운명이 기록됩니다", en: "A New Destiny Is Being Recorded" }, content: { ko: "황금 왕관의 비밀 시즌 1이 연재 중입니다.", en: "Secret of the Golden Crown Season 1 is ongoing." }, createdAt: serverTimestamp(), type: "update" },
  ];

  for (const ann of demoAnnouncements) await addDoc(collection(db, "announcements"), ann);
}
