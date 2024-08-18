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

const Header = () => {
  const router = useRouter();
  const accountName = usePathname().split("/").filter(Boolean).pop();
  const { data } = useSWR(`/api/account/${accountName}`, fetcher);
  const authContext = useContext(AuthContext);

  if (!data || !authContext) return null;

  const { isAuthenticated } = authContext;
  const { name, image } = data;

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/");
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
        <div className={styles.header__userDataContainer}>
          <p>{name}</p>
          {!!image && (
            <div className={styles.header__avatarContainer}>
              <Image src={image} alt="imageOfUser" fill />
            </div>
          )}
          {!image && name && (
            <div className={styles.header__avatarPlaceholder}>
              <p>{name[0]}</p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
