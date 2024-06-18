'use client';
import OldAccordionItem from '@/components/OldAccordionItem';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {};

export default function AccordionTranslatorsQNA() {
  const [expanded, setExpanded] = useState<number | false>(0);
  const { data: qnas } = useQuery<any[]>({
    queryKey: ['translator-qna'],
    queryFn: () =>
      fetch(`${BASE_URL}/barun/participation-guide/qna/`).then((res) =>
        res.json()
      ),
  });
  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      {/* {qnas?.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            id={index}
            question={item.question}
            answer={item.answer}
            expanded={expanded}
            handleChange={handleChange}
          />
        );
      })} */}
      {qnas?.map((item, index) => (
        <OldAccordionItem
          answer={item.answer}
          question={item.question}
          key={index}
        />
      ))}
    </>
  );
}
