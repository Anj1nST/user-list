"use client";

import React from "react";
import Logo from "./components/Logo";

import styles from "./styles.module.css";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useAuthenticated } from "@/app/hooks/useAutheficated";

const Header = () => {
  const isAuthenticated = useAuthenticated();
  const { data } = { data: { name: "Владислав", image: null } };

  const router = useRouter();

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
          <p>{data.name}</p>
          {!!data.image ? (
            <div className={styles.header__avatarContainer}>
              {/* <Image src={data?.image} alt="imageOfUser" fill /> */}
            </div>
          ) : (
            <div className={styles.header__avatarPlaceholder}>
              <p>{data.name[0]}</p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
