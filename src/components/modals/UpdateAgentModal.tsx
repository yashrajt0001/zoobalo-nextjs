"use client";

import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "../ui/modal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";

interface UpdateAgentModalProps {}

const UpdateAgentModal: FC<UpdateAgentModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "updateAgent";

  const [AgentLoader, setAgentLoader] = useState(false);
    
    const context = useContext(UserContext);
    const {
        deliveryAgentName,
        setDeliveryAgentName,
        deliveryAgentId,
        setDeliveryAgentId,
        deliveryAgentMob,
        setDeliveryAgentMob,
        deliveryAgentParnterCode,
        setDeliveryAgentPartnerCode
    } = context as UserContextType;

  const handleAgentCreation = async () => {
    try {
      setAgentLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/agent/update`,
        {
          name: deliveryAgentName ,
          phone: deliveryAgentMob,
          partnerCode: deliveryAgentParnterCode,
          agentId : deliveryAgentId 
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setAgentLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Update Agent:</h1>
        <input
          type="text"
          name="name"
          value={deliveryAgentName}
          onChange={(e) => {
            setDeliveryAgentName(e.target.value);
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="phone"
          value={deliveryAgentMob}
          onChange={(e) => {
            setDeliveryAgentMob(e.target.value);
          }}
          placeholder="Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="partnerCode"
          value={deliveryAgentParnterCode}
          onChange={(e) => {
            setDeliveryAgentPartnerCode(e.target.value);
          }}
          placeholder="Partner Code"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleAgentCreation}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {AgentLoader && <Loader2 className=" animate-spin mr-2" />} Update
        </button>
      </div>
    </Modal>
  );
};

export default UpdateAgentModal;
