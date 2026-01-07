import { getSanityImageUrl, q, runQuery } from '@/utils/groqd-client';
import { Heading } from './subs/heading';
import { SubHeading } from './subs/subheading';

export async function MaintananceSplashScreen() {
  const result = await runQuery(
    q.star
      .filterByType('maintananceScreenDocumentType')
      .project(p => ({
        heading: true,
        subHeading: true,
        brightness: p.field('backgroundImage.brightness'),
        formaImage: p.field('backgroundImage.formaImage').deref()
      }))
      .slice(0)
  );
  const imageUrl = getSanityImageUrl(result.formaImage.image);

  return (
    <div className='w-full h-dvh relative flex items-center justify-center-safe'>
      <img
        src={imageUrl}
        alt='Maintanance Background'
        className='absolute size-full object-cover'
        style={{ filter: `brightness(${result.brightness}%)` }}
      />
      <div className='relative items-center flex flex-col sm:gap-4'>
        <Heading value={result.heading} />
        <SubHeading value={result.subHeading} />
      </div>
    </div>
  );
}
