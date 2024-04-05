import Image from 'next/image';
import bgPattern from '/public/history/bg-content-heading.jpg';
import HistorySectionOne from '@/components/history/HistorySectionOne';
import HistorySectionTwo from '@/components/history/HistorySectionTwo';
type Props = {};

export default function History({}: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <Image src={bgPattern} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>설립취지&역사</h1>
      </div>

      <HistorySectionOne />
      <HistorySectionTwo />
    </section>
  );
}
