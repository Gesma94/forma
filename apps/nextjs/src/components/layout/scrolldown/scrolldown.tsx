import { CaretDoubleDownIcon } from '@phosphor-icons/react/dist/ssr';
import { MotionDiv } from '@/ui/motion/motion-div';

type TProps = {
  label: string;
};

export function Scrolldown({ label }: TProps) {
  return (
    <MotionDiv
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2.65,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
      className='flex flex-col items-center gap-1'
    >
      <p className='text-text-muted text-xs uppercase'>{label}</p>
      <CaretDoubleDownIcon className='size-3 text-primary-text' />
    </MotionDiv>
  );
}
