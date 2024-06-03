'use client';
import useToken from '@/app/hooks/useToken';
import StatusBadge from '@/components/StatusBadge';

import LanguageBadge from '@/components/member/tasks/LanguageBadge';
import BASE_URL from '@/utils/BASE_URL';
import formatDate from '@/utils/formatDate';
import formatDateTime from '@/utils/formatDateTime';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import AdminComments, {
  CommentType,
} from '@/components/admin/tasks/AdminComments';
import { formatLink } from '@/utils/formatLink';
import { toast } from 'react-toastify';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import ScreenLoading from '@/components/ScreenLoading';

type Props = {
  params: {
    task_id: any;
  };
};

export type TaskDetail = {
  id: number;
  title: string;
  string: string;
  author: string;
  created_at: string;
  updated_at: string;
  content: string;
  comments: CommentType[];
  language: 'jp' | 'en';
  link: string;
  link2: string;
  link3: string;
  status: 'closed' | 'completed' | 'open' | 'testing';
  comment_start_time: string;
};

function formatTextField(text?: string | null): any {
  if (!text) return <p></p>;
  return text
    .split('\n')
    .map((line: string, index: number) => <p key={index}>{line}</p>);
}

export default function page({}: Props) {
  const { task_id } = useParams();
  const token = useToken();

  const { data } = useQuery({
    queryKey: ['adminTaskDetail', task_id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/tasks/admin/${task_id}/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data as TaskDetail)
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            toast.error('권한이 없습니다.');
          }
        }),
    staleTime: 1000 * 60,
  });

  return (
    <div className='flex flex-col py-10'>
      <div className='self-end space-x-2'>
        <Link href='/admin/tasks' className='btn'>
          목록
        </Link>
        <Link href={`/admin/tasks/${task_id}/edit`} className='btn'>
          수정하기
        </Link>
        <button
          className='btn'
          onClick={() =>
            // @ts-ignore
            document.getElementById('choose_directly').showModal()
          }>
          번역가 직접 지정
        </button>
        <ChooseDirectlyModal
          modal_id={`choose_directly`}
          task_id={task_id as string}
        />
        <Link href='/admin/tasks/write' className='btn btn-neutral'>
          글쓰기
        </Link>
      </div>
      <div className='flex justify-between items-center  px-4 py-2'>
        <h2 className='text-semibold text-2xl flex items-center gap-3'>
          {data?.title} <LanguageBadge language={data?.language} />
        </h2>
        <p className='text-slate-500'>
          생성: {formatDateTime(data?.created_at)}
        </p>
      </div>
      <div className='flex gap-3 px-3 py-3 items-center'>
        <StatusBadge status={data?.status} />

        <span className='text-orange-700 rounded-md bg-orange-50 px-2 py-1 text-xs lg:text-md'>
          {formatDateTime(data?.comment_start_time)}
        </span>
      </div>
      <div className='flex gap-2'>
        {data?.link && (
          <Link
            href={formatLink(data.link)}
            target='_blank'
            className='btn btn-sm'>
            도서 정보
          </Link>
        )}
        {data?.link2 && (
          <Link
            href={formatLink(data.link2)}
            target='_blank'
            className='btn btn-sm'>
            도서 정보2
          </Link>
        )}
        {data?.link3 && (
          <Link
            href={formatLink(data.link3)}
            target='_blank'
            className='btn btn-sm'>
            도서 정보3
          </Link>
        )}
      </div>
      <div className='bg-stone-50 rounded-md shadow-md px-2 lg:px-8 py-10 font-thin whitespace-pre-wrap'>
        {data?.content}
      </div>
      <AdminComments comments={data?.comments} />
      <Link href='/admin/tasks' className='btn'>
        목록
      </Link>
    </div>
  );
}

interface ChooseDirectlyModalProps {
  modal_id: string;
  task_id: string;
}
function ChooseDirectlyModal({ modal_id, task_id }: ChooseDirectlyModalProps) {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const csrftoken = useCSRFToken();
  const token = useToken();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const {
    mutateAsync: findUser,
    data,
    isPending: findingUser,
  } = useMutation({
    mutationFn: () =>
      axios
        .get(`${BASE_URL}/users/search?name=${name}&/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
  });
  const { mutateAsync: assignTranslator, isPending: assigningTranslator } =
    useMutation({
      mutationFn: ({ task_id, user_id }: any) => {
        return axios.post(
          `${BASE_URL}/tasks/${task_id}/assign-translator/${user_id}/`,
          {},
          {
            headers: {
              Authorization: token,
              'X-CSRFToken': csrftoken,
            },
          }
        );
      },
      onSuccess: () => {
        toast.success('담당번역가가 선정되었습니다.');
        // @ts-ignore
        window.document.getElementById('choose_directly')?.close();
        queryClient.invalidateQueries({
          queryKey: ['adminTaskDetail'],
        });
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 406) {
          toast.error('이미 신청했습니다.');
          // @ts-ignore
          window.document.getElementById('choose_directly')?.close();
          return;
        }
        toast.error(error.message);
        // @ts-ignore
        window.document.getElementById('choose_directly')?.close();
      },
    });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await findUser();
    setName('');
  };

  const handleConfirm = () => {

    assignTranslator({ task_id, user_id: watch('user_id') });
  };
  return (
    <dialog id={modal_id} className='modal'>
      <ScreenLoading isLoading={findingUser || assigningTranslator} />
      <div className='modal-box'>
        <h3 className='font-bold text-lg mb-3'>번역가 직접 지정</h3>
        <form className='join' onSubmit={handleSubmit}>
          <input
            className='join-item input input-bordered'
            placeholder='이름 검색'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <button className='join-item btn'>검색</button>
        </form>
        <div className='flex flex-col'>
          {data?.map(
            ({ id, name, birth_date, email, phone, username }: any) => {
              return (
                <label className='label cursor-pointer' key={id}>
                  <span className='label-text'>
                    {username}({name})
                  </span>
                  <span className='label-text'>{email}</span>
                  <span className='label-text'>{phone} </span>
                  <span className='label-text'>{birth_date} </span>
                  <input
                    type='radio'
                    className='radio checked:bg-blue-500'
                    value={id}
                    {...register('user_id')}
                  />
                </label>
              );
            }
          )}
        </div>
        <form method='dialog' className='flex gap-2 my-3 items-end'>
          <button className='btn btn-outline'>취소</button>
          <div className='btn btn-neutral' onClick={handleConfirm}>
            번역가로 지정
          </div>
        </form>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}