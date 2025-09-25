type TProps = {
  value: string;
};

export function SubHeading({ value }: TProps) {
  return <h3 className='font-accent text-primary leading-10 text-4xl'>{value}</h3>;
}
