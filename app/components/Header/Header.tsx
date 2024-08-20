"use client";

import React, { useContext } from "react";
import Logo from "./components/Logo";

import styles from "./styles.module.css";
import Button from "../Button";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "@/app/utils/fetcher";
import { AuthContext } from "@/app/context/AuthContext";
import { formatEmail } from "@/app/utils/formatEmail";

const Header = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const isAuthenticated = authContext?.isAuthenticated ?? false;
  const userEmail = authContext?.userEmail ?? "";

  const { data } = useSWR(
    isAuthenticated ? `/api/account/${formatEmail(userEmail)}}` : null,
    fetcher
  );

  if (!authContext) {
    return <div>authContext недоступен</div>;
  }

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/accountsList");
  };

  const handleUserClick = () => {
    router.push(`/account/${userEmail}`)
  };

  return (
    <header className={styles.header__container}>
      <div className={styles.header__brandContainer}>
        <div className={styles.header__logoContainer} onClick={handleLogoClick}>
          <Logo />
        </div>
        <div className={styles.header__titleContainer}>
          <p>
            Разрабатываем и запускаем
            <br />
            сложные веб проекты
          </p>
        </div>
      </div>
      {!isAuthenticated && <Button text="Войти" action={handleLoginClick} />}
      {!!isAuthenticated && (
        <div className={styles.header__userDataContainer} onClick={handleUserClick}>
          <p>{data?.name}</p>
          {!!data?.image && (
            <div className={styles.header__avatarContainer}>
              <Image src={data?.image} alt="imageOfUser" fill />
            </div>
          )}
          {!data?.image && data?.name && (
            <div className={styles.header__avatarPlaceholder}>
              <p>{data?.name[0]}</p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
