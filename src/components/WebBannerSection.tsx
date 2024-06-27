"use client";

import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import WebBannerCard from "./ui/WebBannerCard";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

export function WebBannerSection() {
  const [items, setItems] = useState<{ id: number; image: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWebBanners = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/webBanner`,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      setItems(data);
      console.log(data);
    };

    getWebBanners();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      let itemsIds: number[] = [];
      items.map((item) => itemsIds.push(item.id));
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_HOST}/areaManager/webBanner/update`,
        { items: itemsIds },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
    } catch (error) {
      // todo: show toast msg
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-between items-center px-10 w-full">
      <Reorder.Group
        axis="x"
        values={items}
        onReorder={setItems}
        className="w-full"
      >
        <div className="flex p-6 gap-4 max-w-[90%] overflow-x-auto">
          {items.map((item, index) => (
            <Reorder.Item key={item.id} value={item} className="cursor-grab">
              <WebBannerCard item={item} setItems={setItems} />
              <div className="flex items-center justify-center pt-2 font-semibold">
                {index + 1}
              </div>
            </Reorder.Item>
          ))}
          <ImageUpload/>
        </div>
      </Reorder.Group>
      <Button
        variant="zoobaloSuccess"
        onClick={handleUpdate}
        disabled={isLoading}
        className={`${isLoading ? 'bg-green-300': 'bg-green-500'}`}
      >
        Update
       {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2"/>}
      </Button>
    </div>
  );
}