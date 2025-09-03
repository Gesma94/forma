import type { Viewport } from 'next';
import { Topbar } from '@/layout/topbar/topbar';
import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';

type TSanityQueryParams = {
  version: number;
  clientName: string;
  password: string;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1
};

export default async function Page(props: PageProps<'/client-gallery/[clientName]/[version]'>) {
  const searchParams = await props.searchParams;
  const { clientName, version } = await props.params;

  const providedPassword = searchParams.psw;
  const numberVersion = Number(version);

  if (!providedPassword || Array.isArray(providedPassword)) {
    return <div> no password </div>;
  }

  if (Number.isNaN(numberVersion)) {
    return <div> version is not a number </div>;
  }

  const result = await runQuery(
    q
      .parameters<TSanityQueryParams>()
      .star.filterByType('clientSecretPageDocumentType')
      .filterRaw('clientName match $clientName')
      .slice(0)
      .project(sub => ({
        version: sub
          .field('versions[]')
          .deref()
          .filterBy('version == $version')
          .filterBy('password == $password')
          .slice(0)
      }))
      .transform(res => ({
        ...res.version
      })),
    { parameters: { clientName, version: numberVersion, password: providedPassword } }
  );

  if (!result || Object.keys(result).length === 0) {
    return <div> not ofund</div>;
  }

  const images = result.images.map(x => getSanityImageUrl(x));

  return (
    <div>
      <Topbar variant='solid' />
      <p>Password: {providedPassword}</p>
      <p>Client Name: {clientName}</p>
      <p>Version: {version}</p>

      <p>{JSON.stringify(result, null, 4)}</p>

      {images.map((img, index) => (
        <div key={result.images[index]._key} className='relative mb-10'>
          <div className='bg-primary absolute size-full opacity-0'></div>
          <img src={img} alt={result.images[index].altText} />
        </div>
      ))}
    </div>
  );
}
