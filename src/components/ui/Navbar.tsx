"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <>
      <nav>
        <div className=" flex items-center justify-between">
          <a className=" text-xl font-bold mb-4 md:mb-0" href="#">
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
