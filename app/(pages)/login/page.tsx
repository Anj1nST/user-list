import React from "react";
import LoginForm from "../../components/LoginForm";
import FormCard from "../../components/FormCard";

import styles from "./styles.module.css";

const LoginPage = () => {
  return (
    <main className={styles.loginPage__container}>
      <FormCard title="Вход в Yoldi Agency">
        <LoginForm />
      </FormCard>
    </main>
  );
};

export default LoginPage;
