'use client';
type Props = {
  isLoading: boolean;
};

export default function ScreenLoading({ isLoading }: Props) {
  if (!isLoading) return null;
  return (
    <div className='flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-gray-900 opacity-50 text-white z-50'>
      <div className=' loading loading-spinner loading-lg' />
    </div>
  );
}
