'use client';
import PageLayout from '@/layouts/PageLayout';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import dummyImage from '@/utils/dummyImage';
import Paper from '@mui/material/Paper';

type Props = {};

type NewBookType = {
  id: number | string;
  title: string;
  content: string;
  publisher: string;
  author: string;
  translator: string;
  thumbnail: string;
};

export default function page({}: Props) {
  const [filter, setFilter] = useState('');

  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <PageLayout title='신간안내'>
      <div className='flex items-center'>
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
      <NewBooksTable />
    </PageLayout>
  );
}

function createData(
  id: number,
  title: string,
  publisher: string,
  author: string,
  translator: string
) {
  return { id, title, author, publisher, translator, thumbnail: dummyImage };
}

const rows = [
  createData(1, '암기할 필요 없는 타로', '한스미디어', '미미코', '김수정'),
  createData(2, '암기할 필요 없는 타로', '한스미디어', '미미코', '김수정'),
  createData(3, '암기할 필요 없는 타로', '한스미디어', '미미코', '김수정'),
];

function NewBooksTable() {
  return (
    <section className='my-10'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>사진</TableCell>
              <TableCell align='center'>제목</TableCell>
              <TableCell align='center'>출판사</TableCell>
              <TableCell align='center'>저자</TableCell>
              <TableCell align='center'>번역가</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  <img src={row.thumbnail} className='h-[100px]' />
                </TableCell>
                <TableCell align='left'>{row.title}</TableCell>
                <TableCell align='center'>{row.publisher}</TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.translator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='w-full flex justify-center my-10'>
        <Pagination count={3} />
      </div>
    </section>
  );
}
