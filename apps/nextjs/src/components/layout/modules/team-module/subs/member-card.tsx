import { MODULE_VARIANTS, type TModuleVariants } from '@forma/common';
import { motion, type Variants } from 'motion/react';
import { tv } from 'tailwind-variants';
import type { TDirection } from './types';

type TMemberCardProps = {
  imageUrl: string;
  fullName: string;
  role: string;
  isSecond: boolean;
  direction: TDirection;
  variant: TModuleVariants;
};

export function MemberCard({ imageUrl, fullName, role, direction, isSecond, variant }: TMemberCardProps) {
  const {
    fullNameStyle,
    imageContainerStyle,
    containerStyle,
    imageStyle,
    roleStyle,
    textsContainerStyle,
    motionStyle,
    textsWrapperStyle,
    firstLineStyle,
    secondLineStyle
  } = styles({ isSecond, variant });

  return (
    <motion.div
      variants={motionVariants}
      transition={{ duration: 1 }}
      custom={direction}
      className={motionStyle()}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className={containerStyle()}>
        <div className={imageContainerStyle()}>
          <img src={imageUrl} alt={fullName} className={imageStyle()} />
          <div className={firstLineStyle()} />
          <div className={secondLineStyle()} />
        </div>
        <div className={textsWrapperStyle()}>
          <div className={textsContainerStyle()}>
            <p className={fullNameStyle()}>{fullName}</p>
            <p className={roleStyle()}>{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const styles = tv({
  slots: {
    motionStyle: 'relative w-full row-start-1',
    containerStyle: 'flex flex-col size-full',
    imageContainerStyle: 'size-full max-w-full object-cover overflow-hidden shadow-inner relative',
    imageStyle: 'size-full object-cover hover:scale-110 transition-transform duration-300',
    firstLineStyle: 'w-[110%] h-2 absolute bottom-10 left-1/2 -translate-x-1/2 rotate-12',
    secondLineStyle: 'w-[110%] h-2 absolute bottom-14 left-1/2 -translate-x-1/2 rotate-12',
    textsContainerStyle: 'mt-2 flex flex-col gap-1 min-w-0',
    fullNameStyle: 'text-3xl text-ellipsis overflow-hidden text-nowrap',
    roleStyle: 'text-md text-ellipsis overflow-hidden text-nowrap text-text-muted',
    textsWrapperStyle: 'grid'
  },
  variants: {
    isSecond: {
      false: {
        motionStyle: 'col-start-1',
        imageContainerStyle: 'rounded-tl-[80px] rounded-br-[80px] md:rounded-br-none',
        textsWrapperStyle: 'grid-cols-[1fr_6.5rem] md:grid-cols-1'
      },
      true: {
        motionStyle: 'col-start-2 hidden md:block',
        imageContainerStyle: 'rounded-br-[80px]',
        textsWrapperStyle: 'grid-cols-[1fr_6.5rem]'
      }
    },
    variant: {
      [MODULE_VARIANTS.ON_BG]: {
        imageContainerStyle: 'bg-primary',
        firstLineStyle: 'bg-bg',
        secondLineStyle: 'bg-bg'
      },
      [MODULE_VARIANTS.ON_PRIMARY]: {
        imageContainerStyle: 'bg-bg',
        firstLineStyle: 'bg-primary',
        secondLineStyle: 'bg-primary'
      }
    }
  }
});

const motionVariants: Variants = {
  initial: (direction: TDirection) => ({ opacity: 0, x: direction === 'right' ? 0 : -0 }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: TDirection) => ({ opacity: 0, x: direction === 'left' ? 0 : -0 })
};
