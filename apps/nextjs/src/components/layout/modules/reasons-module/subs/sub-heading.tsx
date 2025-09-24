type TProps = {
  value: string;
};

export function SubHeading({ value }: TProps) {
  return <h3 className='font-accent text-primary text-3xl leading-16 sm:leading-none 2xl:text-4xl'>{value}</h3>;
}
