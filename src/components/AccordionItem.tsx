import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
type Props = {};

export default function AccordionItem({
  handleChange,
  expanded,
  id,
  answer,
  question,
}: any) {
  if (!answer) return null;

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
