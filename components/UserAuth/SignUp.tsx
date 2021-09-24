import supabase from "@/utils/supabaseClient";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");

  const handleSignUp = async (email: string) => {
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for login link");
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
        className="border-4 text-4xl m-20 px-6 py-3"
        onClick={(e) => {
          e.preventDefault();
          handleSignUp(email);
        }}
      >
        Sign-up
      </button>
    </div>
  );
}
