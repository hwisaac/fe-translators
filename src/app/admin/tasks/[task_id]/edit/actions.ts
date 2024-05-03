'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateTaskDetail = async (task_id?: number | string | string[]) => {
  revalidatePath(`/member/tasks`);
};
