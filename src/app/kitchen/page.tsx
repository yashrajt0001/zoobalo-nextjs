"use client";

import { ShowLogin } from "@/components/ShowLogin";
import React, { useEffect, useState } from "react";

const page = () => {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setLogin(!localStorage.getItem("auth-token"));
  }, []);

  const isLoggedIn = () => {
    setLogin(false);
  };

  return (
    <div>{login ? <ShowLogin isLoggedIn={isLoggedIn} /> : <div>Kitchen</div>}</div>
  );
};

export default page;
