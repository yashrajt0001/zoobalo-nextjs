"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "../ui/modal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { createErrorMessage } from "@/lib/utils";


interface CreateAgentModalProps {}

const CreateAgentModal: FC<CreateAgentModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAgent";

  const [AgentLoader, setAgentLoader] = useState(false);
  const [kitchens, setKitchens] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [kitchenId, setKitchenId] = useState("");

  useEffect(() => {
    const getKitchens = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/kitchens`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    };
    getKitchens();
  }, []);

  const handleAgentCreation = async () => {
    try {
      setAgentLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/agent/create`,
        {
          name,
          phone,
          status: status == "true" ? true : false,
          partnerCode,
          alternateNumber,
          kitchenId: parseInt(kitchenId),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setAgentLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Create Agent:</h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          name="stateId"
          onChange={(e) => setKitchenId(e.target.value)}
          value={kitchenId}
          className="p-5 rounded-md border-[2px] border-gray-200 bg-white"
        >
          <option value="" disabled>
            Select Kitchen
          </option>
          {kitchens.map((kitchen: any) => (
            <option key={kitchen.kitchen.id} value={kitchen.kitchen.id}>
              {kitchen.kitchen.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="partnerCode"
          value={partnerCode}
          onChange={(e) => {
            setPartnerCode(e.target.value);
          }}
          placeholder="Partner Code"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="alternateNumber"
          value={alternateNumber}
          onChange={(e) => {
            setAlternateNumber(e.target.value);
          }}
          placeholder="Alternate Number"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="p-5 rounded-md border-[2px] border-gray-200 bg-white"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button
          onClick={handleAgentCreation}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {AgentLoader && <Loader2 className=" animate-spin mr-2" />} Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateAgentModal;
