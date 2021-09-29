import { useState } from "react";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  //Disable sign up button
  const [loading, setLoading] = useState(false);

  //Set auth values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Enter user credientials for sign up.
  const handleLogin = async (email: string, password: string) => {
    try {
      //Supabase sign up API
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      //Route to account if successful
      router.push("/");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      console.log("Login process complete");
    }
  };
  return (
    <form className="grid place-items-center gap-5">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email"
        value={email}
        className="w-10/12 m-auto text-center py-3 bg-theme-orange text-white placeholder-white border-2 border-theme-pink focus:outline-white sm:w-80"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        value={password}
        className="w-10/12 m-auto text-center py-3 bg-theme-orange text-white placeholder-white border-2 border-theme-pink focus:outline-white sm:w-80"
        required
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email, password);
          setLoading(true);
        }}
        disabled={loading}
        className="bg-theme-pink text-white rounded-full w-10/12 py-5"
      >
        Sign In
      </button>
    </form>
  );
}
