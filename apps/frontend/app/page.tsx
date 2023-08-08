import { authorized } from './_helpers/auth';
import Home from './home';
import { me } from './_actions/me';

export const Page = async (props: { children: React.ReactNode }) => {
  authorized();
  const currenUser = await me();
  return (
    <div>
      <Home currentUser={currenUser} />
    </div>
  );
};
export default Page;
