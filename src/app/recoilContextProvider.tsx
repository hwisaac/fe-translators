'use client';

import React from 'react';
import { RecoilRoot, RecoilState } from 'recoil';

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
