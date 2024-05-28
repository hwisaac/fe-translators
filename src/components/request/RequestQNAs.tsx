'use client';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import OldAccordionItem from '@/components/OldAccordionItem';

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

