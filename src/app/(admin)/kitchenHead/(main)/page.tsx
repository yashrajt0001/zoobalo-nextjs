"use client";
import { ShowLogin } from "@/components/ShowLogin";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle2, EllipsisIcon, Loader2 } from "lucide-react";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import { createErrorMessage } from "@/lib/utils";

const page = () => {
  const [kitchens, setKitchens] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
  });
  const [userloader, setUserloader] = useState(false);
  const [delBoyDetails, setDelBoyDetails] = useState({
    name: "",
    phone: "",
    code: "",
    alternateNumber: "",
    kitchenId: "",
  });
  const [timing, setTiming] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [addUserLoader, setAddUserLoader] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [allAgents, setAllAgents] = useState([]);
  const [isFetchLoading, setIsFetchLoading] = useState(true);

  const { onOpen } = useModal();

  const context = useContext(UserContext);
  const {
    setDeliveryAgentName,
    setDeliveryAgentId,
    setDeliveryAgentMob,
    setDeliveryAgentPartnerCode,
  } = context as UserContextType;

  useEffect(() => {
    async function getAllKitchens() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/kitchens`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchens(res.data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      }
    }
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
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchLoading(false);
      }
    }
    getAllKitchens();
    getAllAgents();
  }, []);

  const handleCreate = async () => {
    if (!userDetails.name || !userDetails.phone) {
      return toast.error("Please enter details!");
    }
    setUserloader(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/user/create`,
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
      toast.error(createErrorMessage(error));
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
      return toast.error("please select a file");
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
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error("Error uploading image:");
    }
  };

  const getUsers = async (e: any) => {
    try {
      setSearch(e.target.value);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/search?search=${e.target.value}`,
        {
          tiffinTime: timing,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setUsers(res.data);
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    }
  };

  const handleAdd = async () => {
    setAddUserLoader(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/add`,
        {
          userId: selectedUserId,
          tiffinTime: timing,
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
      setAddUserLoader(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-slate-50">
      <div className="flex-1 overflow-y-auto">
        <div className="pb-8 min-h-full">
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

          <div className="ml-16 flex flex-col gap-3 w-[40%] mt-5">
            <h1 className="text-3xl mb-4">Add User in Delivery Queue :</h1>
            <div className="flex items-center">
              <h1 className="text-xl mr-4">QueueDelivery Timing :</h1>
              <select
                onChange={(e) => {
                  setTiming(e.target.value);
                  async function getUsersForCurrentTiming() {
                    try {
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/queue/search?search=${search}`,
                        {
                          tiffinTime: e.target.value,
                        },
                        {
                          headers: {
                            "auth-token": localStorage.getItem("auth-token"),
                          },
                        }
                      );
                      setUsers(res.data);
                      console.log("data: ", res.data);
                    } catch (error: any) {
                      console.log(error.response.data);
                    }
                  }
                  getUsersForCurrentTiming();
                }}
                value={timing}
                className="py-2 px-4 text-center rounded-md w-[40%]"
              >
                <option value="" disabled>
                  Select Timing
                </option>
                <option value="MORNING">MORNING</option>
                <option value="EVENING">EVENING</option>
              </select>
            </div>
            {timing != "" && (
              <>
                <div className="relative">
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-5 w-full border border-gray-200 p-3"
                  >
                    <h1 className="text-xl">Select User</h1>
                  </button>
                  {open && (
                    <div className="p-2 w-full absolute bg-gray-100 border-4 border-gray-200 border-t-none flex flex-col rounded-lg rounded-t-none z-20">
                      <input
                        type="text"
                        placeholder="Search User"
                        value={search}
                        onChange={getUsers}
                        className="rounded-xl p-2"
                      />
                      {users.map((user: any) => (
                        <button
                          key={user.id}
                          className="border-b mb-1 text-lg"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setOpen(false);
                          }}
                        >
                          {user.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleAdd}
                    className="flex items-center px-6 py-2 rounded-lg text-xl text-white bg-green-500 w-fit"
                  >
                    {addUserLoader && <Loader2 className="animate-spin mr-2" />}{" "}
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div> */}

          {/* <div className="flex flex-col gap-4 w-[45%]">
              <h1 className="text-3xl">Upload Image:</h1>
              <input type="file" onChange={handleFileChange} />
              <button
                className="bg-green-500 px-3 py-2 rounded-lg text-xl w-fit flex items-center text-white"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div> */}

          <div className="flex sticky top-0 px-4 gap-12 border-b border-gray-300">
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
                Agents
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
                Uploads
              </h1>
            </button>
          </div>

          {selectedTab == 0 && (
            <>
              <Button
                className="ml-8 mt-5"
                onClick={() => onOpen("createAgent")}
              >
                Create
              </Button>
              <div className="flex text-2xl mb-2 w-full font-semibold mt-4 pr-[4%]">
                <h1 className="w-[47%] text-center">Name</h1>
                <h1 className="w-[47%] text-center">Phone</h1>
              </div>

              {isFetchLoading ? (
                <Loader2 className="animate-spin w-8 h-8" />
              ) : (
                <div className="text-2xl pr-[4%] ml-5">
                  {allAgents.map((agent: any) => {
                    return (
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3">
                        <h1 className="w-[47%] text-center truncate">
                          {agent?.name}
                        </h1>
                        <h1 className="w-[47%] text-center truncate">
                          {agent?.phone}
                        </h1>
                        <Popover>
                          <PopoverTrigger>
                            <Button variant="ghost">
                              <EllipsisIcon className="w-5 h-5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-2">
                            <PopoverClose className="flex flex-col w-full items-center">
                              <Button
                                onClick={() => {
                                  setDeliveryAgentId(agent.id);
                                  setDeliveryAgentMob(agent.phone);
                                  setDeliveryAgentName(agent.name);
                                  setDeliveryAgentPartnerCode(
                                    agent.partnerCode
                                  );
                                  onOpen("updateAgent");
                                }}
                                className="w-full flex justify-center"
                                variant="ghost"
                              >
                                Update
                              </Button>
                            </PopoverClose>
                          </PopoverContent>
                        </Popover>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
