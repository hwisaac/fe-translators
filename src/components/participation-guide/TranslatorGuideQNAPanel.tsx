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
      <p className='font-thin mt-10 text-sm sm:text-md lg:text-lg text-slate-400'>
        바른번역 회원 번역가로 처음 입회하시는 분들이 흔히 묻는 질문을
        모았습니다. 입회를 결정하기 전에 꼭 읽어봐 주세요.
      </p>
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
