"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Message from "../../../../components/Message";
import BackIcon from "../../../components/BackIcon";
import { ContentService } from "../../../service/contentService";

interface ContentAddProps {
  content?: any;
}
const ContentAdd: React.FC<ContentAddProps> = ({ content }) => {
  const navigate = useRouter();
  const [data, setData] = useState(
    content
      ? content
      : {
          name: "",
          link: "",
          image: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content) {
      try {
        await ContentService.updateContents(content._id, data).then((res) => {
          console.log(res)
          if (res.status == 200) {
            Message.ToastMessage(
              "success",
              data.name + " updated successfully."
            );
            navigate.back();
          } else {
            Message.ToastMessage(
              "error",
              data.name + " An error occured. Try again."
            );
            navigate.refresh();
          }
        });
      } catch (error) {
        Message.ToastMessage(
          "error",
          data.name + " An error occured. Try again."
        );
        console.error(error.message);
      }
    } else {
      try {
        await ContentService.addContent(data).then((res) => {
          console.log(res);
          if (Number(res.status) === 201) {
            Message.ToastMessage(
              "success",
              data.name + " created successfully."
            );
            navigate.back();
          } else {
            Message.ToastMessage("error", "Bir hata oluştu");
            navigate.refresh();
          }
        });
      } catch (error) {
        Message.ToastMessage(
          "error",
          data.name + " An error occured. Try again."
        );
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <BackIcon />
      <div className="container mx-auto md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {!content && "Add Content"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Link:
            </label>
            <input
              type="text"
              name="link"
              value={data.link}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Image:
            </label>
            <input
              type="text"
              name="image"
              value={data.image}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <button type="submit" className="btn btn-outline-light">
              {content ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ContentAdd;
