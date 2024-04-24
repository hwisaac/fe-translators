'use client';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type Props = {};
type NameType = {
  id: string;
  name: string;
};

type CheckBoxesType = {
  specializations: NameType[];
  styles: NameType[];
  languages: NameType[];
};
type InterviewQuestionType = {
  id: number;
  question: string;
  description: string;
};
export default function page({}: Props) {
  const { isPending } = useMutation({
    mutationFn: () => axios.get('/'),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const { data } = useQuery({
    queryKey: ['check-boxes'],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/check-boxes/`)
        .then((res) => res.data as CheckBoxesType),
    staleTime: 999999,
    gcTime: 999999,
  });

  const { data: interviewQuestions } = useQuery({
    queryKey: ['interview-questions'],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/interview-questions/`)
        .then((res) => res.data as InterviewQuestionType[]),
    staleTime: 999999,
    gcTime: 999999,
  });

  const onValid = (data: any) => {};
  return (
    <PageLayout title='추가정보 입력'>
      <form className='space-y-5 w-[600px]' onSubmit={handleSubmit(onValid)}>
        <h2 className='text-2xl my-4'>추가 정보</h2>
        <div className='flex items-center '>
          <div className='w-[150px] text-sm'>필명</div>
          <input
            type='text'
            placeholder='필명'
            className='input input-bordered w-full'
            {...register('pen_name')}
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>사진 등록</div>
          <input
            type='password'
            placeholder='********'
            className='input input-bordered w-full'
            {...register('photo')}
          />
        </div>

        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>언어</div>

          <div className='form-control flex '>
            {data?.languages?.map((language: NameType, index: number) => (
              <label className='label cursor-pointer' key={`language-${index}`}>
                <span className='label-text mr-3 text-slate-500'>
                  {language.name}
                </span>
                <input
                  type='checkbox'
                  className='checkbox checkbox-warning'
                  {...register(language.name)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>주요 분야</div>

          <div className='form-control flex '>
            {data?.specializations?.map(
              (specialization: NameType, index: number) => (
                <label
                  className='label cursor-pointer'
                  key={`specialization-${index}`}>
                  <span className='label-text mr-3 text-slate-500'>
                    {specialization.name}
                  </span>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-accent'
                    {...register(specialization.name)}
                  />
                </label>
              )
            )}
          </div>
        </div>

        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>글 스타일</div>

          <div className='form-control flex '>
            {data?.styles?.map((style: NameType, index: number) => (
              <label className='label cursor-pointer' key={`style-${index}`}>
                <span className='label-text mr-3 text-slate-500'>
                  {style.name}
                </span>
                <input
                  type='checkbox'
                  className='checkbox checkbox-success'
                  {...register(style.name)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>주요역서</div>

          <div className='form-control w-full'>
            <label className='form-control'>
              <div className='label'>
                <span className='label-text-alt'>1~3 작품 제목만</span>
              </div>
              <textarea
                className='textarea textarea-bordered h-24 w-full'
                placeholder='주요역서'
              />
            </label>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>약력</div>
          <div className='form-control w-full'>
            <label className='form-control'>
              <textarea
                className='textarea textarea-bordered h-24 w-full'
                placeholder='약력'
              />
            </label>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>역서</div>
          <div className='form-control w-full'>
            <label className='form-control'>
              <textarea
                className='textarea textarea-bordered h-24 w-full'
                placeholder='역서'
              />
            </label>
          </div>
        </div>

        <div>
          <h2 className='text-2xl my-4'>인터뷰</h2>
          <div className='w-full flex flex-col gap-10'>
            {interviewQuestions?.map(({ question, description, id }, index) => (
              <div key={`question-${id}`} className='flex flex-col'>
                <h4 className=''>{`${String(index + 1).padStart(
                  2,
                  '0'
                )}. ${question}`}</h4>
                <p className='text-sm text-slate-500 mb-4'>{description}</p>
                <input
                  type='textarea'
                  className='textarea textarea-bordered textarea-lg w-full'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>자기 PR 공개</div>

          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text mr-3 text-slate-500'>
                이 페이지에서 작성된 정보를 웹사이트에 게시합니다
              </span>
              <input
                type='checkbox'
                className='checkbox'
                {...register('is_allowed')}
              />
            </label>
          </div>
        </div>
        <button className='btn btn-neutral btn-wide relative top-5'>
          {isPending ? (
            <span className='loading loading-spinner loading-xs' />
          ) : (
            `저장`
          )}
        </button>
      </form>
    </PageLayout>
  );
}
