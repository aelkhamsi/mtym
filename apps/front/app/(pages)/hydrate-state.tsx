"use client"

import { User } from '@mdm/types';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom } from '../store/userAtom';

export default function HydrateState({
  user,
}:{
  user: User|null;
}) {
  const setUser = useSetAtom(userAtom)
  
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}