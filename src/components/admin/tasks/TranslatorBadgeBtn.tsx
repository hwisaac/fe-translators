'use client';

import { CommentType } from '@/components/admin/tasks/AdminComments';
import { toast } from 'react-toastify';

type Props = {
  comment?: CommentType;
};

export default function TranslatorBadgeBtn({ comment }: Props) {
  if (!comment) return null;
  const author = comment.author;
  console.log(author, 'author');
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
      <div className='flex items-center'>
        <div
          tabIndex={0}
          role='button'
          className={`btn btn-sm btn-ghost ${
            author.gender === 'male' ? 'text-blue-800' : 'text-pink-700'
          }`}>{`${author.username}(${author.name})`}</div>
        <ul className='flex gap-1'>
          {author?.tags?.map((tags, index) => (
            <li
              key={`${index}${author.name}${comment.id}-tag`}
              className='text-sm rounded-full px-2 py-1 border'>
              # {tags.name}
            </li>
          ))}
        </ul>
      </div>
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
        {author.tags.length > 0 && (
          <li>
            <p>{author.tags.map(({ name }: any) => `#${name}`).join(' ')}</p>
          </li>
        )}
        <li>
          <p>상세 정보</p>
        </li>
      </ul>
    </div>
  );
}
