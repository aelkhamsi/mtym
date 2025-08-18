"use client"

import { getAdminData } from '@/api/AdminApi';
import { getAllApplications } from '@/api/ApplicationApi';
import { getAllUsers } from '@/api/UsersApi';
import { checkToken, getToken } from '@/lib/utils';
import { adminState } from '@/store/adminState';
import { applicationsState } from '@/store/applicationsState';
import { usersState } from '@/store/usersState';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil';

export const DataLoader = () => {
  const setAdminData = useSetRecoilState<any>(adminState)
  const setUsersData = useSetRecoilState<any>(usersState)
  const setApplicationsData = useSetRecoilState<any>(applicationsState)
  const router = useRouter();
  const pathname = usePathname();

  const getAdmin = () => {
    return getAdminData()
      .then((res: any) => {
        if (res?.statusCode === 200) {
          setAdminData(res.user);
        }
      })
  }

  const getUsers = () => {
    return getAllUsers()
      .then((res: any) => {
        if (res?.statusCode === 200) {
          setUsersData(res.users);
        }
      }) 
  }

  const getApplications = () => {
    return getAllApplications()
      .then((res: any) => {
        if (res?.statusCode === 200) {
          setApplicationsData(res.applications);
        }
      })
  }

  useEffect(() => {
    const token = getToken();

    if (token && checkToken(token)) {
      Promise.all([getAdmin(), getUsers(), getApplications()])
        .then(_ => {
          router.push(pathname.startsWith('/home') ? pathname : '/home');
        })
    } else {
      localStorage.removeItem('access_token');
      setAdminData({});
      router.push('/login');
    }
  }, [])

  return <></>;
}