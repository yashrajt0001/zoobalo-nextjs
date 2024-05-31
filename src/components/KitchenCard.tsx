import React, { FC, HTMLAttributes, useContext } from "react";
interface userInterface extends HTMLAttributes<HTMLDivElement> {
  data: any;
}

const KitchenCard: FC<userInterface> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="bg-blue-200 p-4 rounded-xl w-[100%] box-border"
    >
      <h1 className="text-2xl">{data.name}</h1>
      <h1 className="text-lg mt-1">Address: {data.address}</h1>
    </div>
  );
};

export default KitchenCard;
