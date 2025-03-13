"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMedium } from "react-icons/fa";
import { ContentService } from "../service/contentService";
import Loading from "./Loading";
import Image from "next/image";

interface ContentSizeProps {
  size?: number;
}

const ContentsBanner: React.FC<ContentSizeProps> = ({ size }) => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await ContentService.getContents().then((res) => {
        setContents(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading color={"lime"} />
      ) : (
        <div className="pt-2">
          <FaMedium className="text-4xl mx-auto mb-3 text-slate-700" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-3">
            {size &&
              contents.slice(0, size).map((content, index) => (
                <a
                className="text-black"
                style={{textDecoration:'none'}}
                  title={content.name}
                  key={index}
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <div className=" text-center my-2" key={index}>
                  <div className="text-4xl" title={content.name}>
                    {content.name.slice(0, 15)}
                  </div>

                  <Image
                    src={content.image}
                    alt={content.name}
                    width={300}
                    height={300}
                    className="mx-auto p-2 rounded-2xl bg-cover w-full h-[300px] hover:scale-105 hover:animate-pulse transition-all duration-500 cursor-pointer"
                  />
                  <div className="hover:font-semibold text-slate-50 hover:text-slate-950 hover:underline w-fit mx-auto text-center">
                    Read..
                  </div>
                </div>
                  </a>
              ))}
            {!size &&
              contents.map((content, index) => (
                <div
                  className="text-center border-2 border-black rounded-lg my-2"
                  key={index}
                >
                  <div title={content.name} className="text-4xl">
                    {content.name.slice(0, 15)}
                  </div>

                  <Image
                    src={content.image}
                    alt={content.name}
                    width={300}
                    height={300}
                  />
                  <a
                    title={content.name}
                    key={index}
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read..
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentsBanner;
