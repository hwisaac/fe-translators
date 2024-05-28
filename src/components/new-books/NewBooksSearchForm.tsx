'use client';
import PageLayout from '@/layouts/PageLayout';
import { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
type Props = {};

export default function NewBooksSearchForm({}: Props) {
  const [option, setOption] = useState('translator');
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleOption = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/new-books?page=1&query=${query}&option=${option}`);
  };

  return (
    <div className='flex items-center'>
      <form
        className='flex flex-col sm:flex-row items-center gap-3 sm:gap-0 w-full'
        onSubmit={(e) => handleSubmit(e)}>
        <div className='flex w-full  sm:max-w-[500px] mt-4'>
          <FormControl variant='standard' sx={{ minWidth: 80 }}>
            <InputLabel id='demo-simple-select-standard-label'>필터</InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={option}
              onChange={handleOption}
              label='옵션'>
              <MenuItem value={'translator'}>번역가</MenuItem>
              <MenuItem value={'title'}>제목</MenuItem>
              <MenuItem value={'description'}>내용</MenuItem>
              <MenuItem value={'publisher'}>출판사</MenuItem>
              <MenuItem value={'author'}>저자</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id='standard-basic'
            label='검색어'
            variant='standard'
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            sx={{ width: '100%' }}
          />
        </div>
        {/* <div className='w-full bg-red-500 h-10'></div> */}
        <button className='bg-[#333333] text-white w-full sm:w-[200px] py-3'>
          검색하기
        </button>
      </form>
    </div>
  );
}
