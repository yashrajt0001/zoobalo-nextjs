"use client";

import { ChangeEvent, FC, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "../ui/modal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface CreateStateModalProps {}

const CreateStateModal: FC<CreateStateModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createState";

  const [stateName, setStateName] = useState("");
  const [stateLoader, setStateLoader] = useState(false);

  const handleStateCreation = async () => {
    if (!stateName) {
      return toast.error("Please enter details!");
    }

    try {
      setStateLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/state/create`,
        {
          name: stateName,
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
      setStateLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Create State:</h1>
        <input
          type="text"
          name="name"
          value={stateName}
          onChange={(e) => {
            setStateName(e.target.value);
          }}
          placeholder="State Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleStateCreation}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {stateLoader && <Loader2 className=" animate-spin mr-2" />} Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateStateModal;
