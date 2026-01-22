import type { TCounterPostfix } from '@forma/common';
import type { TBasePortableTextValue } from '@/ui/portable-text/base-portable-text';
import { AnimatedValue } from './animated-value';
import { CounterContent } from './counter-content';

type TProps = {
  value: number;
  postfix: TCounterPostfix;
  content: TBasePortableTextValue;
};

export function Counter({ value, postfix, content }: TProps) {
  return (
    <div className='bg-bg rounded-2xl overflow-hidden mx-auto size-full'>
      <div className='flex flex-col items-center text-fg-dark overflow-hidden'>
        <div className='w-full px-6 py-10 text-left'>
          <div className='flex items-center justify-center'>
            <p className='ml-0 text-7xl font-body  text-primary mx-auto font-bold flex items-center justify-center'>
              <AnimatedValue value={value} />
              {postfix}
            </p>
          </div>
          <div className='mt-4'>
            <CounterContent value={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
