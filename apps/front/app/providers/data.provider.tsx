"use client"

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/app/store/userAtom';
import { getToken, checkToken } from '@/app/lib/utils'
import { getUserData } from '@/app/api/UsersApi';

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const initialize = async () => {
      const token = getToken();

      try {
        if (!token || !checkToken(token)) {
          throw Error()
        }

        const res = await getUserData() as any;
        if (res?.statusCode !== 200) {
          throw Error()
        }
        setUser(res.user);
      } catch {
        setUser(undefined);
      }
    };

    initialize();
  }, [setUser]);

  return <>
    {children}
  </>;
};