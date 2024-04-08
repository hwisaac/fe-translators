import Container from '@/layouts/Container';
import img from '@/utils/img';
import Image from 'next/image';

import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PageLayout from '@/layouts/PageLayout';

function createData(
  id: number,
  title: string,
  author: string,
  created_at: string
) {
  return { id, title, author, created_at };
}

const rows = [
  createData(
    19,
    '바른번역 미디어/전먼번역 서비스 런칭!',
    'admin',
    '2022-08-09'
  ),
  createData(
    10,
    '바른번역미디어 유튜브 채널 오픈하였습니다!',
    'admin',
    '2022-08-09'
  ),
  createData(4, '바른번역 홈페이지 리뉴얼', 'admin', '2022-08-09'),
];

type Props = {};

export default function page({}: Props) {
  return (
    <PageLayout title='공지사항'>
      <h2 className='text-3xl text-slate-600 mb-10'>공지사항</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>번호</TableCell>
              <TableCell align='center'>제목</TableCell>
              <TableCell align='center'>작성자</TableCell>
              <TableCell align='center'>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {row.id}
                </TableCell>
                <TableCell align='left'>{row.title}</TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='w-full flex justify-center my-10'>
        <Pagination count={3} />
      </div>
    </PageLayout>
  );
}
