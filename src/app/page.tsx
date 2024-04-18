import Slider from '@/components/Slider';
import SectionOne from '@/components/home/SectionOne';
import SectionThree from '@/components/home/SectionThree';
import SectionTwo from '@/components/home/SectionTwo';

export default function Home() {
  return (
    <main>
      <Slider />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
