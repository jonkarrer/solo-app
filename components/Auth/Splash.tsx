/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Splash() {
  return (
    <div>
      <main className="bg-theme-orange h-screen grid place-items-center">
        <img id="logo" src="brand/logo.svg" alt="Solo logo" />
        <img
          id="solo_together"
          src="splash/splash_title.svg"
          alt="Splash title"
          className="w-2/5 sm:w-auto lg:w-56"
        />
        <img
          id="airplane"
          src="splash/airpl_window.svg"
          alt="Airplane Window"
          className="w-1/3 sm:w-auto lg:w-48"
        />
        <div
          id="get_started"
          className="absolute bottom-0 text-beige grid place-items-center gap-5 pb-6 w-full sm:gap-8 sm:pb-10 sm:bottom-8"
        >
          <p className="text-xs font-extralight text-center mx-2 sm:w-3/5 lg:text-sm lg:w-2/5">
            By signing up for SOLO you agree to Terms of Service. Learn about
            how we process and use your data in our Privacy Policy and how we
            use cookies and similar technology in our Cookies Policy.
          </p>
          <Link href="/auth" passHref>
            <span
              data-cy="continue"
              className="flex items-center justify-center bg-splash_button w-5/6 h-14 m-auto rounded-full max-w-2xl sm:w-2/5 sm:h-16 cursor-pointer"
            >
              <p className="text-xs font-bold sm:text-base">Get Started!</p>
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
