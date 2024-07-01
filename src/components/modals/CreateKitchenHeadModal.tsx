"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { DialogContent } from "@radix-ui/react-dialog";
import Modal from "../ui/modal";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { createErrorMessage } from "@/lib/utils";

interface CreateKitchenHeadModalProps {}

const CreateKitchenHeadModal: FC<CreateKitchenHeadModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createKitchenHead";

  const [KitchenHeadDetails, setKitchenHeadDetails] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
  });
  const [selectedCity, setSelectedCity] = useState(1);
  const [KitchenHeadLoader, setKitchenHeadLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [kitchensArray, setKitchensArray] = useState([] as any);
  const [kitchens, setKitchens] = useState([]);

  useEffect(() => {
    // async function getAllCities() {
    //   try {
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
    //     setCities(res.data);
    //     setSelectedCity(res.data[0].id);
    //   } catch (error: any) {
    //     toast.error(createErrorMessage(error));
    //   }
    // }
    // getAllCities();
    async function getKitchens() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchen/get`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        let kitchens = [] as any;
        res.data.map((city: any) => {
          city.kitchen.map((kitchen: any) => kitchens.push(kitchen));
        });
        setKitchens(kitchens);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    }
    getKitchens();
  }, []);

  const handleKitchenHeadCreate = async () => {
    if (
      !KitchenHeadDetails.name ||
      !KitchenHeadDetails.username ||
      !KitchenHeadDetails.password ||
      !KitchenHeadDetails.phone
    ) {
      return toast.error("Please enter details!");
    }

    try {
      setKitchenHeadLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/KitchenHead/create`,
        {
          name: KitchenHeadDetails.name,
          username: KitchenHeadDetails.username,
          password: KitchenHeadDetails.password,
          phone: KitchenHeadDetails.phone,
          kitchens: kitchensArray,
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
      setKitchenHeadLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Create KitchenHead:</h1>
        <input
          type="text"
          name="name"
          value={KitchenHeadDetails.name}
          onChange={(e) => {
            setKitchenHeadDetails({
              ...KitchenHeadDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <div className="relative">
          <button
            onClick={() => setOpen(true)}
            className="w-full border-2 border-gray-200 p-4 rounded-lg"
          >
            <h1 className="text-xl">Select Kitchens</h1>
          </button>
          {open && (
            <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
              {kitchens.map((kitchen: any) => {
                let consists = kitchensArray.includes(kitchen.id);
                return consists ? (
                  <button
                    key={kitchen.id}
                    className="border-b mb-1 text-lg flex justify-between items-center"
                    onClick={() => {
                      const updated = kitchensArray.filter(
                        (item: any) => item != kitchen.id
                      );
                      setKitchensArray(updated);
                      setOpen(false);
                    }}
                  >
                    {kitchen.name}
                    <CheckCircleIcon size={24} color="green" />
                  </button>
                ) : (
                  <button
                    key={kitchen.id}
                    className="border-b mb-1 text-lg"
                    onClick={() => {
                      setKitchensArray([...kitchensArray, kitchen.id]);
                      setOpen(false);
                    }}
                  >
                    {kitchen.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <input
          type="text"
          name="username"
          value={KitchenHeadDetails.username}
          onChange={(e) => {
            setKitchenHeadDetails({
              ...KitchenHeadDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Username"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="password"
          value={KitchenHeadDetails.password}
          onChange={(e) => {
            setKitchenHeadDetails({
              ...KitchenHeadDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Password"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="phone"
          value={KitchenHeadDetails.phone}
          onChange={(e) => {
            setKitchenHeadDetails({
              ...KitchenHeadDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <button
          onClick={handleKitchenHeadCreate}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {KitchenHeadLoader && <Loader2 className="animate-spin mr-2" />}
          Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateKitchenHeadModal;
