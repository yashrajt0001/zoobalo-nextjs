"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Calendar from "react-calendar";

interface PageInterface {
  params: {
    userId: number;
  };
}

const page = ({ params }: PageInterface) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("userId");
  const name = searchParams.get("name");
  const mobile = searchParams.get("mobile");
  const [cancelledMeal, setCancelledMeal] = useState([""]);
  const [dates, setDates] = useState([]);

  const onChange = (newDate: any) => {
    // Check if the selected date already exists in the array
    if (dates.some((date) => date.getTime() === newDate.getTime())) {
      // If the date exists, remove it from the array
      setDates(dates.filter((date) => date.getTime() !== newDate.getTime()));
    } else {
      // If the date doesn't exist, add it to the array
      setDates([...dates, newDate]);
    }
  };

  var today = new Date();
  var hours = today.getHours();

  return (
    <div className="bg-white pt-8 px-8 min-h-full">
      <h1 className="text-3xl text-green-500">{name}</h1>
      <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>

      <div>
        <h1 className="text-3xl mt-5">Cancel Today's meal:</h1>
        {cancelledMeal.includes("Lunch") ? (
          <button
            className="flex flex-row items-center mt-8"
            onClick={() => {
              const result = cancelledMeal.filter((meal) => {
                return meal != "Lunch";
              });
              setCancelledMeal(result);
            }}
          >
            <div className="border-white rounded-xl w-6 h-6 bg-[#22AA00]"></div>
            <div>
              <h1
                className={`ml-3 text-2xl ${
                  hours >= 9 ? "text-[#BDBDBD]" : "text-black"
                }`}
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Lunch
              </h1>
            </div>
            <h1
              className="text-red-400 text-xs ml-2"
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              (You can cancel before 9:00AM)
            </h1>
          </button>
        ) : (
          <button
            className="flex flex-row items-center mt-8"
            disabled={hours >= 9 ? true : false}
            onClick={() => setCancelledMeal([...cancelledMeal, "Lunch"])}
          >
            <div
              className={`rounded-xl w-6 h-6 ${
                hours >= 9 ? "bg-[#BDBDBD]" : "border bg-white"
              }`}
            ></div>

            <div>
              <h1
                className={`text-2xl ml-3 ${
                  hours >= 9 ? "text-[#BDBDBD]" : "text-black"
                }`}
              >
                Lunch
              </h1>
            </div>
            <h1 className="text-red-400 text-xs ml-2">
              (You can cancel before 9:00AM)
            </h1>
          </button>
        )}

        {cancelledMeal.includes("Dinner") ? (
          <button
            className="flex flex-row items-center mt-8"
            onClick={() => {
              const result = cancelledMeal.filter((meal) => {
                return meal != "Dinner";
              });
              setCancelledMeal(result);
            }}
          >
            <div className="border-white rounded-xl w-6 h-6 bg-[#22AA00]"></div>
            <div>
              <h1
                className={`ml-3 text-2xl ${
                  hours >= 15 ? "text-[#BDBDBD]" : "text-black"
                }`}
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Dinner
              </h1>
            </div>
            <h1
              className="text-red-400 text-xs ml-2"
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              (You can cancel before 3:00PM)
            </h1>
          </button>
        ) : (
          <button
            className="flex flex-row items-center mt-8"
            disabled={hours >= 15 ? true : false}
            onClick={() => setCancelledMeal([...cancelledMeal, "Lunch"])}
          >
            <div
              className={`rounded-xl w-6 h-6 ${
                hours >= 15 ? "bg-[#BDBDBD]" : "border bg-white"
              }`}
            ></div>

            <div>
              <h1
                className={`text-2xl ml-3 ${
                  hours >= 15 ? "text-[#BDBDBD]" : "text-black"
                }`}
              >
                Dinner
              </h1>
            </div>
            <h1 className="text-red-400 text-xs ml-2">
              (You can cancel before 3:00PM)
            </h1>
          </button>
        )}
      </div>

      <div className="mt-8">
        <h1 className="text-3xl">Pause meal:</h1>
        <Calendar
          onChange={onChange}
          value={dates} // Pass the array of selected dates
          selectRange={true} // Enable selecting multiple dates
          tileClassName="selected" // Add a class to selected dates for styling
        />
      </div>
    </div>
  );
};

export default page;
