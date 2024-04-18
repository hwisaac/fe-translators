'use client';
import PageLayout from '@/layouts/PageLayout';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { SyntheticEvent, useState } from 'react';
import TranslatorGuidePanel from '@/components/participation-guide/TranslatorGuidePanel';
import TranslatorGuideQNAPanel from '@/components/participation-guide/TranslatorGuideQNAPanel';

type Props = {};

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function page({}: Props) {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageLayout title='번역가 참여안내'>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='번역가 참여안내' style={{ fontSize: '1.3rem' }} />
        <Tab label='Q&A' style={{ fontSize: '1.3rem' }} />
      </Tabs>
      <TranslatorGuidePanel value={value} />

      <TranslatorGuideQNAPanel value={value} />
    </PageLayout>
  );
}

