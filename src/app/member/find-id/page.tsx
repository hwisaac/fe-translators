import FindIdForm from '@/components/member/FindIdForm';
import PageLayout from '@/layouts/PageLayout';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='아이디 찾기'>
      <h2 className='text-2xl border-b pb-10'>이메일 주소를 입력해주세요</h2>
      <FindIdForm />
    </PageLayout>
  );
}
