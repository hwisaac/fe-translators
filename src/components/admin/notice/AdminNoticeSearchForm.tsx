'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {};

export default function AdminNoticeSearchForm({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({});

  const onValid = (data: any) => {
    const query = data.query;
    const option = data.option;
    router.push(`/admin/notice?page=1&query=${query}&option=${option}`);
  };
  return (
    <form className='join mx-auto' onSubmit={handleSubmit(onValid)}>
      <div>
        <div>
          <input
            className='input input-bordered join-item lg:w-[400px]'
            placeholder='Search'
            {...register('query')}
          />
        </div>
      </div>
      <select
        className='select select-bordered join-item'
        {...register('option')}>
        <option value={'title'}>제목</option>
        <option value={'content'}>내용</option>
      </select>
      <div className='indicator'>
        <button className='btn join-item'>검색</button>
      </div>
    </form>
  );
}
