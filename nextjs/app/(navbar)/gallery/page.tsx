import { ArtPiece } from '@/types';
import MasonryGallery from './MasonryGallery';

async function fetchArtPieces(): Promise<ArtPiece[]> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/art-pieces?populate=image`)
    .then((res) => res.json())
    .then((json) => json.data);
}

export default async function GalleryPage() {
  let artPieces = await fetchArtPieces();
  artPieces = [...artPieces, ...artPieces, ...artPieces];

  return (
    <>
      <h1>Gallery</h1>
      <MasonryGallery artPieces={artPieces} />
    </>
  );
}
