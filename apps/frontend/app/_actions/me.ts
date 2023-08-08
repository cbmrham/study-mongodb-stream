'use server';

import { User } from '@prisma/client/main';
import { cookies } from 'next/headers';

export async function me(): Promise<User> {
  return await fetch(`http://localhost:3000/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
      ContentType: 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      return null;
    }
    return res.json();
  });
}
