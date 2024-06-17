import useCSRFToken from '@/app/hooks/useCSRFToken';
import useLocalToken from '@/app/hooks/useLocalToken';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = { task_id: string | string[] };

export default function usePostComment({ task_id }: Props) {
  const { token } = useLocalToken();
  const csrftoken = useCSRFToken();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add comment', task_id, token, csrftoken],
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
}
