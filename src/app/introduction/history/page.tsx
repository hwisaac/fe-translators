import Image from 'next/image';
import bgPattern from '/public/history/bg-content-heading.jpg';
import HistorySectionOne from '@/components/history/HistorySectionOne';
import HistorySectionTwo from '@/components/history/HistorySectionTwo';
import PageLayout from '@/layouts/PageLayout';
type Props = {};

export default function History({}: Props) {
  return (
    <PageLayout title='설립취지&역사'>
      <HistorySectionOne />
      <HistorySectionTwo />
    </PageLayout>
  );
}
