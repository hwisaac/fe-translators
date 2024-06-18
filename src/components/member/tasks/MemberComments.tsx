'use client';

import { revalidateTaskDetail } from '@/app/admin/tasks/[task_id]/edit/actions';
import useAddReply from '@/app/hooks/member/useAddReply';
import useDeleteComment from '@/app/hooks/member/useDeleteComment';
import useEditComment from '@/app/hooks/member/useEditComment';
import useMe from '@/app/hooks/useMe';
import usePostComment from '@/app/hooks/usePostComment';
import ScreenLoading from '@/components/ScreenLoading';
import { CommentType } from '@/components/admin/tasks/AdminComments';
import Replies from '@/components/member/Replies';
import { COMMENT_LIMIT } from '@/utils/commons';
import formatDateTime from '@/utils/formatDateTime';
import { useParams } from 'next/navigation';
import { FormEvent, LegacyRef, useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';
interface ActionButtonsProps {
  onEdit: any;
  comment_id: string | number;
  comment_replies_length: number;
  setOpenReply: any;
  task_id: string | string[];
  status: any;
}

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
  console.log('member comments', comments?.length, comments);
  const { task_id } = useParams();
  const [inputComment, setInputComment] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { mutate: postComment, isPending: postingComment } = usePostComment({
    task_id,
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
        <ScreenLoading isLoading={postingComment} />
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
      <ul className='flex flex-col w-full py-4 px-2'>
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
  const { me } = useMe();
  const authorUsername = comment.author.username;
  // console.log(loginState, 'loginState');
  console.log(comment.author.username);
  // console.log(myUsername === authorUsername ? '통과' : '통과x');
  const commentRef = useRef(null);
  const [openReply, setOpenReply] = useState(false);
  const [editable, setEditable] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.content);
  const { task_id } = useParams();
  const [reply, setReply] = useState('');

  const { mutateAsync: addReply, isPending: addingReply } = useAddReply({
    task_id,
    comment_id: comment.id,
  });

  const { mutateAsync: editComment, isPending: editingComment } =
    useEditComment({
      comment_id: comment.id,
      task_id,
    });

  const { isPending: deletingComment } = useDeleteComment({
    comment_id: comment.id,
    task_id,
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

  return (
    <li className='flex flex-col w-full'>
      {/* <p className='badge badge-neutral'>샘플번역가</p> */}
      <ScreenLoading
        isLoading={deletingComment || editingComment || addingReply}
      />
      <CommentStatusBadge status={comment.status} />

      <div className='flex justify-between'>
        <span className='text-slate-800'>{`${comment.name}(${comment.author.username})`}</span>
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

      <ActionButtons
        onEdit={onEdit}
        comment_id={comment.id}
        comment_replies_length={comment.replies.length}
        setOpenReply={setOpenReply}
        task_id={task_id}
        status={status}
      />
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

function ActionButtons({
  onEdit,
  comment_id,
  comment_replies_length,
  setOpenReply,
  task_id,
  status,
}: ActionButtonsProps) {
  const { mutateAsync: deleteComment, isPending: deletingComment } =
    useDeleteComment({
      comment_id,
      task_id,
    });

  const handleDeleteComment = () => {
    if (comment_replies_length > 0) {
      toast.error('대댓글이 달린 댓글은 삭제할 수 없습니다.');
      return;
    }
    deleteComment();
  };

  return (
    <div className={`space-x-2 my-2 ${status !== 'open' && 'hidden'}`}>
      <button
        className='btn btn-outline btn-sm'
        onClick={() => setOpenReply((p: any) => !p)}>
        대댓글
      </button>
      <button className='btn btn-outline btn-sm' onClick={onEdit}>
        수정
      </button>
      <button
        className='btn btn-outline btn-sm'
        onClick={() =>
          // @ts-ignore
          document.getElementById(`modal_${comment_id}`).showModal()
        }>
        삭제
      </button>
      <dialog
        id={`modal_${comment_id}`}
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

              <button className='btn'>취소</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}


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
