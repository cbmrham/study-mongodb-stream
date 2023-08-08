import { me } from '../../../_actions/me';
import Chat from './Chat';

export default async function Page() {
  const currenUser = await me();
  return <Chat currentUser={currenUser} />;
}
