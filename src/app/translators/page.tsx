'use client';
import PageLayout from '@/layouts/PageLayout';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

type Props = {};

export default function page({}: Props) {
  const [filter, setFilter] = useState('');

  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <PageLayout title='번역가 소개'>
      <div className='flex items-center my-10'>
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-standard-label'>필터</InputLabel>
          <Select
            labelId='demo-simple-select-standard-label'
            id='demo-simple-select-standard'
            value={filter}
            onChange={handleFilter}
            label='필터'>
            <MenuItem value=''>None</MenuItem>
            <MenuItem value={'title'}>제목</MenuItem>
            <MenuItem value={'content'}>내용</MenuItem>
            <MenuItem value={'titleContent'}>제목+내용</MenuItem>
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
            sx={{ width: '400px' }}
          />

          <Button variant='contained' size='small' className='relative top-2'>
            검색
          </Button>
        </form>
      </div>
      <SearchFilters />
      <TranslatorTable />
    </PageLayout>
  );
}

function SearchFilters() {
  return (
    <section className='flex flex-col'>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>언어별</FormLabel>
        <FormGroup aria-label='position' row>
          <FormControlLabel
            value='english'
            control={<Checkbox />}
            label='영어'
            labelPlacement='end'
          />
          <FormControlLabel
            value='japanese'
            control={<Checkbox />}
            label='일어'
            labelPlacement='end'
          />
          <FormControlLabel
            value='german'
            control={<Checkbox />}
            label='독어'
            labelPlacement='end'
          />
          <FormControlLabel
            value='chinese'
            control={<Checkbox />}
            label='중국어'
            labelPlacement='end'
          />
          <FormControlLabel
            value='french'
            control={<Checkbox />}
            label='불어'
            labelPlacement='end'
          />
          <FormControlLabel
            value='etc'
            control={<Checkbox />}
            label='그 외 언어'
            labelPlacement='end'
          />
        </FormGroup>
      </FormControl>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>분야별</FormLabel>
        <FormGroup aria-label='position' row>
          <FormControlLabel
            value='humanitiesSocial'
            control={<Checkbox />}
            label='인문사회'
            labelPlacement='end'
          />
          <FormControlLabel
            value='economicsManagement'
            control={<Checkbox />}
            label='경제경영'
            labelPlacement='end'
          />
          <FormControlLabel
            value='selfImprovement'
            control={<Checkbox />}
            label='자기계발'
            labelPlacement='end'
          />
          <FormControlLabel
            value='literature'
            control={<Checkbox />}
            label='문학(소설/에세이)'
            labelPlacement='end'
          />
          <FormControlLabel
            value='scienceTechnology'
            control={<Checkbox />}
            label='과학/기술'
            labelPlacement='end'
          />
          <FormControlLabel
            value='healthHobby'
            control={<Checkbox />}
            label='건강/취미실용'
            labelPlacement='end'
          />
          <FormControlLabel
            value='childEducation'
            control={<Checkbox />}
            label='아동/자녀교육'
            labelPlacement='end'
          />
        </FormGroup>
      </FormControl>
    </section>
  );
}

const columns: GridColDef[] = [
  { field: 'id', headerName: '아이디', width: 70 },
  { field: 'name', headerName: '이름', width: 130 },
  { field: 'language', headerName: '언어', width: 130 },
  {
    field: 'email',
    headerName: '이메일',
    width: 90,
  },
  {
    field: 'birth',
    headerName: '생년월일',
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, name: 'Snow', email: 'Jon', birth: '19850614', language: '영어' },
  {
    id: 2,
    name: 'Lannister',
    email: 'Cersei',
    birth: '19850614',
    language: '영어',
  },
  {
    id: 3,
    name: 'Lannister',
    email: 'Jaime',
    birth: '19850614',
    language: '영어',
  },
  { id: 4, name: 'Stark', email: 'Arya', birth: '19850614', language: '영어' },
  {
    id: 5,
    name: 'Targaryen',
    email: 'Daenerys',
    birth: '19850614',
    language: '영어',
  },
  {
    id: 6,
    name: 'Melisandre',
    email: null,
    birth: '19850614',
    language: '영어',
  },
  {
    id: 7,
    name: 'Clifford',
    email: 'Ferrara',
    birth: '19850614',
    language: '영어',
  },
  {
    id: 8,
    name: 'Frances',
    email: 'Rossini',
    birth: '19850614',
    language: '영어',
  },
  {
    id: 9,
    name: 'Roxie',
    email: 'Harvey',
    birth: '19850614',
    language: '영어',
  },
];

function TranslatorTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
