// src/types/index.ts

export interface User { // 로그인한 사용자 정보를 나타내는 타입임
  uid: string; // Firebase에서 발급하는 사용자 고유 id임
  email: string | null; // 사용자 이메일이며 없을 수도 있음
  displayName: string | null; // 사용자 표시 이름이며 없을 수도 있음
  photoURL: string | null; // 사용자 프로필 이미지 주소이며 없을 수도 있음
  gender?: "male" | "female" | "other"; // 사용자 성별 값이며 선택 정보임
  joinedAt?: string; // 사용자가 가입한 날짜이며 선택 정보임
  nickname?: string; // 서비스 안에서 사용할 닉네임이며 선택 정보임
}

export interface Video { // 영상 데이터를 나타내는 타입임
  id: string; // Firestore 문서 id임
  title: Record<string, string>; // 언어별 영상 제목을 저장함
  description: Record<string, string>; // 언어별 영상 설명을 저장함
  videoUrl: string; // 실제 영상 주소를 저장함
  thumbnailUrl: string; // 썸네일 이미지 주소를 저장함
  category: string; // 영상 카테고리를 저장함
  episode?: number; // 에피소드 번호이며 선택 정보임
  season?: number; // 시즌 번호이며 선택 정보임
  seriesTitle?: Record<string, string>; // 언어별 시리즈 제목이며 선택 정보임
  views: number; // 조회수를 저장함
  likes: number; // 좋아요 수를 저장함
  createdAt: string; // 생성 날짜를 문자열로 저장함
  isExclusive: boolean; // 독점 영상인지 여부를 저장함
}

export interface Comment { // 댓글 데이터를 나타내는 타입임
  id: string; // Firestore 댓글 문서 id임
  videoId: string; // 댓글이 달린 영상 id임
  userId: string; // 댓글 작성자 id임
  userName: string; // 댓글 작성자 이름임
  userPhoto: string | null; // 댓글 작성자 프로필 이미지이며 없을 수도 있음
  userGender?: "male" | "female" | "other"; // 댓글 작성자 성별이며 선택 정보임
  content: string; // 댓글 내용을 저장함
  createdAt: string; // 댓글 작성 날짜를 저장함
  likes: number; // 댓글 좋아요 수를 저장함
  likedBy: string[]; // 댓글에 좋아요를 누른 사용자 id 목록임
}

export interface Series { // 시리즈 데이터를 나타내는 타입임
  id: string; // Firestore 시리즈 문서 id임
  title: Record<string, string>; // 언어별 시리즈 제목을 저장함
  description: Record<string, string>; // 언어별 시리즈 설명을 저장함
  coverUrl: string; // 시리즈 커버 이미지 주소를 저장함
  episodes: number; // 전체 에피소드 수를 저장함
  genre: string; // 시리즈 장르를 저장함
  status: "ongoing" | "completed" | "hiatus"; // 시리즈 연재 상태를 저장함
}

export interface Announcement { // 공지사항 데이터를 나타내는 타입임
  id: string; // Firestore 공지사항 문서 id임
  title: Record<string, string>; // 언어별 공지 제목을 저장함
  content: Record<string, string>; // 언어별 공지 내용을 저장함
  createdAt: string; // 공지 작성 날짜를 저장함
  type: "update" | "event" | "notice"; // 공지 종류를 저장함
}

export type OracleRarity = "rare" | "epic" | "legend"; // 오라클 카드 희귀도 타입임

export interface Oracle { // 오라클 공유 데이터를 나타내는 타입임
  id: string; // Firestore 오라클 문서 id임
  userId: string; // 오라클을 공유한 사용자 id임
  userName: string; // 오라클을 공유한 사용자 이름임
  userGender?: "male" | "female" | "other"; // 오라클을 공유한 사용자 성별이며 선택 정보임
  message: string; // 오라클 메시지 내용임
  rarity: OracleRarity; // 오라클 희귀도임
  createdAt: string; // 오라클 생성 날짜임
  likes: number; // 오라클 좋아요 수임
  likedBy: string[]; // 오라클에 좋아요를 누른 사용자 id 목록임
  lang: string; // 오라클이 생성된 언어임
}

export type Language = "ko" | "en"; // 서비스에서 지원하는 언어 타입임