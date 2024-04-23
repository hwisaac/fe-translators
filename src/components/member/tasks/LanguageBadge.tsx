type Props = {};

export default function LanguageBadge({ language }: { language: 'en' | 'jp' }) {
  if (language === 'en') {
    return (
      <span className='border rounded-full border-blue-800 text-blue-800 text-sm px-2 py-1'>
        영어
      </span>
    );
  }
  if (language === 'jp') {
    return (
      <span className='border rounded-full border-pink-800 text-pink-800 text-sm px-2 py-1'>
        일본어
      </span>
    );
  }
  return <span>{language}</span>;
}
