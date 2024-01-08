import { ArtPiece } from '@/types';
import Image from 'next/image';

export async function generateStaticParams() {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/art-pieces`)
    .then((res) => res.json())
    .then((json) => json.data.map((artPiece: ArtPiece) => ({ name: artPiece.attributes.name })));
}

async function fetchArtPiece(name: string): Promise<ArtPiece> {
  return fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/art-pieces?filters[name][$eq]=${name}&populate=image`,
  )
    .then((res) => res.json())
    .then((json) => json.data[0]);
}

export default async function ArtPiecePage({ params: { name } }: { params: { name: string } }) {
  const artPiece = await fetchArtPiece(name);
  const image = artPiece.attributes.image.data.attributes.formats.small;

  return (
    <>
      <h3>{artPiece.attributes.name}</h3>
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
        alt={artPiece.attributes.name}
        width={image.width}
        height={image.height}
      />
    </>
  );
}
