import Image from 'next/image';
import { FC } from 'react'

interface HowItWorksItemProps {
  image: string
  title: string
  desc: string
}

const HowItWorksItem: FC<HowItWorksItemProps> = ({image, title, desc}) => {
  return (
    <div className="text-center flex flex-col gap-2 w-72">
      <div className="mb-2 flex justify-center">
        <div className="rounded-full bg-[#22aa00] p-5 text-center w-fit">
          <Image
            className="mx-auto"
            src={image}
            width={50}
            height={50}
            alt=""
          />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-700">{title}</h3>
      <p className="">{desc}</p>
    </div>
  );

}

export default HowItWorksItem
    
