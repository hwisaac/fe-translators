'use client';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ChevronUp from '@/icons/ChevronUp';
import ChevronDown from '@/icons/ChevronDown';

type Props = {};

export default function RequestQNAs({ qnas }: { qnas: any[] }) {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {/* {qnas.map((item, index) => (
        <AccordionItem
          key={index}
          id={index}
          question={item.question}
          answer={item.answer}
          expanded={expanded}
          handleChange={handleChange}
        />
      ))} */}
      {qnas.map((item, index) => (
        <OldAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
}

function AccordionItem({ handleChange, expanded, id, answer, question }: any) {
  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}bh-content`}
        id={`${id}bh-header`}>
        <Typography
          sx={{ color: 'text.secondary', width: '30px', flexShrink: 0 }}>
          Q
        </Typography>
        <Typography sx={{ fontSize: '18px' }}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
        {answer}
      </AccordionDetails>
    </Accordion>
  );
}

const OldAccordionItem = ({ answer, question }: any) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='border border-b-0 last:border-b'>
      <div
        className='flex py-4 lg:py-10 lg:px-10 cursor-pointer'
        onClick={() => setOpen((p) => !p)}>
        <p className='text-[#2e63c8] w-10 lg:w-20 flex justify-center shrink-0 lg:text-3xl'>
          Q
        </p>
        <p className='text-slate-800 w-full text-sm px-2  lg:text-2xl'>
          {question}
        </p>
        <div className='w-10 lg:w-20 shrink-0 flex items-center justify-center'>
          {open ? (
            <ChevronUp className='lg:text-[30px]' />
          ) : (
            <ChevronDown className='lg:text-[30px]' />
          )}
        </div>
      </div>
      {open && (
        <div className='flex bg-stone-100 py-4 lg:py-10 lg:px-10'>
          <p className='text-slate-500 w-10 lg:w-20 flex justify-center shrink-0 lg:text-3xl'>
            A
          </p>
          <p className=' font-thin text-sm px-2 text-slate-400 whitespace-pre-wrap lg:text-xl'>
            {answer}
          </p>
          <div className='w-10 lg:w-20 shrink-0 flex items-center justify-center'></div>
        </div>
      )}
    </div>
  );
};