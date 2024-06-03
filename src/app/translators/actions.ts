'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateTranslatorsList = async (
  task_id?: number | string | string[]
) => {
  revalidatePath(`/translators`);
};
