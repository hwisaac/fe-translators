import PageLayout from '@/layouts/PageLayout';
import { BiMessageDetail } from 'react-icons/bi';
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
    `${BASE_URL}/users?page=${page || 1}&query=${query || ''}&language=${
      language || ''
    }&specialization=${specialization || ''}&/`,
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
      <table className='hidden sm:table'>
        <thead>
          <tr>
            <td>번역가</td>
            <td>언어</td>
            <td>분야</td>
            <td>주요 역서</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user, index: number) => (
            <tr key={`${index}-rows`}>
              <td>
                <Link
                  href={`/translators/${user.id}`}
                  className='text-sm lg:text-md'>
                  {user.pen_name ? user.pen_name : user.name}
                </Link>
              </td>
              <td className='lg:text-md text-sm'>
                {user.languages.join(', ')}
              </td>
              <td className='lg:text-md text-sm'>
                {user.specializations.join(', ')}
              </td>
              <td>
                <span className='lg:text-md text-sm'>{user.major_works}</span>
              </td>
              <td>
                <Link href={`/translators/${user.id}`} className='btn btn-sm'>
                  <span className='hidden lg:inline'>자세히</span>
                  <BiMessageDetail className='lg:hidden' />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='sm:hidden '>
        <thead></thead>
        <tbody>
          {data?.users?.map((user, index: number) => (
            <tr
              key={`${index}-rows`}
              className='w-full border-b hover:bg-gray-50 cursor-pointer'>
              <Link href={`/translators/${user.id}`} className='w-full block'>
                <td className=' font-thin text-sm space-y-1 w-full px-2 py-2'>
                  <p className='font-normal text-lg'>
                    {user.pen_name ? user.pen_name : user.name}
                  </p>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>언어</p>
                    <span>{user.languages.join(', ')}</span>
                  </div>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>주요 분야</p>
                    <span>{user.specializations.join(', ')}</span>
                  </div>
                  <div className='flex'>
                    <p className='text-blue-400 w-[90px] shrink-0'>주요 역서</p>
                    <span className='lg:text-md text-sm'>
                      {user.major_works}
                    </span>
                  </div>
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
      <TranslatorPagination count={data.total_pages} />
    </section>
  );
}
