type Props = { status?: 'open' | 'closed' | 'testing' | 'completed' };

const commonStyle =
  'border rounded-md font-semibold text-green-700 border-green-700 bg-green-50 py-1 flex justify-center items-center w-[150px] flex text-xs sm:text-md';

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case 'open':
      return (
        <div
          className={`text-green-700 border-green-700 bg-green-50 ${commonStyle}`}>
          모집 중
        </div>
      );
    case 'testing':
      return (
        <div
          className={`${commonStyle} text-orange-500 border-orange-500 bg-orange-50`}>
          모집 중단 - 샘플심사중
        </div>
      );
    case 'completed':
      return (
        <div
          className={`${commonStyle} text-stone-400 border-stone-400 bg-stone-50`}>
          마감 - 번역가 선정완료
        </div>
      );
    case 'closed':
      return (
        <div
          className={`${commonStyle} text-stone-400 border-stone-400 bg-stone-50`}>
          마감 - 작업중단
        </div>
      );
  }
  return <span>{status}</span>;
}
