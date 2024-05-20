import Container from '@/layouts/Container';

type Props = {};

export default function DifferenceSectionOne({}: Props) {
  return (
    <Container>
      <h2 className='text-2xl font-semibold text-slate-700 mb-10'>
        바른번역이 <span className='text-blue-600'>출판사</span>에게 좋은 이유
      </h2>
      <div className='grid grid-cols-3 gap-4 text-slate-600'>
        <div className='w-full border flex flex-col px-10 py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>01</span>
          <div className='text-xl space-y-2'>
            <p>
              <span className='font-semibold'>양질의 번역가를 적시</span>에
            </p>
            <p>찾을 수 있습니다.</p>
          </div>
        </div>
        <div className='w-full border flex flex-col px-10 py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>02</span>
          <div className='text-xl space-y-2'>
            <p>
              <span className='font-semibold'>번역의 질과 납기를 관리</span>
              하는데
            </p>
            <p>도움을 받을 수 있습니다.</p>
          </div>
        </div>
        <div className='w-full border flex flex-col px-10 py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>03</span>
          <div className='text-xl space-y-2'>
            <p>
              <span className='font-semibold'>새로운 책을 찾아 기획</span>
              하는데
            </p>
            <p>도움을 받을 수 있습니다.</p>
          </div>
        </div>
        <div className='w-full border flex flex-col px-10 py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>04</span>
          <div className='text-xl space-y-2'>
            <p>
              <span className='font-semibold'>번역가와 불필요한 마찰</span>을
            </p>
            <p>줄일 수 있습니다.</p>
          </div>
        </div>
        <div className='w-full border flex flex-col px-10 py-8 gap-5 bg-white'>
          <span className='font-semibold text-blue-600 text-xl'>05</span>
          <div className='text-xl space-y-2'>
            <p>
              <span className='font-semibold'>책을 홍보</span>하는데
            </p>
            <p>도움을 받을 수 있습니다.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
