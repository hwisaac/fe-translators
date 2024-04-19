export default function formatDate(isoString: string | undefined | null) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const timeZone = 'Asia/Seoul';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  })
    .format(date)
    .replace(/\./g, '-')
    .slice(0, -1);
}
