"use client";

import { ChangeEvent, FC, useContext, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "../ui/modal";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";

interface KitchenUpdateModalProps {}

const KitchenUpdateModal: FC<KitchenUpdateModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "kitchenUpdate";

  const [loader, setLoader] = useState(false);

  const context = useContext(UserContext);
  const {
    kitchenId,
    setKitchenId,
    kitchenName,
    setKitchenName,
    kitchenAddress,
    setKitchenAddress,
  } = context as UserContextType;

  const handleUpdate = async () => {
    setLoader(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/admin/kitchen/update`,
        {
          kitchenId,
          name: kitchenName,
          address: kitchenAddress,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log("success");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Update:</h1>
        <input
          type="text"
          value={kitchenName}
          onChange={(e) => {
            setKitchenName(e.target.value);
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          value={kitchenAddress}
          onChange={(e) => {
            setKitchenAddress(e.target.value);
          }}
          placeholder="Address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleUpdate}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {loader && <Loader2 className=" animate-spin mr-2" />}Update
        </button>
      </div>
    </Modal>
  );
};

export default KitchenUpdateModal;
