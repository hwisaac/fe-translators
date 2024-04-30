'use client';

import { revalidateTaskDetail } from '@/app/admin/tasks/[task_id]/edit/actions';
import useToken from '@/app/hooks/useToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {};

const hoursArr = Array.from({ length: 24 }, (_, i) => i);
const minutesArr = Array.from({ length: 12 }, (_, i) => i * 5);

export default function page({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      hour: `${new Date().getHours()}`,
    },
  });
  const token = useToken();

  const { mutateAsync: postTask } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .post(
          `${BASE_URL}/tasks/`,
          { ...payload },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => res.data),
    onSuccess: (res) => {
      toast.success('등록에 성공했습니다.');
      revalidateTaskDetail(res.id);
      router.push(`/admin/tasks/${res.id}`);
    },
    onError: (error) => toast.error(error.message),
  });
  const onValid = (data: any) => {
    const date = data.date;
    const hour = data.hour;
    const minute = data.minute;

    const dateTime = new Date(
      `${date}T${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`
    );
    postTask({ ...data, comment_start_time: dateTime.toISOString() });
  };
  return (
    <section>
      <h1 className='text-2xl my-10'>글쓰기</h1>
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
          <li className='flex items-center gap-2'>
            <h5 className='w-[200px] shrink-0'>신청시작 시각</h5>

            <input
              type='text'
              className='input input-bordered w-[200px]'
              placeholder='YYYY-MM-DD'
              {...register('date')}
            />
            <select
              className='select select-bordered w-[100px]'
              {...register('hour')}>
              {hoursArr.map((hour) => (
                <option value={hour}>{hour} 시</option>
              ))}
            </select>
            <select
              className='select select-bordered w-[100px]'
              {...register('minute')}>
              {minutesArr.map((minute) => (
                <option value={minute}>{minute} 분</option>
              ))}
            </select>
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
          <button className='btn btn-neutral'>등록하기</button>
          <Link href='/admin/tasks' className='btn btn-outline'>
            목록
          </Link>
        </div>
      </form>
    </section>
  );
}
