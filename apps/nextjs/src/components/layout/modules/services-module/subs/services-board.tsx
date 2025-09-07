'use client';

import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { ServiceCard } from './service-card';
import type { TServiceCard } from './type';

type TProps = {
  stillImageServiceCard: TServiceCard;
  animationsServiceCard: TServiceCard;
  vrServiceCard: TServiceCard;
};

export function ServicesBoard({ animationsServiceCard, stillImageServiceCard, vrServiceCard }: TProps) {
  const [hoveredIndex, setHoveredIndex] = useState<0 | 1 | 2 | undefined>(undefined);

  const { listStyle, listItemStyle } = styles({ hoveredIndex });

  return (
    <ul className={listStyle()}>
      <li
        onMouseOver={() => setHoveredIndex(0)}
        onMouseOut={() => setHoveredIndex(undefined)}
        onFocus={() => setHoveredIndex(0)}
        onBlur={() => setHoveredIndex(undefined)}
        className={listItemStyle()}
      >
        <ServiceCard {...stillImageServiceCard} />
      </li>
      <li
        onMouseOver={() => setHoveredIndex(1)}
        onMouseOut={() => setHoveredIndex(undefined)}
        onFocus={() => setHoveredIndex(1)}
        onBlur={() => setHoveredIndex(undefined)}
        className={listItemStyle()}
      >
        <ServiceCard {...animationsServiceCard} />
      </li>
      <li
        onMouseOver={() => setHoveredIndex(2)}
        onMouseOut={() => setHoveredIndex(undefined)}
        onFocus={() => setHoveredIndex(2)}
        onBlur={() => setHoveredIndex(undefined)}
        className={listItemStyle()}
      >
        <ServiceCard {...vrServiceCard} />
      </li>
    </ul>
  );
}

const styles = tv({
  slots: {
    listStyle:
      'w-full h-dvh max-h-[720px] grid grid-rows-[2fr_2fr_2fr] md:grid-rows-1 md:grid-cols-[2fr_2fr_2fr] transition-all duration-500 overflow-hidden',
    listItemStyle: 'h-[round(up,100%,1px)] md:h-full md:w-[round(up,100%,1px)]'
  },
  variants: {
    hoveredIndex: {
      0: { listStyle: 'grid-rows-[3fr_2fr_2fr] md:grid-rows-1 md:grid-cols-[3fr_2fr_2fr]' },
      1: { listStyle: 'grid-rows-[2fr_3fr_2fr] md:grid-rows-1 md:grid-cols-[2fr_3fr_2fr]' },
      2: { listStyle: 'grid-rows-[2fr_2fr_3fr] md:grid-rows-1 md:grid-cols-[2fr_2fr_3fr]' }
    }
  }
});
