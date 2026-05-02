// src/data/series-ips.ts

// IP의 공개 상태를 구분하는 타입임 (실제 영상이 올라온 IP인지, 출시 예정인 IP인지)
export type SeriesIPStatus = "available" | "comingSoon";

// 개별 IP(작품 단위)의 메타데이터 타입임
export type SeriesIP = {
  id: string; // series-videos의 ipId와 매칭되는 IP 식별자임
  name: { ko: string; en: string }; // 화면에 노출될 한국어/영어 IP 이름임
  description: { ko: string; en: string }; // IP 섹션 헤더에 노출될 설명 문구임
  status: SeriesIPStatus; // 공개 여부 (available 이면 영상 그리드, comingSoon 이면 placeholder를 보여줌)
};

// Series 페이지에서 노출할 IP 목록임. 추후 IP가 늘어나면 이 배열에 추가하면 됨
export const seriesIPs: SeriesIP[] = [
  {
    id: "winkadia-original",
    name: { ko: "윙카디아 오리지널", en: "Winkadia Original" },
    description: {
      ko: "윙카디아가 직접 만든 미방분 영상 모음. 다른 곳에서는 볼 수 없는 한정 콘텐츠입니다",
      en: "An unreleased compilation crafted by Winkadia. Exclusive content found only here",
    },
    status: "available",
  },
  {
    id: "evil-woman-hourglass",
    name: { ko: "악녀 ***", en: "The Villainess Turns Back the Hourglass" },
    description: {
      ko: "공개 예정 — 트레일러와 시리즈 전편이 곧 추가됩니다",
      en: "Coming soon — trailer and full series will arrive shortly",
    },
    status: "comingSoon",
  },
  {
    id: "kiss-yokai",
    name: { ko: "키스 ***", en: "Kiss Yokai" },
    description: {
      ko: "공개 예정 — 트레일러와 시리즈 전편이 곧 추가됩니다",
      en: "Coming soon — trailer and full series will arrive shortly",
    },
    status: "comingSoon",
  },
];
