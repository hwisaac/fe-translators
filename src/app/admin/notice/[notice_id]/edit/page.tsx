import NoticeEditForm from '@/components/admin/notice/NoticeEditForm';
import BASE_URL from '@/utils/BASE_URL';
type Props = {
  params: {
    notice_id: string;
  };
};

export default async function page({ params: { notice_id } }: Props) {
  const data = await fetch(`${BASE_URL}/notices/${notice_id}/`).then((res) =>
    res.json()
  );
  return (
    <section>
      <h1 className='text-2xl my-10'>공지사항 등록</h1>
      <NoticeEditForm data={data} notice_id={notice_id} />
    </section>
  );
}
