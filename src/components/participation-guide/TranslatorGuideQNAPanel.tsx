'use client';
import AccordionTranslatorsQNA from '@/components/participation-guide/AccordionTranslatorsQNA';
import BASE_URL from '@/utils/BASE_URL';

type Props = {};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TranslatorGuideQNAPanel({ value }: any) {
  return (
    <CustomTabPanel value={value} index={1}>
      <h2 className='text-3xl text-slate-500 my-10'>Q&A</h2>

      <AccordionTranslatorsQNA />
    </CustomTabPanel>
  );
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  );
}
