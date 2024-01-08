import Image from 'next/image';
import Link from 'next/link';

async function fetchConfig(): Promise<any> {
  return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/config?populate=splashImage`)
    .then((res) => res.json())
    .then((json) => json.data.attributes);
}

export default async function LandingPage() {
  const config = await fetchConfig();
  const aboutMe = config.aboutMe;
  const splashImage = config.splashImage.data.attributes;

  return (
    <main>
      <h1>rainbowpui</h1>
      <div className="row">
        <div className="col-4">
          <Image
            style={{ width: '100%', height: 'auto' }}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${splashImage.url}`}
            alt=""
            width={splashImage.width}
            height={splashImage.height}
          />
        </div>
        <div className="col-8">
          <h3>About Me</h3>
          <div style={{ whiteSpace: 'pre-line' }}>{aboutMe}</div>
        </div>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link href="/gallery">Gallery</Link>
        </li>
        <li className="list-inline-item">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </main>
  );
}
