// src/data/series-videos.ts

export type SeriesVideoAspect = "16:9" | "9:16"; // 영상이 와이드(16:9) 인지 세로(9:16) 인지 구분하기 위한 타입임

// 영상이 어떤 종류의 콘텐츠인지 구분함 (트레일러 / 시리즈 전편 / 모음집)
export type SeriesVideoKind = "trailer" | "fullSeries" | "compilation";

export type SeriesVideoItem = {
  id: string; // 라우팅과 React key에 사용하는 영상 식별자임
  ipId: string; // series-ips.ts의 IP id와 매칭되는 IP 그룹화 키임
  kind: SeriesVideoKind; // 영상이 트레일러/전편/모음집 중 무엇인지 표시함
  title: { ko: string; en: string }; // 화면에 노출될 한국어/영어 제목임
  thumbnailPath: string; // Firebase Storage 안의 썸네일 이미지 경로임
  videoPath: string; // Firebase Storage 안의 영상 파일 경로임
  aspectRatio: SeriesVideoAspect; // 카드 비율을 결정하기 위한 영상 비율 정보임
};

export const seriesVideos: SeriesVideoItem[] = [
  {
    id: "winkadia-unreleased-01",
    ipId: "winkadia-original",
    kind: "compilation",
    title: { ko: "카이로스 아침짹 완전판", en: "Kairos Morning Chirp: Complete Edition" },
    thumbnailPath: "series/winkadia/unreleased/img1.png",
    videoPath: "series/winkadia/unreleased/video1.mp4",
    aspectRatio: "16:9",
  },
  {
    id: "winkadia-unreleased-02",
    ipId: "winkadia-original",
    kind: "compilation",
    title: { ko: "차 속의 재앙은 이미 나를 사랑하고 있다", en: "The Disaster in My Car Already Loves Me" },
    thumbnailPath: "series/winkadia/unreleased/img2.png",
    videoPath: "series/winkadia/unreleased/video2.mp4",
    aspectRatio: "16:9",
  },
  {
    id: "winkadia-unreleased-03",
    ipId: "winkadia-original",
    kind: "compilation",
    title: { ko: "키스신 풀버전", en: "Kiss Scene: Full Version" },
    thumbnailPath: "series/winkadia/unreleased/img3.png",
    videoPath: "series/winkadia/unreleased/video3.mp4",
    aspectRatio: "16:9",
  },
  {
    id: "winkadia-unreleased-04",
    ipId: "winkadia-original",
    kind: "compilation",
    title: { ko: "누나 나 자고 간다", en: "Noona, I'm Staying Over" },
    thumbnailPath: "series/winkadia/unreleased/img4.png",
    videoPath: "series/winkadia/unreleased/video4.mp4",
    aspectRatio: "9:16",
  },
  {
    id: "winkadia-unreleased-05",
    ipId: "winkadia-original",
    kind: "compilation",
    title: { ko: "사내비밀연애 커플", en: "Office Secret Romance Couple" },
    thumbnailPath: "series/winkadia/unreleased/img5.png",
    videoPath: "series/winkadia/unreleased/video5.mp4",
    aspectRatio: "9:16",
  },
];
