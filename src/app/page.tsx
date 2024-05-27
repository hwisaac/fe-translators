import CustomSlider from '@/components/CustomSlider';
import CustomSlider2 from '@/components/CustomSlider2';
import SectionOne from '@/components/home/SectionOne';
import SectionThree from '@/components/home/SectionThree';
import SectionTwo from '@/components/home/SectionTwo';

export default function Home() {
  return (
    <main>
      {/* <CustomSlider /> */}
      <CustomSlider2 />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </main>
  );
}
