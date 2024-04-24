export default function formatDateTime(isoString?: string) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const timeZone = 'Asia/Seoul';
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timeZone,
  })
    .format(date)
    .replace(/\./g, '-')
    .slice(0, -1)
    .split(' ')
    .join('');

  const formattedTime = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  })
    .format(date)
    .replace(/\:/g, ':');

  return `${formattedDate} (${formattedTime})`;
}
