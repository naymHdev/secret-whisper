"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <>
      <nav className=" px-4 md:px-6 lg:px-10 py-4 shadow-sm">
        <div className=" flex items-center justify-between">
          <a className=" text-xl font-bold" href="/">
            Mystery Message
          </a>
          <div>
            {session ? (
              <>
                <span className=" mr-4">
                  Welcome, {user?.username || user?.email}
                </span>
                <Button onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
