import PageLayout from '@/layouts/PageLayout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FormEvent, useState } from 'react';
import dummyImage from '@/utils/dummyImage';
import Paper from '@mui/material/Paper';
import { GetNewBooksType, NewBookType } from '@/components/home/SectionTwo';
import BASE_URL from '@/utils/BASE_URL';
import getImgUrl from '@/utils/getImgUrl';
import Link from 'next/link';
import NewBooksPagination from '@/components/new-books/NewBooksPagination';
import NewBooksSearchForm from '@/components/new-books/NewBooksSearchForm';

type Props = {
  searchParams: { page: string; query: string; option: string };
};

type NewBookDetailType = {
  id: number | string;
  title: string;
  content: string;
  publisher: string;
  author: string;
  translator: string;
  thumbnail: string;
};

export default async function page({
  searchParams: { page, query, option },
}: Props) {
  const data: GetNewBooksType = await fetch(
    `${BASE_URL}/new-books?page=${page || 1}&query=${query || ''}&option=${
      option || ''
    }&/`,
    {
      cache: 'no-cache',
    }
  ).then((res) => res.json());

  return (
    <PageLayout title='신간안내'>
      <NewBooksSearchForm />
      <NewBooksTable
        new_books={data?.new_books ?? []}
        total_pages={data.total_pages}
      />
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

function NewBooksTable({
  new_books,
  total_pages,
}: {
  new_books: NewBookType[];
  total_pages: number;
}) {
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
            {new_books.map((book) => (
              <TableRow
                key={book.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  <Link href={`/new-books/${book.id}`}>
                    <img
                      src={getImgUrl(book.thumbnail)}
                      className='h-[100px]'
                    />
                  </Link>
                </TableCell>
                <TableCell align='left'>
                  <Link href={`/new-books/${book.id}`} className='link'>
                    {book.title}
                  </Link>
                </TableCell>
                <TableCell align='center'>{book.publisher}</TableCell>
                <TableCell align='center'>{book.author}</TableCell>
                <TableCell align='center'>{book.translator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewBooksPagination total_pages={total_pages} />
    </section>
  );
}
