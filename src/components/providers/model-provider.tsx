"use client";

import { useEffect, useState } from "react";
import CreateAreaManagerModal from "../modals/CreateAreaManagerModal";
import CreateCityModal from "../modals/CreateCityModal";
import CreateStateModal from "../modals/CreateStateModal";
import UserUpdateModal from "../modals/UserUpdateModal";
import KitchenHeadUpdateModal from "../modals/KitchenHeadUpdate";
import KitchenUpdateModal from "../modals/KitchenUpdate";
import UpdateAreaManagerModal from "../modals/UpdateAreaManagerModal";
import CreateKitchenModal from "../modals/CreateKitchenModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import UpdateAgentModal from "../modals/UpdateAgentModal";
import UserRechargeModal from "../modals/UserRechargeModal";
import AssignAgentModal from "../modals/AssignAgentModal";
import AssignAgentDemoDeliveryModal from "../modals/AssignAgentDemoDelivery";
import CreateKitchenHeadModal from "../modals/CreateKitchenHeadModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<null | string>();

  useEffect(() => {
    setIsMounted(true);
    console.log('hii')
  }, []);

  
  useEffect(() => {
    setUser(localStorage.getItem("user") || null);
    console.log('changed')
  }, [localStorage.getItem("user")]);

  console.log(user)
  
  if (!isMounted) {
    return null;
  }
  return (
    <>
      {user === "admin" && (
        <>
          <CreateAreaManagerModal />
          <CreateCityModal />
          <CreateStateModal />
          <UserUpdateModal />
          <KitchenHeadUpdateModal />
          <KitchenUpdateModal />
          <UpdateAreaManagerModal />{" "}
        </>
      )}
      {user === "areaManager" && (
        <>
          <CreateKitchenModal />
          <CreateAgentModal />
          <UpdateAgentModal />
          <CreateKitchenHeadModal />
        </>
      )}
      {user === "kitchenHead" && (
        <>
          <UserRechargeModal />
          <AssignAgentModal />
          <AssignAgentDemoDeliveryModal />
        </>
      )}
    </>
  );
};

export default ModalProvider;
