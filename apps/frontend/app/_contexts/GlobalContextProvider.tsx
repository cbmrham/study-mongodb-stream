import { ReactNode } from 'react';
import { UserContextProvider } from './UserContext';

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};
export default GlobalContextProvider;
