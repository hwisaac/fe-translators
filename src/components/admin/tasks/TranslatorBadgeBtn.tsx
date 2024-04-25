'use client';

import { CommentType } from '@/components/admin/tasks/AdminComments';
import { toast } from 'react-toastify';

type Props = {
  comment?: CommentType;
};

export default function TranslatorBadgeBtn({ comment }: Props) {
  if (!comment) return null;
  const author = comment.author;
  console.log(author);
  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${text}가 복사되었습니다.`);
      })
      .catch((err) => {
        console.error('클립보드 복사에 실패했습니다.', err);
      });
  };
  return (
    <div className='dropdown'>
      <div
        tabIndex={0}
        role='button'
        className={`btn btn-sm btn-ghost ${
          author.gender === 'male' ? 'text-blue-800' : 'text-pink-700'
        }`}>{`${author.username}(${author.name})`}</div>
      <ul
        tabIndex={0}
        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-[300px]'>
        <li>
          <span>샘플 번역가 지정</span>
        </li>
        <li>
          <span>담당 번역가 지정</span>
        </li>
        {author.email && (
          <li onClick={() => handleCopy(author.email)}>
            <span>{author.email}</span>
          </li>
        )}
        {author.phone && (
          <li onClick={() => handleCopy(author.phone)}>
            <span>{author.phone}</span>
          </li>
        )}
        {author.languages.length > 0 && (
          <li>
            <span>
              {author.languages.map(({ name }: any) => name).join(' / ')}
            </span>
          </li>
        )}
        <li>
          <p>{author.tags.map(({ name }: any) => `#${name}`).join(' ')}</p>
        </li>
      </ul>
    </div>
  );
}
