import supabase from "@/utils/supabaseClient";
import Img from "next/image";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      //Use supabase API function to request a magic link.
      //signIn() accepts 5 arguments, but only passing an email sends a magic link automatically
      const { error } = await supabase.auth.signIn({ email });

      if (error) throw error;

      alert(`Check your email, ${email} for login link!`);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      console.log("complete");
    }
  };
  return (
    <div className="bg-theme-orange h-screen flex flex-col items-center justify-center">
      <Img
        width={250}
        height={250}
        layout="intrinsic"
        src="/brand/logo.svg"
        alt="solo logo"
      />
      <form
        action=""
        className="flex flex-col w-screen space-y-5 sm:space-y-12"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          value={email}
          className="w-11/12 m-auto text-center py-3 bg-theme-orange text-white placeholder-white border-2 border-theme-pink focus:outline-white sm:w-80"
          data-cy="email"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          disabled={loading}
          className="bg-theme-pink text-white rounded-full h-16 w-11/12 m-auto grid place-content-center sm:w-80"
          data-cy="login"
        >
          {loading ? (
            <span>Loading</span>
          ) : (
            <span className="grid grid-flow-col gap-5 items-center font-semibold">
              <Img
                width={30}
                height={30}
                layout="fixed"
                src="/auth/magic_wand.svg"
                alt="wand icon"
              />
              Send Magic Link
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
