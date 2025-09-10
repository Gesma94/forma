import { tv } from 'tailwind-variants';
import { CardDescription } from './card-description';
import type { ICard } from './types';

type TCardProps = {
  card: ICard;
};

export function Card({ card }: TCardProps) {
  const { title, description, image, imageUrl } = card;
  const { containerStyle, imageStyle, contentContainerStyle, titleStyle } = styles();

  return (
    <li className={containerStyle()}>
      <img src={imageUrl} alt={image.altText} className={imageStyle()} />
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
    imageStyle: 'w-full h-96 object-cover',
    contentContainerStyle: 'py-6 px-6 flex flex-col gap-2',
    titleStyle: 'text-4xl text-primary font-bold font-accent'
  }
});
