import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import React, {
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
interface userInterface extends HTMLAttributes<HTMLDivElement> {
  data: any;
}

export const DemoTiffinCard: FC<userInterface> = ({ data }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [gotDelivered, setGotDelivered] = useState(false);
  const [gotPicked, setGotPicked] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSelection();
  }, [isPaid, gotDelivered, gotPicked]);

  const context = useContext(UserContext);
  const { getDemoDeliveries, showCompleted } = context as UserContextType;

  console.log(reviewText);

  const handleSelection = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/demoTiffin/selection`,
        {
          isPayment: data.isPayment ? data.isPayment : isPaid,
          isDelivered: data.isDelivered ? data.isDelivered : gotDelivered,
          isPicked: data.isPicked ? data.isPicked : gotPicked,
          demoOrderId: data.id,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/demoTiffin/remove`,
        {
          demoOrderId: data.id,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
    await getDemoDeliveries();
  };

  const handleDone = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/demoTiffin/done`,
        {
          demoOrderId: data.id,
          review: reviewText,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error: any) {
      console.log(error.response.data);
    }
    await getDemoDeliveries();
  };

  return (
    <div
      key={data.id}
      className="bg-blue-200 p-4 pr-6 rounded-xl w-[100%] box-border"
    >
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl">{data.user.name}</h1>
          <h1 className="text-lg mt-[2px]">Mob No: {data.user.phone}</h1>
          <h1 className="text-lg mt-1">Address: {data.address}</h1>
          <h1 className="text-lg mt-1">Tiffin Time: {data.tiffinTime}</h1>
        </div>

        {!showCompleted && (
          <div>
            {isPaid || data.isPayment ? (
              <button
                className="flex flex-row items-center justify-center"
                onClick={() => {
                  setIsPaid(false);
                }}
              >
                <div className="border-white rounded-xl w-4 h-4 bg-[#22AA00]"></div>
                <div>
                  <h1 className={`ml-3 text-xl`}>Payment</h1>
                </div>
              </button>
            ) : (
              <button
                className="flex flex-row items-center justify-center"
                onClick={() => {
                  setIsPaid(true);
                }}
              >
                <div className={`rounded-xl w-4 h-4 border bg-white`}></div>

                <div>
                  <h1 className={`text-xl ml-3`}>Payment</h1>
                </div>
              </button>
            )}

            {gotDelivered || data.isDelivered ? (
              <button
                className="flex flex-row items-center justify-center mt-2"
                onClick={() => {
                  setGotDelivered(false);
                }}
              >
                <div className="border-white rounded-xl w-4 h-4 bg-[#22AA00]"></div>
                <div>
                  <h1 className={`ml-3 text-xl`}>Delivered</h1>
                </div>
              </button>
            ) : (
              <button
                className="flex flex-row items-center justify-center mt-2"
                onClick={() => setGotDelivered(true)}
              >
                <div className={`rounded-xl w-4 h-4 border bg-white`}></div>

                <div>
                  <h1 className={`text-xl ml-3`}>Delivered</h1>
                </div>
              </button>
            )}

            {gotPicked || data.isPicked ? (
              <button
                className="flex flex-row justify-center items-center mt-2"
                onClick={() => {
                  setGotPicked(false);
                }}
              >
                <div className="border-white rounded-xl w-4 h-4 bg-[#22AA00]"></div>
                <div>
                  <h1 className={`ml-3 text-xl`}>Picked Up</h1>
                </div>
              </button>
            ) : (
              <button
                className="flex flex-row justify-center items-center mt-2"
                onClick={() => setGotPicked(true)}
              >
                <div className={`rounded-xl w-4 h-4 border bg-white`}></div>

                <div>
                  <h1 className={`text-xl ml-3`}>Picked Up</h1>
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      <h1 className="text-lg">Review:</h1>
      <div className="flex w-full flex-row justify-between">
        {showCompleted ? (
          <div>
            <h1 className="text-base">{data.DemoTiffinReview[0].review}</h1>
          </div>
        ) : (
          <div className="w-[60%] mt-2">
            <input
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              type="text"
              className="rounded-md w-full p-2 outline-none"
            />
          </div>
        )}
        {!showCompleted &&
          <div>
            <button
              onClick={handleRemove}
              className="rounded-xl bg-red-400 py-2 px-3 text-xl text-white"
            >
              Remove
            </button>
            <button
              onClick={handleDone}
              className="rounded-xl bg-white py-2 px-3 text-xl ml-3"
            >
              Done
            </button>
          </div>}
      </div>
    </div>
  );
};
