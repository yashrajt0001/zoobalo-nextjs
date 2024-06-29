"use client";
import React, { useState } from "react";
import UserContext from "./UserContext";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";

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
  const [extraTiffinDeliveries, setExtraTiffinDeliveries] = useState([]);
  const [results, setResults] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [dueTiffins, setDueTiffins] = useState(0);
  const [tiffinPackageId, setTiffinPackageId] = useState(0);
  const [tiffinPackageName, setTiffinPackageName] = useState("");
  const [packageContain, setPackageContain] = useState("");
  const [price, setPrice] = useState(0);
  const [kitchenHeadId, setKitchenHeadId] = useState(0);
  const [kitchenHeadName, setKitchenHeadName] = useState("");
  const [kitchenHeadUsername, setKitchenHeadUsername] = useState("");
  const [kitchenHeadPassword, setKitchenHeadPassword] = useState("");
  const [kitchenHeadPhone, setKitchenHeadPhone] = useState("");
  const [kitchenHeadStatus, setKitchenHeadStatus] = useState(true);
  const [kitchenId, setKitchenId] = useState(0);
  const [kitchenName, setKitchenName] = useState("");
  const [kitchenAddress, setKitchenAddress] = useState("");
  const [areaManagerId, setAreaManagerId] = useState(0);
  const [areaManagerName, setAreaManagerName] = useState("");
  const [areaManagerUsername, setAreaManagerUsername] = useState("");
  const [areaManagerPassword, setAreaManagerPassword] = useState("");
  const [areaManagerEmail, setAreaManagerEmail] = useState("");
  const [areaManagerPhone, setAreaManagerPhone] = useState("");
  const [areaManagerAlternatePhone, setAreaManagerAlternatePhone] =
    useState("");
  const [areaManagerEmergencyPhone, setAreaManagerEmergencyPhone] =
    useState("");
  const [areaManagerResidentAddress, setAreaManagerResidentAddress] =
    useState("");
  const [areaManagerOfficeAddress, setAreaManagerOfficeAddress] = useState("");

  const cancelMeal = async (id: number) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/meal/cancel`,
        { orderId: id },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      return true;
    } catch (error: any) {
      toast.error(createErrorMessage(error));
      return false;
    }
  };

  const pauseMeal = async (arr: any, id: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/kitchenHead/meal/pause`,
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
      return true;
    } catch (error: any) {
      toast.error(createErrorMessage(error));
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
      setResults(data);
      setDemoDeliveries(data);
    } catch (error: any) {
      toast.error(createErrorMessage(error));
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
      setResults(data);
      setDemoDeliveries(data);
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    }
  };

  const getExtraTiffinDeliveries = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/kitchenHead/pending`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setResults(data.AssignedKitchenHead[0].kitchen.ExtraTiffin);
      setExtraTiffinDeliveries(data.AssignedKitchenHead[0].kitchen.ExtraTiffin);
    } catch (error: any) {
      toast.error(createErrorMessage(error))
    }
  };

  const getCompletedExtraTiffinDeliveries = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/extraTiffin/kitchenHead/completed`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setResults(data);
      setExtraTiffinDeliveries(data);
    } catch (error: any) {
      toast.error(createErrorMessage(error))
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
        getExtraTiffinDeliveries,
        getCompletedExtraTiffinDeliveries,
        extraTiffinDeliveries,
        setExtraTiffinDeliveries,
        tiffinPackageId,
        setTiffinPackageId,
        tiffinPackageName,
        setTiffinPackageName,
        packageContain,
        setPackageContain,
        price,
        setPrice,
        kitchenHeadId,
        setKitchenHeadId,
        kitchenHeadName,
        setKitchenHeadName,
        kitchenHeadUsername,
        setKitchenHeadUsername,
        kitchenHeadPassword,
        setKitchenHeadPassword,
        kitchenHeadPhone,
        setKitchenHeadPhone,
        kitchenHeadStatus,
        setKitchenHeadStatus,
        kitchenId,
        setKitchenId,
        kitchenName,
        setKitchenName,
        kitchenAddress,
        setKitchenAddress,
        areaManagerId,
        setAreaManagerId,
        areaManagerName,
        setAreaManagerName,
        areaManagerUsername,
        setAreaManagerUsername,
        areaManagerEmail,
        setAreaManagerEmail,
        areaManagerPhone,
        setAreaManagerPhone,
        areaManagerPassword,
        setAreaManagerPassword,
        areaManagerAlternatePhone,
        setAreaManagerAlternatePhone,
        areaManagerEmergencyPhone,
        setAreaManagerEmergencyPhone,
        areaManagerResidentAddress,
        setAreaManagerResidentAddress,
        areaManagerOfficeAddress,
        setAreaManagerOfficeAddress,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
