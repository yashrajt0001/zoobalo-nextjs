import axios from "axios";
import { Loader2, X } from "lucide-react";
import { FC, useState } from "react";

interface WebBannerCardProps {
  item: { id: number; image: string };
  setItems: React.Dispatch<
    React.SetStateAction<{ id: number; image: string }[]>
  >;
}

const WebBannerCard: FC<WebBannerCardProps> = ({ item, setItems }) => {
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setIsRemoveLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/webBanner/delete?id=${item.id}`,
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token')
          }
        }
      );
      setItems((prev)=> prev.filter((banner)=> banner.id !== item.id))
    } catch (error) {
      //todo: show error
      console.log(error);
    } finally {
      setIsRemoveLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`h-20 aspect-video relative rounded-lg bg-[url('${
          process.env.NEXT_PUBLIC_HOST
        }/image/webBanner/${encodeURIComponent(item.image)}')]`}
        style={{
          background: `url(${
            process.env.NEXT_PUBLIC_HOST + "/image/webBanner/" + item.image
          })`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <button
          className={`${
            isRemoveLoading ? "bg-red-300" : "bg-red-500"
          } rounded-full absolute right-0 top-0 transform translate-x-[50%] translate-y-[-50%] p-2 hover:bg-red-400 cursor-pointer`}
          onClick={handleRemove}
          disabled={isRemoveLoading}
        >
          {isRemoveLoading ? (
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          ) : (
            <X className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default WebBannerCard;
