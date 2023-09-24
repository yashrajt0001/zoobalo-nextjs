"use client";

import { Card } from "@/components/Card";
import axios from "axios";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://3.85.77.226:5000/getAllUsers", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="ml-10">
      <h1 className=" mt-6 text-3xl mb-5">All Users: </h1>
      <div className="flex flex-col gap-3">
        {users.map((user) => {
          return <Card user={user} />;
        })}
      </div>
    </div>
  );
};

export default page;
