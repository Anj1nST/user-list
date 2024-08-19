"use client";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (authContext) {
    if (authContext.isAuthenticated) {
      router.push(`/account/${authContext.userEmail}`);
    } else {
      router.push(`/login`);
    }
  }
  return <main></main>;
}
