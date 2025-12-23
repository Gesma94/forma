import { tv } from 'tailwind-variants';
import { FormaMediaClientSide } from '@/ui/forma-media/forma-media-client-side';
import { CardDescription } from './card-description';
import type { ICard } from './types';

type TCardProps = {
  card: ICard;
};

export function Card({ card }: TCardProps) {
  const { title, description, formaMedia } = card;
  const { containerStyle, imageStyle, imageWrapperStyle, contentContainerStyle, titleStyle } = styles();

  return (
    <li className={containerStyle()}>
      <div className={imageWrapperStyle()}>
        <FormaMediaClientSide {...formaMedia} className={imageStyle()} />
      </div>
      <div className={contentContainerStyle()}>
        <p className={titleStyle()}>{title}</p>
        <CardDescription value={description} />
      </div>
    </li>
  );
}

const styles = tv({
  slots: {
    containerStyle: 'bg-bg rounded-2xl shadow-2xl overflow-hidden',
    imageWrapperStyle: 'w-full h-96',
    imageStyle: 'size-full object-cover',
    contentContainerStyle: 'py-6 px-6 flex flex-col gap-2',
    titleStyle: 'text-4xl text-primary font-bold'
  }
});
