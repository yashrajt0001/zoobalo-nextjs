"use client";

import { Card } from "@/components/Card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);
  const [isFetchloading, setIsFetchloading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitDefaultLoading, setIsSubmitDefaultLoading] = useState(false);
  const [searchinput, setSearchinput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("/api/getAllUsers", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setIsFetchloading(false);
      setUsers(data);
      setResults(data);
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
      console.log(data);
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

  const handleDefaultSubmit = async () => {
    try {
      setIsSubmitDefaultLoading(true);
      await axios.get("/api/setPriority/default", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitDefaultLoading(false);
    }
  };

  useEffect(() => {
    if (results != undefined) {
      const finalResults = users.filter((result:any) => {
        return (
          result.name.toLowerCase().indexOf(searchinput.toLowerCase()) !==
          -1
        );
      });

      setResults(finalResults);
    }
  }, [searchinput]);

  return (
    <div className="ml-10 mt-4">
      <div className="flex items-center justify-center w-[30%]">
        <input
          type="text"
          value={searchinput}
          onChange={(e) => setSearchinput(e.target.value)}
          placeholder="Search a User"
          className="p-2 border border-gray-200 rounded-lg w-full outline-none"
        />
      </div>
      <div className="flex justify-between w-1/2 items-center">
        <h1 className=" mt-6 text-3xl mb-5">All Users: </h1>
        <button
          onClick={handleDefaultSubmit}
          className="bg-green-400 items-center justify-center h-fit w-fit py-2 px-4 rounded-lg text-white flex gap-2"
        >
          {isSubmitDefaultLoading && (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}{" "}
          Submit default
        </button>
      </div>
      {isFetchloading ? (
        <Loader2 className="animate-spin w-8 h-8" />
      ) : (
        <div className="flex flex-col gap-3">
          {!searchinput && users.map((user, index) => {
            return <Card user={user} key={index} />;
          })}
          {searchinput && results.map((user, index) => {
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
