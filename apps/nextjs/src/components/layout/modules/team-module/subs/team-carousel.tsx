'use client';

import type { TModuleVariants } from '@forma/common';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { isNotNil } from 'es-toolkit';
import { AnimatePresence } from 'motion/react';
import { type ComponentProps, useState } from 'react';
import type { TeamMemberObjectType } from 'types/generated/sanity-types-generated';
import { IconButton } from '@/ui/buttons/icon-button/icon-button';
import { MemberCard } from './member-card';
import type { TDirection } from './types';

type TProps = {
  variant: TModuleVariants;
  members: Array<TeamMemberObjectType & { imageUrl: string; _key: string }>;
};

export function TeamCarousel({ members, variant }: TProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<TDirection | null>(null);

  const firstMember = members[currentIndex];
  const secondMember = members[(currentIndex + 1) % members.length];

  const handleCaretLeftClick = () => {
    setDirection('left');
    setCurrentIndex((currentIndex - 1 + members.length) % members.length);
  };

  const handleCaretRightClick = () => {
    setDirection('right');
    setCurrentIndex((currentIndex + 1) % members.length);
  };

  const getIconButtonSurface = (): ComponentProps<typeof IconButton>['surface'] => {
    if (variant === 'on-bg') {
      return 'bg';
    }

    return 'primary';
  };

  return (
    <div className='grid grid-cols-[1fr] md:grid-cols-2 grid-rows-1 gap-4 relative size-full'>
      <AnimatePresence initial={false} custom={direction}>
        <MemberCard
          imageUrl={firstMember.imageUrl}
          fullName={firstMember.fullName}
          variant={variant}
          role={firstMember.role}
          isSecond={false}
          direction={direction}
          key={`${firstMember._key} first`}
        />
        {isNotNil(secondMember) && (
          <MemberCard
            imageUrl={secondMember.imageUrl}
            fullName={secondMember.fullName}
            variant={variant}
            role={secondMember.role}
            direction={direction}
            isSecond={true}
            key={`${secondMember._key} second`}
          />
        )}
      </AnimatePresence>
      <div className='absolute flex gap-2 bottom-2 px-2 right-0'>
        <IconButton
          icon={CaretLeftIcon}
          surface={getIconButtonSurface()}
          onClick={handleCaretLeftClick}
          aria-label='Previous member'
        />
        <IconButton
          icon={CaretRightIcon}
          surface={getIconButtonSurface()}
          onClick={handleCaretRightClick}
          aria-label='Next member'
        />
      </div>
    </div>
  );
}
