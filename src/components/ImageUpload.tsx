import { createErrorMessage } from "@/lib/utils";
import axios from "axios";
import { CloudUpload, Loader2 } from "lucide-react";
import { FC, useRef, useState } from "react";

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps> = ({}) => {
  const [imageUrl, setImageUrl] = useState("");
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = () => {
    fileUploadRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setIsLoading(true)
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("webBanner", file);

      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/webBanner`,
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error) {
      // todo: show error
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <button
      className="h-20 relative flex items-center justify-center aspect-video border-2 border-dashed border-gray-400 rounded-lg"
      onClick={handleImageUpload}
    >
      <div className="flex items-center justify-center flex-col px-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="image"
            className="object-cover h-14 aspect-video"
          />
        ) : (
          <>
            <CloudUpload className="h-8 w-8 text-blue-500" />
            <div className="font-bold text-gray-500 text-sm">Upload Image</div>
          </>
        )}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        hidden
        ref={fileUploadRef}
      />
      {isLoading && (
        <div className="absolute z-10 flex-col bg-slate-500/20 h-full w-full flex items-center justify-center">
          <Loader2 className=" text-white w-4 h-4 animate-spin" />
          <div className="text-white">Uploading...</div>
        </div>
      )}
    </button>
  );
};

export default ImageUpload;
