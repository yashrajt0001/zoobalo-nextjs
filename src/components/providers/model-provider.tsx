"use client";

import { useEffect, useState } from "react";
import CreateAreaManagerModal from "../modals/CreateAreaManagerModal";
import CreateCityModal from "../modals/CreateCityModal";
import CreateStateModal from "../modals/CreateStateModal";
import UserUpdateModal from "../modals/UserUpdateModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateAreaManagerModal />
      <CreateCityModal />
      <CreateStateModal />
      <UserUpdateModal />
    </>
  );
};

export default ModalProvider;
