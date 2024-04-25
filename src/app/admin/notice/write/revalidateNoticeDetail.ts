'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateNoticeDetail = async (
  task_id: number | string | string[]
) => {
  revalidateTag(`noticeDetail_${task_id}`);
  revalidatePath(`/admin/notice`);
  revalidatePath(`/member/notice`);
};
