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
      onClose();
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    } finally {
      setUpdateLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="z-10 bg-white flex flex-col gap-3">
        <h1 className="text-3xl">Update:</h1>
        <div>
        <h1 className="text-base text-gray-400 ml-1 mb-1">Name :</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
        {(timing == "MORNING" || timing == "BOTH") && (
          <div>
            <h1 className="text-base text-gray-400 ml-1 mb-1">Morning Address :</h1>
          <input
            type="text"
            placeholder="Morning Address"
            className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
            value={morningAddress}
            onChange={(e) => setMorningAddress(e.target.value)}
            />
            </div>
        )}

        {(timing == "EVENING" || timing == "BOTH") && (
          <div>
            <h1 className="text-base text-gray-400 ml-1 mb-1">Evening Address :</h1>
          <input
            type="text"
            placeholder="Evening Address"
            className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
            value={eveningAddress}
            onChange={(e) => setEveningAddress(e.target.value)}
            />
            </div>
        )}
        <div>
        <h1 className="text-base text-gray-400 ml-1 mb-1">Phone No :</h1>
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={mob}
          maxLength={10}
          onChange={(e) => setMob(e.target.value)}
          />
        </div>
        <div>
        <h1 className="text-base text-gray-400 ml-1 mb-1">Balance :</h1>
        <input
          type="number"
          placeholder="User's Balance"
          className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        </div>
        <div>
        <h1 className="text-base text-gray-400 ml-1 mb-1">Due Tiffins :</h1>
        <input
          type="number"
          placeholder="Due Tiffins"
          className="w-full px-5 py-4 outline-none border-[2px] border-gray-200 rounded-lg"
          value={dueTiffins}
          onChange={(e) => setDueTiffins(e.target.value)}
          />
          </div>
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
