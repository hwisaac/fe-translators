type Props = {
  children?: any;
};

export default function Container({ children }: Props) {
  return (
    <section className='w-full my-10'>
      <div className='w-full max-w-6xl mx-auto px-2'>{children}</div>
    </section>
  );
}
