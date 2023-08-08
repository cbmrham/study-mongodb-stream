import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function authorized() {
  const token = await cookies().get('token');
  if (!token) {
    redirect('/signin');
  }
  return token.value;
}
