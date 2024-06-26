import BrSM from '@/components/BrSM';
import Container from '@/layouts/Container';

type Props = {};

export default function DifferenceSectionOne({}: Props) {
  return (
    <div className='mt-[80px] lg:mt-10'>
      <h2 className='text-2xl font-semibold text-slate-700 mb-10'>
        <span className='font-thin'>바른번역이</span> <BrSM />
        <span className='text-blue-600'>출판사</span>에게 좋은 이유
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-1 sm:gap-4 text-slate-600'>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>01</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>양질의 번역가를 적시</span>에{' '}
            <br className='hidden sm:inline' />
            <span>찾을 수 있습니다.</span>
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>02</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>번역의 질과 납기를 관리</span>
            하는 데
            <br className='hidden sm:inline' />
            도움을 받을 수 있습니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>03</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>새로운 책을 찾아 기획</span>
            하는 데 <br className='hidden sm:inline' />
            도움을 받을 수 있습니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>04</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>번역가와 불필요한 마찰</span>을{' '}
            <br className='hidden sm:inline' />
            줄일 수 있습니다.
          </div>
        </div>
        <div className='w-full border flex sm:flex-col items-center sm:items-start px-4 sm:px-10 py-4 sm:py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>05</span>
          <div className='text-sm sm:text-xl space-y-2 font-thin'>
            <span className='font-semibold'>책을 홍보</span>하는 데{' '}
            <br className='hidden sm:inline' />
            도움을 받을 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
