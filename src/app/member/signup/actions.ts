'use server';

import { signupSchema } from '@/app/member/signup/schema';
import BASE_URL from '@/utils/BASE_URL';
import { redirect } from 'next/navigation';

export async function postSignUp(formData: any) {
  const year = formData.get('year');
  const month = formData.get('month');
  const day = formData.get('day');
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
    password2: formData.get('password2'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    zonecode: formData.get('zonecode'),
    address1: formData.get('address1'),
    address2: formData.get('address2'),
    is_subscribed: formData.get('is_subscribed') === 'on',
    subscribed: formData.get('subscribed'),
    is_assigned: formData.get('is_assigned') === 'on',
    birth_date: `${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`,
  };
  // console.log(data);

  const result = signupSchema.safeParse(data);

  if (data.password !== data.password2) {
    throw new Error('password 가 다릅니다.');
  }

  // console.log(result);
  if (!result.success) {
    // console.log(result.error);
  }
  fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log(response);
    });
}
