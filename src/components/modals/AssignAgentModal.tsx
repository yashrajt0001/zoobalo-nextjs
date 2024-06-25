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

interface AssignAgentModalProps {}

const AssignAgentModal: FC<AssignAgentModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "assignAgent";

  const context = useContext(UserContext);
  const { userId } = context as UserContextType;

  const [updateLoader, setUpdateLoader] = useState(false);
  const [allAgents, setAllAgents] = useState([]);
  const [agentAssignLoader, setAgentAssignLoader] = useState(false);
  const [agentId, setAgentId] = useState(1);

  useEffect(() => {
    async function getAllAgents() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/agent/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setAllAgents(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    }
    getAllAgents();
  }, []);

  const handleAgentAssign = async () => {
    setAgentAssignLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/agent/assign`,
        {
          userId,
          agentId,
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
      setAgentAssignLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="z-10 bg-white flex flex-col gap-2">
        <select
          onChange={(e) => setAgentId(parseInt(e.target.value))}
          value={agentId}
          className="py-5 mt-5 px-4 rounded-md w-[100%] bg-white border-[2px] border-gray-200"
        >
          {allAgents.map((agent: any) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAgentAssign}
          className={`px-4 py-2 flex items-center rounded-lg text-xl text-white bg-green-500 w-fit`}
        >
          Assign{" "}
          {agentAssignLoader && <Loader2 className="animate-spin mr-2" />}
        </button>
      </div>
    </Modal>
  );
};

export default AssignAgentModal;
