export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  gender?: "male" | "female" | "other";
  joinedAt?: string;
  nickname?: string;
}

export interface Video {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  episode?: number;
  season?: number;
  seriesTitle?: Record<string, string>;
  views: number;
  likes: number;
  createdAt: string;
  isExclusive: boolean;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userPhoto: string | null;
  userGender?: "male" | "female" | "other";
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[];
}

export interface Series {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  coverUrl: string;
  episodes: number;
  genre: string;
  status: "ongoing" | "completed" | "hiatus";
}

export interface Announcement {
  id: string;
  title: Record<string, string>;
  content: Record<string, string>;
  createdAt: string;
  type: "update" | "event" | "notice";
}

export type OracleRarity = "rare" | "epic" | "legend";

export interface Oracle {
  id: string;
  userId: string;
  userName: string;
  userGender?: "male" | "female" | "other";
  message: string;
  rarity: OracleRarity;
  createdAt: string;
  likes: number;
  likedBy: string[];
  lang: string;
}

export type Language = "ko" | "en";
