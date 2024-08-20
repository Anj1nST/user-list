"use client";

import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import { AuthContext } from "@/app/context/AuthContext";
import Icon from "@/app/components/Icon";
import Button from "@/app/components/Button";

import styles from "./styles.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .nonNullable()
    .email("Неправильный email формат")
    .required("Email обязателен"),
  password: Yup.string().nonNullable().required("Пароль обязателен"),
});

const LoginForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const authContext = useContext(AuthContext) ?? {
    setIsAuthenticated: () => {},
    setUserEmail: () => {},
  };
  const { setIsAuthenticated, setUserEmail } = authContext;

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsPending(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.json();
        document.cookie = `authToken=${token}; path=/`;
        document.cookie = `userEmail=${email}; path=/`;

        setIsAuthenticated(true);
        setUserEmail(email);
        setIsPending(false);

        router.push(`/account/${email}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const handleSwitchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.form__inputContainer}>
        <Icon className={styles.form__inputIcon} type="email" />
        <input
          className={`${styles.form__input} ${
            // TODO: Вынести в классы
            formik.errors.email ? "outline-error" : ""
          }`}
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
      <div className={styles.form__inputContainer}>
        <Icon className={styles.form__inputIcon} type="password" />
        <input
          className={`${styles.form__input} ${
            // TODO: Вынести в классы
            formik.errors.password ? "outline-error" : ""
          }`}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <button
          type="button"
          onClick={handleSwitchShowPassword}
          className={styles.form__showPasswordButton}
        >
          {showPassword ? (
            <Icon type="eye-solid" fill="#838383" />
          ) : (
            <Icon type="eye-solid" />
          )}
        </button>
      </div>
      <Button
        variant="form"
        isDisabled={isPending || !(formik.isValid && formik.dirty)}
        type="submit"
        text="Войти"
      />
    </form>
  );
};

export default LoginForm;
