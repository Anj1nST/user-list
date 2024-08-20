import React from "react";
import FormCard from "../../components/FormCard";
import RegisterForm from "./components/RegisterForm";

import styles from "./styles.module.css";

const RegisterPage = () => {
  const title = `Регистрация в\nYoldi Agency`;
  return (
      <main className={styles.registerPage__container}>
        <FormCard title={title} width="400">
          <RegisterForm />
        </FormCard>
      </main>
  );
};

export default RegisterPage;
