"use client";

import { Card } from "@/components/Card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("/api/getAllUsers", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setIsFetchloading(false);
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleSubmit = async () => {
    const data: any = [];
    const inputEl = document.querySelectorAll(".priority-input");
    Object.keys(inputEl).forEach((input, index) => {
      // @ts-ignore
      if (inputEl[index].value != "") {
        const item = {
          userId: inputEl[index].getAttribute("data-userid"),
          // @ts-ignore
          priority: inputEl[index].value,
        };
        data.push(item);
      }
    });

    try {
      setIsSubmitLoading(true);
      console.log(data)
      await axios.post("/api/setPriority", data, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="ml-10">
      <h1 className=" mt-6 text-3xl mb-5">All Users: </h1>
      {isFetchloading ? (
        <Loader2 className="animate-spin w-8 h-8" />
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((user, index) => {
            return <Card user={user} key={index} />;
          })}
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center text-white py-2 px-4 bg-green-400 rounded-lg w-fit my-6"
          >
            {isSubmitLoading && (
              <Loader2 className="animate-spin w-4 h-4 mr-2 text-white" />
            )}
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
