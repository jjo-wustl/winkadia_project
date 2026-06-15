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
    "37번째 탈락 통보를 받은 서이현이 이상한 면접을 보러 가는 순간부터 낯선 황궁의 후보자가 되기까지, 선택과 장면으로 이어지는 여성향 판타지 실사형 게임입니다.",
  previewTitle: "CHAPTER 01. 37번째 탈락",
  previewDescription:
    "37번째 탈락 통보 이후, 서이현은 이상한 면접을 보러 갈 준비를 하고 회사 엘리베이터 앞에 도착합니다.",
  posterPath: "game/empress-interview/hero/main-poster.png",
  previewVideoPath: "game/empress-interview/hero/main-preview.mp4",
}; // Game 메인 히어로에 사용할 데이터임

export const gameCharacters: GameCharacter[] = [
  {
    id: "seo-ihyun",
    label: "Heroine",
    name: "서이현",
    enName: "Seo Ihyun",
    desc: "37번째 탈락 통보 이후, 이상한 면접을 보러 가게 된 현실의 취업 준비생",
    tags: ["현실인", "면접자", "37번째 탈락"],
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
    title: "CHAPTER 01. 37번째 탈락",
    desc: "37번째 탈락 통보를 받은 서이현이 이상한 면접을 보러 가기 전, 첫 번째 선택을 마주하는 장면",
    status: "Play",
    thumbnailPath: "game/empress-interview/episodes/ep-01/poster.png",
    videoPath: "game/empress-interview/episodes/ep-01/1-1.mp4",
    routeId: "kairen",
    scenes: [
      {
        id: "opening",
        title: "당신은 선택받고 싶습니까, 선택하고 싶습니까?",
        desc: "취업의 난, 당신은 37번째 면접에서 떨어졌습니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-1.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [
          {
            id: "chosen",
            label: "선택받고 싶다",
            desc: "이제는 선택받는 쪽을 선택합니다.",
            nextSceneId: "choice-a",
          },
          {
            id: "choose",
            label: "선택하고 싶다",
            desc: "주어진 판을 따르지 않고, 직접 고르는 쪽을 선택합니다.",
            nextSceneId: "choice-b",
          },
          {
            id: "refuse",
            label: "둘 다 싫다",
            desc: "선택받는 것도, 선택하는 것도 거부합니다.",
            nextSceneId: "choice-c",
          },
        ],
      },
      {
        id: "choice-a",
        title: "선택받고 싶다",
        desc: "이제는 선택받는 쪽을 선택합니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-1A.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [],
      },
      {
        id: "choice-b",
        title: "선택하고 싶다",
        desc: "주어진 판을 따르지 않고, 직접 고르는 쪽을 선택합니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-1B.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [],
      },
      {
        id: "choice-c",
        title: "둘 다 싫다",
        desc: "선택받는 것도, 선택하는 것도 거부합니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-1C.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [],
      },
      {
        id: "common-1-2",
        title: "CHAPTER 01. 37번째 탈락",
        desc: "이상한 면접을 보러 가기 위한 준비와 이동은 회사 엘리베이터 앞에서 멈춥니다.",
        videoPath: "game/empress-interview/episodes/ep-01/1-2.mp4",
        posterPath: "game/empress-interview/episodes/ep-01/poster.png",
        choices: [
          {
            id: "again",
            label: "처음부터 다시 보기",
            desc: "CHAPTER 01을 처음부터 다시 시작합니다.",
            nextSceneId: "opening",
          },
          {
            id: "next-episode",
            label: "다음화 보기",
            desc: "CHAPTER 02. 이상한 면접으로 이동합니다.",
            href: "/sanctuary/game/play/ep-02?autoplay=1",
          },
        ],
      },
    ],
  },
  {
    id: "ep-02",
    title: "CHAPTER 02. 이상한 면접",
    desc: "회사 엘리베이터 이후, 서이현은 이상한 면접장 안에서 첫 번째 시험처럼 놓인 물잔과 황제에 대한 질문을 마주합니다.",
    status: "Play",
    thumbnailPath: "game/empress-interview/episodes/ep-02/poster.png",
    videoPath: "game/empress-interview/episodes/ep-02/2-1.mp4",
    routeId: "kairen",
    scenes: [
      {
        id: "ep02-opening",
        title: "선택지 1. 물을 마실까?",
        desc: "이상한 면접장에 놓인 물잔 앞에서, 서이현은 첫 번째 판단을 해야 합니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-1.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [
          {
            id: "drink-refuse",
            label: "마시지 않는다",
            desc: "위험을 감지하고 물잔을 그대로 둡니다.",
            nextSceneId: "ep02-choice-a",
          },
          {
            id: "smell-only",
            label: "잔을 들고 냄새만 맡는다",
            desc: "마시기 전, 먼저 물잔의 냄새를 확인합니다.",
            nextSceneId: "ep02-choice-b",
          },
          {
            id: "pretend-drink",
            label: "일부러 마시는 척만 한다",
            desc: "상대의 반응을 보기 위해 마시는 척 연기합니다.",
            nextSceneId: "ep02-choice-c",
          },
        ],
      },
      {
        id: "ep02-choice-a",
        title: "마시지 않는다",
        desc: "서이현은 물잔에 손대지 않고 면접관의 반응을 살핍니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-1A.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "ep02-choice-b",
        title: "잔을 들고 냄새만 맡는다",
        desc: "서이현은 잔을 들어 올리고, 마시지 않은 채 냄새만 확인합니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-1B.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "ep02-choice-c",
        title: "일부러 마시는 척만 한다",
        desc: "서이현은 물을 마시는 척하며 면접장의 시선을 흔듭니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-1C.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "common-2-2",
        title: "선택지 2. 황제가 당신을 사랑하면 받아들이겠습니까?",
        desc: "이상한 면접은 더 노골적인 질문으로 이어집니다. 서이현은 사랑이라는 말조차 계약처럼 들리는 상황 앞에 섭니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-2.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [
          {
            id: "emperor-persuade",
            label: "황제라면 먼저 저를 설득해야 하지 않을까요?",
            desc: "사랑을 받아들이기 전에, 상대가 먼저 증명해야 한다고 답합니다.",
            nextSceneId: "ep02-choice-love-a",
          },
          {
            id: "love-contract",
            label: "사랑도 계약 조건에 포함됩니까?",
            desc: "감정보다 계약 조건을 먼저 묻는 방식으로 상황을 뒤집습니다.",
            nextSceneId: "ep02-choice-love-b",
          },
          {
            id: "my-feeling-first",
            label: "제가 그 사람을 사랑하는지가 먼저 아닐까요?",
            desc: "황제의 감정보다 자신의 마음이 먼저라고 답합니다.",
            nextSceneId: "ep02-choice-love-c",
          },
        ],
      },
      {
        id: "ep02-choice-love-a",
        title: "황제라면 먼저 저를 설득해야 하지 않을까요?",
        desc: "서이현은 상대가 황제라 해도 먼저 자신을 설득해야 한다고 말합니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-2A.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "ep02-choice-love-b",
        title: "사랑도 계약 조건에 포함됩니까?",
        desc: "서이현은 사랑이라는 말을 계약의 조건처럼 되묻습니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-2B.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "ep02-choice-love-c",
        title: "제가 그 사람을 사랑하는지가 먼저 아닐까요?",
        desc: "서이현은 황제가 자신을 사랑하는지보다, 자신이 그 사람을 사랑하는지가 먼저라고 답합니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-2C.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [],
      },
      {
        id: "common-2-3",
        title: "CHAPTER 02. 이상한 면접",
        desc: "사랑에 대한 질문 이후, 이상한 면접은 더 깊은 황궁의 조건으로 이어집니다.",
        videoPath: "game/empress-interview/episodes/ep-02/2-3.mp4",
        posterPath: "game/empress-interview/episodes/ep-02/poster.png",
        choices: [
          {
            id: "again",
            label: "처음부터 다시 보기",
            desc: "CHAPTER 02를 처음부터 다시 시작합니다.",
            nextSceneId: "ep02-opening",
          },
          {
            id: "next-episode",
            label: "다음화 보기",
            desc: "CHAPTER 03으로 이동합니다.",
            href: "/sanctuary/game/play/ep-03?autoplay=1",
          },
        ],
      },
    ],
  },
  {
    id: "ep-03",
    title: "EP 03. 후보자 인장",
    desc: "오른손에 나타난 금색 인장과 바뀐 이름",
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