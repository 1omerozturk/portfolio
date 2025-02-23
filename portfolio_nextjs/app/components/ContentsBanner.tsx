"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMedium } from "react-icons/fa";
import { ContentService } from "../service/contentService";
import Loading from "./Loading";

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

  /*   const contents = [
    {
      title: "Title",
      text: "Text",
      image: "https://picsum.photos/200/300",
      link: "https://www.example.com",
    },
    {
      title: "Title",
      text: "Text",
      image: "https://picsum.photos/200/301",
      link: "https://www.example.com",
    },
    {
      title: "Title",
      text: "Text",
      image: "https://picsum.photos/200/302",
      link: "https://www.example.com",
    },
    {
      title: "Title",
      text: "Text",
      image: "https://picsum.photos/200/302",
      link: "https://www.example.com",
    },
    {
      title: "Title",
      text: "Text",
      image: "https://picsum.photos/200/302",
      link: "https://www.example.com",
    },
  ]; */

  return (
    <>
      {loading ? (
        <Loading color={"lime"} />
      ) : (
        <div className="bg-gradient-to-b">
          <FaMedium className="text-4xl mx-auto mb-3 text-slate-700" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-3">
            {size &&
              contents.slice(0, size).map((content, index) => (
                <div className="animate-border text-center my-2" key={index}>
                  <div className="text-4xl" title={content.name}>
                    {content.name.slice(0, 15)}
                  </div>
                  <img
                    className="mx-auto p-2 rounded-2xl bg-cover w-full h-[300px]"
                    src={content.image}
                    alt={content.name}
                  />
                  <Link href={content.link}>Read More</Link>
                </div>
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
                  <img
                    className="bg-cover"
                    src={content.image}
                    alt={content.name}
                  />
                  <Link href={content.link}>Read More</Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentsBanner;
