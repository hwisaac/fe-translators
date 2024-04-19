export default function formatDateTimeWithMilliseconds(isoString: string) {
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
    .slice(0, -1);

  const formattedTime = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  })
    .format(date)
    .replace(/\:/g, ':');

  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${formattedDate} ${formattedTime}.${milliseconds}`;
}
