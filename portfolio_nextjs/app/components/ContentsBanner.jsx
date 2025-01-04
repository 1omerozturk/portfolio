"use client"
import Link from "next/link";
import React from "react";

const ContentsBanner = ({ size }) => {
  const contents = [
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
  ];
  return (
    <div className="bg-gradient-to-b grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-3">
      {size &&
        contents.slice(0, size).map((content, index) => (
          <div
            className="animate-border text-center my-2"
            key={index}
          >
            <h2>{content.title}</h2>
            <img
              className="mx-auto p-2 rounded-2xl"
              src="https://purring-comma-24b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F67aac845-24d0-4e84-b872-77a6eb057f6e%2F19997a02-22cc-43ff-9c61-70e76adfacc1%2Fdesignpatterns.png?table=block&id=500c060e-2692-4d63-80d9-c84b9de845e4&spaceId=67aac845-24d0-4e84-b872-77a6eb057f6e&width=2000&userId=&cache=v2"
            />
            <p>{content.text}</p>
            <Link href={content.link}>Read More</Link>
          </div>
        ))}
        {!size&&contents.map((content, index) => (
          <div
            className="text-center border-2 border-black rounded-lg my-2"
            key={index}
          >
            <h2>{content.title}</h2>
            <img
              className="mx-auto p-2 rounded-2xl"
              src="https://purring-comma-24b.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F67aac845-24d0-4e84-b872-77a6eb057f6e%2F19997a02-22cc-43ff-9c61-70e76adfacc1%2Fdesignpatterns.png?table=block&id=500c060e-2692-4d63-80d9-c84b9de845e4&spaceId=67aac845-24d0-4e84-b872-77a6eb057f6e&width=2000&userId=&cache=v2"
            />
            <p>{content.text}</p>
            <Link href={content.link}>Read More</Link>
          </div>
        ))
        }
    </div>
  );
};

export default ContentsBanner;
