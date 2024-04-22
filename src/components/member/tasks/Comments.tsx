'use client';

import BASE_URL from '@/utils/BASE_URL';
import formatDateTime from '@/utils/formatDateTime';
import formatDateTimeWithMilliseconds from '@/utils/formatDateTimeWithMilliseconds';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { IoMdReturnRight } from 'react-icons/io';

export type CommentType = {
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  name: string;
  id: string;
  status: CommentStatusType;
  replies: ReplyType[];
};
export type ReplyType = {
  reply_id: number;
  name: string;
  comment_id: number;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
};
type CommentStatusType =
  | 'available'
  | 'applying'
  | 'sample_translator'
  | 'assigned_translator'
  | 'assigned_to_other'
  | 'completed';
type Props = {
  comments?: CommentType[];
};

export default function Comments({ comments }: Props) {
  const [inputComment, setInputComment] = useState('');
  const { mutate } = useMutation({
    mutationKey: ['add comment'],
    mutationFn: () => axios.post(`${BASE_URL}`),
  });
  if (!comments) return null;

  const addComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('입력!', inputComment);
    setInputComment('');
  };

  return (
    <>
      <form className='join flex my-10' onSubmit={(event) => addComment(event)}>
        <input
          value={inputComment}
          onChange={(e) => setInputComment(e.currentTarget.value)}
          type='text'
          name='newComment'
          className='join-item input input-bordered w-full'
        />
        <button className='join-item btn btn-neutral'>댓글 달기</button>
      </form>
      <ul className='flex flex-col w-full py-4'>
        {comments?.map((comment) => (
          <CommentItem comment={comment} key={`${comment.id}-comment`} />
        ))}
      </ul>
    </>
  );
}

function CommentItem({ comment }: { comment: CommentType }) {
  if (!comment) return null;
  return (
    <li className='flex flex-col w-full'>
      <p className='badge badge-neutral'>샘플번역가</p>
      <div className='flex justify-between'>
        <span className='text-slate-800 font-semibold'>{`${comment.name}(${comment.author})`}</span>
        <span className='text-slate-700'>
          {formatDateTimeWithMilliseconds(comment.created_at)}
        </span>
      </div>
      <p className='rounded-md shadow-md px-4 py-4 my-3 bg-slate-50'>
        {comment.content}
      </p>
      <div className='space-x-2 my-2'>
        <button className='btn btn-outline btn-sm'>답변</button>
        <button className='btn btn-outline btn-sm'>수정</button>
        <button className='btn btn-outline btn-sm'>삭제</button>
      </div>
      <Replies replies={comment.replies} />
    </li>
  );
}

const Replies = ({ replies }: { replies: ReplyType[] }) => {
  return (
    <ul className='w-[95%] self-end relative flex flex-col gap-3'>
      {replies.map((reply) => (
        <ReplyItem reply={reply} key={`${reply?.reply_id}-reply`} />
      ))}
    </ul>
  );
};

const ReplyItem = ({ reply }: { reply: ReplyType }) => {
  return (
    <li className='rounded-md p-3 flex flex-col'>
      <div className='flex justify-between'>
        <span className='flex items-center gap-3'>
          <IoMdReturnRight className='text-slate-400' />
          {`${reply.name}(${reply.author})`}
        </span>
        <span>{formatDateTime(reply.created_at)}</span>
      </div>
      <div className='w-full rounded-md shadow-md px-4 py-4 my-3 bg-slate-50'>
        {reply.content}
      </div>
    </li>
  );
};

const CommentStatusBadge = ({ status }: { status: CommentStatusType }) => {
  return null;
};
