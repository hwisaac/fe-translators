type Props = {};

export default function IntroItem({ title, desc }: any) {
  if (!desc) return null;

  return (
    <li className='grid grid-cols-[70px_1fr] lg:grid-cols-[100px_1fr]'>
      <div className='text-blue-500 font-semibold text-sm'>{title}</div>
      <div className='whitespace-pre-wrap text-sm lg:text-md w-full font-thin text-slate-500 sm:text-lg'>
        {desc}
      </div>
    </li>
  );
  
}
