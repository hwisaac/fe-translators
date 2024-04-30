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
import TranslatorSearchForm from '@/components/translators/TranslatorSearchForm';
import Link from 'next/link';
import { formatLink } from '@/utils/formatLink';
import TranslatorPagination from '@/components/translators/TranslatorPagination';
import BASE_URL from '@/utils/BASE_URL';

type Props = {
  searchParams: {
    page: string;
    query: string;
    language: string;
    specialization: string;
  };
};
type GetUsersType = {
  page: number;
  total_pages: number;
  total_items: number;
  users: UserType[];
};
type UserType = {
  id: number;
  username: string;
  name: string;
  pen_name: string;
  major_works: string;
  biography: string;
  works: string;
  is_public: true;
  languages: string[];
  styles: string[];
  specializations: string[];
  tags: string[];
};
export default async function page({
  searchParams: { page, query, language, specialization },
}: Props) {
  const data: GetUsersType = await fetch(
    `${BASE_URL}/users?page=${page}&query=${query}&language=${language}&specialization=${specialization}&/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());
  const checkBoxes = await fetch(`${BASE_URL}/users/check-boxes/`, {
    cache: 'no-cache',
  }).then((res) => res.json());

  return (
    <PageLayout title='번역가 소개'>
      <TranslatorSearchForm checkBoxes={checkBoxes} />
      <TranslatorTable data={data} />
    </PageLayout>
  );
}

function TranslatorTable({ data }: { data: GetUsersType }) {
  return (
    <section className='py-10 flex flex-col w-full gap-3'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, width: 200 }} align='center'>
                번역가
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                언어
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                분야
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}>
                주요 역서
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 700 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((user, index: number) => (
              <TableRow
                key={`${index}-rows`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  <Link
                    href={`/translators/${user.id}`}
                    className='text-[16px]'>
                    {user.pen_name ? user.pen_name : user.name}
                  </Link>
                </TableCell>
                <TableCell align='left'>{user.languages.join(', ')}</TableCell>
                <TableCell align='center'>
                  {user.specializations.join(', ')}
                </TableCell>
                <TableCell align='center'>{user.major_works}</TableCell>

                <TableCell align='center'>
                  <Link href={`/translators/${user.id}`} className='btn btn-sm'>
                    자세히
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TranslatorPagination count={data.total_pages} />
    </section>
  );
}
