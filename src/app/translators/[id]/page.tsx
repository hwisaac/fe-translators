import PageLayout from '@/layouts/PageLayout';
import dummyImage from '@/utils/dummyImage';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

function IntroItem({ title, desc }: any) {
  if (typeof desc === 'string') {
    return (
      <li className='grid grid-cols-[100px_1fr]'>
        <div className='text-blue-500 font-semibold'>{title}</div>
        <div>{desc}</div>
      </li>
    );
  }
  return (
    <li className='grid grid-cols-[100px_1fr]'>
      <div className='text-blue-500 font-semibold'>{title}</div>
      <div>
        {desc.map((item: string) => (
          <>
            {item}
            <br />
          </>
        ))}
      </div>
    </li>
  );
}
const history = [
  '세종대학교 식품공학 전공',
  '사이버한국외국어대학교 일본어, 한국어교육 전공',
  '중앙일보 조인스닷컴 뉴스 및 여성잡지 온라인 콘텐츠 서비스 업무 담당',
  '홍대 게스트하우스 운영',
  '바른번역 글밥아카데미 일본어 출판번역과정 수료',
  '한겨레문화센터 김경원의 일본어 논픽션 번역 입문 수강',
  '▸한국어교원 2급',
  '▸사이버한국외국어대학교 제7회 해외문학번역대회 장려상',
];
export default function page({}: Props) {
  return (
    <PageLayout title='번역가 소개'>
      <h2>번역가 소개</h2>
      <div className='w-full h-1 bg-black' />
      <div className='flex'>
        <div className='w-[200px] h-[250px] bg-yellow-400 m-10 relative'>
          <Image
            src={dummyImage}
            alt='profile_picture'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='m-10'>
          <h3 className='text-3xl mb-10'>주현정</h3>
          <ul className=' space-y-6'>
            <IntroItem title='언어' desc='일어' />
            <IntroItem
              title='주요분야'
              desc='인문사회, 문학(소설/에세이),건강/취미실용'
            />
            <IntroItem
              title='스타일'
              desc='감성적이고 매끄러운 글, 건조하면서 간결한 글'
            />
            <IntroItem title='약력' desc={history} />
            <IntroItem
              title='역서'
              desc='나는 사랑받는 실험을 시작했다 번역 중'
            />
          </ul>
        </div>
      </div>
      <InterviewSection />
    </PageLayout>
  );
}

const interview = [
  {
    question:
      '자신의 번역관 및 작업할 때 가장 중요하게 생각하는 점을 말씀해주세요.',
    answer:
      '저자의 목소리가 온전히 독자에게 전해지는지 늘 세심하게 주의를 기울이며 마음을 다해 성실하게 번역하고자 노력합니다.',
  },
  {
    question:
      '자신의 번역관 및 작업할 때 가장 중요하게 생각하는 점을 말씀해주세요.',
    answer:
      '저자의 목소리가 온전히 독자에게 전해지는지 늘 세심하게 주의를 기울이며 마음을 다해 성실하게 번역하고자 노력합니다.',
  },
  {
    question:
      '자신의 번역관 및 작업할 때 가장 중요하게 생각하는 점을 말씀해주세요.',
    answer:
      '저자의 목소리가 온전히 독자에게 전해지는지 늘 세심하게 주의를 기울이며 마음을 다해 성실하게 번역하고자 노력합니다.',
  },
  {
    question:
      '자신의 번역관 및 작업할 때 가장 중요하게 생각하는 점을 말씀해주세요.',
    answer:
      '저자의 목소리가 온전히 독자에게 전해지는지 늘 세심하게 주의를 기울이며 마음을 다해 성실하게 번역하고자 노력합니다.',
  },
  {
    question:
      '자신의 번역관 및 작업할 때 가장 중요하게 생각하는 점을 말씀해주세요.',
    answer:
      '저자의 목소리가 온전히 독자에게 전해지는지 늘 세심하게 주의를 기울이며 마음을 다해 성실하게 번역하고자 노력합니다.',
  },
];

function InterviewSection() {
  return (
    <section className='bg-gray-100 px-10 py-10'>
      <h3 className='text-3xl text-slate-600 mb-10'>Interview</h3>
      <ul className=' space-y-4'>
        {interview.map(({ question, answer }) => (
          <InterviewItem question={question} answer={answer} />
        ))}
      </ul>
    </section>
  );
}

function InterviewItem({ question, answer }: any) {
  return (
    <li className='bg-white flex flex-col shadow px-10 py-8 text-lg gap-3'>
      <div className='font-semibold text-slate-700 flex items-center'>
        <p className='font-semibold text-blue-700 text-3xl mr-3'>Q</p>
        {question}
      </div>
      <div className='text-slate-600 flex items-center'>
        <p className='font-semibold text-slate-500 text-3xl mr-3'>A</p>
        {answer}
      </div>
    </li>
  );
}
