'use client';
import { testAtom } from '@/atoms/testAtom';
import AccordionItem from '@/components/AccordionItem';
import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type Props = {};
const accordionItems = [
  {
    question: '바른번역은 다른 번역회사와 어떻게 다른가요?',
    answer: (
      <p>
        바른번역은 “번역가에게는 안정적인 작업환경을, 출판사에게는 질 높은
        번역을 제공한다.”는 모토로 설립되었습니다.
        <br />
        <br /> 따라서 번역가들이 일감걱정, 돈 제때 받을 걱정, 번역가로서
        경력개발 걱정을 덜 하실 수 있도록 여러 제도를 운영하고 있습니다. <br />
        <br />
        우선 일감 중개 수수료는 일반 번역회사 가운데 최저로 운영하고 있으며,
        자신의 전공과 관심분야에 맞는 일감을 골라 지원할 수 있는 제도도 운영하고
        있습니다. <br />
        <br />
        그리고 출판사가 어려워져서 부도가 나거나 지급을 미루는 경우 대신
        번역료를 지급해 드리고 있습니다. <br />
        <br />
        자세한 내용은 방문하시어 매니저로부터 설명을 들으시기 바랍니다.
      </p>
    ),
  },
  {
    question: '바른번역 가입조건은 어떻게 되나요?',
    answer: (
      <p>
        기성번역가는 일단 최소한의 자격기준으로 5권의 역서가 있어야 합니다.
        <br />
        <br />
        그리고 기존에 회원번역가들이 쌓아올린 명성을 유지하기 위해서 샘플번역을
        통과하셔야 합니다. <br />
        <br />
        샘플번역 지문은 그때그때 달라지며, 일감을 의뢰한 출판사에서 평가해 통과
        되면 번역계약을 맺고 일단 준회원이 됩니다. <br />
        <br />
        그리고 무사히 납품이 완료되어 거래 출판사에서 호응이 좋으면 정식으로
        바른번역 회원이 됩니다. <br />
        <br />
        기존에 역서가 5권이 안되시거나 번역가를 지망하시는 분들은 바른번역 글밥
        아카데미를 수료하셔야 합니다.
      </p>
    ),
  },
  {
    question: '수수료는 어느 정도나 되나요?',
    answer: (
      <p>
        일감 중개 수수료는 바른번역과 일을 거듭 하실수록 점점 낮아지는 구조를
        하고 있습니다. <br />
        <br />
        현재 다른 번역중개회사 가운데 가장 수수료를 가장 적게 받는 곳이 20%인데,
        저희 바른번역에서는 20%부터 시작해서 5권 번역하실 때마다 5%씩 낮아지는
        구조를 갖고 있습니다. 바른번역 대표를 비롯해서 바른번역과 여러 권 일을
        같이 해온 번역가들 역시 현재 5%의 수수료를 내고 번역하고 계십니다.
        <br />
        <br />
        물론 형편이 넉넉지 못한 번역가 입장에서는 처음에 중개 수수료가 너무
        높다고 생각하실 수 있습니다. 하지만 이러한 수수료로 스케줄 조정, 클레임
        처리, 출판사 부도시 번역료 대신 지급 등의 여러 가지 업무를 수행하고
        있습니다. 바른번역 회원 번역가들이 내는 수수료는 번역가 공동체의 여러
        가지 업무를 수행하고 보험 역할을 하는데 필요한 회비 정도로 생각해 주시기
        바랍니다.
      </p>
    ),
  },
  {
    question: '바른번역에 가입하면 개인적으로 일을 할 수 없나요?',
    answer: (
      <p>
        바른번역 회원이라고 해서 개인적인 작업 활동을 막지는 않습니다. 그렇게 할
        수도 없구요. 가입 전부터 알고 지내던 편집자가 굳이 바른번역을 끼우지
        말고 직접 계약하자고 주장할 수도 있습니다. <br />
        <br />
        물론 그렇게 하셔도 됩니다. 그런 불가피한 사정이 있어서 번역 일정이
        생기는 경우, 저희 바른번역 매니저에게 통보만 해주시면 됩니다. <br />
        <br />
        그런데 통보도 없이 계속해서 개인적으로만 활동하실 경우, 향후 일감을
        맡으실 때 수수료가 다시 조정 될 수 있습니다. 왜냐하면 바른번역 회원
        중에는 꼬박꼬박 수수료를 내서 운영을 도와주시는 번역가들도 있기
        때문입니다. <br />
        <br />또 다른 경우도 있을 수 있습니다. 바른번역은 출판사 편집자와
        번역가의 직접 소통을 장려하고 있는 까닭에, 바른번역과 인연을 맺은지 얼마
        안 되는 일부 편집자 가운데에는 번역가를 한번 소개를 받고 난 뒤,
        개인적으로 계약을 하자고 은밀히 제안해 오는 경우도 있습니다. <br />
        <br />
        이런 제안이 들어올 경우 받아들이시면, 꼬박꼬박 회비를 내고 일해오시는
        다른 분들께 누가 될 수 있습니다. <br />
        <br />
        번역가들이 단체로 모여 힘을 발휘해 보자는 바른번역의 취지에도 해가 될 수
        있구요. 이점 충분히 헤아리셔서 되도록 바른번역을 통해 계약이 되도록
        설득해 주시기 바랍니다.
        <br />
        <br />
        바른번역 회원으로서의 활동과 개인적인 활동은 기계적으로 제재하거나
        방임할 수 있는 문제는 아닌 관계로, 서로에게 해가 되지 않는 범위 내에서
        이성적으로 판단하면 무리없이 해결해 나갈 수 있는 일이라고 생각합니다.
        바른번역 매니저는 이 문제에 열린 마음으로 대처하고 있으니 건별로
        기탄없이 상의해 주시기 바랍니다.
      </p>
    ),
  },
  {
    question: '바른번역에서 강제 탈퇴 당할 수도 있나요?',
    answer: (
      <p>
        번역을 납품하는데 있어 책임감이 부족해 바른번역의 명성에 금이 가게
        행동하시는 분은 부득이 제명처리 될 수 있습니다.
        <br />
        <br /> 예를 들어 별다른 이유 없이 습관적으로 일정을 지키지 않는 번역가,
        사전에 납품 지연통보도 없이 연락을 끊고 잠적하는 번역가, 출판사로부터
        원고에 대한 아쉬운 피드백을 거듭 전달해 드렸음에도 불구하고 개선이 되지
        않는 번역가는 죄송하지만 제명될 수 있습니다. <br />
        <br />
        그밖에 다른 에이전시 소속 번역가로 인터넷에 프로필이 올라 있는 분들도
        회원자격을 잃으실 수 있습니다. <br />
        <br /> 혹시 다른 에이전시 소속 번역가로 활동하고 계신 분이 바른번역에
        가입하고 싶으시면 먼저 관계를정리한 뒤 신청해 주시기 바랍니다.
      </p>
    ),
  },
];

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
      {qnas && qnas?.length > 0
        ? qnas.map((item, index) => (
            <AccordionItem
              key={index}
              id={index}
              question={item.question}
              answer={item.answer}
              expanded={expanded}
              handleChange={handleChange}
            />
          ))
        : accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              id={index}
              question={item.question}
              answer={item.answer}
              expanded={expanded}
              handleChange={handleChange}
            />
          ))}
    </>
  );
}
