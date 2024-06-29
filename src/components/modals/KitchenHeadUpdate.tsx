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
import { createErrorMessage } from "@/lib/utils";


interface KitchenHeadUpdateModalProps {}

const KitchenHeadUpdateModal: FC<KitchenHeadUpdateModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "kitchenHeadUpdate";

  const [loader, setLoader] = useState(false);

  const context = useContext(UserContext);
  const {
    kitchenHeadId,
    setKitchenHeadId,
    kitchenHeadName,
    setKitchenHeadName,
    kitchenHeadUsername,
    setKitchenHeadUsername,
    kitchenHeadPassword,
    setKitchenHeadPassword,
    kitchenHeadPhone,
    setKitchenHeadPhone,
    kitchenHeadStatus,
    setKitchenHeadStatus,
  } = context as UserContextType;

  const handleUpdate = async () => {
    setLoader(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/admin/kitchenHead/update`,
        {
          kitchenHeadId,
          name: kitchenHeadName,
          username: kitchenHeadUsername,
          password: kitchenHeadPassword,
          phone: kitchenHeadPhone,
          status: kitchenHeadStatus,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      toast.error(createErrorMessage(error));
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
          name="name"
          value={kitchenHeadName}
          onChange={(e) => {
            setKitchenHeadName(e.target.value);
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="username"
          value={kitchenHeadUsername}
          onChange={(e) => {
            setKitchenHeadUsername(e.target.value);
          }}
          placeholder="Username"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="password"
          value={kitchenHeadPassword}
          onChange={(e) => {
            setKitchenHeadPassword(e.target.value);
          }}
          placeholder="Password"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="phone"
          value={kitchenHeadPhone}
          onChange={(e) => {
            setKitchenHeadPhone(e.target.value);
          }}
          placeholder="Phone Number"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          onChange={(e) => {
            setKitchenHeadStatus(e.target.value);
          }}
          className="p-5 bg-white outline-none border-gray-200 border-[2px] rounded-lg"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
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

export default KitchenHeadUpdateModal;
