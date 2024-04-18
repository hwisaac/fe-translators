type Props = {};

export default function AdditionalInformation({}: Props) {
  return (
    <section>
      <h2 className='border-b text-lg my-10 pb-5'>추가 정보</h2>
      <div className='flex items-center'>
        <div>필명</div>
        <input
          type='text'
          placeholder='아이디'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>사진등록</div>
        <input
          type='text'
          placeholder='아이디'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>언어</div>
        <input
          type='text'
          placeholder='아이디'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>주요분야</div>
        <input
          type='text'
          placeholder='아이디'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>스타일</div>
        <input
          type='text'
          placeholder='아이디'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>주요역서</div>
        <input
          type='text'
          placeholder='없음'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>약력</div>
        <input
          type='text'
          placeholder='없음'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
      <div className='flex items-center'>
        <div>역서</div>
        <input
          type='text'
          placeholder='없음'
          className='input input-bordered w-full max-w-xs'
        />
      </div>
    </section>
  );
}
