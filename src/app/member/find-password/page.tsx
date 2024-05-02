import FindPasswordForm from '@/components/member/FindPasswordForm';
import PageLayout from '@/layouts/PageLayout';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='패스워드 찾기'>
      <FindPasswordForm />
    </PageLayout>
  );
}
