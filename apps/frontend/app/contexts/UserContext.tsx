'use client';
import { User } from '@prisma/client/main';
import { ReactNode, createContext, useState } from 'react';

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
