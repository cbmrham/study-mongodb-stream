'use client';
import { ReactNode, createContext, useState } from 'react';

export type User = {
  id?: string;
  uid: string;
  email: string;
  name: string;
};

export type UserContext = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

export const UserContext = createContext<UserContext>([null, () => null]);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};
