import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { User } from '@supabase/supabase-js';

type UserContextProps = { user?: User | null };

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ ssrUserData, children }: any) => {
  const [ ssrUser, setSsrUser ] = useState<User | null>(ssrUserData);
  const { user: supabaseAuthUser } = useUser(); // supabase-auth-helpers
  
  // use user data as fallback
  const user = supabaseAuthUser || ssrUser || null

  // once auth-helpers user is available, remove  user data
  useEffect(() => { 
    if(ssrUser && supabaseAuthUser) setSsrUser(null) 
  }, [supabaseAuthUser]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};