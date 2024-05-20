'use client';
import useToken from '@/app/hooks/useToken';
import InterviewSection from '@/components/translators/InterviewSection';
import IntroItem from '@/components/translators/IntroItem';
import TranslatorDetailWithoutToken from '@/components/translators/TranslatorDetailWithoutToken';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import getImgUrl from '@/utils/getImgUrl';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    id: string;
  };
};

export type TranslatorDetailDataType = {
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

export default function page({ params }: Props) {
  const token = useToken();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ['translatorDetail', params.id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/${params.id}/`)
        .then((res) => res.data as TranslatorDetailDataType),
  });
  if (!token || !isClient) return <TranslatorDetailWithoutToken />;

  return (
    <PageLayout title='번역가 소개'>
      <Link href='/translators' className='btn btn-wide btn-sm mx-auto'>
        목록
      </Link>
      <div className='flex flex-col lg:flex-row'>
        <div className='w-[200px] h-[250px] bg-slate-100 m-10 relative'>
          {getImgUrl(data?.photo) === '' ? null : (
            <Image
              src={getImgUrl(data?.photo)}
              alt='profile_picture'
              width={200}
              height={250}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <div className='m-10'>
          <h3 className='text-3xl mb-10'>
            {data?.pen_name ? data?.pen_name : data?.name}
          </h3>
          <ul className=' space-y-6'>
            <IntroItem title='언어' desc={data?.languages.join(', ')} />
            <IntroItem
              title='주요분야'
              desc={data?.specializations.join(', ')}
            />
            <IntroItem title='스타일' desc={data?.styles.join(', ')} />
            <IntroItem title='약력' desc={data?.biography} />
            <IntroItem title='역서' desc={data?.works} />
          </ul>
        </div>
      </div>
      <InterviewSection interviews={data?.interviews} />
      <Link href='/translators' className='btn btn-sm my-10 btn-wide mx-auto'>
        목록
      </Link>
    </PageLayout>
  );
}
