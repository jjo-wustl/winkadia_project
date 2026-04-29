// src/data/series-videos.ts

export type SeriesVideoItem = {
  id: string;
  ip: string;
  category: string;
  title: string;
  thumbnailPath: string;
  videoPath: string;
};

export const seriesVideos: SeriesVideoItem[] = [
  {
    id: "winkadia-unreleased-01",
    ip: "winkadia",
    category: "unreleased",
    title: "Winkadia Unreleased 01",
    thumbnailPath: "series/winkadia/unreleased/img1.png",
    videoPath: "series/winkadia/unreleased/video1.mp4",
  },
  {
    id: "winkadia-unreleased-02",
    ip: "winkadia",
    category: "unreleased",
    title: "Winkadia Unreleased 02",
    thumbnailPath: "series/winkadia/unreleased/img2.png",
    videoPath: "series/winkadia/unreleased/video2.mp4",
  },
  {
    id: "winkadia-unreleased-03",
    ip: "winkadia",
    category: "unreleased",
    title: "Winkadia Unreleased 03",
    thumbnailPath: "series/winkadia/unreleased/img3.png",
    videoPath: "series/winkadia/unreleased/video3.mp4",
  },
  {
    id: "winkadia-unreleased-04",
    ip: "winkadia",
    category: "unreleased",
    title: "Winkadia Unreleased 04",
    thumbnailPath: "series/winkadia/unreleased/img4.png",
    videoPath: "series/winkadia/unreleased/video4.mp4",
  },
  {
    id: "winkadia-unreleased-05",
    ip: "winkadia",
    category: "unreleased",
    title: "Winkadia Unreleased 05",
    thumbnailPath: "series/winkadia/unreleased/img5.png",
    videoPath: "series/winkadia/unreleased/video5.mp4",
  },
];