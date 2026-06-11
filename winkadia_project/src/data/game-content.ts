// src/data/game-content.ts
//
// 황후 면접 Game 페이지에서 사용할 기본 데이터임.
// 이미지와 영상 파일은 Firebase Storage에 저장하고, 이 파일에는 Storage 경로만 작성함.

import type {
  GameCharacter,
  GameEpisode,
  GameGalleryItem,
  GameRoute,
} from "@/types/game"; // Game 페이지 데이터 타입을 가져옴

export const gameHero = {
  badge: "WINKADIA FMV GAME",
  title: "황후 면접",
  subTitle: "FMV Game",
  description:
    "현실의 면접장에 들어선 서이현이 낯선 황궁의 후보자가 되는 순간, 선택과 장면으로 이어지는 여성향 판타지 실사형 게임입니다.",
  previewTitle: "Chapter Preview",
  previewDescription: "황궁으로 이어지는 첫 장면, 낯선 면접의 문이 열립니다.",
  posterPath: "game/empress-interview/hero/main-poster.png",
  previewVideoPath: "game/empress-interview/hero/main-preview.mp4",
}; // Game 메인 히어로에 사용할 데이터임

export const gameCharacters: GameCharacter[] = [
  {
    id: "seo-ihyun",
    label: "Heroine",
    name: "서이현",
    enName: "Seo Ihyun",
    desc: "현실의 면접장에서 낯선 황궁의 후보자로 불려온 인물",
    tags: ["현실인", "후보자", "오른손 인장"],
    imagePath: "game/empress-interview/characters/seo-ihyun.png",
  },
  {
    id: "kairen",
    label: "Main Route",
    name: "카이렌",
    enName: "Kairen",
    desc: "차갑고 위압적인 시선으로 이현을 흔드는 황궁의 권력자",
    tags: ["저음", "압도감", "집착"],
    imagePath: "game/empress-interview/characters/kairen.png",
  },
  {
    id: "leonil",
    label: "Coming Soon",
    name: "레오닐",
    enName: "Leonil",
    desc: "능글맞은 미소와 부드러운 말투 뒤에 속내를 감춘 인물",
    tags: ["여유", "능글", "위험한 흥미"],
    imagePath: "game/empress-interview/characters/leonil.png",
  },
  {
    id: "adriel",
    label: "Coming Soon",
    name: "아드리엘",
    enName: "Adriel",
    desc: "차분하고 단호하게 황궁의 균형을 지켜보는 인물",
    tags: ["냉정함", "판단", "경계"],
    imagePath: "game/empress-interview/characters/adriel.png",
  },
]; // 등장인물 소개 데이터임

export const gameRoutes: GameRoute[] = [
  {
    id: "kairen",
    tag: "Main Route",
    title: "카이렌 루트",
    desc: "차갑고 위압적인 황궁의 권력자와 마주하는 이야기",
    status: "선택하기",
    imagePath: "game/empress-interview/routes/kairen-route.png",
    routeTitle: "Kairen Route",
    routeDesc:
      "차가운 시선과 위압적인 침묵 속에서, 서이현은 황궁의 권력자 카이렌과 가장 위험한 거리를 마주합니다.",
    keywords: ["Main Route", "Tension", "Imperial Palace", "Kairen"],
  },
  {
    id: "leonil",
    tag: "Coming Soon",
    title: "레오닐 루트",
    desc: "능글맞은 미소 뒤에 숨은 진심을 따라가는 이야기",
    status: "Coming Soon",
    imagePath: "game/empress-interview/routes/leonil-route.png",
    routeTitle: "Leonil Route",
    routeDesc:
      "부드러운 말투와 여유로운 미소 뒤에 감춰진 레오닐의 진심을 따라가는 루트입니다.",
    keywords: ["Coming Soon", "Leonil", "Hidden Room", "Smile"],
  },
  {
    id: "adriel",
    tag: "Coming Soon",
    title: "아드리엘 루트",
    desc: "차분하고 단호한 목소리로 진실을 말하는 이야기",
    status: "Coming Soon",
    imagePath: "game/empress-interview/routes/adriel-route.png",
    routeTitle: "Adriel Route",
    routeDesc:
      "차분하고 단호한 판단으로 황궁의 균형을 바라보는 아드리엘의 루트입니다.",
    keywords: ["Coming Soon", "Adriel", "Judgement", "Balance"],
  },
  {
    id: "hidden",
    tag: "Hidden",
    title: "히든 루트",
    desc: "아직 공개되지 않은 황궁의 숨겨진 이야기",
    status: "Locked",
    imagePath: "game/empress-interview/routes/hidden-route.png",
    routeTitle: "Hidden Route",
    routeDesc:
      "검은 유리 너머 감춰진 시선과 아직 드러나지 않은 황궁의 비밀을 따라가는 루트입니다.",
    keywords: ["Locked", "Hidden", "Secret", "Black Glass"],
  },
]; // 루트 선택 데이터임

export const gameEpisodes: GameEpisode[] = [
  {
    id: "ep-01",
    title: "EP 01. 황궁 면접",
    desc: "서이현이 낯선 황궁의 후보자로 불려가는 첫 장면",
    status: "Play",
    thumbnailPath: "game/empress-interview/episodes/ep-01/poster.png",
    videoPath: "game/empress-interview/episodes/ep-01/1-1.mp4",
    routeId: "kairen",
    scenes: [
      {
        id: "opening",
        title: "EP 01. 황궁 면접",
        desc: "현실의 면접장에 들어선 서이현은 낯선 황궁의 질문 앞에 서게 됩니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-2.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [
          {
            id: "trust",
            label: "그의 말을 믿는다",
            desc: "낯선 황궁의 질서 안으로 한 걸음 더 들어갑니다.",
            nextSceneId: "trust",
          },
          {
            id: "distance",
            label: "거리를 둔다",
            desc: "위험한 시선에서 한 발 물러나 상황을 살핍니다.",
            nextSceneId: "distance",
          },
        ],
      },
      {
        id: "trust",
        title: "선택 결과. 그의 말을 믿는다",
        desc: "이현은 카이렌의 말을 받아들이고 황궁의 규칙을 마주합니다.",
        videoPath: "game/empress-interview/episodes/ep-01/choice-trust.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [
          {
            id: "route",
            label: "카이렌 루트 보기",
            desc: "카이렌 루트의 정보 화면으로 이동합니다.",
            href: "/sanctuary/game/route/kairen",
          },
          {
            id: "again",
            label: "다시 선택하기",
            desc: "첫 선택지로 돌아갑니다.",
            nextSceneId: "opening",
          },
        ],
      },
      {
        id: "distance",
        title: "선택 결과. 거리를 둔다",
        desc: "이현은 쉽게 믿지 않고, 황궁의 숨은 의도를 경계합니다.",
        videoPath: "game/empress-interview/episodes/ep-01/choice-distance.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [
          {
            id: "gallery",
            label: "CG 갤러리 보기",
            desc: "현재 공개된 장면 스틸컷을 확인합니다.",
            href: "/sanctuary/game/gallery",
          },
          {
            id: "again",
            label: "다시 선택하기",
            desc: "첫 선택지로 돌아갑니다.",
            nextSceneId: "opening",
          },
        ],
      },
    ],
  },
  {
    id: "ep-02",
    title: "EP 02. 후보자 인장",
    desc: "오른손에 나타난 금색 인장과 바뀐 이름",
    status: "Soon",
    thumbnailPath: "game/empress-interview/episodes/ep-02/poster.png",
    videoPath: "game/empress-interview/episodes/ep-02/video.mp4",
    routeId: "kairen",
    scenes: [],
  },
  {
    id: "ep-03",
    title: "EP 03. 황궁의 복도",
    desc: "황궁 복도에서 시작되는 위험한 첫 대면",
    status: "Soon",
    thumbnailPath: "game/empress-interview/episodes/ep-03/poster.png",
    videoPath: "game/empress-interview/episodes/ep-03/video.mp4",
    routeId: "kairen",
    scenes: [],
  },
]; // 에피소드 데이터임

export const gameGalleryItems: GameGalleryItem[] = [
  {
    id: "cg-01",
    title: "황궁 복도",
    imagePath: "game/empress-interview/gallery/cg-01.png",
  },
  {
    id: "cg-02",
    title: "면접장",
    imagePath: "game/empress-interview/gallery/cg-02.png",
  },
  {
    id: "cg-03",
    title: "후보자 인장",
    imagePath: "game/empress-interview/gallery/cg-03.png",
  },
  {
    id: "cg-04",
    title: "카이렌",
    imagePath: "game/empress-interview/gallery/cg-04.png",
  },
  {
    id: "cg-05",
    title: "서이현",
    imagePath: "game/empress-interview/gallery/cg-05.png",
  },
  {
    id: "cg-06",
    title: "선택의 순간",
    imagePath: "game/empress-interview/gallery/cg-06.png",
  },
]; // CG 갤러리 데이터임