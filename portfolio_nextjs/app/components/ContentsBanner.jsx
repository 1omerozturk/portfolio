import React from "react";

const ContentsBanner = () => {
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
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {contents.map((content, index) => (
        <div className="text-center" key={index}>
          <h2>{content.title}</h2>
          <p>{content.text}</p>
          <a href={content.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContentsBanner;
