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
      <KitchenHeadUpdateModal />
      <KitchenUpdateModal />
      <UpdateAreaManagerModal />
      <CreateKitchenModal />
      <CreateAgentModal />
      <UpdateAgentModal />
      <UserRechargeModal />
      <AssignAgentModal />
      <AssignAgentDemoDeliveryModal />
      <CreateKitchenHeadModal />
    </>
  );
};

export default ModalProvider;
