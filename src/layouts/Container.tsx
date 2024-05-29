type Props = {
  children?: any;
};

export default function Container({ children }: Props) {
  return (
    <div className='w-full mb-10 relative'>
      {/* <div className='w-full h-[60px] lg:h-[60px] bg-red-500'>asdfasdf</div> */}
      <div className='w-full max-w-6xl mx-auto px-2'>{children}</div>
    </div>
  );
}
