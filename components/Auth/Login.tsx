import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Login() {
  const [member, setMember] = useState(false);
  return (
    <div className="flex flex-col">
      {member ? <SignIn /> : <SignUp />}
      <p
        className="text-xl text-white cursor-pointer mt-8 text-center"
        onClick={() => setMember(!member)}
      >
        {member ? "Not a member?" : "Already a member?"}
      </p>
    </div>
  );
}
