"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Calendar from "react-calendar";
import "./MyCalendar.css";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import moment from "moment-timezone";

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
  const [cancelledMeal, setCancelledMeal] = useState([] as any);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [pausedDates, setPausedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [morningId, setMorningId] = useState(0);
  const [eveningId, setEveningId] = useState(0);
  const [pauseLoader, setPauseLoader] = useState(false);
  const [resumeLoader, setResumeLoader] = useState(false);

  const context = useContext(UserContext);
  const { userDetails, cancelMeal, pauseMeal } = context as UserContextType;

  useEffect(() => {
    if (
      userDetails != null &&
      userDetails.order &&
      userDetails.order.length > 0 &&
      userDetails.order[0]?.NextMeal?.PauseTime
    ) {
      const pauseTime = userDetails.order[0].NextMeal.PauseTime.map(
        (d: any) => {
          let day = moment(d.date).tz("Asia/Kolkata");
          const formattedDate = day.format();
          return new Date(formattedDate);
        }
      );
      setPausedDates(pauseTime);
      userDetails.order.map((item: any) => {
        if (item.tiffinTime == "MORNING") {
          setMorningId(item.id);
        }
        if (item.tiffinTime == "EVENING") {
          setEveningId(item.id);
        }
      });
    }
  }, [userDetails]);

  var today = new Date();
  var hours = today.getHours();

  const getDatesForMonth = (
    year: number,
    month: number,
    disabledDates: Date[]
  ): Date[] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const datesForMonth: Date[] = [];

    for (
      let currentDate = new Date(firstDayOfMonth); // Start with the first day of the month
      currentDate <= lastDayOfMonth;
      currentDate.setDate(currentDate.getDate() + 1) // Increment the current date by 1 day
    ) {
      if (!isDateDisabled(currentDate, disabledDates) && currentDate > today) {
        datesForMonth.push(new Date(currentDate)); // Add the current date to the array if it's not disabled
      }
    }

    return datesForMonth;
  };

  const isSameDay = (disabledDate: Date | any, date: Date | any): boolean => {
    // Check if disabledDate and date are Date objects
    if (!(disabledDate instanceof Date) || !(date instanceof Date)) {
      return false; // If either parameter is not a Date object, return false
    }

    return (
      disabledDate.getDate() === date.getDate() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateDisabled = (date: Date, disabledDates: Date[]): boolean => {
    return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date, pausedDates)) {
      return;
    }

    const selectedIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );
    let newSelectedDates: Date[];

    if (selectedIndex === -1) {
      newSelectedDates = [...selectedDates, date];
    } else {
      newSelectedDates = [...selectedDates];
      newSelectedDates.splice(selectedIndex, 1);
    }

    setSelectedDates(newSelectedDates);
  };

  const loadPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const loadNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    if (cancelledMeal.length > 1) {
      const res1 = await cancelMeal(morningId);
      const res2 = await cancelMeal(eveningId);
    } else {
      if (cancelledMeal[0] == "Lunch") {
        const res3 = await cancelMeal(morningId);
      } else {
        const res4 = await cancelMeal(eveningId);
      }
    }
    setIsLoading(false);
  };

  const handlePause = async () => {
    setPauseLoader(true);
    let datesArray = [];
    for (let key of selectedDates) {
      let day = moment(key).tz("Asia/Kolkata");
      const formattedDate = day.format();
      datesArray.push(formattedDate);
    }
    console.log("datesArray: ", datesArray);
    await pauseMeal(datesArray, id);
    setPauseLoader(false);
  };

  const handleResume = async () => {
    setResumeLoader(true);
    setPausedDates([]);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/meal/resume`,
        {
          userId: parseInt(id as any),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(res.data);
      setResumeLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white py-8 px-8 min-h-full">
      <h1 className="text-3xl text-green-500">{name}</h1>
      <h1 className="text-2xl text-orange-500 mt-1">{mobile}</h1>
      <div>
        <h1 className="text-3xl mt-5">Cancel Today's meal:</h1>
        {(userDetails?.order.length > 1 ||
          userDetails?.order[0].tiffinTime == "MORNING") &&
          (cancelledMeal.includes("Lunch") ? (
            <button
              className="flex flex-row items-center mt-8"
              onClick={() => {
                const result = cancelledMeal.filter((meal: string) => {
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
          ))}

        {(userDetails?.order.length > 1 ||
          userDetails?.order[0].tiffinTime == "EVENING") &&
          (cancelledMeal.includes("Dinner") ? (
            <button
              className="flex flex-row items-center mt-8"
              onClick={() => {
                const result = cancelledMeal.filter((meal: string) => {
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
              onClick={() => setCancelledMeal([...cancelledMeal, "Dinner"])}
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
          ))}
      </div>

      <button
        onClick={handleCancel}
        disabled={isLoading}
        className={`flex items-center py-2 px-5 mt-6 rounded-lg text-white ${
          isLoading ? "bg-[#949494]" : "bg-green-500"
        }`}
      >
        Confirm Cancel
        {isLoading && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
      </button>
      <div className="calendar-container mt-12">
        <h1 className="text-2xl">Pause Meal</h1>
        <div className="current-month">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="calendar-nav">
          <button onClick={loadPreviousMonth}>Previous Month</button>
          <button onClick={loadNextMonth}>Next Month</button>
        </div>
        <div className="calendar-grid">
          {getDatesForMonth(currentYear, currentMonth, pausedDates).map(
            (date, index) => (
              <div
                key={index}
                className={`calendar-date ${
                  selectedDates.some(
                    (selectedDate) => selectedDate.getTime() === date.getTime()
                  )
                    ? "selected"
                    : ""
                } ${isDateDisabled(date, pausedDates) ? "disabled" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </div>
            )
          )}
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePause}
            disabled={pauseLoader}
            className={`flex items-center py-2 px-5 mt-5 rounded-lg text-white ${
              pauseLoader ? "bg-[#949494]" : "bg-green-500"
            }`}
          >
            Confirm Pause
            {pauseLoader && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
          </button>
          {pausedDates?.length > 0 && (
            <button
              onClick={handleResume}
              disabled={resumeLoader}
              className={`ml-4 flex items-center py-2 px-5 mt-5 rounded-lg text-white ${
                resumeLoader ? "bg-[#949494]" : "bg-green-500"
              }`}
            >
              Resume Meals
              {resumeLoader && (
                <Loader2 className="animate-spin w-8 h-8 ml-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
