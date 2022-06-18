import React, { createContext, useState, useEffect } from 'react';
import { supabaseClient } from '../clients/supabase';
import { User } from '@supabase/supabase-js';

type UserContextProps = { user?: User | null };

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: any) => {
  const [ user, setUser ] = useState<User | null>(supabaseClient.auth.user());

  useEffect(() => {
    // set initaial user data
    setUser(supabaseClient.auth.user());

    // listen and updated auth state changes
    supabaseClient.auth.onAuthStateChange((event, _session) => { 
      if(event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setUser(supabaseClient.auth.user())
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};