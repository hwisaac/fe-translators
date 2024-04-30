'use client';

import BASE_URL from '@/utils/BASE_URL';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

type Props = {
  checkBoxes: {
    languages: { name: string; id: number }[];
    specializations: { name: string; id: number }[];
  };
};

type FilterType = {
  [name: string]: boolean;
};
type StatusType = '' | 'open' | 'closed,completed' | 'testing';

export default function TranslatorSearchForm({ checkBoxes }: Props) {
  const [query, setQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<any>({});
  const [specializationFilter, setSpecializationFilter] = useState<any>({});
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const activeLanguageFilters = Object.entries(languageFilter)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    const language = activeLanguageFilters.join(',');

    const activeSpecializationFilter = Object.entries(specializationFilter)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    const specialization = activeSpecializationFilter.join(',');
    router.push(
      `/translators?page=1&query=${query}&language=${language}&specialization=${specialization}`
    );
  };

  const toggleLanguageFilter = (name: keyof FilterType) => {
    if (languageFilter[name]) {
      setLanguageFilter((prev: any) => ({ ...prev, [name]: !prev[name] }));
    } else {
      setLanguageFilter((prev: any) => ({ ...prev, [name]: true }));
    }
  };

  const toggleSpecializationFilter = (name: keyof FilterType) => {
    // 로직 작성 필요
    if (specializationFilter[name]) {
      setSpecializationFilter((prev: any) => ({
        ...prev,
        [name]: !prev[name],
      }));
    } else {
      setSpecializationFilter((prev: any) => ({ ...prev, [name]: true }));
    }
  };

  return (
    <div>
      <div className='flex gap-5 items-center'>
        <p className='font-semibold'>언어별</p>
        {checkBoxes?.languages?.map((item: { id: number; name: string }) => (
          <label key={item.id} className='label cursor-pointer space-x-2'>
            <input
              type='checkbox'
              className='checkbox'
              checked={languageFilter[item.name] || false}
              onChange={() => toggleLanguageFilter(item.name)}
            />
            <span className='label-text'>{item.name}</span>
          </label>
        ))}
      </div>
      <div className='flex items-center gap-5 mb-3'>
        <p className='font-semibold'>분야별</p>
        {checkBoxes?.specializations?.map(
          (item: { id: number; name: string }) => (
            <label
              key={`${item.name}-specialization`}
              className='label cursor-pointer space-x-2'>
              <input
                type='checkbox'
                className='checkbox'
                checked={specializationFilter[item.name] || false}
                onChange={() => toggleSpecializationFilter(item.name)}
              />
              <span className='label-text'>{item.name}</span>
            </label>
          )
        )}
      </div>
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
          <button className='btn join-item'>검색하기</button>
        </div>
      </form>
    </div>
  );
}
