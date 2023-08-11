import { me } from './_actions/me';
import HomePage from './home';
import { redirect } from 'next/navigation';
import { accessToken } from './_actions/accessToken';

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
