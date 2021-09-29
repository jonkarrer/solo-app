import Login from "@/components/Auth/Login";
import Image from "next/dist/client/image";

export default function Auth() {
  return (
    <div className="bg-theme-orange h-screen">
      <Image
        width={250}
        height={150}
        layout="intrinsic"
        src="/brand/logo.svg"
        alt="solo logo"
      />
      <Login />
    </div>
  );
}
