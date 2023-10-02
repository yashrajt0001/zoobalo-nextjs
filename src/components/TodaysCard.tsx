"use client"

import { FC } from "react";

interface TodaysCardProps {
  name: string;
  mobile: string;
  delivered: number;
  picked: number;
}

export const TodaysCard: FC<TodaysCardProps> = ({
  name,
  delivered,
  mobile,
  picked,
}) => {
  return (
    <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
      <h1 className="w-[20%] text-center">{name}</h1>
      <h1 className="w-[20%] text-center">{mobile}</h1>
      <h1 className="w-[20%] text-center">{delivered}</h1>
      <h1 className="w-[20%] text-center">{picked}</h1>
      <h1 className="w-[20%] text-center">{delivered - picked}</h1>
    </div>
  );
};
