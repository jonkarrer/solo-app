import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import Login from "@/components/Auth/Login";
import Account from "../components/Account";
import { Session } from "@supabase/gotrue-js";

export default function Home() {
  const [session, setSession] = useState("" as any);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Login />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
}
