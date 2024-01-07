export interface ArtPiece {
  id: number;
  attributes: {
    name: string;
    image: { data: ImageMedia };
  };
}

export interface ImageMedia {
  id: number;
  attributes: Image & {
    formats: {
      large: Image;
      medium: Image;
      small: Image;
      thumbnail: Image;
    };
  };
}

export interface Image {
  url: string;
  width: number;
  height: number;
}
