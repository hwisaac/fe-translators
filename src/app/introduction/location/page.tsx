import DirectionsToOurOffice from '@/components/location/DirectionsToOurOffice';
import MapSection from '@/components/location/MapSection';
import PageLayout from '@/layouts/PageLayout';

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='연락처 및 약도'>
      <MapSection />
      <DirectionsToOurOffice />
    </PageLayout>
  );
}
