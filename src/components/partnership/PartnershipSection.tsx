import Container from '@/layouts/Container';

type Props = {
  title: string;
  to: string;
  lis: string[];
};

export default function PartnershipSection({ title, to, lis }: Props) {
  return (
    <Container>
      <div className='flex'>
        <div className='w-[250px] shrink-0'>
          <h2 className='text-blue-600 text-lg'>{title}</h2>
          <h3 className='text-3xl font-semibold text-slate-700'>{to}</h3>
        </div>
        <ul className='flex flex-col gap-10 text-lg text-slate-500'>
          {lis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
