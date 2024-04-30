import { TaskDetail } from '@/app/admin/tasks/[task_id]/page';
import TaskEditForm from '@/components/admin/tasks/TaskEditForm';
import BASE_URL from '@/utils/BASE_URL';

type Props = {
  params: { task_id: string | number };
};

export default async function page({ params: { task_id } }: Props) {
  const data: TaskDetail = await fetch(`${BASE_URL}/tasks/${task_id}/`, {
    cache: 'no-cache',
  }).then((res) => res.json());
  console.log(data, 'ddd');
  return (
    <section>
      <h1 className='text-2xl my-10'>수정하기</h1>

      <TaskEditForm data={data} task_id={Number(task_id)} />
    </section>
  );
}
