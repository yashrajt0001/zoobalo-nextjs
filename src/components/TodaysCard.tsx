"use client"

import { FC } from "react";

interface TodaysCardProps {
  name: string;
  mobile: string;
  delivered: number;
  dateTime: string
  picked: number;
}

export const TodaysCard: FC<TodaysCardProps> = ({
  name,
  delivered,
  mobile,
  picked,
  dateTime
}) => {
  const parsedDate = new Date(dateTime)
  let hours = parsedDate.getHours()
  let minutes: number | string = parsedDate.getMinutes()
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const time = hours + ":" + minutes + " " + ampm;
  return (
    <div className="mt-5 bg-white rounded-xl flex text-2xl py-5 px-16">
      <h1 className="w-[20%] text-center">{time}</h1>
      <h1 className="w-[20%] text-center">{name}</h1>
      <h1 className="w-[20%] text-center">{mobile}</h1>
      <h1 className="w-[20%] text-center">{delivered}</h1>
      <h1 className="w-[20%] text-center">{picked}</h1>
      <h1 className="w-[20%] text-center">{delivered - picked}</h1>
    </div>
  );
};
