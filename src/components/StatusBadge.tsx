type Props = { status?: 'open' | 'closed' | 'testing' | 'completed' };

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case 'open':
      return (
        <div className='border rounded-md font-semibold text-green-700 border-green-700 bg-green-50 w-[180px] py-1 flex items-center justify-center flex-grow-0'>
          모집 중
        </div>
      );
    case 'testing':
      return (
        <div className='border rounded-md font-semibold text-orange-500 border-orange-500 bg-orange-50 w-[180px] py-1 flex items-center justify-center flex-grow-0'>
          모집 중단 - 샘플심사중
        </div>
      );
    case 'completed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 w-[180px] py-1 flex items-center justify-center flex-grow-0'>
          마감 - 번역가 선정완료
        </div>
      );
    case 'closed':
      return (
        <div className='border rounded-md font-semibold text-stone-400 border-stone-400 bg-stone-50 w-[180px] py-1 flex items-center justify-center flex-grow-0'>
          마감 - 작업중단
        </div>
      );
    default:
      return null;
  }
}
