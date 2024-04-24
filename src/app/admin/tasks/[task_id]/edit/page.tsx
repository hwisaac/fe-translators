'use client';

import { TaskDetail } from '@/app/admin/tasks/[task_id]/page';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const { task_id } = useParams();

  const token = useToken();
  const { data, isSuccess } = useQuery({
    queryKey: ['taskDetail', task_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/${task_id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          return res.data as TaskDetail;
        }),
    staleTime: 30,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (isSuccess) {
      setValue('status', data?.status);
      setValue('title', data?.title);
      setValue('language', data?.language);
      setValue('link', data?.link);
      setValue('content', data?.content);
    }
  }, [data, isSuccess, setValue]);

  const { mutateAsync: putTask } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .put(
          `${BASE_URL}/tasks/${task_id}/`,
          { ...payload },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data),
    onSuccess: (res) => {
      toast.success('수정되었습니다.');
      router.push(`/admin/tasks/${res.id}`);
    },
    onError: (error) => toast.error(error.message),
  });
  const onValid = (data: any) => {
    console.log(data);
    putTask(data);
  };
  return (
    <section>
      <h1 className='text-2xl my-10'>수정하기</h1>
      <form
        action=''
        className='flex flex-col'
        onSubmit={handleSubmit(onValid)}>
        <ul className='space-y-2'>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>진행상태</h5>
            <select
              className='select select-bordered w-full max-w-xs'
              {...register('status')}>
              <option value={'open'}>모집 중</option>
              <option value={'testing'}>모집 중단 - 샘플심사중</option>
              <option value={'closed'}>마감 - 작업중단</option>
              <option value={'completed'}>마감 - 번역가 선정완료</option>
            </select>
          </li>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>도서 제목</h5>
            <input
              type='text'
              className='input input-bordered w-full'
              {...register('title')}
            />
          </li>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>언어</h5>
            <select
              className='select select-bordered w-full max-w-xs'
              {...register('language')}>
              <option value='en'>영어</option>
              <option value='jp'>일본어</option>
            </select>
          </li>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>아마존 링크</h5>
            <input
              type='text'
              className='input input-bordered w-full'
              placeholder='https:// 를 반드시 입력해주세요'
              {...register('link')}
            />
          </li>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>의뢰 내용</h5>
            <textarea
              className='textarea textarea-bordered w-full min-h-[500px] '
              {...register('content')}
            />
          </li>
        </ul>
        <div className='space-x-3 self-end my-10'>
          <button className='btn btn-neutral'>수정하기</button>
          <Link href='/admin/tasks' className='btn btn-outline'>
            목록
          </Link>
        </div>
      </form>
    </section>
  );
}