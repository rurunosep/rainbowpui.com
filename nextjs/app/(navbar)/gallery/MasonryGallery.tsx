'use client';

import { ArtPiece } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

export default function MasonryGallery({ artPieces }: { artPieces: ArtPiece[] }) {
  return (
    <>
      <div className="row" id="masonry-grid">
        {artPieces.map((artPiece) => {
          const image = artPiece.attributes.image.data.attributes.formats.small;
          return (
            <div className="col-md-6 col-lg-4 mb-4" key={artPiece.id}>
              <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
                <Link href={`/art/${artPiece.attributes.name}`} scroll={false}>
                  <Image
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
                    alt={artPiece.attributes.name}
                    width={image.width}
                    height={image.height}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossOrigin="anonymous"
        async
        onReady={() => {
          //@ts-ignore ("Masonry" class comes from the loaded script)
          const msnry = new Masonry('#masonry-grid', {
            percentPosition: true,
          });
        }}
      />
    </>
  );
}
