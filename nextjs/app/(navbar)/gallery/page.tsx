import { ArtPiece } from '@/types';
import Image from 'next/image';

async function fetchArtPieces(): Promise<ArtPiece[]> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/art-pieces?populate=image`)
    .then((res) => res.json())
    .then((json) => json.data);
}

export default async function GalleryPage() {
  const artPieces = await fetchArtPieces();

  return (
    <>
      <h1>Gallery</h1>
      {artPieces.map((artPiece) => {
        const image = artPiece.attributes.image.data.attributes.formats.small;
        return (
          <Image
            key={artPiece.id}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
            alt=""
            width={image.width}
            height={image.height}
          />
        );
      })}
    </>
  );
}
