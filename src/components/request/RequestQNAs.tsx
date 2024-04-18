'use client';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

type Props = {};
const accordionItems = [
  {
    question: '번역을 의뢰하려고 하는데 어떻게 해야 합니까?',
    answer: (
      <p>
        바른번역 번역가 회원들의 일정을 관리해주는 매니저에게 전화, 혹은
        이메일로 연락주시면 됩니다.
        <br />
        <br />
        (아래 참조) 저희 홈 페이지에 회원 번역가들의 약력 및 역서들이 소개되어
        있지만, 작업 일정이 다르고, 또 아직 홈페이지에 프로필을 올리지 못한
        번역가들도 있으므로, 전화로 상담하시는 편이 가장 좋습니다.
        <br />
        <br />
        <span className='text-blue-400'>02-338-2180 / book@barunmc.com</span>
      </p>
    ),
  },
  {
    question: '번역을 맡기기 전에 도서검토(리뷰)를 맡길 수 있습니까?',
    answer: (
      <p>
        도서검토 담당자에게 전화 혹은 이메일로 의뢰하시면 됩니다.(아래 참조) 단,
        기존 거래처의 의뢰만 받습니다. <br />
        <br />
        바른번역과 거래를 시작하고 싶으신 출판사는 번역부터 의뢰해 주시기
        바랍니다. 도서검토 결과 해당 책을 출간하시기로 하시면 번역의뢰는 반드시
        저희에게 해주십시오. <br />
        번역이 전제되지 않는 도서검토는 죄송하지만 할 수 없습니다.(번역가
        입장에서는 번역에 비해 도서검토가 시간과 노력이 많이 요구되는 작업이므로
        널리 양해해 주시기 바랍니다.) <br />
        저희가 드리는 도서검토서에는 샘플번역이 포함되어 있으므로, 검토자(리뷰한
        번역가)에게 먼저 번역의 기회를 주시고, 만약 샘플번역이 정 맘에 들지
        않으신다면 번역가 교체를 요청하실 수 있습니다. <br />
        <br />
        그럴 경우 일정이 가능한 다른 번역가를 소개해 드립니다. 번역가가 바뀔
        경우에도 추후 번역료에서 리뷰비용을 공제해 드립니다.
        <br />
        <br />
        <span className='text-blue-400'>02-338-2180 / book@barunmc.com</span>
      </p>
    ),
  },
  {
    question: '어떤 번역가가 가장 번역을 잘 하는지 어떻게 알 수 있을까요?',
    answer: (
      <p>
        바른번역은 번역의 질을 높이기 위해 부단히 노력하고 있습니다. 따라서
        번역의 질이 좋지 않아 출판사로부터 여러 차례 지적을 당하는 번역가는
        자연스레 도태되는 시스템을 갖추고 있습니다.
        <br />
        <br />
        하지만 모든 회원 번역가들을 실력순으로 일렬로 나열할 수는 없습니다. 각자
        잘하는 분야도 다양하고, 또 출판사와 편집자의 취향에 따라 평가도 다양하게
        나오기 때문입니다. 번역가를 선택하시기 전에 매니저와 상담하시면서 각
        번역가의 특성과 장단점에 관해 설명을 들으시고, 샘플번역도 받아 본 뒤
        계약하시기 바랍니다. 샘플번역은 다른 사람이 절대 수정하거나 첨삭하지
        않습니다.
        <br />
        <br />
        그리고 계약 후에도 번역에 따른 논란을 없애고 출판사와 번역가, 서로의
        피해를 최소화하기 위해 ‘1장 원고’ 시스템을 운영하고 있습니다.
        <br />
        첫 번째 챕터 분량의 번역본을 먼저 납품하여 편집자님들께 피드백을
        요청합니다. 원고가 많이 진행되기 전에 편집자님들과 번역가님들이 서로
        의견을 교환하는 기회를 마련하고자 함입니다. 1장 원고를 받으신
        편집자님들께서 글 분위기와 문체, 용어 등을 비롯하여 피드백을 전해주시면
        바른번역은 피드백을 번역가에게 전달하여 앞으로 진행할 원고에 최대한
        반영되도록 합니다. 출판사에서 전해주는 코멘트와 피드백은 회원관리에 적극
        반영하는 자료로 활용됩니다.
        <br />
        <br />
        <span className='text-blue-400'>02-338-2180 / book@barunmc.com</span>
      </p>
    ),
  },
  {
    question: '번역료는 어떻게 되나요?',
    answer: (
      <p>
        영한번역의 경우 번역가에 따라 원고지 매절 3000원~5000원 선입니다. 일한은
        매절 2500원~4000원이며 그 외 언어는 매절 4000원 선입니다.
        <br />
        단가는 역자의 경력과 이력, 작업의 난이도, 일정 등에 따라 조정될 수
        있습니다. <br />
        <br />
        한일번역과 한영번역은 책에 따라 변동이 크므로 직접 매니저에게 문의해
        주세요.
        <br />
        <br />
        <span className='text-blue-400'>02-338-2180 / book@barunmc.com</span>
      </p>
    ),
  },
  {
    question: '번역가들과 직접 통화하거나 만날 수 없습니까?',
    answer: (
      <p>
        가능합니다.
        <br />
        <br /> 바른번역은 책을 만드는 편집자와 번역자가 원활히 소통해야 좋은
        결과를 낼 수 있다고 믿기에 번역가와 직접 연락하실 수 있게 해드립니다.
        단, 글을 쓰거나 옮기는 사람들은 자신의 글에 대한 평가에 민감할 수
        있으므로, 가끔 불필요한 마찰이 생겨날 때도 있습니다.
        <br />
        <br />
        매끄러운 일의 진행을 위해서 민감한 사항은 먼저 저희 매니저와 상담을
        해주시길 부탁드립니다.
      </p>
    ),
  },
  {
    question:
      '바른 번역에서 번역을 잘 해준다고 얘기 들었습니다. 바른번역에서 번역품질을 책임져 주시겠죠?',
    answer: (
      <p>
        바른번역은 “번역가에게는 안정적인 작업환경을, 출판사에게는 질 높은
        번역을 제공한다.”는 모토로 설립되었습니다. 따라서 번역에 문제가 있는
        번역가는 도태되도록 회원을 관리해 나가고 있습니다. 그리고 편집자
        여러분들의 피드백이 그러한 회원관리에 중요한 잣대가 되므로 기탄없이
        의견을 주시기 바랍니다.
        <br />
        <br />
        바른번역은 번역에 문제가 생길 경우 여러 가지 방법으로 대안을 제시하려
        노력하고 있습니다. <br />
        <br />
        하지만 번역이 다 끝난 후에 이의를 제기하시면 저희가 도와드리는데도
        한계가 있습니다. 바른번역은 우수한 번역가 회원들이 대접받도록 노력하고
        있지만, 담당 번역가의 원고를 바른번역에서 수정하거나 그 질을 보증하지는
        않습니다. 따라서 샘플원고를 잘 보셔야 하고, 최소한 1장원고가 납품되었을
        때 이상이 있으시면 바로 연락을 주셔야 합니다.
      </p>
    ),
  },
  {
    question: '바른 번역에서는 편집자에게 다른 도움도 주고 있다면서요?',
    answer: (
      <p>
        바른번역 회원들에게 일감을 맡겨주시는 분들께 최선의 보답은 우선 질 좋은
        번역이라고 생각합니다. 하지만 거기에서 한 걸음 더 나아가, 묻혀있는 질
        좋은 외서를 찾아내 소개해 드리는 작업을 계속해 오고 있습니다. 저희
        1백여명에 달하는 회원 번역가들이 찾아낸 양질의 도서를 기획서로 작성해서
        단골 출판사와 편집자분들에게 틈나는 대로 전달해 드리고 있습니다.
        <br />
        <br />
        그리고 저희가 번역한 책에 대해 홍보도 열심히 도와드릴 예정입니다. 저희가
        운영하는 카페와 블로그, 그리고 1만여명에 달하는 웹진 구독자를 통해서
        여러분들이 맡겨주신 책의 홍보를 적극 도와드리겠습니다.
      </p>
    ),
  },
  {
    question: '그 밖에 알아두어야 할 점은?',
    answer: (
      <p>
        바른번역은 출판사와 번역가의 직접 소통을 막지 않고 장려합니다. <br />
        그런데 편집자 가운데에는 일단 바른번역과 거래를 하고 난 뒤, 다음 작업
        때에는 해당 번역가에게 개인적으로 연락을 해서 일을 맡기려 하는 분도
        있었습니다. <br />
        <br />
        물론 저희가 번역가 개인들의 자유를 구속할 수는 없지만, 거래처로서 그러한
        행동은 바른번역의 존립을 위협하게 됩니다. 바른번역은 일방적으로 번역가의
        입장을 대변하지도, 출판사의 입장을 대변하지도 않습니다. 중개수수료로
        이득을 챙기려는 의도도 없습니다. 우리나라 최저의 중개수수료로 운영되는
        바른번역은 출판사에게 질 좋은 번역을 제공하고, 번역가에게는 안정적인
        작업환경을 조성하기 위해 여러 제도(일감지원, 번역료 대납 등)를 운영하고
        있습니다.
        <br />
        <br />
        편집자와 번역가는 한 배를 탄 동지입니다. 저희는 근시안으로 눈앞의 작은
        이익에 얽매이는 거래처나 회원을 원하지 않습니다. 장기적으로 서로가
        윈윈할 수 있는 파트너를 원합니다. 그리고 그런 출판사와 편집자 분들에게
        도움이 되도록 최선을 다해 노력하겠습니다.
      </p>
    ),
  },
];
export default function RequestQNAs({ qnas }: { qnas: any[] }) {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
      {qnas.map((item, index) => (
        <AccordionItem
          key={index}
          id={index}
          question={item.question}
          answer={item.answer}
          expanded={expanded}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}

function AccordionItem({ handleChange, expanded, id, answer, question }: any) {
  const formattedAnswer = answer
    .split('\n')
    .map((line: string, index: number) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

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
      <AccordionDetails sx={{ color: 'text.secondary' }}>
        {formattedAnswer}
      </AccordionDetails>
    </Accordion>
  );
}
