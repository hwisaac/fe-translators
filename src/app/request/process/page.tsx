'use client';
import PageLayout from '@/layouts/PageLayout';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
type Props = {};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const translationRequests = [
  {
    title: '번역공정',
    desc: (
      <p>
        작업 의뢰가 들어오면 적절한 번역가를 섭외합니다. <br />이 때 작업일정과
        단가, 서지정보, 원하시는 번역가의 프로필과 이력 등을 미리 전해주시면
        조건에 맞춰 최적의 번역가를 추천합니다.
        <br />
        선호하시는 번역가가 있을 경우 해당 번역가의 일정과 단가를 확인하고
        상담할 수 있습니다. (문의: 대표번호 02-338-2180)
      </p>
    ),
  },
  {
    title: '샘플번역',
    desc: (
      <p>
        책의 성격과 부합하는 번역가를 2~3명 섭외하며 샘플번역을 진행합니다.
        <br /> 샘플번역본의 분량은 번역본 기준 A4 2장으로 기간은 일주일 정도
        소요됩니다. <br />
        샘플번역 원고를 납품하여 번역가의 단가와 프로필도 함께 전해드립니다.
      </p>
    ),
  },
  {
    title: '계약진행',
    desc: <p>번역가, 단가, 일정 등 세부조항을 결정한 뒤 계약을 진행합니다.</p>,
  },
  {
    title: '중간원고 납품 (1장 원고)',
    desc: (
      <p>
        출판사의 요청과 필요에 따라 중간원고를 납품합니다. <br /> 계약서에
        중간원고에 대한 별다른 언급이 없다면 바른번역에서 '1장 원고'를
        납품합니다.
        <br /> 첫 번째 챕터 분량의 번역본을 먼저 납품하여 편집자님들께 피드백을
        요청하는 시스템입니다. 완역원고 납품 이후에 수정과정을 최소화하여
        출판사와 번역가의 피해와 비용을 줄이고자 바른번역에서 고안한 제도입니다.
        <br /> 편집자님들께서 전해주신 피드백은 번역가에게 전달되어 앞으로
        진행할 원고에 최대한 반영됩니다. 통상 2~3주 이내에는 1장원고를
        납품합니다.
      </p>
    ),
  },
  {
    title: '완역원고 납품',
    desc: (
      <p>
        정해진 날짜에 완역원고를 납품하기 위해 바른번역 매니저가 사전에 번역가의
        일정을 확인합니다. 완역원고 인도 후 번역에 이상이 있을 경우 해당
        번역가에게 수정을 요청해주세요. 원고 납품 이후에 발생하는 수정사항,
        문의사항도 끝까지 최선을 다해 작업하겠습니다.
      </p>
    ),
  },
  {
    title: '계산서 발행',
    desc: (
      <p>
        납품받으신 원고의 분량을 계산하여 알려주시면 바른번역에서 전자계산서를
        발행합니다.
        <br />
        (문의: 회계팀 02-338-2183)
      </p>
    ),
  },
];

const reviewRequests = [
  {
    title: '리뷰를 의뢰하기에 앞서',
    desc: (
      <p>
        바른번역은 거래 출판사에 한해서 리뷰를 진행하고 있습니다.
        <br />
        더불어 리뷰하신 뒤 책이 번역으로 이어질 경우 반드시 바른번역에
        의뢰해주시는 것을 전제로 하고 있습니다.
        <br />
        혹시라도 리뷰를 진행했던 번역가가 마음에 안 드실 경우 다른 번역가를
        소개해 드릴 수 있습니다.
        <br />
        바른번역에서 번역까지 진행할 경우 최초 발생한 리뷰비용은 공제해
        드립니다. 그러나 미리 정해놓으신 번역가가 있다면 바른번역에서 리뷰만
        진행하지는 않사오니 참조해주시길 바랍니다.
        <br />
        (문의: 대표번호 02-338-2180)
      </p>
    ),
  },
  {
    title: '리뷰 공정',
    desc: (
      <p>
        바른번역에 전화를 걸어 해당 도서의 검토가 가능한지 일정과 단가를 확인한
        뒤, 책을 우편이나 이메일로 보내주시면 됩니다. 리뷰작업을 진행하기에 앞서
        편집자님께서 발췌번역이나 더욱 신경써서 봐야 할 세부사항 등을
        알려주시면조금 더 만족도가 높은 리뷰원고를납품받으실 수 있습니다. 리뷰는
        보통 배송기간 제외하고 작업기간만 일주일 가량 소요됩니다. (원서 난이도와
        분량에 따라 차이가 있습니다.)
      </p>
    ),
  },
  {
    title: '리뷰원고 납품',
    desc: (
      <p>검토서 확인 후 추가 문의나 요청사항이 있으면 알려주시기 바랍니다.</p>
    ),
  },
  {
    title: '리뷰결과 통보',
    desc: (
      <p>
        리뷰서를 납품 받으신 후 해당 도서의 진행 여부를 반드시 알려주시길
        바랍니다.
      </p>
    ),
  },
];

export default function page({}: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageLayout title='의뢰 프로세스'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='번역 의뢰' style={{ fontSize: '1.3rem' }} />
        <Tab label='리뷰 의뢰' style={{ fontSize: '1.3rem' }} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <h2 className='text-3xl text-slate-500 my-10'>번역 의뢰</h2>
        <ul className='gap-5 flex flex-col'>
          {translationRequests.map((process, index) => (
            <ProcessItem
              index={index + 1}
              desc={process.desc}
              title={process.title}
            />
          ))}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h2 className='text-3xl text-slate-500 my-10'>리뷰 의뢰</h2>
        <ul className='gap-5 flex flex-col'>
          {reviewRequests.map((process, index) => (
            <ProcessItem
              index={index + 1}
              desc={process.desc}
              title={process.title}
            />
          ))}
        </ul>
      </CustomTabPanel>
    </PageLayout>
  );
}

function ProcessItem({ index, desc, title }: any) {
  return (
    <li className='flex bg-white'>
      <div className='flex items-center justify-center text-blue-400 text-4xl font-black p-10 border-r shrink-0 w-[150px]'>
        {String(index).padStart(2, '0')}
      </div>
      <div className='flex flex-col justify-center px-10 flex-1 py-10 text-slate-700'>
        <h4 className=' font-semibold text-xl mb-3 text-slate-600'>{title}</h4>
        {desc}
      </div>
    </li>
  );
}
