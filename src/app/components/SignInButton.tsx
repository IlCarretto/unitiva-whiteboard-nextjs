"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { authActions } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/store";

const SignInButton = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { login, logout } = authActions;

  useEffect(() => {
    if (session) {
      dispatch(
        login({
          email: session.user?.email,
          image: session.user?.image,
          name: session.user?.name,
        })
      );
    }
  }, [dispatch, login, session]);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    dispatch(logout());
  };

  if (session && session.user) {
    return (
      <>
        <p>{session.user.name}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </>
    );
  }
  return <button onClick={handleSignIn}>Sign In</button>;
};

export default SignInButton;
