'use client';
type Props = {};

export default function AdminNoticeSearchForm({}: Props) {
  return (
    <div className='join mx-auto'>
      <div>
        <div>
          <input
            className='input input-bordered join-item w-[400px]'
            placeholder='Search'
          />
        </div>
      </div>
      <select className='select select-bordered join-item'>
        <option>제목</option>
        <option>내용</option>
        <option>제목+내용</option>
      </select>
      <div className='indicator'>
        <button className='btn join-item'>검색</button>
      </div>
    </div>
  );
}
