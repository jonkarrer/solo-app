import supabase from "@/utils/supabaseClient";
import { useState } from "react";

export default function Login() {
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
    <div>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="border-4 text-2xl m-20 px-6 py-3"
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        Sign-up
      </button>
    </div>
  );
}
