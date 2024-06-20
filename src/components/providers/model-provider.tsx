"use client";

import { useEffect, useState } from "react";
import CreateAreaManagerModal from "../modals/CreateAreaManagerModal";

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
    </>
  );
};

export default ModalProvider;
