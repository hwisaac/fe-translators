export const FILE_URL = 'http://127.0.0.1:8000';

export default function getImgUrl(img?: any): string {
  if (!img) return '';

  return `${FILE_URL}${img}`;
}
