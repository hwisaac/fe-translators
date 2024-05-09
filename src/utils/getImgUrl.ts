import { BASE_URL_WO_API } from '@/utils/BASE_URL';

// export const fileUrl = 'http://127.0.0.1:8000';
export const fileUrl = BASE_URL_WO_API;

export default function getImgUrl(img?: any): string {
  if (!img) return '';

  return `${fileUrl}${img}`;
}
