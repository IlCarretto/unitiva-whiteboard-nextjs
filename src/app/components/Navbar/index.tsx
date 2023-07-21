"use client";
import React from "react";
import Link from "next/link";
import "./index.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Login",
      href: "/login",
    },
  ];

  return (
    <nav className="navbar">
      <ul>
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li key={index}>
              <Link
                key={link.href}
                href={link.href}
                className={`${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
        {session && status === "authenticated" ? (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
