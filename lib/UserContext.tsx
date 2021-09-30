import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/gotrue-js";
import supabase from "@/utils/supabaseClient";
import Router from "next/router";

export type IUserSession = {
  session: Session | null;
  userLoaded: boolean;
  user: User | null | undefined;
  signOut: () => Promise<void>;
};

const UserContext = createContext<IUserSession>({
  session: null,
  userLoaded: false,
  user: null,
  signOut: async function () {},
});

export const useUserContext = () => useContext(UserContext);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null as User | null | undefined);
  const [session, setSession] = useState(null as Session | null);

  useEffect(() => {
    //Init session
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setUserLoaded(session ? true : false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        setUserLoaded(!!currentUser);
      }
    );
    //Clean up
    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    Router.push("/");
  };

  return (
    <UserContext.Provider value={{ session, userLoaded, user, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
