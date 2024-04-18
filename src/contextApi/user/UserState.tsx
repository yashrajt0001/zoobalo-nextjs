"use client";
import React, { useState } from "react";
import UserContext from "./UserContext";
import axios, { AxiosError } from "axios";

const UserState = (props: any) => {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [morningAddress, setMorningAddress] = useState("");
  const [eveningAddress, setEveningAddress] = useState("");
  const [mob, setMob] = useState("");
  const [location, setLocation] = useState("");
  const [balance, setBalance] = useState("");
  const [timing, setTiming] = useState("");
  const [feedbackId, setFeedbackId] = useState(0);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [deliveryAgentName, setDeliveryAgentName] = useState("");
  const [deliveryAgentMob, setDeliveryAgentMob] = useState("");
  const [deliveryAgentParnterCode, setDeliveryAgentPartnerCode] = useState("");
  const [deliveryAgentId, setDeliveryAgentId] = useState(0);
  const [userDetails, setUserDetails] = useState({} as any);
  const [demoDeliveries, setDemoDeliveries] = useState([]);
  const [results, setResults] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dueTiffins, setDueTiffins] = useState(0);

  const cancelMeal = async (id: number) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/meal/cancel`,
        { orderId: id },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      return true;
    } catch (error: any) {
      console.log(error.msg);
      return false;
    }
  };

  const pauseMeal = async (arr: any, id: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/meal/pause`,
        {
          dates: arr,
          userId: parseInt(id),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(res.data);
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

  const getDemoDeliveries = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/demoTiffin/order/pending`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      setResults(data);
      setDemoDeliveries(data);
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

  const getCompletedDeliveries = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/demoTiffin/order/completed`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      setResults(data);
      setDemoDeliveries(data);
      return true;
    } catch (error: any) {
      console.log(error.response.data);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        location,
        setLocation,
        userName,
        setUserName,
        morningAddress,
        setMorningAddress,
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
        setFeedbackBody,
        deliveryAgentName,
        setDeliveryAgentName,
        deliveryAgentMob,
        setDeliveryAgentMob,
        deliveryAgentParnterCode,
        setDeliveryAgentPartnerCode,
        deliveryAgentId,
        setDeliveryAgentId,
        userDetails,
        setUserDetails,
        cancelMeal,
        pauseMeal,
        demoDeliveries,
        setDemoDeliveries,
        results,
        setResults,
        getDemoDeliveries,
        getCompletedDeliveries,
        showCompleted,
        setShowCompleted,
        eveningAddress,
        setEveningAddress,
        dueTiffins,
        setDueTiffins,
        userId,
        setUserId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
