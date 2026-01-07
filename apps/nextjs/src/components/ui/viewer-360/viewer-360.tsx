'use client';

import View360, { EquirectProjection } from '@egjs/react-view360';
import { useMemo } from 'react';
import '@egjs/react-view360/css/view360.min.css';

type TProps = {
  imageUrl: string;
};

export function Viewer360({ imageUrl }: TProps) {
  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: imageUrl
      }),
    [imageUrl]
  );

  return (
    <div className='size-full'>
      <View360 zoom={false} initialZoom={0} className='is-16by9' projection={projection} />
    </div>
  );
}
