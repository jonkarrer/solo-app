import { useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function SignUp() {
  //Freeze sign up button
  const [loading, setLoading] = useState(false);

  //Set auth values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  //Check password strength
  const checkPassword = (pass: string) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (re.test(pass)) {
      if (confirmPass === password) {
        return true;
      } else {
        return alert("Passowrds do not match");
      }
    } else {
      alert("Password is not strong enough");
      return false;
    }
  };

  //Enter user credientials for sign up.
  const handleLogin = async (email: string, password: string) => {
    if (!checkPassword(password)) return;

    try {
      //Supabase sign up API
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      alert(`Check ${email} to complete your sign up!`);
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

      <input
        onChange={(e) => setConfirmPass(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        className="w-10/12 m-auto text-center py-3 bg-theme-orange text-white placeholder-white border-2 border-theme-pink focus:outline-white sm:w-80"
        required
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
        className="bg-theme-pink text-white rounded-full w-10/12 py-5"
      >
        Sign Up
      </button>
    </form>
  );
}
