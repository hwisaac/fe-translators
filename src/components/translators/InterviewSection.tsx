type Props = {
  interviews: { question: string; answer: string }[];
};

export default function InterviewSection({ interviews }: Props) {
  return (
    <section
      className={`bg-gray-100 px-10 py-10 ${
        interviews.filter((int) => int.answer).length === 0 && 'hidden'
      }`}>
      <h3 className='text-3xl text-slate-600 mb-10'>Interview</h3>
      <div className=' space-y-4'>
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
    <div className='bg-white flex flex-col shadow px-10 py-8 text-lg gap-3'>
      <div className='font-semibold text-slate-700 flex items-center'>
        <p className='font-semibold text-blue-700 text-3xl mr-3'>Q</p>
        {question}
      </div>
      <div className='text-slate-600 flex items-center'>
        <p className='font-semibold text-slate-500 text-3xl mr-3'>A</p>
        {answer}
      </div>
    </div>
  );
}
