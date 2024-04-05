import { FaPlusCircle } from 'react-icons/fa';
import bgPattern from '/public/home/bg-main-notice-pattern.png';

type Props = {};

export default function SectionTwo({}: Props) {
  return (
    <section
      className='w-full pb-20'
      style={{
        backgroundImage: `url(${bgPattern})`,
      }}>
      <div className='w-full max-w-6xl mx-auto flex flex-col'>
        <div className='flex border-b items-end gap-8 py-4 my-10 relative'>
          <h2 className='text-4xl text-slate-900'>바른번역 소개</h2>
          <span className='text-slate-500'>우리는 이렇게 다릅니다</span>
          <div className='absolute right-0 font-semibold text-sm flex items-center gap-3 cursor-pointer text-slate-700'>
            VIEW MORE
            <FaPlusCircle size={20} />
          </div>
        </div>
        <div>
          <div className='grid grid-cols-3 gap-5'>
            {[0, 1, 2].map((i, index) => (
              <GridItem index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GridItem({ index }: any) {
  return (
    <div className='w-full shadow-xl h-[300px] p-10 bg-white text-slate-700'>
      <h2 className='h-[90%] text-xl'>바른번역 미디어/전문번역 서비스 런칭!</h2>

      <p className='text-slate-400 font-thin'>2022-08-09</p>
    </div>
  );
}
