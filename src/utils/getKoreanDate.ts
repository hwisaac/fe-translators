export default function getKoreanDate(time?: string) {
  if (!time) {
    const koreanDate = new Date()
      .toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .slice(0, -1);
    return koreanDate;
  } else {
    const koreanDate = new Date(time)
      .toLocaleDateString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .slice(0, -1);
    return koreanDate;
  }
}
