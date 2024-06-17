'use client';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import ScreenLoading from '@/components/ScreenLoading';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import useLocalToken from '@/app/hooks/useLocalToken';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

type Props = {};

export default function page({}: Props) {
  const [text, setText] = useState<string>('');

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const { token } = useLocalToken();
  const csrftoken = useCSRFToken();
  const queryClient = useQueryClient();
  const { mutateAsync: postNotice, isPending } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .post(`${BASE_URL}/notices/admin/`, payload, {
          headers: {
            Authorization: token,
            'X-CSRFToken': csrftoken,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      toast.success('등록에 성공했습니다.');
      queryClient.invalidateQueries({
        queryKey: ['adminNoticesList'],
      });
      router.push(`/admin/notice/${res.id}`);
    },
    onError: (error) => toast.error(error.message),
  });
  const onValid = async (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', text);
    if (data.file.length > 0) {
      formData.append('file', data.file[0]);
    }

    try {
      const response = await postNotice(formData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <ScreenLoading isLoading={isPending} />
      <h1 className='text-2xl my-10'>공지사항 등록</h1>
      <form
        action=''
        className='flex flex-col'
        onSubmit={handleSubmit(onValid)}>
        <ul className='space-y-2'>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>제목</h5>
            <input
              type='text'
              className='input input-bordered w-full'
              {...register('title')}
            />
          </li>

          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>파일첨부</h5>
            <input
              type='file'
              className='file-input file-input-bordered w-full max-w-xs'
              {...register('file')}
            />
          </li>
          <li className='flex items-center'>
            <h5 className='w-[200px] shrink-0'>내용</h5>
            {/* <textarea
              className='textarea textarea-bordered w-full min-h-[500px] '
              {...register('content')}
            /> */}
            <ReactQuill
              theme='snow'
              value={text}
              onChange={(text) => setText(text)}
              className='w-full h-[500px] mb-4'
            />
          </li>

          {/* <Editor /> */}
        </ul>

        <div className='space-x-3 self-end my-10'>
          <button className='btn btn-neutral'>등록하기</button>
          <Link href='/admin/notice' className='btn btn-outline'>
            목록
          </Link>
        </div>
      </form>
    </section>
  );
}

function Editor() {
  return null;
}
