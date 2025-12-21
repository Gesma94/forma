type TProps = {
  value: string;
};

export function SubHeading({ value }: TProps) {
  return <h3 className='text-primary leading-10 text-2xl'>{value}</h3>;
}
