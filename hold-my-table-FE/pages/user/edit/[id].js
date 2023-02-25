/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../../utils/context/authContext';
import RegisterForm from '../../../components/forms/RegisterForm';

export default function EditUserProfile() {
  const [editItem, setEditItem] = useState({});
  const { user, updateUser } = useAuth();
  const setData = () => {
    setEditItem(user);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <Head>
        <title>Hold My Table - Edit User Profile</title>
        <meta name="description" content="meta description for Edit Page" />
      </Head>
      <RegisterForm user={editItem} updateUser={updateUser} />
    </>
  );
}
