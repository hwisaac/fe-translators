import * as React from 'react';
import AdminNoticeTable from '@/components/admin/notice/AdminNoticeTable';
import AdminNoticeSearchForm from '@/components/admin/notice/AdminNoticeSearchForm';

type Props = {
  searchParams: { page: number };
};

export default function AdminNoticePage({ searchParams: { page } }: Props) {
  return (
    <div className='flex flex-col items-center py-10'>
      <AdminNoticeSearchForm />
      <AdminNoticeTable />
    </div>
  );
}

