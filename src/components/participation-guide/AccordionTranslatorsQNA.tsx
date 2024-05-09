'use client';
import { testAtom } from '@/atoms/testAtom';
import AccordionItem from '@/components/AccordionItem';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = {};

export default function AccordionTranslatorsQNA() {
  const [data, setData] = useRecoilState(testAtom);
  useEffect(() => {
    console.log(data);
  }, [data]);
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
      {qnas?.map((item, index) => {
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
      })}
    </>
  );
}
