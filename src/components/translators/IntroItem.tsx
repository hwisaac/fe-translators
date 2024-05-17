type Props = {};

export default function IntroItem({ title, desc }: any) {
  if (!title) return null;
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
        {desc?.map((item: string, index: number) => (
          <p key={`${index}-desc`}>
            {item}
            <br />
          </p>
        ))}
      </div>
    </li>
  );
}
