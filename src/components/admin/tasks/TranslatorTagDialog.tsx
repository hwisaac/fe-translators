'use client';
import {
  AuthorType,
  CommentType,
} from '@/components/admin/tasks/AdminComments';
import BASE_URL from '@/utils/BASE_URL';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TiDelete } from 'react-icons/ti';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import ScreenLoading from '@/components/ScreenLoading';

type Props = {
  author?: AuthorType;
  modalId: string;
};
type ResponseType = {
  has: boolean;
  name: string;
  id: number;
}[];
export default function TranslatorTagDialog({ author, modalId }: Props) {
  const csrftoken = useCSRFToken();
  if (!author || !modalId) return null;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();
  const queryClient = useQueryClient();
  const [tagToAdd, setTagToAdd] = useState('');
  const closeModal = () => {
    // @ts-ignore
    document.getElementById(modalId).close();
  };

  const { data, refetch } = useQuery({
    queryKey: ['tags', author.id],
    queryFn: () =>
      axios
        .get(`${BASE_URL}/users/${author.id}/tags/`)
        .then((res) => res.data as ResponseType),
    staleTime: 0,
  });
  // 데이터가 로드되면 각 태그의 체크박스 상태를 설정합니다.
  useEffect(() => {
    if (data) {
      data.forEach((tag) => {
        setValue(`${tag.id}`, tag.has);
      });
    }
  }, [data, setValue]);

  const { mutateAsync: saveTags, isPending: savingTags } = useMutation({
    mutationFn: (payload: number[]) =>
      axios
        .put(`${BASE_URL}/users/${author.id}/tags/`, payload, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success('저장되었습니다');

      closeModal();
      queryClient.invalidateQueries({
        queryKey: ['adminTaskDetail'],
      });
    },
  });
  const { mutateAsync: addTag, isPending: addingTag } = useMutation({
    mutationFn: (payload: any) =>
      axios.post(`${BASE_URL}/users/${author.id}/tags/`, payload, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      }),
    onSuccess: (data) => {
      toast.success('추가됨');
      queryClient.invalidateQueries({
        queryKey: ['tags'],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminTaskDetail'],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setTagToAdd('');
    },
  });

  const { mutateAsync: deleteTag, isPending: deletingTag } = useMutation({
    mutationFn: (id: any) =>
      axios
        .delete(`${BASE_URL}/tags/${id}/`, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['tags'],
      });
      queryClient.invalidateQueries({
        queryKey: ['adminTaskDetail'],
      });
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
  const onValid = () => {
    const checkedTags = Object.keys(watch())
      .filter((key) => watch(key))
      .map(Number);

    saveTags(checkedTags);
  };
  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTag({
      tag_name: tagToAdd,
    });
  };
  const deleteTagItem = (id: number) => {
    deleteTag(id);
  };
  return (
    <dialog id={modalId} className='modal'>
      <ScreenLoading isLoading={deletingTag || addingTag || savingTags} />
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>
          {author.username}({author.name})
        </h3>
        <div className='py-4'>
          {data?.map(({ name, id }) => (
            <div className='flex items-center justify-between' key={name}>
              <label className='label cursor-pointer w-full'>
                <span className='label-text mr-3 text-slate-500'>{name}</span>
                <input
                  type='checkbox'
                  className='checkbox'
                  {...register(`${id}`)}
                />
              </label>
              <div
                className='shrink-0 btn btn-sm btn-ghost'
                onClick={() => deleteTagItem(id)}>
                <TiDelete size={22} />
              </div>
            </div>
          ))}
        </div>
        <div className='modal-action'>
          <form className='join' onSubmit={handleAddTag}>
            <input
              type='text'
              value={tagToAdd}
              onChange={(e) => setTagToAdd(e.currentTarget.value)}
              placeholder='태그'
              className='join-item input input-bordered'
            />
            <button className='join-item btn'>추가</button>
          </form>
          <form
            method='dialog'
            className='flex items-center gap-2'
            onSubmit={handleSubmit(onValid)}>
            <button className='btn'>저장</button>
          </form>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>닫기</button>
      </form>
    </dialog>
  );
}
