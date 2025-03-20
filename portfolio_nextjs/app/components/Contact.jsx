import Link from "next/link";
import React from "react";
import { FaAddressCard } from "react-icons/fa";

const ContactBanner = () => {
  return (
    <div className="grid grid-flow-row text-center space-y-4">
      <div className="w-fit h-fit p-2 mx-auto rounded-full bg-slate-300">
        <FaAddressCard className="text-3xl text-orange-500" />
      </div>
      <Link className="link2" href="mailto:omer.ozturk.or.ok@gmail.com">omer.ozturk.or.ok@gmail.com</Link>
      <Link className="link2" href="tel:05011551065">05011551065</Link>
    </div>
  );
};

export default ContactBanner;
