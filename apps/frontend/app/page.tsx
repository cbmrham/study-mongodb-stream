import { cookies } from 'next/headers';
import { me } from './_actions/me';
import HomePage from './home';
import { redirect } from 'next/navigation';
import { accessToken } from './_helpers/auth';

export default async function Home() {
  const token = await accessToken();
  if (!token) {
    redirect('/signin');
  }
  const currentUser = await me();
  return (
    <div>
      <HomePage currentUser={currentUser} />
    </div>
  );
}
