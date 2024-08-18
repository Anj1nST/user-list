"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../Button";
import styles from "./styles.module.css";
import Icon from "../Icon/Icon";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

const validationSchema = Yup.object({
  name: Yup.string().nonNullable().trim().required("Name is required"),
  email: Yup.string()
    .nonNullable()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().nonNullable().required("Password is required"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to sign up");
        }
        router.push("/");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred");
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
        isDisabled={!(formik.isValid && formik.dirty)}
        type="submit"
        text="Создать аккаунт"
      />
    </form>
  );
};

export default RegisterForm;
