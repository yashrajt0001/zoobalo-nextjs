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

interface UserRechargeModalProps {}

const UserRechargeModal: FC<UserRechargeModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "userRecharge";

  const [rechargeLoader, setRechargeLoader] = useState(false);
  const [amount, setAmount] = useState(0);

  const context = useContext(UserContext);
  const { userId } = context as UserContextType;

  const handleDone = async () => {
    setRechargeLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/user/recharge/${userId}`,
        {
          amount,
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
      setRechargeLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="z-10 bg-white flex flex-col gap-2">
        {/* <h1 className="text-3xl">Recharge:</h1> */}
        <input
          type="number"
          value={amount}
          name="amount"
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          placeholder="Amount"
          className="p-5 mt-4 w-[100%] outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleDone}
          className={`px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit`}
        >
          Recharge {rechargeLoader && <Loader2 className="animate-spin mr-2" />}
        </button>
      </div>
    </Modal>
  );
};

export default UserRechargeModal;
