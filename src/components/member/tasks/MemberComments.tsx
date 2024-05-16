'use client';

import { revalidateTaskDetail } from '@/app/admin/tasks/[task_id]/edit/actions';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import useLoginData from '@/app/hooks/useLoginData';
import useToken from '@/app/hooks/useToken';
import { CommentType } from '@/components/admin/tasks/AdminComments';
import BASE_URL from '@/utils/BASE_URL';
import { COMMENT_LIMIT } from '@/utils/commons';
import formatDateTime from '@/utils/formatDateTime';
import formatDateTimeWithMilliseconds from '@/utils/formatDateTimeWithMilliseconds';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { headers } from 'next/headers';
import { useParams } from 'next/navigation';
import { FormEvent, LegacyRef, useEffect, useRef, useState } from 'react';
import { IoMdReturnRight } from 'react-icons/io';
import { toast } from 'react-toastify';

export type ReplyType = {
  reply_id: number;
  name: string;
  comment_id: number;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  author_is_staff: boolean;
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
  status?: 'open' | 'closed' | 'testing' | 'completed';
  comment_start_time?: string;
};

export default function MemberComments({
  comments,
  status,
  comment_start_time,
}: Props) {
  const { task_id } = useParams();
  const token = useToken();
  const csrftoken = useCSRFToken();
  const queryClient = useQueryClient();
  const [inputComment, setInputComment] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { mutate: postComment } = useMutation({
    mutationKey: ['add comment', task_id],
    mutationFn: (payload: any) =>
      axios.post(
        `${BASE_URL}/tasks/${task_id}/comments/`,
        { ...payload },
        {
          headers: {
            Authorization: token,
            'X-CSRFToken': csrftoken,
          },
        }
      ),
    onSuccess: () => {
      toast.success('신청되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['taskDetail', task_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-available-tasks', token],
      });
    },
    onError: (err: AxiosError) => {
      // @ts-ignore
      toast.error((err?.response?.data.error as string) || '');
    },
  });

  const addComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    if (inputComment.length < COMMENT_LIMIT) {
      return toast.error(`${COMMENT_LIMIT}자 이상 입력해주세요`);
    }
    if (!comment_start_time) {
      return toast.error('(Bug)신청 시각 시간데이터가 없습니다.');
    }

    const now = new Date();
    const commentStartTime = new Date(comment_start_time ?? '');

    if (now > commentStartTime) {
      postComment({
        content: inputComment,
      });
      revalidateTaskDetail(String(task_id));
      setInputComment('');
    } else {
      toast.error('신청할 수 있는 시간이 아닙니다.');
    }
  };

  return (
    <>
      <form
        className={`join flex my-10 ${status === 'open' ? '' : 'hidden'}`}
        onSubmit={(event) => addComment(event)}>
        <input
          value={inputComment}
          onChange={(e) => setInputComment(e.currentTarget.value)}
          type='text'
          name='newComment'
          className='join-item input input-bordered w-full'
        />
        <button className='join-item btn btn-neutral' disabled={disabled}>
          신청하기
        </button>
      </form>
      <ul className='flex flex-col w-full py-4'>
        {comments?.map((comment) => (
          <CommentItem
            comment={comment}
            status={status}
            key={`${comment.id}-comment`}
          />
        ))}
      </ul>
    </>
  );
}

function CommentItem({
  comment,
  status,
}: {
  comment: CommentType;
  status: 'open' | 'testing' | 'closed' | 'completed' | undefined;
}) {
  const commentRef = useRef(null);
  const [openReply, setOpenReply] = useState(false);
  const [editable, setEditable] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.content);
  const { task_id } = useParams();
  const queryClient = useQueryClient();
  const token = useToken();
  const csrftoken = useCSRFToken();
  const [reply, setReply] = useState('');
  const { mutateAsync: addReply } = useMutation({
    mutationKey: ['addReply', comment.id],
    mutationFn: (payload: any) =>
      axios.post(
        `${BASE_URL}/comments/${comment.id}/reply/`,
        { ...payload },
        {
          headers: {
            Authorization: token,
            'X-CSRFToken': csrftoken,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskDetail', task_id],
      });
      toast.success('대댓글이 작성되었습니다.');
      revalidateTaskDetail(task_id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutateAsync: editComment } = useMutation({
    mutationKey: ['editComment', comment.id],
    mutationFn: (payload: any) =>
      axios.put(
        `${BASE_URL}/comments/${comment.id}/`,
        { ...payload },
        {
          headers: {
            Authorization: token,
            'X-CSRFToken': csrftoken,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskDetail', task_id],
      });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: deleteComment } = useMutation({
    mutationKey: ['delete', comment.id],
    mutationFn: () =>
      axios.delete(`${BASE_URL}/comments/${comment.id}/`, {
        headers: {
          Authorization: token,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskDetail', task_id],
      });
      toast.success('댓글이 삭제 되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addReply({ content: reply });
    setOpenReply(false);
    setReply('');
  };
  const onEdit = () => {
    setEditable(true);
  };

  useEffect(() => {
    if (editable && commentRef.current) {
      // @ts-ignore
      commentRef.current.focus();
    }
  }, [editable, commentRef.current]);
  const handleEditConfirm = (e: any) => {
    e.preventDefault();
    if (commentInput.length < COMMENT_LIMIT) {
      toast.error(`댓글은 ${COMMENT_LIMIT}자 이내로 수정 할 수 없습니다.`);
      return;
    }
    setEditable(false);
    editComment({ content: commentInput });
  };
  const handleDeleteComment = () => {
    if (comment.replies.length > 0) {
      toast.error('대댓글이 달린 댓글은 삭제할 수 없습니다.');
      return;
    }
    deleteComment();
  };
  return (
    <li className='flex flex-col w-full'>
      {/* <p className='badge badge-neutral'>샘플번역가</p> */}
      <CommentStatusBadge status={comment.status} />
      <div className='flex justify-between'>
        <span className='text-slate-800'>{`${comment.name}`}</span>
        <span className='text-slate-500'>
          {`${formatDateTime(comment.created_at)}`}
        </span>
      </div>
      {!editable ? (
        <p className='rounded-md shadow-md px-4 py-4 my-3 bg-slate-50'>
          {commentInput}
        </p>
      ) : (
        <form
          className='w-full  flex items-center relative'
          onSubmit={(e) => handleEditConfirm(e)}>
          <input
            ref={commentRef}
            type='text'
            className='w-full rounded-md shadow-md px-4 py-4 my-3 bg-white border'
            value={commentInput}
            onChange={(e) => setCommentInput(e.currentTarget.value)}
          />
          <button className='btn absolute right-3 btn-sm'>확인</button>
        </form>
      )}
      <div className={`space-x-2 my-2 ${status !== 'open' && 'hidden'}`}>
        <button
          className='btn btn-outline btn-sm'
          onClick={() => setOpenReply((p) => !p)}>
          대댓글
        </button>
        <button className='btn btn-outline btn-sm' onClick={onEdit}>
          수정
        </button>
        <button
          className='btn btn-outline btn-sm'
          onClick={() =>
            // @ts-ignore
            document.getElementById(`modal_${comment.id}`).showModal()
          }>
          삭제
        </button>
        <dialog
          id={`modal_${comment.id}`}
          className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>삭제하기</h3>
            <p className='py-4'>정말로 삭제하시겠습니까?</p>
            <div className='modal-action'>
              <form method='dialog' className='space-x-2'>
                <button
                  className='btn btn-neutral'
                  onClick={() => handleDeleteComment()}>
                  삭제
                </button>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn'>취소</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {openReply && (
        <form
          className='join w-[95%] self-end'
          onSubmit={(event) => handleSubmitReply(event)}>
          <input
            type='text'
            className='join-item input input-bordered w-full'
            value={reply}
            onChange={(e) => setReply(e.currentTarget.value)}
          />
          <button className='join-item btn btn-outline'>확인</button>
        </form>
      )}
      <Replies replies={comment.replies} />
    </li>
  );
}

const Replies = ({ replies }: { replies: ReplyType[] }) => {
  return (
    <ul className='w-[95%] self-end relative flex flex-col mb-10'>
      {replies.map((reply) => (
        <ReplyItem reply={reply} key={`${reply?.reply_id}-reply`} />
      ))}
    </ul>
  );
};

const ReplyItem = ({ reply }: { reply: ReplyType }) => {
  const loginState = useLoginData();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteReply } = useMutation({
    mutationFn: () =>
      axios.delete(
        `${BASE_URL}/comments/${reply.comment_id}/reply/${reply.reply_id}/`,
        {}
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskDetail'],
      });
      toast.success('삭제되었습니다.');
    },
    onError: (error) => toast.error(error.message),
  });
  const handleDelete = () => {};
  return (
    <li className='rounded-md p-3 flex flex-col'>
      <div className='flex justify-between'>
        <span
          className={`flex items-center gap-3 ${
            reply.author_is_staff && 'font-black text-green-800'
          }`}>
          <IoMdReturnRight className='text-slate-400' />
          {`${
            reply.author_is_staff
              ? '관리자'
              : `${reply.name}(${reply.reply_id})`
          }`}
        </span>
        <span className='text-slate-500'>
          {formatDateTime(reply.created_at)}
        </span>
      </div>
      <div className='w-full rounded-md shadow-md px-4 py-4 my-3 bg-slate-50 flex justify-between'>
        <div>{reply.content}</div>
        {reply.author === loginState?.username && (
          <div
            className='btn btn-ghost btn-sm'
            onClick={() =>
              document
                .getElementById(`reply_delete_modal_${reply.reply_id}`)!
                // @ts-ignore
                .showModal()
            }>
            삭제
          </div>
        )}
        <dialog
          id={`reply_delete_modal_${reply.reply_id}`}
          className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>삭제하기</h3>
            <p className='py-4'>정말로 삭제하시겠습니까?</p>
            <div className='modal-action'>
              <form method='dialog' className='space-x-2'>
                <button
                  className='btn btn-neutral'
                  onClick={() => deleteReply()}>
                  삭제
                </button>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn'>취소</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </li>
  );
};

const CommentStatusBadge = ({ status }: { status: CommentStatusType }) => {
  switch (status) {
    case 'sample_translator':
      return <p className='badge badge-neutral'>샘플 번역가</p>;
    case 'assigned_translator':
      return <p className='badge badge-primary'>담당 번역가</p>;
    default:
      return null;
  }
};
