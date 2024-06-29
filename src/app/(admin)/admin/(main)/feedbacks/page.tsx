"use client";
import { FeedBackCard } from "@/components/FeedBackCard";
import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createErrorMessage } from "@/lib/utils";


const page = () => {
  const [isFetchloading, setIsFetchloading] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(UserContext);
  const {
    feedbackId,
    feedbackTitle,
    feedbackBody,
    setFeedbackId,
    setFeedbackBody,
    setFeedbackTitle,
  } = context as UserContextType;

  // get all feedbacks
  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_HOST}/admin/feedback`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );
        setResults(data);
        console.log(data);
      } catch (error: any) {
        toast.error(createErrorMessage(error));
      } finally {
        setIsFetchloading(false);
      }
    };
    getFeedbacks();
  }, []);

  // send response of a feedback to a user
  const handleSend = async () => {
    setIsLoading(true);
    if (feedbackTitle == "" || feedbackBody == "") {
      setIsLoading(false);
      toast.error("Please enter details!");
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/admin/feedback/reply`,
        {
          feedbackId: feedbackId,
          title: feedbackTitle,
          body: feedbackBody,
        },

        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setFeedbackId(0);
      setFeedbackTitle("");
      setFeedbackBody("");
      const updatedArray = results.filter(
        (feedback: any) => feedback.id != feedbackId
      );
      setResults(updatedArray);
    } catch (error: any) {
      toast.error(createErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="ml-10 mt-4 pb-8">
          <div className="flex justify-between w-1/2 items-center">
            <h1 className=" mt-6 text-3xl mb-5">
              Total Feedbacks: {results.length}
            </h1>
          </div>
          {isFetchloading ? (
            <Loader2 className="animate-spin w-8 h-8" />
          ) : (
            <div className="flex w-full">
              <div className="flex flex-col gap-3 w-[50%]">
                {results.map((feedback: any) => (
                  <FeedBackCard data={feedback} />
                ))}
              </div>
              {feedbackId != 0 && (
                <div className="w-[40%] ml-12 -mt-14">
                  <div className="sticky top-24 z-10 bg-white flex flex-col gap-3">
                    <h1 className="text-3xl">Send Response:</h1>
                    <input
                      type="text"
                      placeholder="Title of the Reply"
                      className="p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={feedbackTitle!}
                      onChange={(e) => {
                        setFeedbackTitle(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Body of the Reply"
                      className=" p-5 outline-none border-[2px] border-gray-200 rounded-lg"
                      value={feedbackBody!}
                      onChange={(e) => {
                        setFeedbackBody(e.target.value);
                      }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={isLoading}
                      className={`px-4 py-2 flex items-center justify-center rounded-lg text-xl w-fit gap-2 ${
                        isLoading ? "bg-[#949494]" : "bg-green-500 text-white"
                      }`}
                    >
                      Send
                      {isLoading && (
                        <Loader2 className="animate-spin w-8 h-8 ml-3" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
