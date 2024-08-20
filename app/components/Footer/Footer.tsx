"use client";
import React from "react";

import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.split("/").at(-1) === "login";
  const isRegisterPage = pathname.split("/").at(-1) === "register";

  if (isRegisterPage || isLoginPage) {
    return (
      <div className={styles.footerContainer}>
        {isLoginPage && (
          <p className={styles.footer__text}>
            Еще нет аккаунта?{" "}
            <Link className={styles.footer__link} href={"/register"}>
              Зарегистрироваться
            </Link>
          </p>
        )}
        {isRegisterPage && (
          <p className={styles.footer__text}>
            Уже есть аккаунт?{" "}
            <Link className={styles.footer__link} href={"/login"}>
              Войти
            </Link>
          </p>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Footer;
