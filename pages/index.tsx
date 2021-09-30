import { useState, useEffect } from "react";
import supabase from "@/utils/supabaseClient";
import Account from "../components/Account";
import Splash from "@/components/Auth/Splash";
import { useUserContext } from "lib/UserContext";

export default function Home() {
  const { session } = useUserContext();
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
