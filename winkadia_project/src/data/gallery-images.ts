// src/data/gallery-images.ts

export type GalleryImageCategory = "cast" | "scenes";

export type GalleryImageItem = {
  id: string;
  category: GalleryImageCategory;
  title: string;
  subtitle: string;
  imagePath: string;
  layout: "portrait" | "wide";
};

export const galleryImages: GalleryImageItem[] = [
  {
    id: "winkadia-cast-main-01",
    category: "cast",
    title: "Male Cast 01",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main1.png",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-02",
    category: "cast",
    title: "Male Cast 02",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main2.png",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-03",
    category: "cast",
    title: "Male Cast 03",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main3.png",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-04",
    category: "cast",
    title: "Male Cast 04",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main4.png",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-05",
    category: "cast",
    title: "Female Cast 01",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main5.png",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-06",
    category: "cast",
    title: "Female Cast 02",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main6.jpg",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-07",
    category: "cast",
    title: "Female Cast 03",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main7.jpg",
    layout: "portrait",
  },
  {
    id: "winkadia-cast-main-08",
    category: "cast",
    title: "Female Cast 04",
    subtitle: "Winkadia Cast",
    imagePath: "gallery/winkadia/cast/main8.jpg",
    layout: "portrait",
  },
  {
    id: "winkadia-scene-01",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-01.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-02",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-02.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-03",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-03.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-04",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-04.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-05",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-05.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-06",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-06.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-07",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-07.png",
    layout: "wide",
  },
  {
    id: "winkadia-scene-08",
    category: "scenes",
    title: "다시 보는 명장면",
    subtitle: "Memorable Scene",
    imagePath: "gallery/winkadia/scenes/series-08.png",
    layout: "wide",
  },
];