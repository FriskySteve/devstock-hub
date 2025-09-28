"use client";

import { Button } from "./Button";
import Logo from "./logo";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./icons/CartIcon";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="border-b-[1px] border-b-[var(--gray-200)] mt-8 mx-10 pb-10 ">
        <div className="flex justify-between ">
          <Logo />
          <div className="flex justify-center items-center gap-7">
            {!!session ? (
              <>
                <Link href="/cart" className="text-[var(--neutral-900)]">
                  <CartIcon />
                </Link>
                <Link href="/profile">
                  <Image
                    src="/profile.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                </Link>
                <Button
                  style={"fill"}
                  size={"xl"}
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button style="fill" size="xl">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-8">
          <Link href="/">
            {" "}
            <span className="font-semibold text-base text-[var(--primary-500)]">
              Home
            </span>{" "}
          </Link>

          <Link href="/product">
            {" "}
            <span className="font-medium text-base text-[var(--neutral-500)]">
              Product
            </span>
          </Link>
          <span className="font-medium text-base text-[var(--neutral-500)]">
            Contact
          </span>
        </div>
      </div>
    </div>
  );
};
export default Header;
