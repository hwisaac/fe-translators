'use client';

import { revalidateTaskDetail } from '@/app/admin/tasks/[task_id]/edit/actions';
import { CommentType } from '@/components/admin/tasks/AdminComments';
import TranslatorTagDialog from '@/components/admin/tasks/TranslatorTagDialog';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';

type Props = {
  comment?: CommentType;
};

export default function TranslatorBadgeBtn({ comment }: Props) {
  if (!comment) return null;
  const author = comment.author;
  const queryClient = useQueryClient();
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text}가 복사되었습니다.`);
      })
      .catch((err) => {
        console.error('클립보드 복사에 실패했습니다.', err);
      });
  };

  const { mutateAsync: changeStatus } = useMutation({
    mutationFn: (payload: any) =>
      axios
        .put(`${BASE_URL}/comments/${comment.id}/status/`, payload)
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success('성공');
      queryClient.invalidateQueries({
        queryKey: ['adminTaskDetail'],
      });
      revalidateTaskDetail();
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
  const STATUS = {
    applying: 'applying',
    sampleTranslator: 'sample_translator',
    assignedTranslator: 'assigned_translator',
    assignedToOther: 'assigned_to_other',
    completed: 'completed',
  };
  const chooseApplying = () => {
    changeStatus({
      status: STATUS.applying,
    });
  };
  const chooseSampleTranslator = () => {
    changeStatus({
      status: STATUS.sampleTranslator,
    });
  };
  const chooseAssignedTranslator = () => {
    changeStatus({
      status: STATUS.assignedTranslator,
    });
  };
  return (
    <div className='dropdown'>
      <div className='flex items-center'>
        <div
          tabIndex={0}
          role='button'
          className={`btn btn-sm btn-ghost ${
            author.gender === 'male' ? 'text-blue-800' : 'text-pink-700'
          }`}>{`${author.username}(${author.name})`}</div>
        <ul className='flex gap-1'>
          {author?.tags?.map((tags, index) => (
            <li
              key={`${index}${author.name}${comment.id}-tag`}
              className='text-sm rounded-full px-2 py-1 border'>
              # {tags.name}
            </li>
          ))}
        </ul>
      </div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-[300px]'>
        <li onClick={chooseApplying}>
          <span>1. 지원자로 지정</span>
        </li>
        <li onClick={chooseSampleTranslator}>
          <span>2. 샘플 번역가 지정</span>
        </li>
        <li onClick={chooseAssignedTranslator}>
          <span>3. 담당 번역가 지정</span>
        </li>
        {author.email && (
          <li onClick={() => handleCopy(author.email)}>
            <span>{author.email}</span>
          </li>
        )}
        {author.phone && (
          <li onClick={() => handleCopy(author.phone)}>
            <span>{author.phone}</span>
          </li>
        )}
        {author.languages.length > 0 && (
          <li>
            <span>
              {author.languages.map(({ name }: any) => name).join(' / ')}
            </span>
          </li>
        )}
        <li>
          <Link href={`/admin/translator/${author.id}`}>상세 정보</Link>
        </li>
        <li
          onClick={() =>
            // @ts-ignore
            document.getElementById(`modal_${comment.id}`).showModal()
          }>
          <span>태그</span>
        </li>
      </ul>
      <TranslatorTagDialog
        author={comment.author}
        modalId={`modal_${comment.id}`}
      />
    </div>
  );
}
