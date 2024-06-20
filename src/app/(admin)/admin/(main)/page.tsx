"use client";

import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const page = () => {
  const [timing, setTiming] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCity, setSelectedCity] = useState(1);
  const [kitchenLoader, setKitchenLoader] = useState(false);
  const [cities, setCities] = useState([]);
  const [areaManagers, setAreaManagers] = useState([]);
  const [states, setStates] = useState([]);

  const {onOpen} = useModal()

  useEffect(() => {
    async function getAllCities() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/city/get`);
        setCities(res.data);
        setSelectedCity(res.data[0].id);
      } catch (error: any) {
        toast.error(error?.response?.data);
      }
    }

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

    const getAreaManagers = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST}/areaManager/get`,
          {
            stateId: 1,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setAreaManagers(data);
      } catch (error: any) {
        toast.error(error?.response?.data);
      } finally {
        setIsFetchLoading(false);
      }
    };

    getAllStates();
    getAreaManagers();
    getAllCities();
  }, []);

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [kitchenDetails, setKitchenDetails] = useState({
    name: "",
    address: "",
  });

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

  const [userloader, setUserloader] = useState(false);
  const [delBoyLoader, setDelBoyLoader] = useState(false);
  const [areaManagerId, setAreaManagerId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateId, setStateId] = useState("");
  const [areaManagerLoader, setAreaManagerLoader] = useState(false);
  const [assignAreaManagerLoader, setAssignAreaManagerLoader] = useState(false);
  const [stateLoader, setStateLoader] = useState(false);
  const [cityLoader, setCityLoader] = useState(false);
  const [skipTiming, setSkipTiming] = useState("");
  const [skipLoader, setSkipLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const handleDelBoySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !delBoyDetails.name ||
      !delBoyDetails.email ||
      !delBoyDetails.password
    ) {
      return toast.error("Please enter details!");
    }

    try {
      setDelBoyLoader(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/agent/create`,
        {
          name: delBoyDetails.name,
          email: delBoyDetails.email,
          password: delBoyDetails.password,
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
      setDelBoyLoader(false);
    }
  };

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

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/queueDelivery/create`,
        {
          time: timing,
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
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!userDetails.name || !userDetails.phone) {
      return toast.error("Please enter details!");
    }
    setUserloader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/user/create`,
        {
          name: userDetails.name,
          phone: userDetails.phone,
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
      setUserloader(false);
    }

    setUserDetails({
      name: "",
      phone: "",
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return toast.error("Please select a file");
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/webBanner/upload`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      toast.success("Image uploaded successfully:");
    } catch (error) {
      toast.error("Error uploading image:");
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

  const handleAreaHeadAssign = async () => {
    if (!areaManagerId || !cityId) {
      return toast.error("Please enter details!");
    }

    try {
      setAssignAreaManagerLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/assign`,
        {
          areaHeadId: areaManagerId,
          cityId,
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
      setAssignAreaManagerLoader(false);
    }
  };

  const handleStateCreation = async () => {
    if (!stateName) {
      return toast.error("Please enter details!");
    }

    try {
      setStateLoader(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/state/create`,
        {
          name: stateName,
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
      setStateLoader(false);
    }
  };

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
      toast.error(error.response.data);
    } finally {
      setCityLoader(false);
    }
  };

  const handleSkip = async () => {
    setSkipLoader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/skipQueue`,
        {
          tiffinTime: skipTiming,
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
      setSkipLoader(false);
    }
  };

  return (
    <>
      <div className="bg-slate-50">
        <div className="flex px-4 gap-12 border-b border-gray-300 ">
          <button
            className={`py-3 ${
              selectedTab == 0 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={() => setSelectedTab(0)}
          >
            <h1
              className={`text-xl ${
                selectedTab == 0 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Queue
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 1 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={() => setSelectedTab(1)}
          >
            <h1
              className={`text-xl ${
                selectedTab == 1 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              Area Manager
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 2 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={() => setSelectedTab(2)}
          >
            <h1
              className={`text-xl ${
                selectedTab == 2 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              City
            </h1>
          </button>
          <button
            className={`py-3 ${
              selectedTab == 3 ? "border-b-2 border-blue-400" : ""
            }`}
            onClick={() => setSelectedTab(3)}
          >
            <h1
              className={`text-xl ${
                selectedTab == 3 ? "text-blue-400" : "text-gray-400"
              }`}
            >
              State
            </h1>
          </button>
        </div>

        {selectedTab == 1 && (
          <>
            <Button onClick={()=>onOpen('createAreaManager')}>create</Button>
            <div className="pt-8 bg-[#F6F6F6] relative">
              <div className="pb-8 px-8">
                <div className="flex py-6 text-2xl font-semibold">
                  <h1 className="w-[25%] text-center">Name</h1>
                  {/* <h1 className="w-[20%] text-center">State</h1> */}
                  <h1 className="w-[25%] text-center">District</h1>
                  <h1 className="w-[25%] text-center">Phone</h1>
                  <h1 className="w-[25%] text-center">Address</h1>
                </div>

                <div className="overflow-y-auto">
                  {areaManagers.map((areaManager: any) => (
                    <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3">
                      <h1 className="w-[25%] text-center">
                        {areaManager.name}
                      </h1>
                      {/* <h1 className="w-[20%] text-center">{areaManager.state}</h1> */}
                      <h1 className="w-[25%] text-center">
                        {areaManager.district}
                      </h1>
                      <h1 className="w-[25%] text-center">
                        {areaManager.phone}
                      </h1>
                      <h1 className="w-[25%] text-center">
                        {areaManager.officeAddress}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTab == 2 && (
          <div className="pt-8 bg-[#F6F6F6] relative">
            <div className="pb-8 px-8">
              <div className="flex mt-6 text-2xl font-semibold">
                <h1 className="w-[50%] text-center">Name</h1>
                <h1 className="w-[50%] text-center">Security Deposit</h1>
              </div>

              {cities.map((city: any) => (
                <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3">
                  <h1 className="w-[50%] text-center">{city.name}</h1>
                  <h1 className="w-[50%] text-center">
                    {city.securityDeposit}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab == 3 && (
          <div className="pt-8 bg-[#F6F6F6] relative">
            <div className="pb-8 px-8">
              <div className="flex mt-6 text-2xl font-semibold px-2">
                <h1>Name</h1>
              </div>

              {states.map((state: any) => (
                <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3 px-2">
                  <h1>{state.name}</h1>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab == 0 && (
          <>
            <div className="ml-16 mt-5 flex">
              <select
                onChange={(e) => setTiming(e.target.value)}
                value={timing}
                className="py-2 px-4 text-center rounded-md"
              >
                <option value="" disabled>
                  Select Queue Generation Time
                </option>
                <option value="MORNING">MORNING</option>
                <option value="EVENING">EVENING</option>
              </select>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`flex items-center px-3 py-2 rounded-lg text-xl text-white ml-8 ${
                  isLoading ? "bg-[#949494]" : "bg-green-500"
                }`}
              >
                Generate
                {isLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
              </button>
            </div>

            <div className="ml-16 mt-5 flex">
              <select
                onChange={(e) => setSkipTiming(e.target.value)}
                value={skipTiming}
                className="py-2 px-4 text-center rounded-md"
              >
                <option value="" disabled>
                  Select Skip Time
                </option>
                <option value="MORNING">MORNING</option>
                <option value="EVENING">EVENING</option>
              </select>
              <button
                onClick={handleSkip}
                disabled={skipLoader}
                className={`flex items-center px-5 py-2 rounded-lg text-xl text-white ml-8 ${
                  skipLoader ? "bg-[#949494]" : "bg-green-500"
                }`}
              >
                Skip
                {skipLoader && (
                  <Loader2 className="animate-spin w-8 h-8 ml-3" />
                )}
              </button>
            </div>
          </>
        )}

        {/* <div className="flex mb-6">
            <div className="ml-16 flex flex-col gap-3 w-[40%]">
              <h1 className="text-3xl mt-5">Create a User:</h1>
              <input
                type="text"
                value={userDetails.name}
                name="name"
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="tel"
                value={userDetails.phone}
                name="phone"
                maxLength={10}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Phone Number"
                className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                onClick={handleCreate}
                className="flex mt-8 items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {userloader && <Loader2 className="animate-spin mr-2" />} Create
              </button>
            </div>

            <form
              onSubmit={handleDelBoySubmit}
              className="ml-24 flex flex-col gap-3 w-[40%]"
            >
              <h1 className="text-3xl mt-5">Create a Delivery Boy Account:</h1>
              <input
                type="text"
                name="name"
                value={delBoyDetails.name}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Name"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={delBoyDetails.email}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Email Address"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <input
                type="password"
                name="password"
                value={delBoyDetails.password}
                onChange={(e) => {
                  setDelBoyDetails({
                    ...delBoyDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="Password"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
              <button
                type="submit"
                className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
              >
                {delBoyLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                Create
              </button>
            </form>
          </div> */}

        {/* <div className="flex ml-16">
            <div className="flex flex-col gap-4 w-[40%]">
              <h1 className="text-3xl">Upload Image:</h1>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-green-500 px-3 py-2 rounded-lg text-xl w-fit flex items-center text-white"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div>

            <div className="flex flex-col gap-3 w-[43%]">
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
                {kitchenLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                Create
              </button>
            </div>
          </div> */}

        {/* <div className="flex ml-16 mt-4">
            <div className="flex flex-col gap-4 w-[40%]">
              <h1 className="text-3xl">Create Area Manager:</h1>
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
              <input
                type="text"
                name="stateId"
                value={areaManagerDetails.stateId}
                onChange={(e) => {
                  setAreaManagerDetails({
                    ...areaManagerDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                placeholder="State Id"
                className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
              />
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
                {areaManagerLoader && (
                  <Loader2 className=" animate-spin mr-2" />
                )}{" "}
                Create
              </button>
            </div>

            <div className="w-[50%]">
              <div className="ml-28 flex flex-col gap-3">
                <h1 className="text-3xl">Assign AreaManager to City:</h1>
                <input
                  type="number"
                  name="areaHeadId"
                  value={areaManagerId as any}
                  onChange={(e) => {
                    setAreaManagerId(e.target.value as any);
                  }}
                  placeholder="Area Head Id"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <input
                  type="number"
                  name="cityId"
                  value={cityId as any}
                  onChange={(e) => {
                    setCityId(e.target.value as any);
                  }}
                  placeholder="City Id"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <button
                  onClick={handleAreaHeadAssign}
                  className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                >
                  {assignAreaManagerLoader && (
                    <Loader2 className=" animate-spin mr-2" />
                  )}{" "}
                  Assign
                </button>
              </div>

              <div className="ml-28 flex flex-col gap-3 mt-12">
                <h1 className="text-3xl">Create State:</h1>
                <input
                  type="text"
                  name="name"
                  value={stateName}
                  onChange={(e) => {
                    setStateName(e.target.value);
                  }}
                  placeholder="State Name"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <button
                  onClick={handleStateCreation}
                  className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                >
                  {stateLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                  Create
                </button>
              </div>

              <div className="ml-28 flex flex-col gap-3 mt-12">
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
                <input
                  type="number"
                  name="stateId"
                  value={stateId}
                  onChange={(e) => {
                    setStateId(e.target.value);
                  }}
                  placeholder="State Id"
                  className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                />
                <button
                  onClick={handleCityCreation}
                  className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                >
                  {cityLoader && <Loader2 className=" animate-spin mr-2" />}{" "}
                  Create
                </button>
              </div>
            </div>
          </div> */}
      </div>
    </>
  );
};

export default page;
