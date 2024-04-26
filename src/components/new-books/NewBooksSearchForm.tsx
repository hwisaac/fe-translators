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
  const [option, setOption] = useState('');
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleOption = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query, option);
    router.push(`/new-books?page=1&query=${query}&option=${option}`);
  };

  return (
    <div className='flex items-center'>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-standard-label'>필터</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={option}
          onChange={handleOption}
          label='옵션'>
          <MenuItem value=''>None</MenuItem>
          <MenuItem value={'title'}>제목</MenuItem>
          <MenuItem value={'description'}>내용</MenuItem>
          <MenuItem value={'publisher'}>출판사</MenuItem>
          <MenuItem value={'author'}>저자</MenuItem>
          <MenuItem value={'translator'}>번역가</MenuItem>
        </Select>
      </FormControl>
      <form
        className='flex items-center gap-3'
        onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id='standard-basic'
          label='검색어'
          variant='standard'
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          sx={{ width: '400px' }}
        />

        <button className='btn btn-sm btn-neutral relative top-2'>검색</button>
      </form>
    </div>
  );
}
