import BrSM from '@/components/BrSM';
import Container from '@/layouts/Container';

type Props = {};

export default function DifferenceSectionTwo({}: Props) {
  return (
    <Container>
      <h2 className='text-2xl font-semibold text-slate-700 mb-10'>
        <span className='font-thin'>바른번역이</span> <BrSM />
        <span className='text-blue-600'>번역가</span>에게 좋은 이유
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-4 text-slate-600'>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>01</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>일감 수주, 번역 스케줄 관리</span>에{' '}
            <br className='hidden sm:inline' />
            <span>도움을 받을 수 있습니다.</span>
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>02</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>번역 원고료를 제 떄 받는데</span>
            <br className='hidden sm:inline' />
            도움을 받을 수 있습니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>03</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>
              자신의 전공, 경력, 관심분야에 맞춰
            </span>
            <br className='hidden sm:inline' />
            전문성을 높이는데 도움이 됩니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>04</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>번역 실력을 높여가는데</span>
            <br className='hidden sm:inline' />
            도움을 받을 수 있습니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>05</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>매니저 및 번역가들과의 교류</span>를
            통해
            <br className='hidden sm:inline' />
            정보를 얻을 수 있습니다.
          </div>
        </div>
      </div>
    </Container>
  );
}
