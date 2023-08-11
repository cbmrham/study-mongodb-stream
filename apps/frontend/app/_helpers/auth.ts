'use server';
import { cookies } from 'next/headers';

export async function accessToken() {
  const token = await cookies().get('token');
  if (!token || !token.value) {
    return null;
  }
  return token.value;
}
 