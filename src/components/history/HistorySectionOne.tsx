import Container from '@/layouts/Container';
import Image from 'next/image';
import historyIcon1 from '../../../public/history/history_icon1.png';
import historyIcon2 from '../../../public/history/history_icon2.png';
import historyIcon3 from '../../../public/history/history_icon3.png';
type Props = {};

export default function HistorySectionOne({}: Props) {
  return (
    <div className='mt-[80px] lg:mt-10'>
      <h1 className='text-slate-900 text-2xl sm:text-3xl mb-4'>
        바른번역 설립 취지
      </h1>
      <div className='border border-b-0 flex flex-col sm:flex-row text-slate-800 sm:items-center justify-center sm:gap-[100px] py-10 px-2'>
        <Image
          alt='image1'
          src={historyIcon1}
          className='shrink-0 w-20 lg:w-36 '
        />
        <div className='flex flex-col sm:w-[700px] gap-6'>
          <h3 className='font-semibold text-lg sm:text-2xl'>
            출판사에게는 <span className='text-blue-600'>양질의 번역</span>을
          </h3>
          <p className='font-extralight text-wrap text-md'>
            번역가는 많아도 출판사는 실력 있는 역자를 적시에 구하는 게 늘 만만치
            않습니다. 책의 분야와 성격에 맞는 역자를 제때 구하는 일부터,
            일정관리, 품질관리 등 여러 번거로운 일이 많습니다. 게다가 기획
            단계에서 원서의 내용을 검토하는 일과 출간 후 마케팅까지 바른번역에서
            힘닿는 데까지 도와드리겠습니다.
          </p>
        </div>
      </div>
      <div className='border border-b-0 flex flex-col sm:flex-row text-slate-800 sm:items-center justify-center sm:gap-[100px] py-10 px-2'>
        <Image
          alt='image1'
          src={historyIcon2}
          className='shrink-0 w-20 lg:w-36 '
        />
        <div className='flex flex-col sm:w-[700px] gap-6'>
          <h3 className='font-semibold text-lg mt-2 sm:text-2xl'>
            번역가에게는{' '}
            <span className='text-blue-600'>안정적인 작업환경</span>을
          </h3>
          <p className='font-extralight text-wrap text-md'>
            번역가들 역시 일감 수주, 번역료 수령, 안정된 작업 스케줄 운영 등에
            어려움을 겪습니다. 그렇다고 일부 중개회사의 고비용 구조를
            받아들이기도 어렵습니다. 바른번역은 이를 해결할 시스템을
            구축하였습니다. 이제 번역가는 좋은 번역에만 전념할 수 있습니다.
          </p>
        </div>
      </div>
      <div className='border flex flex-col sm:flex-row text-slate-800 sm:items-center justify-center sm:gap-[100px] py-10 px-2'>
        <Image
          alt='image1'
          src={historyIcon3}
          className='shrink-0 w-20 lg:w-36 '
        />
        <div className='flex flex-col sm:w-[700px] gap-6'>
          <h3 className='font-semibold text-lg mt-2 sm:text-2xl'>
            번역가들도 <span className='text-blue-600'>분야별 전문 번역</span>을
          </h3>
          <p className='font-extralight text-wrap text-md'>
            아무리 언어능력이 뛰어난 번역가라도 자신이 익숙지 않은 분야의 책을
            번역하게 되면 아무래도 실수가 생기고 번역의 질이 떨어지게 됩니다.
            이에 바른번역은 각 번역가들의 전공, 경력, 관심분야에 맞춰 각자 제일
            잘 할 수 있는 분야의 책을 번역할 수 있게 돕고 있습니다. 번역가들의
            교육과 전문화 역시 바른번역이 추구하는 주요 목표입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
