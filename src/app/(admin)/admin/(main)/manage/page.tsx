"use client";

import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon, Loader2 } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";

const page = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [areaManagers, setAreaManagers] = useState([]);
  const [kitchenHeads, setKitchenHeads] = useState([]);

  const { onOpen } = useModal();

  const context = useContext(UserContext);
  const {
    setKitchenHeadId,
    setKitchenHeadName,
    setKitchenHeadUsername,
    setKitchenHeadPassword,
    setKitchenHeadPhone,
    setKitchenHeadStatus,
    setKitchenId,
    setKitchenName,
    setKitchenAddress,
    setAreaManagerId,
    setAreaManagerName,
    setAreaManagerUsername,
    setAreaManagerEmail,
    setAreaManagerPhone,
    setAreaManagerPassword,
    setAreaManagerAlternatePhone,
    setAreaManagerEmergencyPhone,
    setAreaManagerResidentAddress,
    setAreaManagerOfficeAddress,
  } = context as UserContextType;

  useEffect(() => {
    const getAreaManagers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/admin/areaManager`,
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
    
    const getKitchenHeads = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/admin/kitchenHeads`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setKitchenHeads(data);
      } catch (error: any) {
        toast.error(error?.response?.data);
      } finally {
        setIsFetchLoading(false);
      }
    };
    getAreaManagers();
    getKitchenHeads();
  }, []);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-y-auto">
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
                Area Manager
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
                Kitchen Heads
              </h1>
            </button>
          </div>
          {selectedTab == 0 && (
            <>
              <Button
                className="ml-8 mt-5"
                onClick={() => onOpen("createAreaManager")}
              >
                Create
              </Button>
              <div className="pb-8 px-4">
                <div className="flex py-6 text-2xl font-semibold">
                  <h1 className="w-[22%] text-center">Name</h1>
                  <h1 className="w-[22%] text-center">District</h1>
                  <h1 className="w-[22%] text-center">Phone</h1>
                  <h1 className="w-[22%] text-center">Address</h1>
                  <h1 className="w-[6%] text-center"></h1>
                </div>

                {isFetchLoading ? (
                  <Loader2 className="animate-spin w-8 h-8" />
                ) : (
                  <div>
                    {areaManagers.map((areaManager: any) => (
                      <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3">
                        <h1 className="w-[22%] text-center">
                          {areaManager.name}
                        </h1>
                        <h1 className="w-[22%] text-center">
                          {areaManager.district}
                        </h1>
                        <h1 className="w-[22%] text-center">
                          {areaManager.phone}
                        </h1>
                        <h1 className="w-[22%] text-center">
                          {areaManager.officeAddress}
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
                                  setAreaManagerId(areaManager.id);
                                  setAreaManagerName(areaManager.name);
                                  setAreaManagerUsername(areaManager.username);
                                  setAreaManagerEmail(areaManager.email);
                                  setAreaManagerPhone(areaManager.phone);
                                  setAreaManagerPassword(areaManager.password);
                                  setAreaManagerAlternatePhone(
                                    areaManager.alternatePhone
                                  );
                                  setAreaManagerEmergencyPhone(
                                    areaManager.emergencyPhone
                                  );
                                  setAreaManagerResidentAddress(
                                    areaManager.residentAddress
                                  );
                                  setAreaManagerOfficeAddress(
                                    areaManager.officeAddress
                                  );
                                  onOpen("updateAreaManager");
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
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {selectedTab == 1 && (
            <>
              <div className="pb-8 px-4">
                <div className="flex py-6 text-2xl font-semibold">
                  <h1 className="w-[44%] text-center">Name</h1>
                  <h1 className="w-[44%] text-center">Phone</h1>
                  <h1 className="w-[6%] text-center"></h1>
                </div>

                {isFetchLoading ? (
                  <Loader2 className="animate-spin w-8 h-8" />
                ) : (
                  <div>
                    {kitchenHeads.map((kitchenHead: any) => (
                      <>
                        <div className="bg-white border-b-2 border-gray-200 flex text-2xl py-3">
                          <h1 className="w-[44%] text-center">
                            {kitchenHead.name}
                          </h1>
                          <h1 className="w-[44%] text-center">
                            {kitchenHead.phone}
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
                                    setKitchenHeadId(kitchenHead.id);
                                    setKitchenHeadName(kitchenHead.name);
                                    setKitchenHeadUsername(
                                      kitchenHead.username
                                    );
                                    setKitchenHeadPassword(
                                      kitchenHead.password
                                    );
                                    setKitchenHeadPhone(kitchenHead.phone);
                                    setKitchenHeadStatus(kitchenHead.status);
                                    onOpen("kitchenHeadUpdate");
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

                        {kitchenHead.AssignedKitchenHead.map((kitchen: any) => (
                          <div className="bg-green-300 border-b-2 border-gray-200 flex text-2xl py-3">
                            <h1 className="w-[44%] text-center">
                              {kitchen.kitchen.name}
                            </h1>
                            <h1 className="w-[44%] text-center">
                              {kitchen.kitchen.address}
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
                                      setKitchenId(kitchen.kitchen.id);
                                      setKitchenName(kitchen.kitchen.name);
                                      setKitchenAddress(
                                        kitchen.kitchen.address
                                      );
                                      onOpen("kitchenUpdate");
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
                        ))}
                      </>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
