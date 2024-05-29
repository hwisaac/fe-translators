import { TaskType } from '@/components/my-page/MyTasks';

export const COMMENT_LIMIT = 5;

export const isDev = process.env.NEXT_PUBLIC_IS_DEV === 'true';

export const evalLanguage = (lang: 'en' | 'jp'): string => {
  if (lang === 'en') return '영어';
  return '일본어';
};

export const evalStatus = (task: TaskType): string => {
  const taskStatus = task.status;
  const comments = task.comments;
  if (taskStatus === 'open' && comments.length === 0) {
    return '지원 가능';
  } else if (taskStatus === 'open' && comments.length !== 0) {
    return '지원중';
  }
  const commentStatus = comments[0].status;

  switch (commentStatus) {
    case 'assigned_translator':
      return '담당번역가';
    case 'sample_translator':
      return '샘플번역가';
    case 'assigned_to_other':
      return '타번역가에 샘플 할당';
    case 'completed':
      return '마감';
  }
  switch (taskStatus) {
    case 'closed':
      return '종료';
    case 'completed':
      return '마감 - 타번역가에 번역 할당';
    case 'testing':
      return '타번역가에 샘플 할당';
  }
  return taskStatus;
  // taskStatus !== 'open'
};
