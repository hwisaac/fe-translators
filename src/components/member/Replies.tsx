import { IoMdReturnRight } from 'react-icons/io';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import formatDateTime from '@/utils/formatDateTime';

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
type Props = {
  replies: ReplyType[];
};

export default function Replies({ replies }: Props) {
  return (
    <ul className='w-[95%] self-end relative flex flex-col mb-10'>
      {replies.map((reply) => (
        <ReplyItem reply={reply} key={`${reply?.reply_id}-reply`} />
      ))}
    </ul>
  );
}

const ReplyItem = ({ reply }: { reply: ReplyType }) => {
  const queryClient = useQueryClient();
  const csrftoken = useCSRFToken();
  const { mutateAsync: deleteReply } = useMutation({
    mutationFn: () =>
      axios.delete(
        `${BASE_URL}/comments/${reply.comment_id}/reply/${reply.reply_id}/`,
        {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        }
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
            reply.author_is_staff ? '관리자' : `${reply.name}(${reply.author})`
          }`}
        </span>
        <span className='text-slate-500'>
          {formatDateTime(reply.created_at)}
        </span>
      </div>
      <div className='w-full rounded-md shadow-md px-4 py-4 my-3 bg-slate-50 flex justify-between'>
        <div>{reply.content}</div>
        {
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
        }
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
