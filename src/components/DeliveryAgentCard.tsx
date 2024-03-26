import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import React, { FC, HTMLAttributes, useContext } from "react";
interface userInterface extends HTMLAttributes<HTMLDivElement> {
  data: any;
}

export const DeliveryAgentCard: FC<userInterface> = ({ data }) => {
  const context = useContext(UserContext);
  const {
    setDeliveryAgentId,
    setDeliveryAgentName,
    setDeliveryAgentMob,
    setDeliveryAgentPartnerCode,
  } = context as UserContextType;

  const handleUpdate = () => {
    setDeliveryAgentId(data.id);
    setDeliveryAgentName(data.name);
    setDeliveryAgentMob(data.phone);
    setDeliveryAgentPartnerCode(data.partnerCode);
  };
  return (
    <div
      key={data.id}
      className="bg-blue-200 p-4 rounded-xl w-[100%] box-border"
    >
      <h1 className="text-3xl">{data.name}</h1>
      <h1 className="text-lg mt-2">Mob No: {data.phone}</h1>
      <h1 className="text-lg mt-2">Partner Code: {data.partnerCode}</h1>
      <div className="flex w-full justify-end">
        <button
          onClick={handleUpdate}
          className="rounded-xl bg-white py-2 px-3 mt-4 text-xl"
        >
          Update
        </button>
      </div>
    </div>
  );
};
