import Container from '@/layouts/Container';

type Props = {
  title: string;
  to: string;
  lis: string[];
};

export default function PartnershipSection({ title, to, lis }: Props) {
  return (
    <Container>
      <div className='flex flex-col lg:flex-row px-2'>
        <div className='w-[250px] shrink-0 mb-4 sm:mb-10'>
          <h2 className='text-blue-600 text-xs sm:text-lg font-thin mb-2'>
            {title}
          </h2>
          <h3 className='text-3xl font-semibold text-slate-700'>{to}</h3>
        </div>
        <ul className='flex flex-col gap-2 sm:gap-10 text-sm sm:text-lg font-thin text-slate-500'>
          {lis.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
