import DifferenceSectionOne from '@/components/difference/DifferenceSectionOne';
import DifferenceSectionTwo from '@/components/difference/DifferenceSectionTwo';
import PageLayout from '@/layouts/PageLayout';
import img from '@/utils/img';
import Image from 'next/image';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='바른번역이 좋은 이유'>
      <DifferenceSectionOne />
      <DifferenceSectionTwo />
    </PageLayout>
  );
}
