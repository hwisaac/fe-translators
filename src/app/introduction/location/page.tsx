import DirectionsToOurOffice from '@/components/location/DirectionsToOurOffice';
import MapSection from '@/components/location/MapSection';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

export default function page({}: Props) {
  return (
    <section className='w-full flex flex-col items-center justify-center'>
      <div className='flex items-center justify-center'>
        <Image src={img.bgPatter} alt='bgImage' />
        <h1 className='absolute text-white text-4xl'>연락처 및 약도</h1>
      </div>
      <MapSection />
      <DirectionsToOurOffice />
    </section>
  );
}
