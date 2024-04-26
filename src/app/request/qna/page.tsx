import PageLayout from '@/layouts/PageLayout';

import RequestQNAs from '@/components/request/RequestQNAs';
import BASE_URL from '@/utils/BASE_URL';

type Props = {};

export default async function RequestQNA({}: Props) {
  const qnas = await fetch(`${BASE_URL}/barun/request/qna/`, {
    cache: 'no-store',
  }).then((res) => res.json());

  return (
    <PageLayout title='Q&A'>
      <h1 className='text-slate-500 text-lg font-semibold mb-10'>
        바른번역에 의뢰하실 때 흔히 묻는 질문을 모았습니다. 꼭 읽어봐 주세요.
      </h1>

      <RequestQNAs qnas={qnas} />
    </PageLayout>
  );
}
