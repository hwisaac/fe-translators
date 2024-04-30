import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import dummyImage from '@/utils/dummyImage';
import getImgUrl from '@/utils/getImgUrl';
import img from '@/utils/img';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

function IntroItem({ title, desc }: any) {
  if (typeof desc === 'string') {
    return (
      <li className='grid grid-cols-[100px_1fr]'>
        <div className='text-blue-500 font-semibold'>{title}</div>
        <div className=' whitespace-pre'>{desc}</div>
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
type TranslatorDetailDataType = {
  id: number;
  username: string;
  pen_name: string;
  name: string;
  is_public: boolean;
  birth_date: string;
  email: string;
  photo: null | string;
  gender: 'female' | 'male';
  major_works: string;
  biography: string;
  works: string;
  languages: string[];
  styles: string[];
  specializations: string[];
  interviews: {
    question: string;
    answer: string;
  }[];
};

export default async function page({ params }: Props) {
  const data: TranslatorDetailDataType = await fetch(
    `${BASE_URL}/users/${params.id}/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <PageLayout title='번역가 소개'>
      <Link href='/translators' className='btn btn-sm ml-10'>
        목록
      </Link>
      <div className='flex'>
        <div className='w-[200px] h-[250px] bg-slate-100 m-10 relative'>
          {getImgUrl(data.photo) === '' ? null : (
            <Image
              src={getImgUrl(data.photo)}
              alt='profile_picture'
              width={200}
              height={250}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <div className='m-10'>
          <h3 className='text-3xl mb-10'>
            {data.pen_name ? data.pen_name : data.name}
          </h3>
          <ul className=' space-y-6'>
            <IntroItem title='언어' desc={data.languages.join(', ')} />
            <IntroItem
              title='주요분야'
              desc={data.specializations.join(', ')}
            />
            <IntroItem title='스타일' desc={data.styles.join(', ')} />
            <IntroItem title='약력' desc={data.biography} />
            <IntroItem title='역서' desc={data.works} />
          </ul>
        </div>
      </div>
      <InterviewSection interviews={data.interviews} />
      <Link href='/translators' className='btn btn-sm my-10'>
        목록
      </Link>
    </PageLayout>
  );
}

function InterviewSection({ interviews }: { interviews: any[] }) {
  return (
    <section className='bg-gray-100 px-10 py-10'>
      <h3 className='text-3xl text-slate-600 mb-10'>Interview</h3>
      <div className=' space-y-4'>
        {interviews.map(({ question, answer }) => (
          <InterviewItem key={question} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
}

function InterviewItem({ question, answer }: any) {
  return (
    <div className='bg-white flex flex-col shadow px-10 py-8 text-lg gap-3'>
      <div className='font-semibold text-slate-700 flex items-center'>
        <p className='font-semibold text-blue-700 text-3xl mr-3'>Q</p>
        {question}
      </div>
      <div className='text-slate-600 flex items-center'>
        <p className='font-semibold text-slate-500 text-3xl mr-3'>A</p>
        {answer}
      </div>
    </div>
  );
}
