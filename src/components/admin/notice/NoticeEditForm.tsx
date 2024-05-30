'use client';
import { revalidateNoticeDetail } from '@/app/admin/notice/write/revalidateNoticeDetail';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import useToken from '@/app/hooks/useToken';
import ScreenLoading from '@/components/ScreenLoading';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import { formatTextField } from '@/utils/formatTextField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  data: any;
  notice_id: number | string;
};

export default function NoticeEditForm({ data, notice_id }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deleteFile, setDeleteFile] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      content: data.notice.content,
      title: data.notice.title,
    },
  });
  const token = useToken();
  const csrftoken = useCSRFToken();
  const { mutateAsync: postNotice, isPending } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .put(`${BASE_URL}/notices/admin/${notice_id}/`, payload, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      toast.success('수정에 성공했습니다.');
      revalidateNoticeDetail(res.id);
      queryClient.invalidateQueries({
        queryKey: ['adminNotice', res.id],
      });
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
    formData.append('content', data.content);
    if (data?.file?.length > 0) {
      formData.append('file', data.file[0]);
    }
    formData.append('delete_file', `${deleteFile}`);

    try {
      const response = await postNotice(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action='' className='flex flex-col' onSubmit={handleSubmit(onValid)}>
      <ScreenLoading isLoading={isPending} />
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
          {data.notice.file && (
            <div
              className='btn ml-2'
              onClick={() => setDeleteFile((pre) => !pre)}>
              {!deleteFile ? `파일 삭제` : '파일 삭제 취소'}
            </div>
          )}
        </li>
        <li className='flex items-center'>
          <h5 className='w-[200px] shrink-0'>내용</h5>
          <textarea
            className='textarea textarea-bordered w-full min-h-[500px] '
            {...register('content')}
          />
        </li>
      </ul>
      <div className='space-x-3 self-end my-10'>
        <button className='btn btn-neutral'>수정하기</button>
        <Link href='/admin/notice' className='btn btn-outline'>
          목록
        </Link>
      </div>
    </form>
  );
}
