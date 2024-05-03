'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateNoticeDetail = async (
  notice_id: number | string | string[]
) => {
  revalidateTag(`noticeDetail_${notice_id}`);
  revalidatePath(`/admin/notice`);
  revalidatePath(`/admin/notice/${notice_id}/edit`);
  revalidatePath(`/member/notice`);
};
