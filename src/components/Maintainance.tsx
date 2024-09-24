<<<<<<< HEAD
"use client";

import Image from "next/image";
import React from "react";
import maintainance from '@/assets/images/maintainance.png'

const Maintainance = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <Image src={maintainance} alt="maintainance" width={400} height={100} />
      <h1 className="font-bold text-xl">Website under maintainance</h1>
      <p className="text-slate-600">please check again later...</p>
    </div>
  );
};

export default Maintainance;
=======
"use client";

import Image from "next/image";
import React from "react";
import maintainance from '@/assets/images/maintainance.png'

const Maintainance = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <Image src={maintainance} alt="maintainance" width={400} height={100} />
      <h1 className="font-bold text-xl">Website under maintainance</h1>
      <p className="text-slate-600">please check again later...</p>
    </div>
  );
};

export default Maintainance;
>>>>>>> b3b4013904c952ab1f37d577d263f20b0ee5cbee
