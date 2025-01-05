import Link from "next/link";
import React from "react";
import { FaAddressCard } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="grid grid-flow-row space-y-4">
      <div className="w-fit h-fit p-2 rounded-full bg-slate-300">
        <FaAddressCard className="text-3xl text-orange-500" />
      </div>
      <Link className="link2" href="mailto:omer.ozturk.or.ok@gmail.com">Gmail</Link>
      <Link className="link2" href="tel:05011551065">Phone</Link>
    </div>
  );
};

export default Contact;
