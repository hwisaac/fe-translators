import useCSRFToken from '@/app/hooks/useCSRFToken';
import BASE_URL from '@/utils/BASE_URL';
import { useAuthStore } from '@/zustand/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = { task_id: string | string[] };

export default function usePostComment({ task_id }: Props) {
  const { loginState } = useAuthStore();
  const csrftoken = useCSRFToken();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) =>
      axios.post(
        `${BASE_URL}/tasks/${task_id}/comments/`,
        { ...payload },
        {
          headers: {
            Authorization: loginState?.token ?? '',
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
        queryKey: ['my-available-tasks', loginState?.token],
      });
    },
    onError: (err: AxiosError) => {
      // @ts-ignore
      toast.error((err?.response?.data.error as string) || '');
    },
  });
}
