import { useEffect, useState } from 'react';

type Props = {};

export default function useIsTranslator() {
  const [isTranslator, setIsTranslator] = useState<boolean>(false);

  useEffect(() => {
    const is_translator = localStorage.getItem('is_translator');
    setIsTranslator(is_translator === 'true');
  }, []);

  const saveIsTranslator = (is_translator: string | boolean) => {
    localStorage.setItem('is_translator', String(is_translator));
    if (typeof is_translator === 'string') {
      setIsTranslator(is_translator === 'true');
    } else {
      setIsTranslator(is_translator);
    }
  };

  // 토큰을 삭제하는 함수
  const removeIsTranslator = () => {
    localStorage.removeItem('is_translator');
    setIsTranslator(false);
  };

  return { isTranslator, saveIsTranslator, removeIsTranslator };
}
