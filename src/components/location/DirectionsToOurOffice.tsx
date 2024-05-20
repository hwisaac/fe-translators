import Container from '@/layouts/Container';

type Props = {};

export default function DirectionsToOurOffice({}: Props) {
  return (
    <Container>
      <section className='flex flex-col'>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-0'>
          <div className='flex items-center gap-4 w-[300px]'>
            <div className='text-white bg-red-800 rounded-full w-10 h-10 flex items-center justify-center text-xl'>
              6
            </div>
            <h3 className='text-2xl font-semibold text-slate-700'>
              상수역 이용
            </h3>
          </div>
          <ul className='text-slate-500 text-lg'>
            <li>
              6호선 상수역 4번 출구로 나오셔서 합정역 방면(출구 방향)으로 4분
              정도 걸어오세요.
            </li>
            <li>
              왼쪽으로 홍익산부인과를 지나면 1층에 세븐일레븐 편의점이 있는
              건물이 나옵니다.
            </li>
            <li>그 건물 5층입니다.</li>
          </ul>
        </div>
      </section>
      <div className='w-full h-[1px] bg-slate-300 my-10' />

      <section className='flex flex-col'>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-0'>
          <div className='flex items-center gap-4 w-[300px] shrink-0 '>
            <div className='flex gap-1 '>
              <div className='text-white bg-green-600 rounded-full w-10 h-10 flex items-center justify-center text-xl'>
                2
              </div>
              <div className='text-white bg-red-800 rounded-full w-10 h-10 flex items-center justify-center text-xl'>
                6
              </div>
            </div>
            <h3 className='text-2xl font-semibold text-slate-700'>
              합정역 이용
            </h3>
          </div>
          <ul className='text-slate-500 text-lg'>
            <li>
              6호선 상수역 4번 출구로 나오셔서 합정역 방면(출구 방향)으로 4분
              정도 걸어오세요.
            </li>
            <li>
              왼쪽으로 홍익산부인과를 지나면 1층에 세븐일레븐 편의점이 있는
              건물이 나옵니다.
            </li>
            <li>그 건물 5층입니다.</li>
          </ul>
        </div>
      </section>

      <ul className='flex flex-col w-full bg-slate-100 px-10 py-8 my-20 text-slate-500'>
        <li>- 입구는 건물의 측면(공인중개사 사무소 옆)에 있습니다.</li>
        <li>- 주차 공간이 부족하오니 되도록 대중교통을 이용해주세요.</li>
      </ul>
    </Container>
  );
}
