'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
type Props = {};

export default function NewBooksSearchForm({}: Props) {
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

    router.push(`/new-books?page=1&query=${query}&option=${option}`);
  };

  return (
    <div className='flex items-center mt-10'>
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
          <option value={'translator'}>번역가</option>
          <option value={'title'}>제목</option>
          <option value={'description'}>내용</option>
          <option value={'publisher'}>출판사</option>
          <option value={'author'}>저자</option>
        </select>
        <div className='indicator'>
          <button className='btn btn-sm btn-neutral lg:btn-md join-item'>
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
}
