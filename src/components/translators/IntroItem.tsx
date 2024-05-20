type Props = {};

export default function IntroItem({ title, desc }: any) {
  if (!desc) return null;

  return (
    <li className='lg:grid lg:grid-cols-[100px_1fr]'>
      <div className='text-blue-500 font-semibold'>{title}</div>
      <div className='whitespace-pre-wrap text-sm lg:text-md w-full'>
        {desc}
      </div>
    </li>
  );
  
}
