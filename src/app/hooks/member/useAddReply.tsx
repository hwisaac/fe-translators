import { revalidateTaskDetail } from '@/app/admin/tasks/[task_id]/edit/actions';
import useCSRFToken from '@/app/hooks/useCSRFToken';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
  task_id: string | string[];
  comment_id: string | number;
};

export default function useAddReply({ task_id, comment_id }: Props) {
  const { loginState } = useAuthStore();
  const csrftoken = useCSRFToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addReply', comment_id, loginState?.token, csrftoken],
    mutationFn: (payload: any) =>
      axios.post(
        `${BASE_URL}/comments/${comment_id}/reply/`,
        { ...payload },
        {
          headers: {
            Authorization: loginState?.token ?? '',
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
}
