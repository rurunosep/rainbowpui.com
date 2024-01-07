import { ArtPiece } from '@/types';
import Image from 'next/image';

export const revalidate = 60;

async function fetchConfig(): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/config?populate=splashImage`)
    .then((res) => res.json())
    .then((json) => json.data.attributes);
}

async function fetchArtPieces(): Promise<ArtPiece[]> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/art-pieces?populate=image`)
    .then((res) => res.json())
    .then((json) => json.data);
}

export default async function Home() {
  const config = await fetchConfig();
  const aboutMe = config.aboutMe;
  const splashImage = config.splashImage.data.attributes;

  const artPieces = await fetchArtPieces();

  return (
    <main>
      <h1>rainbowpui</h1>
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${splashImage.url}`}
        alt=""
        width={splashImage.width}
        height={splashImage.height}
      />
      <h3>About Me</h3>
      <div style={{ whiteSpace: 'pre-line' }}>{aboutMe}</div>
      <h3>Gallery</h3>
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
    </main>
  );
}
