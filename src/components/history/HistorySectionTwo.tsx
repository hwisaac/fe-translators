'use client';
import Container from '@/layouts/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

type Props = {};
const steps = [
  {
    label: '2004',
    description: `바른번역 설립`,
  },
  {
    label: '2005',
    description: '독일어, 불어, 중국어 번역 시작',
  },
  {
    label: '2006',
    description: `사무실 확장 이전(마포구 합정동)`,
  },
  {
    label: '2007',
    description: `번역 아카데미 설립`,
  },
  {
    label: '2008',
    description: `사무실 확장 이전(마포구 서교동)`,
  },
  {
    label: '2010',
    description: `소속 번역가 100명 돌파`,
  },
  {
    label: '2011',
    description: `영상번역 교육 시작`,
  },
  {
    label: '2015',
    description: `사무실 확장 이전(마포구 당인동)`,
  },
  {
    label: '2016',
    description: `소속 번역가 200명 돌파`,
  },
  {
    label: '2019',
    description: `영상번역 사업부 신설`,
  },
  {
    label: '2021',
    description: `소속 번역가 300명 돌파`,
  },
];

export default function HistorySectionTwo({}: Props) {
  return (
    <div>
      <h1 className='text-slate-900 text-2xl sm:text-3xl mb-10 mt-10'>
        바른번역이 걸어온 길
      </h1>
      <div className='flex text-slate-800 items-center justify-center gap-[100px] pb-10'>
        <Stepper orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label} active>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
