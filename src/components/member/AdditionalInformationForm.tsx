'use client';
import useMe from '@/app/hooks/useMe';
import useToken from '@/app/hooks/useToken';
import PageLayout from '@/layouts/PageLayout';
import BASE_URL from '@/utils/BASE_URL';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
type Props = {
  checkBoxes: CheckBoxesType;
  interviewQuestions: InterviewQuestionType[];
};
type NameType = {
  id: string;
  name: string;
};

type CheckBoxesType = {
  specializations: NameType[];
  styles: NameType[];
  languages: NameType[];
};
type InterviewQuestionType = {
  id: number;
  question: string;
  description: string;
};

export default function AdditionalInformationForm({
  checkBoxes,
  interviewQuestions,
}: Props) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>('');
  const token = useToken();
  const { data: me } = useMe();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const watchedPhoto = watch('photo');
  useEffect(() => {
    if (watchedPhoto && watchedPhoto.length > 0) {
      const file = watchedPhoto[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  }, [watchedPhoto]);

  const { isPending, mutateAsync: putInfos } = useMutation({
    mutationFn: (formData: any) =>
      axios.put(`${BASE_URL}/users/additional-information/`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: () => {
      toast.success('저장되었습니다.');
      router.push('/member/my-page');
    },
    onError: (err) => {
      toast.error('변경 에러');
    },
  });

  useEffect(() => {
    if (me) {
      setValue('pen_name', me.pen_name);
      setValue('major_works', me.major_works);
      setValue('biography', me.biography);
      setValue('works', me.works);
      me.languages.forEach((id: number) => {
        setValue(`language_${id}`, true);
      });
      me.styles.forEach((id: number) => {
        setValue(`style_${id}`, true);
      });
      me.specializations.forEach((id: number) => {
        setValue(`specialization_${id}`, true);
      });
      setValue('is_public', me.is_public);
      me.interviews.forEach(({ question_id, answer }: any) => {
        setValue(`question_${question_id}`, answer);
      });
      setImagePreview(`http://127.0.0.1:8000${me.photo}`);
    }
  }, [me]);

  const onValid = (data: any) => {
    const formData = new FormData();
    formData.append('pen_name', data.pen_name);
    if (data.photo.length) {
      formData.append('photo', data.photo[0]);
    }
    formData.append('major_works', data.major_works);
    formData.append('biography', data.biography);
    formData.append('works', data.works);
    formData.append('is_public', data.is_public);

    // 다대다 관계 필드 처리
    const languages = checkBoxes.languages
      .filter((lang, index) => data[`language_${lang.id}`])
      .map((lang) => lang.id);
    const styles = checkBoxes.styles
      .filter((style, index) => data[`style_${style.id}`])
      .map((style) => style.id);
    const specializations = checkBoxes.specializations
      .filter((spec, index) => data[`specialization_${spec.id}`])
      .map((spec) => spec.id);

    const interviews = interviewQuestions.map(({ id }: any) => ({
      id,
      answer: data[`question_${id}`],
    }));

    // 배열을 JSON 문자열로 변환하여 전송
    formData.append('languages', JSON.stringify(languages));
    formData.append('styles', JSON.stringify(styles));
    formData.append('specializations', JSON.stringify(specializations));
    formData.append('interviews', JSON.stringify(interviews));

    putInfos(formData);
  };

  return (
    <form className='space-y-5 w-[600px]' onSubmit={handleSubmit(onValid)}>
      <h2 className='text-2xl my-4'>추가 정보</h2>
      <div className='flex items-center '>
        <div className='w-[150px] text-sm'>필명</div>
        <input
          type='text'
          placeholder='필명'
          className='input input-bordered w-full'
          {...register('pen_name')}
        />
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>사진 등록</div>
        <input
          type='file'
          className='file-input file-input-bordered w-full max-w-xs'
          {...register('photo')}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt='미리보기'
            className='ml-2'
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        )}
      </div>

      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>언어</div>

        <div className='form-control flex '>
          {checkBoxes?.languages?.map((language: NameType, index: number) => (
            <label className='label cursor-pointer' key={`language-${index}`}>
              <span className='label-text mr-3 text-slate-500'>
                {language.name}
              </span>
              <input
                type='checkbox'
                className='checkbox checkbox-warning'
                {...register(`language_${language.id}`)}
              />
            </label>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>주요 분야</div>

        <div className='form-control flex '>
          {checkBoxes?.specializations?.map(
            (specialization: NameType, index: number) => (
              <label
                className='label cursor-pointer'
                key={`specialization-${index}`}>
                <span className='label-text mr-3 text-slate-500'>
                  {specialization.name}
                </span>
                <input
                  type='checkbox'
                  className='checkbox checkbox-accent'
                  {...register(`specialization_${specialization.id}`)}
                />
              </label>
            )
          )}
        </div>
      </div>

      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>글 스타일</div>

        <div className='form-control flex '>
          {checkBoxes?.styles?.map((style: NameType, index: number) => (
            <label className='label cursor-pointer' key={`style-${index}`}>
              <span className='label-text mr-3 text-slate-500'>
                {style.name}
              </span>
              <input
                type='checkbox'
                className='checkbox checkbox-success'
                {...register(`style_${style.id}`)}
              />
            </label>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>주요역서</div>

        <div className='form-control w-full'>
          <label className='form-control'>
            <div className='label'>
              <span className='label-text-alt'>1~3 작품 제목만</span>
            </div>
            <textarea
              className='textarea textarea-bordered h-24 w-full'
              placeholder='주요역서'
              {...register('major_works')}
            />
          </label>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>약력</div>
        <div className='form-control w-full'>
          <label className='form-control'>
            <textarea
              className='textarea textarea-bordered h-24 w-full'
              placeholder='약력'
              {...register('biography')}
            />
          </label>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>역서</div>
        <div className='form-control w-full'>
          <label className='form-control'>
            <textarea
              className='textarea textarea-bordered h-24 w-full'
              placeholder='역서'
              {...register('works')}
            />
          </label>
        </div>
      </div>

      <div>
        <h2 className='text-2xl my-4'>인터뷰</h2>
        <div className='w-full flex flex-col gap-10'>
          {interviewQuestions?.map(({ question, description, id }, index) => (
            <div key={`question-${id}`} className='flex flex-col'>
              <h4 className=''>{`${String(index + 1).padStart(
                2,
                '0'
              )}. ${question}`}</h4>
              <p className='text-sm text-slate-500 mb-4'>
                {description} ({id})
              </p>
              <input
                type='textarea'
                className='textarea textarea-bordered textarea-lg w-full'
                {...register(`question_${id}`)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='w-[150px] text-sm'>자기 PR 공개</div>

        <div className='form-control'>
          <label className='label cursor-pointer'>
            <span className='label-text mr-3 text-slate-500'>
              이 페이지에서 작성된 정보를 웹사이트에 게시합니다
            </span>
            <input
              type='checkbox'
              className='checkbox'
              {...register('is_public')}
            />
          </label>
        </div>
      </div>
      <button className='btn btn-neutral btn-wide relative top-5'>
        {isPending ? (
          <span className='loading loading-spinner loading-xs' />
        ) : (
          `저장`
        )}
      </button>
    </form>
  );
}
