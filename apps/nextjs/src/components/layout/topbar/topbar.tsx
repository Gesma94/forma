import { getFormaMediaData } from 'common/utils/get-forma-media';
import type { VariantProps } from 'tailwind-variants';
import type { SetRequired } from 'type-fest';
import { q, runQuery } from '@/utils/groqd-client';
import type { topbarTv } from './subs/topbar-style';
import { TopbarClient } from './topbar-client';

export async function Topbar({ variant }: SetRequired<VariantProps<typeof topbarTv>, 'variant'>) {
  const result = await runQuery(q.star.filterByType('topbarDocumentType').slice(0));
  const [architecturalStillsMedia, videoAnimationsMedia, virtualRealityMedia] = await Promise.all([
    getFormaMediaData(result.architecturalStillsMedia, { imageBuilderOptions: { width: 1000 } }),
    getFormaMediaData(result.videoAnimationsMedia, { imageBuilderOptions: { width: 1000 } }),
    getFormaMediaData(result.virtualRealityMedia, { imageBuilderOptions: { width: 1000 } })
  ]);

  return (
    <TopbarClient
      topbarModule={result}
      variant={variant}
      architecturalStillsMedia={architecturalStillsMedia}
      videoAnimationsMedia={videoAnimationsMedia}
      virtualRealityMedia={virtualRealityMedia}
    />
  );
}
