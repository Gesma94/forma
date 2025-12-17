import { tv } from 'tailwind-variants';
import type { HowItWorksStepObjectType } from 'types/generated/sanity-types-generated';
import { StepDescription } from './step-description';

type TStepProps = {
  number: number;
  step: HowItWorksStepObjectType;
};

export function Step({ step, number }: TStepProps) {
  const {
    containerStyle,
    titleStyle,
    dayRangeStyle,
    descriptionContainerStyle,
    circleStyle,
    graphicContainerStyle,
    innerDotStyle,
    numberStyle,
    postlineStyle,
    prelineStyle
  } = styles();

  return (
    <li className={containerStyle()}>
      <p className={numberStyle()}>{number.toString().padStart(2, '0')}</p>
      <p className={titleStyle()}>{step.title}</p>
      <div className={graphicContainerStyle()} aria-hidden='true'>
        <div className={prelineStyle()}></div>
        <div className={circleStyle()}>
          <div className={innerDotStyle()}></div>
        </div>
        <div className={postlineStyle()}></div>
      </div>
      <p className={dayRangeStyle()}>DAYS {step.dayRange}</p>
      <div className={descriptionContainerStyle()}>
        <StepDescription value={step.description} />
      </div>
    </li>
  );
}

const styles = tv({
  slots: {
    containerStyle: [
      'grid grid-cols-[auto_auto] grid-rows-[auto_auto_auto_auto]',
      'lg:grid-rows-subgrid lg:grid-cols-1 lg:row-start-1 lg:row-span-5',
      'flex-col justify-center items-center relative text-center',
      'group'
    ],
    numberStyle: ['col-start-2 row-start-1', 'lg:col-start-1 lg:row-start-1', 'text-4xl text-primary text-center'],
    titleStyle: [
      'col-start-2 row-start-2',
      'lg:col-start-1 lg:row-start-2 lg:mt-3',
      'text-5xl font-bold text-primary text-center'
    ],
    graphicContainerStyle: [
      'col-start-1 row-start-1 row-span-4 px-2 flex h-full',
      'sm:px-10',
      'lg:col-start-1 lg:row-start-3 lg:row-span-1 lg:px-0 lg:mt-4 lg:h-[unset]',
      'relative w-full'
    ],
    prelineStyle: [
      'bg-primary group-[:first-of-type]:hidden block absolute',
      'w-0.5 h-1/2 left-1/2 -translate-x-1/2 top-0 -translate-y-5',
      'lg:h-0.5 lg:w-[calc(50%_+_1.25rem)] lg:top-1/2 lg:-translate-y-1/2 lg:-left-10 translate-x-0'
    ],
    circleStyle: 'size-10 border-primary border-2 flex items-center justify-center rounded-full m-auto',
    innerDotStyle: 'size-2 rounded-full bg-primary',
    postlineStyle: [
      'bg-primary group-[:last-of-type]:hidden block absolute',
      'h-1/2 w-0.5 left-1/2 -translate-x-1/2 bottom-0 translate-y-5',
      'lg:h-0.5 lg:w-[calc(50%_+_1.25rem)] lg:top-1/2 lg:-translate-y-1/2 lg:-right-10 lg:left-[unset] translate-x-0'
    ],
    dayRangeStyle: [
      'col-start-2 row-start-3 my-2',
      'lg:col-start-1 lg:row-start-4 lg:mt-2',
      'prose-sm uppercase text-text-muted'
    ],
    descriptionContainerStyle: ['col-start-2 row-start-4', 'lg:col-start-1 lg:row-start-5', 'max-w-md mx-auto h-full']
  }
});
