type Props = {
  children?: any;
};

export default function Container({ children }: Props) {
  return (
    <section className='w-full my-10 px-2 '>
      <div className='w-full max-w-6xl mx-auto py-10'>{children}</div>
    </section>
  );
}
