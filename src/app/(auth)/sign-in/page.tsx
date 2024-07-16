"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="btn border px-6 py-2 rounded-md bg-orange-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      Not signed in <br />
      <button
        className="btn border px-6 py-2 rounded-md bg-orange-400 mt-2 text-white font-semibold"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
};

export default SignIn;
