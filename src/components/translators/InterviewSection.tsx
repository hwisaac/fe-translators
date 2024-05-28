type Props = {
  interviews?: { question: string; answer: string }[];
};

export default function InterviewSection({ interviews }: Props) {
  if (!interviews) return null;
  return (
    <section
      className={`bg-gray-100 px-2 sm:px-10 py-4 sm:py-10 mt-10 ${
        interviews.filter((int) => int.answer).length === 0 && 'hidden'
      }`}>
      <h3 className='text-lg sm:text-3xl text-slate-600 mb-3 sm:mb-10'>
        Interview
      </h3>
      <div className='space-y-4'>
        {interviews.map(({ question, answer }) => (
          <InterviewItem key={question} question={question} answer={answer} />
        ))}
      </div>
    </section>
  );
}

function InterviewItem({ question, answer }: any) {
  if (!answer) return null;
  return (
    <div className='bg-white flex flex-col shadow px-2 sm:px-10 py-4 sm:py-8 text-lg gap-3'>
      <div className='font-semibold text-slate-700 flex items-start'>
        <p className='font-semibold text-blue-700 text-md lg:text-3xl mr-3'>
          Q
        </p>
        <span className='whitespace-pre-wrap text-sm sm:text-lg'>
          {question}
        </span>
      </div>
      <div className='text-slate-600 flex items-start'>
        <p className='font-semibold text-slate-500 text-md lg:text-3xl mr-3'>
          A
        </p>
        <p className='font-thin whitespace-pre-wrap text-sm sm:text-lg'>
          {answer}
        </p>
      </div>
    </div>
  );
}
