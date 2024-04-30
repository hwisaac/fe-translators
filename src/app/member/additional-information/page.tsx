import AdditionalInformationForm from '@/components/member/AdditionalInformationForm';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';

type Props = {};

export default async function page({}: Props) {
  const checkBoxes = await fetch(`${BASE_URL}/users/check-boxes/`, {
    cache: 'no-cache',
  }).then((res) => res.json());
  const interviewQuestions = await fetch(
    `${BASE_URL}/users/interview-questions/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <PageLayout title='추가정보 입력'>
      <AdditionalInformationForm
        checkBoxes={checkBoxes}
        interviewQuestions={interviewQuestions}
      />
    </PageLayout>
  );
}
