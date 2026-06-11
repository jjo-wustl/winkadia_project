// src/types/game.ts
//
// Game 페이지에서 사용할 캐릭터, 루트, 에피소드, FMV 장면, 선택지, 갤러리 데이터 타입을 정의함.

export type GameCharacter = {
  id: string;
  label: string;
  name: string;
  enName: string;
  desc: string;
  tags: string[];
  imagePath: string;
}; // 등장인물 카드 타입임

export type GameRoute = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  status: string;
  imagePath: string;
  routeTitle: string;
  routeDesc: string;
  keywords: string[];
}; // 루트 선택 및 루트 상세 화면 타입임

export type GameChoice = {
  id: string;
  label: string;
  desc: string;
  nextSceneId?: string;
  href?: string;
}; // FMV 선택지 타입임

export type GameScene = {
  id: string;
  title: string;
  desc: string;
  videoPath: string;
  posterPath?: string;
  choices: GameChoice[];
}; // FMV 장면 타입임

export type GameEpisode = {
  id: string;
  title: string;
  desc: string;
  status: string;
  thumbnailPath: string;
  videoPath: string;
  routeId: string;
  scenes: GameScene[];
}; // 에피소드 카드 및 재생 화면 타입임

export type GameGalleryItem = {
  id: string;
  title: string;
  imagePath: string;
}; // CG 갤러리 카드 타입임