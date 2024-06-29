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


interface UserUpdateModalProps {}

const UserUpdateModal: FC<UserUpdateModalProps> = ({}) => {
  const context = useContext(UserContext);
  const {
    userName,
    morningAddress,
    eveningAddress,
    dueTiffins,
    mob,
    balance,
    timing,
    setUserName,
    setMorningAddress,
    setEveningAddress,
    setDueTiffins,
    setMob,
    setBalance,
    userId,
  } = context as UserContextType;

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "userUpdate";

  const [updateLoader, setUpdateLoader] = useState(false);

  const handleUpdate = async () => {
    setUpdateLoader(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/update/${userId}`,
        {
          name: userName,
          phone: mob,
          morningAddress,
          eveningAddress,
          balance,
          dueTiffin: dueTiffins,
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
      setUpdateLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="z-10 bg-white flex flex-col gap-2">
        <h1 className="text-3xl">Update:</h1>
        <input
          type="text"
          placeholder="Name"
          className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        {(timing == "MORNING" || timing == "BOTH") && (
          <input
            type="text"
            placeholder="Morning Address"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
            value={morningAddress}
            onChange={(e) => setMorningAddress(e.target.value)}
          />
        )}

        {(timing == "EVENING" || timing == "BOTH") && (
          <input
            type="text"
            placeholder="Evening Address"
            className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
            value={eveningAddress}
            onChange={(e) => setEveningAddress(e.target.value)}
          />
        )}
        <input
          type="tel"
          placeholder="Phone Number"
          className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={mob}
          maxLength={10}
          onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="number"
          placeholder="User's Balance"
          className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />

        <input
          type="number"
          placeholder="Due Tiffins"
          className="px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={dueTiffins}
          onChange={(e) => setDueTiffins(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className={`px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit`}
        >
          Update {updateLoader && <Loader2 className="animate-spin mr-2" />}
        </button>
      </div>
    </Modal>
  );
};

export default UserUpdateModal;
