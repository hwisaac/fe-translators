type Props = {};

export default function IntroItem({ title, desc }: any) {
  if (typeof desc === 'string') {
    return (
      <li className='grid grid-cols-[100px_1fr]'>
        <div className='text-blue-500 font-semibold'>{title}</div>
        <div className=' whitespace-pre'>{desc}</div>
      </li>
    );
  }
  return (
    <li className='grid grid-cols-[100px_1fr]'>
      <div className='text-blue-500 font-semibold'>{title}</div>
      <div>
        {desc.map((item: string) => (
          <>
            {item}
            <br />
          </>
        ))}
      </div>
    </li>
  );
}
