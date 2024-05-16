'use client';
import { LoginDataType, loginAtom } from '@/atoms/loginAtom';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import useCSRFToken from '@/app/hooks/useCSRFToken';

type Props = {};

export default function TranslatorDetailWithoutToken({}: Props) {
  const router = useRouter();
  const csrftoken = useCSRFToken();
  const [loginState, setLoginState] = useRecoilState(loginAtom);
  const { mutate: login } = useMutation({
    mutationFn: ({ data }: any) =>
      axios
        .post(`${BASE_URL}/users/login/`, data, {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        })
        .then((res) => res.data as LoginDataType),
    onSuccess: (data) => {
      setLoginState(null);
      if (!data) {
        toast.error('데이터를 가져오는 데 실패했습니다.');
        return;
      }
      console.log(data);
      setLoginState(data);
      if (data.is_staff) {
        router.push('/admin/tasks/');
      } else {
        // router.push('/member/my-page/');
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      // @ts-ignore
      toast.error(String(error.response?.data?.error));
      setLoginState(null);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const onValid: SubmitHandler<any> = async (data) => {
    console.log(data);
    login({ data });
  };

  return (
    <PageLayout title='회원가입을 해야 볼 수 있습니다.'>
      <h2 className='text-2xl border-b pb-10'>
        번역가 정보는 회원에게만 공개 됩니다.
      </h2>
      <form
        className='flex flex-col gap-3 max-w-lg mt-10 mx-auto'
        onSubmit={handleSubmit(onValid)}>
        <label className='input input-bordered flex items-center gap-2'>
          <FaUser size={12} className='text-slate-500' />
          <input
            type='text'
            className='grow'
            placeholder='Username'
            {...register('username')}
          />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <FaLock size={12} className='text-slate-500' />
          <input
            type='password'
            className='grow'
            placeholder='password'
            {...register('password')}
          />
        </label>
        <button className='btn btn-primary'>로그인</button>
      </form>
      <div className='flex justify-center w-full '>
        <Link href='/signup' className='btn max-w-lg w-full mt-2'>
          <div>편집자 회원 가입</div>
        </Link>
      </div>
      <div className='max-w-lg mx-auto flex flex-col gap-5 pt-3'>
        <div className='flex gap-10 relative left-2 justify-center'></div>
      </div>
    </PageLayout>
  );
}
