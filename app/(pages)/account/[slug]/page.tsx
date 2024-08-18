"use client";

import React, { FC, useContext, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import AvatarPlaceholder from "@/app/components/AvatarPlaceholder/AvatarPlaceholder";
import Button from "@/app/components/Button";
import Modal from "./components/Modal";

import styles from "./styles.module.css";
import Cover from "./components/Cover";
import { usePathname } from "next/navigation";
import { fetcher } from "@/app/utils/fetcher";
import { deleteCookie } from "@/app/utils/сookies";
import { AuthContext } from "@/app/context/AuthContext";

interface AccountPageProps {
  params: { slug: string };
}

const AccountPage: FC<AccountPageProps> = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);
  const accountName = usePathname().split("/").filter(Boolean).pop();
  const { data } = useSWR(`/api/account/${accountName}`, fetcher);

  if (!data || !authContext) return null;

  const { isAuthenticated, setIsAuthenticated } = authContext;
  const { avatar, name, email: userEmail, description } = data;

  const handleClickEdit = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogOutClick = () => {
    setIsAuthenticated(false);
    deleteCookie("authToken");
  };

  return (
    <main className={styles.accountPage__container}>
      {isModalOpen && <Modal onCloseClick={handleClickEdit} />}
      <Cover />
      <div className={styles.accountPage__mainContentContainer}>
        {avatar ? (
          <Image src={avatar} alt={"User avatar"} fill />
        ) : (
          <div className={styles.accountPage__placeholderContainer}>
            <AvatarPlaceholder name={name} size={"big"} />
          </div>
        )}
        <div className={styles.accountPage__informationContainer}>
          <h1 className={styles.accountPage__accountName}>{name}</h1>
          <p className={styles.accountPage__accountEmail}>{userEmail}</p>
          {isAuthenticated && (
            <div className={styles.accountPage__editButtonContainer}>
              <Button
                text="Редактировать"
                iconType="pen"
                action={handleClickEdit}
              />
            </div>
          )}
          <p className={styles.accountPage__accountDescription}>
            {description}
          </p>
          {isAuthenticated && (
            <div className={styles.accountPage__signOutButtonContainer}>
              <Button
                size="sm"
                text="Выйти"
                iconType="sign-out"
                action={handleLogOutClick}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
