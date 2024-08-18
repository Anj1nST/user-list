"use client";

import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import AvatarPlaceholder from "@/app/components/AvatarPlaceholder/AvatarPlaceholder";
import Button from "@/app/components/Button";
import Modal from "./components/Modal";

import styles from "./styles.module.css";
import Cover from "./components/Cover";
import { fetcher } from "@/app/utils/fetcher";
import { deleteCookie } from "@/app/utils/сookies";
import { AuthContext } from "@/app/context/AuthContext";

interface AccountPageProps {
  params: { slug: string };
}

const AccountPage: FC<AccountPageProps> = ({ params: { slug } }: { params: { slug: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  const { data } = useSWR( `/api/account/${slug.replace('%40', '--')}`,
    fetcher
  );

  useEffect(() => {
    if (!authContext) {
      console.error('authContext недоступен');
      return;
    }
    const { userEmail, isAuthenticated } = authContext;

    if (userEmail.replace('@', '%40') === slug && isAuthenticated === true) {
      setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  }, [authContext, slug]);

  if (!authContext) {
    return <div>authContext недоступен</div>;
  }

  if (!data) return null;

  const { isAuthenticated, setIsAuthenticated } = authContext;
  const { image, name, email, description } = data;

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
        {image ? (
          <Image src={image} alt={"User avatar"} fill />
        ) : (
          <div className={styles.accountPage__placeholderContainer}>
            <AvatarPlaceholder name={name} size={"big"} />
          </div>
        )}
        <div className={styles.accountPage__informationContainer}>
          <h1 className={styles.accountPage__accountName}>{name}</h1>
          <p className={styles.accountPage__accountEmail}>{email}</p>
          {canEdit && (
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
          {canEdit && isAuthenticated && (
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
