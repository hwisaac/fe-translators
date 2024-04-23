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
      <form className='join mx-auto' onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div className='relative flex items-center'>
            <input
              className='input input-bordered join-item w-[400px]'
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
          <button className='btn join-item'>Search</button>
        </div>
      </form>
      <div className='flex gap-10'>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='checkbox'
            className='checkbox'
            checked={languageFilter.en}
            onChange={() => toggleFilter('en')}
          />
          <span className='label-text'>영어</span>
        </label>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='checkbox'
            className='checkbox'
            checked={languageFilter.jp}
            onChange={() => toggleFilter('jp')}
          />
          <span className='label-text'>일어</span>
        </label>
      </div>
      <div className='flex items-center gap-5'>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio checked:bg-blue-500'
            checked={status === ''}
            onChange={() => setStatus('')}
          />
          <span className='label-text'>전체</span>
        </label>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio checked:bg-blue-500'
            checked={status === 'open'}
            onChange={() => setStatus('open')}
          />
          <span className='label-text'>모집 중</span>
        </label>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio checked:bg-blue-500'
            checked={status === 'testing'}
            onChange={() => setStatus('testing')}
          />
          <span className='label-text'>모집 중단(샘플심사)</span>
        </label>
        <label className='label cursor-pointer space-x-2'>
          <input
            type='radio'
            name='status_radio'
            className='radio checked:bg-blue-500'
            checked={status === 'closed,completed'}
            onChange={() => setStatus('closed,completed')}
          />
          <span className='label-text'>마감</span>
        </label>
      </div>
    </div>
  );
}
