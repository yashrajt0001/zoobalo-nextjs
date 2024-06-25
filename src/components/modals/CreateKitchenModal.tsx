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

interface CreateKitchenModalProps {}

const CreateKitchenModal: FC<CreateKitchenModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createKitchen";

  const [kitchenDetails, setKitchenDetails] = useState({
    name: "",
    address: "",
  });
  const [selectedCity, setSelectedCity] = useState(1);
  const [kitchenLoader, setKitchenLoader] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        setCities(res.data);
        setSelectedCity(res.data[0].id);
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    getAllCities();
  }, []);

  const handleKitchenCreate = async () => {
    if (!kitchenDetails.name || !kitchenDetails.address) {
      return toast.error("Please enter details!");
    }

    try {
      setKitchenLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchen/create`,
        {
          name: kitchenDetails.name,
          cityId: selectedCity,
          address: kitchenDetails.address,
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
      setKitchenLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3 w-[100%]">
        <h1 className="text-3xl">Create Kitchen:</h1>
        <input
          type="text"
          name="name"
          value={kitchenDetails.name}
          onChange={(e) => {
            setKitchenDetails({
              ...kitchenDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          onChange={(e) => setSelectedCity(parseInt(e.target.value))}
          value={selectedCity}
          className="py-5 px-4 rounded-md"
        >
          {cities.map((city: any) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="address"
          value={kitchenDetails.address}
          onChange={(e) => {
            setKitchenDetails({
              ...kitchenDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleKitchenCreate}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {kitchenLoader && <Loader2 className="animate-spin mr-2" />}
          Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateKitchenModal;
