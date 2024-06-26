import useCSRFToken from '@/app/hooks/useCSRFToken';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
  comment_id: string | number;
  task_id: string | string[];
};

export default function useDeleteComment({ comment_id, task_id }: Props) {
  const queryClient = useQueryClient();
  const { loginState } = useAuthStore();
  const csrftoken = useCSRFToken();

  return useMutation({
    mutationKey: ['delete', comment_id, loginState?.token, csrftoken],
    mutationFn: () =>
      axios.delete(`${BASE_URL}/comments/${comment_id}/`, {
        headers: {
          Authorization: loginState?.token ?? '',
          'X-CSRFToken': csrftoken,
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
}
