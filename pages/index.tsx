import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import Account from "../components/Account";
import Splash from "@/components/Auth/Splash";
import { Session } from "@supabase/gotrue-js";

export default function Home() {
  const [session, setSession] = useState(null as Session | null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <Splash />
      ) : (
        <Account key={session?.user?.id} session={session} />
      )}
    </div>
  );
}
