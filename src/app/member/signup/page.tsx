'use client';
import AdditionalInformation from '@/components/member/signup/AdditionalInformation';
import InterviewInformation from '@/components/member/signup/InterviewInformation';
import PageLayout from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';

type Props = {};

const years = Array.from({ length: 2023 - 1900 + 1 }, (_, i) => 2023 - i);
const days = Array.from({ length: 31 }, (_, i) => 1 + i);
const months = Array.from({ length: 12 }, (_, i) => 1 + i);

export default function page({}: Props) {
  const [address, setAddress] = useState<any>();

  useEffect(() => {
    console.log('address1>', address);
  }, [address]);
  return (
    <PageLayout title='회원가입'>
      <h2 className='w-full border-b pb-3 text-lg mb-10'>회원가입 정보</h2>
      <div className='space-y-5'>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>아이디</div>
          <input
            type='text'
            name='username'
            placeholder='아이디'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>비밀번호</div>
          <input
            type='password'
            name='password'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>비밀번호 확인</div>
          <input
            type='password'
            name='password2'
            placeholder='********'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>이름</div>
          <input
            type='text'
            name='name'
            placeholder='이름'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>이메일</div>
          <input
            type='email'
            placeholder='translator@barunmc.com'
            className='input input-bordered w-full max-w-xs'
          />
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>핸드폰번호</div>
          <input
            type='text'
            name='phone'
            placeholder="'-' 제외"
            className='input input-bordered w-full max-w-xs'
          />
        </div>

        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>생년월일</div>
          <select className='select select-bordered w-full max-w-[130px]'>
            <option disabled selected>
              (년)
            </option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select className='select select-bordered w-full max-w-[130px]'>
            <option disabled selected>
              (월)
            </option>
            {months.map((month) => (
              <option key={`${month}month`}>{month}</option>
            ))}
          </select>
          <select className='select select-bordered w-full max-w-[130px]'>
            <option disabled selected>
              (일)
            </option>
            {days.map((day) => (
              <option key={`${day}day`}>{day}</option>
            ))}
          </select>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>성별</div>
          <label className='label cursor-pointer space-x-1 mr-3'>
            <span className='label-text'>남자</span>
            <input type='radio' name='radio-10' className='radio' />
          </label>
          <label className='label cursor-pointer space-x-1'>
            <span className='label-text'>여자</span>
            <input
              type='radio'
              name='radio-10'
              className='radio'
              defaultChecked
            />
          </label>
        </div>

        <div className='flex'>
          <div className='w-[150px] text-sm'>주소</div>
          <div className='flex flex-col gap-1'>
            <div className='flex'>
              <input
                type='text'
                name='zonecode'
                className='input input-bordered w-[400px]'
                placeholder='우편번호'
                value={address?.zonecode}
              />
              <DaumPostcodePopup setAddress={setAddress} />
            </div>

            <input
              type='text'
              placeholder='주소'
              name='address_1'
              className='input input-bordered w-[500px]'
              value={address?.address}
            />

            <input
              type='text'
              placeholder='상세 주소'
              name='address_2'
              className='input input-bordered w-[500px]'
            />
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>구독</div>

          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text mr-3 text-slate-500'>
                번역활동에 관련된 메일 및 문자 받는 것을 동의합니다.
              </span>
              <input type='checkbox' className='checkbox' />
            </label>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='w-[150px] text-sm'>정보 제공</div>

          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text mr-3 text-slate-500'>
                바른번역에 개인정보를 제공하는 것에 동의합니다.
              </span>
              <input type='checkbox' className='checkbox' />
            </label>
          </div>
        </div>
      </div>
      <div className='flex my-14'>
        <button className='btn btn-neutral btn-wide relative'>회원가입</button>
      </div>
    </PageLayout>
  );
}

const DaumPostcodePopup = ({ setAddress }: any) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.onload = () => {
      console.log('다음 주소 API 스크립트 로드 완료');
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleOpenPostcode = () => {
    // @ts-ignore
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setAddress(data);
      },
    }).open();
  };

  return (
    <button
      onClick={handleOpenPostcode}
      className='bg-slate-50 hover:bg-slate-200 transition-colors border-2 border-slate-500 text-slate-600 rounded-md w-[100px] px-4 py-1'>
      주소 검색
    </button>
  );
};
