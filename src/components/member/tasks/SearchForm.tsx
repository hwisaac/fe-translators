'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {};
type FilterType = {
  en: boolean;
  jp: boolean;
};

export default function SearchForm({}: Props) {
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
    router.push(`/member/tasks?page=1&query=${query}&language=${language}`);
  };

  const toggleFilter = (key: keyof FilterType) => {
    setLanguageFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <form className='join mx-auto' onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <input
              className='input input-bordered join-item w-[400px]'
              placeholder='Search'
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
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
    </div>
  );
}
