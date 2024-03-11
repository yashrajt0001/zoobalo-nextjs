"use client"
import React, { useState } from "react";
import UserContext from "./UserContext";
import axios, { AxiosError } from "axios";

const UserState = (props: any) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [location, setLocation] = useState("");
  const [balance, setBalance] = useState("");
  const [timing, setTiming] = useState("");
  const [feedbackId, setFeedbackId] = useState(0);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");

  return (
    <UserContext.Provider
      value={{
        location,
        setLocation,
        name,
        setName,
        address,
        setAddress,
        mob,
        setMob,
        balance,
        setBalance,
        timing,
        setTiming,
        feedbackId,
        setFeedbackId,
        feedbackTitle,
        setFeedbackTitle,
        feedbackBody,
        setFeedbackBody
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
