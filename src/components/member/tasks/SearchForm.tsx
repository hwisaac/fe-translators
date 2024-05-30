'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

type Props = {};
type FilterType = {
  en: boolean;
  jp: boolean;
};

type StatusType = '' | 'open' | 'closed,completed' | 'testing';
export default function SearchForm({}: Props) {
  const [status, setStatus] = useState<StatusType>('');
  const [query, setQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<FilterType>({
    en: false,
    jp: false,
  });
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const activeFilters = Object.entries(languageFilter)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    const language = activeFilters.join(',');
    router.push(
      `/member/tasks?page=1&query=${query}&language=${language}&status=${status}`
    );
  };

  const toggleFilter = (key: keyof FilterType) => {
    setLanguageFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className='flex gap-10'>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='checkbox'
            className='checkbox checkbox-xs sm:checkbox-md'
            checked={languageFilter.en}
            onChange={() => toggleFilter('en')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>영어</span>
        </label>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='checkbox'
            className='checkbox checkbox-xs sm:checkbox-md'
            checked={languageFilter.jp}
            onChange={() => toggleFilter('jp')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>일어</span>
        </label>
      </div>
      <div className='flex items-center gap-2 sm:gap-5'>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio radio-xs sm:radio-sm lg:radio-md checked:bg-blue-500 '
            checked={status === ''}
            onChange={() => setStatus('')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>전체</span>
        </label>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio radio-xs sm:radio-sm lg:radio-md checked:bg-blue-500'
            checked={status === 'open'}
            onChange={() => setStatus('open')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>모집 중</span>
        </label>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio radio-xs sm:radio-sm lg:radio-md checked:bg-blue-500'
            checked={status === 'testing'}
            onChange={() => setStatus('testing')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>
            모집 중단(샘플심사)
          </span>
        </label>
        <label className='label cursor-pointer space-x-1 sm:space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio radio-xs sm:radio-sm lg:radio-md checked:bg-blue-500'
            checked={status === 'closed,completed'}
            onChange={() => setStatus('closed,completed')}
          />
          <span className='text-xs sm:text-sm lg:text-md'>마감</span>
        </label>
      </div>
      <form className='join mx-auto mt-4' onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className='relative flex items-center'>
            <input
              className='input input-sm lg:input-md input-bordered join-item w-full sm:w-[350px]'
              placeholder='Search'
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />

            {query && (
              <IoMdCloseCircle
                className='absolute right-3 cursor-pointer text-slate-500'
                size={23}
                onClick={() => setQuery('')}
              />
            )}
          </div>
        </div>
        <div className='indicator'>
          <button className='btn btn-neutral btn-sm lg:btn-md join-item'>
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
}
