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


interface CreateCityModalProps {}

const CreateCityModal: FC<CreateCityModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createCity";

  const [cityName, setCityName] = useState("");
  const [cityLoader, setCityLoader] = useState(false);
  const [stateId, setStateId] = useState("");
  const [states, setStates] = useState([]);

  useEffect(() => {
    async function getAllStates() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/state/get`
        );
        setStates(res.data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    }
    getAllStates();
  }, []);

  const handleCityCreation = async () => {
    if (!cityName) {
      return toast.error("Please enter details!");
    }

    try {
      setCityLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/city/create`,
        {
          name: cityName,
          stateId: parseInt(stateId),
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
      setCityLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Create City:</h1>
        <input
          type="text"
          name="name"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          placeholder="City Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          name="stateId"
          onChange={(e) => setStateId(e.target.value)}
          value={stateId}
          className="p-5 rounded-md border-[2px] border-gray-200 bg-white"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state: any) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCityCreation}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {cityLoader && <Loader2 className=" animate-spin mr-2" />} Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateCityModal;
