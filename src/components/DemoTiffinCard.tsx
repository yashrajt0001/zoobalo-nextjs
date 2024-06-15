import UserContext, { UserContextType } from "@/contextApi/user/UserContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, {
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
interface userInterface extends HTMLAttributes<HTMLDivElement> {
  data: any;
}

export const DemoTiffinCard: FC<userInterface> = ({ data }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [gotDelivered, setGotDelivered] = useState(false);
  const [gotPicked, setGotPicked] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [removeLoader, setRemoveLoader] = useState(false);
  const [doneLoader, setDoneLoader] = useState(false);

  useEffect(() => {
    handleSelection();
  }, [isPaid, gotDelivered, gotPicked]);

  const context = useContext(UserContext);
  const { getDemoDeliveries, showCompleted } = context as UserContextType;

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
      toast.error(error.response.data);
    }
  };

  const handleRemove = async () => {
    setRemoveLoader(true);
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
      setIsPaid(false);
      setGotDelivered(false);
      setGotPicked(false);
      setReviewText("");
      await getDemoDeliveries();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setRemoveLoader(false);
    }
  };

  const handleDone = async () => {
    setDoneLoader(true);
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
      setIsPaid(false);
      setGotDelivered(false);
      setGotPicked(false);
      setReviewText("");
      await getDemoDeliveries();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setDoneLoader(false);
    }
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
        {!showCompleted && (
          <div>
            <button
              onClick={handleRemove}
              disabled={removeLoader}
              className={`p-3 font-bold rounded-xl flex justify-center items-center gap-2 ${
                removeLoader ? "bg-[#949494]" : "bg-red-400 text-white"
              }`}
            >
              Remove
              {removeLoader && (
                <Loader2 className="animate-spin w-8 h-8 ml-3" />
              )}
            </button>
            <button
              onClick={handleDone}
              disabled={doneLoader}
              className={`p-3 font-bold rounded-xl flex justify-center items-center gap-2 ${
                doneLoader ? "bg-[#949494]" : "bg-white text-black"
              }`}
            >
              Done
              {doneLoader && <Loader2 className="animate-spin w-8 h-8 ml-3" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
