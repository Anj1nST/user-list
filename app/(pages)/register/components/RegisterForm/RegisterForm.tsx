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
  name: Yup.string().nonNullable().trim().required("Имя обязательно"),
  email: Yup.string()
    .nonNullable()
    .email("Неправильный email формат")
    .required("Email обязателен"),
  password: Yup.string().nonNullable().required("Пароль обязателен"),
});

const RegisterForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const authContext = useContext(AuthContext) ?? {
    setIsAuthenticated: () => {},
    setUserEmail: () => {},
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsPending(true);
        const { name, email, password } = values;

        const signUpResponse = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!signUpResponse.ok) {
          throw new Error("Не удалось выполнить регистрацию");
        }

        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!loginResponse.ok) {
          throw new Error("Не удалось выполнить вход");
        }

        authContext.setIsAuthenticated(true);
        authContext.setUserEmail(email);
        setIsPending(false);

        router.push(`/account/${email}`);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Неизвестная ошибка");
        }
      }
    },
  });

  const handleSwitchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.form__inputContainer}>
        <Icon className={styles.form__inputIcon} type="user" />
        <input
          className={`${styles.form__input} ${
            formik.errors.name ? "outline-error" : ""
          }`}
          name="name"
          type="text"
          placeholder="Имя"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      <div className={styles.form__inputContainer}>
        <Icon className={styles.form__inputIcon} type="email" />
        <input
          className={`${styles.form__input} ${
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
        size="md"
        isDisabled={isPending || !(formik.isValid && formik.dirty)}
        type="submit"
        text="Создать аккаунт"
        handleMouseDown={(event)=>{event.preventDefault()}}
      />
    </form>
  );
};

export default RegisterForm;
