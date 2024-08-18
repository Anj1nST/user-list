"use client";

import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./styles.module.css";
import Button from "@/app/components/Button";

interface EditUserFormProps {
  onCloseClick: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().nonNullable().required(),
  address: Yup.string(),
  description: Yup.string(),
});

const EditUserForm: FC<EditUserFormProps> = ({ onCloseClick }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.editUserForm}>
      <div>
        <label htmlFor="name" className={styles.editUserForm__label}>
          <p className={styles.editUserForm__labelText}>Имя</p>
        </label>
        <input
          className={`${styles.editUserForm__input} ${
            formik.errors.name ? "outline-error" : ""
          }`}
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </div>
      <div>
        <label htmlFor="address" className={styles.editUserForm__label}>
          <p className={styles.editUserForm__labelText}>Адрес профиля</p>
        </label>
        <div className={styles.editUserForm__addressInputContainer}>
          <div className={styles.editUserForm__addressInputPrefixContainer}>
            <p className={styles.editUserForm__addressInputPrefixText}>
              example.com/
            </p>
          </div>
          <input
            className={`${styles.editUserForm__addressInput} ${
              formik.errors.address ? "outline-error" : ""
            }`}
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
        </div>
      </div>
      <div>
        <label htmlFor="description" className={styles.editUserForm__label}>
          <p className={styles.editUserForm__labelText}>Описание</p>
        </label>
        <input
          className={`${styles.editUserForm__input} ${
            formik.errors.description ? "outline-error" : ""
          }`}
          name="description"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>
      <div className={styles.editUserForm__buttonsContainer}>
        <Button
          variant="common"
          type="button"
          text="Отмена"
          fullWidth
          action={onCloseClick}
        />
        <Button
          variant="form"
          isDisabled={!(formik.isValid && formik.dirty)}
          type="submit"
          text="Сохранить"
          fullWidth
        />
      </div>
    </form>
  );
};

export default EditUserForm;
