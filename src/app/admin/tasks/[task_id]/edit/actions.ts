'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateTaskDetail = async (task_id: number) => {
  revalidateTag(`taskDetail_${task_id}`);
  revalidatePath(`/admin/tasks`);
  revalidatePath(`/member/tasks`);
};
