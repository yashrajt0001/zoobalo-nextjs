import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import React, { FC, HTMLAttributes, useContext } from "react";
interface userInterface extends HTMLAttributes<HTMLDivElement> {
    data:any
  }

export const FeedBackCard: FC<userInterface> = ({ data }) => {
    const context = useContext(UserContext);
    const {
      setFeedbackId
    } = context as UserContextType;
  return (
      <div key={data.id} className="bg-blue-200 p-4 rounded-xl w-[100%] box-border">
        <h1 className="text-2xl">{data.user.name}</h1>
        <h1 className="text-lg mt-1">Rating: {data.star}</h1>
        <div className="mt-2 text-lg flex w-full box-border">
          <h1 className="mr-2">Review: </h1>
          <h1>{data.comment}</h1>
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => setFeedbackId(data.id)}
            className="rounded-xl bg-white py-2 px-3 mt-4"
          >
            Send Response
          </button>
        </div>
      </div>
  );
};
