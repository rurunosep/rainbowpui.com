import Image from 'next/image';
import RouteModal from '@/components/RouteModal';
import { ArtPiece } from '@/types';

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

export default async function GalleryArtPieceModal({
  params: { name },
}: {
  params: { name: string };
}) {
  const artPiece = await fetchArtPiece(name);
  const image = artPiece.attributes.image.data.attributes.formats.small;

  return (
    <RouteModal>
      <div className="card">
        <div className="card-body">
          <Image
            className="float-start me-3"
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
            alt={artPiece.attributes.name}
            width={image.width}
            height={image.height}
          />
          <div style={{ display: 'inline-block', width: '20rem' }}>
            <h3>{artPiece.attributes.name}</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </RouteModal>
  );
}
