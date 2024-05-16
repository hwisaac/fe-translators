import PrivateInformationForm from '@/components/member/PrivateInformationForm';
import PageLayout from '@/layouts/PageLayout';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='개인정보'>
      <PrivateInformationForm />
    </PageLayout>
  );
}
