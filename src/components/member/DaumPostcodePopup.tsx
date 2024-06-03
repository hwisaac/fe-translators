'use client';

import { useEffect } from 'react';

type Props = {
  setValue: any;
};

export default function DaumPostcodePopup({ setValue }: Props) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      // console.log('다음 주소 API 스크립트 로드 완료');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleOpenPostcode = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setValue('zonecode', data.zonecode);
        setValue('address1', data.address);
        setValue('address2', '');
      },
    }).open();
  };

  return (
    <div
      onClick={(e) => handleOpenPostcode(e)}
      className='bg-slate-50 hover:bg-slate-200 transition-colors border-2 border-slate-500 text-slate-600 rounded-md w-[100px] px-4 py-1 cursor-pointer flex items-center justify-center join-item'>
      주소 검색
    </div>
  );
}
