import React, { FC } from "react";

import styles from "./styles.module.css";
import FormCard from "@/app/components/FormCard";
import EditUserForm from "./components";

interface ModalProps {
  onCloseClick: () => void;
}

const Modal: FC<ModalProps> = ({ onCloseClick }) => {
  return (
    <div className={styles.modal__container}>
      <FormCard title="Редактировать профиль" width="600" fullHeight={true}>
        <EditUserForm onCloseClick={onCloseClick} />
      </FormCard>
    </div>
  );
};

export default Modal;
