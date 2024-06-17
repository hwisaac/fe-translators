import useCSRFToken from '@/app/hooks/useCSRFToken';
import useLocalToken from '@/app/hooks/useLocalToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
  comment_id: string | number;
  task_id: string | string[];
};

export default function useEditComment({ comment_id, task_id }: Props) {
  const { token } = useLocalToken();
  const csrftoken = useCSRFToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editComment', comment_id, token, csrftoken],
    mutationFn: (payload: any) =>
      axios.put(
        `${BASE_URL}/comments/${comment_id}/`,
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
}
