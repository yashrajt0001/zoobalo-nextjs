"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import Modal from "../ui/modal";
import { CheckCircleIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface CreateAreaManagerModalProps {}

const CreateAreaManagerModal: FC<CreateAreaManagerModalProps> = ({}) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "createAreaManager";

  const [areaManagerLoader, setAreaManagerLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [states, setStates] = useState([]);
  const [open, setOpen] = useState(false);
  const [citiesArray, setCitiesArray] = useState([] as any);
  const [cities, setCities] = useState([]);
  const [areaManagerDetails, setAreaManagerDetails] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    alternatePhone: "",
    emergencyPhone: "",
    residentAddress: "",
    officeAddress: "",
    aadhar: "",
    pan: "",
    agreement: "",
    photo: "",
    stateId: "",
    district: "",
  });

  useEffect(() => {
    async function getAllStates() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/state/get`
        );
        console.log(res.data);
        setStates(res.data);
      } catch (error: any) {
        toast.error(error?.response?.data);
      }
    }
    getAllStates();
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        console.log(res.data);
        setCities(res.data);
      } catch (error: any) {
        toast.error(error?.response?.data);
      }
    }
    getAllCities();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCreateAreaManager = async () => {
    if (
      !areaManagerDetails.name ||
      !areaManagerDetails.username ||
      !areaManagerDetails.password ||
      !areaManagerDetails.email ||
      !areaManagerDetails.phone ||
      !areaManagerDetails.alternatePhone ||
      !areaManagerDetails.emergencyPhone ||
      !areaManagerDetails.residentAddress ||
      !areaManagerDetails.officeAddress ||
      !areaManagerDetails.aadhar ||
      !areaManagerDetails.pan ||
      !areaManagerDetails.agreement ||
      !areaManagerDetails.stateId ||
      !areaManagerDetails.district
    ) {
      return toast.error("Please enter details!");
    }

    if (!selectedFile) {
      return toast.error("Please select a file");
    }

    try {
      setAreaManagerLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/create`,
        {
          name: areaManagerDetails.name,
          username: areaManagerDetails.username,
          password: areaManagerDetails.password,
          email: areaManagerDetails.email,
          phone: areaManagerDetails.phone,
          alternatePhone: areaManagerDetails.alternatePhone,
          emergencyPhone: areaManagerDetails.emergencyPhone,
          residentAddress: areaManagerDetails.residentAddress,
          officeAddress: areaManagerDetails.officeAddress,
          aadhar: areaManagerDetails.aadhar,
          pan: areaManagerDetails.pan,
          agreement: areaManagerDetails.agreement,
          stateId: parseInt(areaManagerDetails.stateId),
          district: areaManagerDetails.district,
          cities:citiesArray
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setAreaManagerLoader(false);
    }
  };

  console.log("c :", citiesArray);

  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 w-full px-3">
        <h1 className="text-3xl">Create Area Manager:</h1>
        <div className="relative">
          <button
            onClick={() => setOpen(true)}
            className="mt-5 w-full border border-gray-200 p-3"
          >
            <h1 className="text-xl">Select City</h1>
          </button>
          {open && (
            <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
              {cities.map((city: any) => {
                let consists = citiesArray.includes(city.id);
                return consists ? (
                  <button
                    key={city.id}
                    className="border-b mb-1 text-lg flex justify-between items-center"
                    onClick={() => {
                      const updated = citiesArray.filter(
                        (item: any) => item != city.id
                      );
                      setCitiesArray(updated);
                      setOpen(false);
                    }}
                  >
                    {city.name}
                    <CheckCircleIcon size={24} color="green" />
                  </button>
                ) : (
                  <button
                    key={city.id}
                    className="border-b mb-1 text-lg"
                    onClick={() => {
                      setCitiesArray([...citiesArray, city.id]);
                      setOpen(false);
                    }}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <input
          type="text"
          name="name"
          value={areaManagerDetails.name}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Name"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="username"
          value={areaManagerDetails.username}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Username"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="password"
          value={areaManagerDetails.password}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Password"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="email"
          value={areaManagerDetails.email}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="E-mail"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="phone"
          value={areaManagerDetails.phone}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="alternatePhone"
          value={areaManagerDetails.alternatePhone}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Alternate Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="emergencyPhone"
          value={areaManagerDetails.emergencyPhone}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Emergency Phone No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="residentAddress"
          value={areaManagerDetails.residentAddress}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Residential address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="officeAddress"
          value={areaManagerDetails.officeAddress}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Office Address"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="aadhar"
          value={areaManagerDetails.aadhar}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Aadhar No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="pan"
          value={areaManagerDetails.pan}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="Pan Card No."
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input
          type="text"
          name="agreement"
          value={areaManagerDetails.agreement}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="agreement"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <select
          name="stateId"
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          value={areaManagerDetails.stateId}
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
        <input
          type="text"
          name="district"
          value={areaManagerDetails.district}
          onChange={(e) => {
            setAreaManagerDetails({
              ...areaManagerDetails,
              [e.target.name]: e.target.value,
            });
          }}
          placeholder="District"
          className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
        />
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleCreateAreaManager}
          className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
        >
          {areaManagerLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
          Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateAreaManagerModal;
