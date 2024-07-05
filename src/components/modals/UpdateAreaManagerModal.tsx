"use client";

import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import Modal from "../ui/modal";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import { createErrorMessage } from "@/lib/utils";

interface UpdateAreaManagerModalProps {}

const UpdateAreaManagerModal: FC<UpdateAreaManagerModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "updateAreaManager";

  const [areaManagerLoader, setAreaManagerLoader] = useState(false);

  const context = useContext(UserContext);
  const {
    areaManagerId,
    areaManagerName,
    setAreaManagerName,
    areaManagerUsername,
    setAreaManagerUsername,
    areaManagerEmail,
    setAreaManagerEmail,
    areaManagerPhone,
    setAreaManagerPhone,
    areaManagerPassword,
    setAreaManagerPassword,
    areaManagerAlternatePhone,
    setAreaManagerAlternatePhone,
    areaManagerEmergencyPhone,
    setAreaManagerEmergencyPhone,
    areaManagerResidentAddress,
    setAreaManagerResidentAddress,
    areaManagerOfficeAddress,
    setAreaManagerOfficeAddress,
  } = context as UserContextType;

  const handleUpdateAreaManager = async () => {
    try {
      setAreaManagerLoader(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/admin/areaManager/Update`,
        {
          areaHeadId: areaManagerId,
          name: areaManagerName,
          username: areaManagerUsername,
          password: areaManagerPassword,
          email: areaManagerEmail,
          phone: areaManagerPhone,
          alternatePhone: areaManagerAlternatePhone,
          emergencyPhone: areaManagerEmergencyPhone,
          residentAddress: areaManagerResidentAddress,
          officeAddress: areaManagerOfficeAddress,
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
      setAreaManagerLoader(false);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl">Update:</h1>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Name :</h1>
          <input
            type="text"
            value={areaManagerName}
            onChange={(e) => {
              setAreaManagerName(e.target.value);
            }}
            placeholder="Name"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Username :</h1>
          <input
            type="text"
            value={areaManagerUsername}
            onChange={(e) => {
              setAreaManagerUsername(e.target.value);
            }}
            placeholder="Username"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Password :</h1>
          <input
            type="text"
            value={areaManagerPassword}
            onChange={(e) => {
              setAreaManagerPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Email :</h1>
          <input
            type="text"
            value={areaManagerEmail}
            onChange={(e) => {
              setAreaManagerEmail(e.target.value);
            }}
            placeholder="Email"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Phone No :</h1>
          <input
            type="text"
            value={areaManagerPhone}
            onChange={(e) => {
              setAreaManagerPhone(e.target.value);
            }}
            placeholder="Phone No."
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Alternate Phone :</h1>
          <input
            type="text"
            value={areaManagerAlternatePhone}
            onChange={(e) => {
              setAreaManagerAlternatePhone(e.target.value);
            }}
            placeholder="Alternate Phone No."
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Emergency No :</h1>
          <input
            type="text"
            value={areaManagerEmergencyPhone}
            onChange={(e) => {
              setAreaManagerEmergencyPhone(e.target.value);
            }}
            placeholder="Emergency Phone No."
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">
            Residential Address :
          </h1>
          <input
            type="text"
            value={areaManagerResidentAddress}
            onChange={(e) => {
              setAreaManagerResidentAddress(e.target.value);
            }}
            placeholder="Resident Address"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-base text-gray-400 ml-1 mb-1">Office Address :</h1>
          <input
            type="text"
            value={areaManagerOfficeAddress}
            onChange={(e) => {
              setAreaManagerOfficeAddress(e.target.value);
            }}
            placeholder="Office Address"
            className="w-full p-5 outline-none border-[2px] border-gray-200 rounded-lg"
          />
        </div>
        <button
          onClick={handleUpdateAreaManager}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {areaManagerLoader && <Loader2 className=" animate-spin mr-2" />}
          Update
        </button>
      </div>
    </Modal>
  );
};

export default UpdateAreaManagerModal;
