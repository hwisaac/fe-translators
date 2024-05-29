'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type Props = {};

export default function MemberNoticeSearchForm({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({});

  const onValid = (data: any) => {
    console.log(data);
    const query = data.query;
    const option = data.option;
    router.push(`/member/notice?page=1&query=${query}&option=${option}`);
  };
  return (
    <form className='join mx-auto' onSubmit={handleSubmit(onValid)}>
      <div>
        <div>
          <input
            className='input input-sm lg:input-md input-bordered join-item w-full sm:w-[350px]'
            placeholder='Search'
            {...register('query')}
          />
        </div>
      </div>
      <select
        className='select select-sm lg:select-md select-bordered join-item'
        {...register('option')}>
        <option value={'title'}>제목</option>
        <option value='content'>내용</option>
      </select>
      <div className='indicator'>
        <button className='btn btn-sm lg:btn-md join-item'>검색하기</button>
      </div>
    </form>
  );
}
