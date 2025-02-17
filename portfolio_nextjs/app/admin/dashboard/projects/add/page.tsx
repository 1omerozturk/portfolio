"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Message from "../../../../components/Message";
import { AdminProjectService } from "../../../service/projectService";
import BackIcon from "../../../components/BackIcon";

interface ProjectAddProps {
  project?: any;
}

const ProjectAdd: React.FC<ProjectAddProps> = ({ project }) => {
  const navigate = useRouter();
  const [data, setData] = useState(
    project
      ? project
      : {
          title: "",
          description: "",
          type: "",
          technologies: [],
          repoLink: "",
          liveDemoLink: "",
          images: [],
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
    if (project) {
      await AdminProjectService.updateProject(project._id, data).then((res) => {
        if (Number(res.status) === 200) {
          Message.ToastMessage(
            "success",
            data.title + " başarıyla güncellendi."
          );
          navigate.back();
        } else {
          Message.ToastMessage("error", "Bir hata oluştu");
          navigate.refresh();
        }
      });
    } else {
      await AdminProjectService.addProject(data).then((res) => {
        console.log(res);
        if (Number(res?.status) === 201) {
          navigate.back();
        } else {
          navigate.refresh();
        }
      });
    }
  };

  return (
    <>
      <BackIcon />
      <div className="mx-auto py-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-6 md:w-1/2 mx-auto bg-gray-900 text-white rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Description:
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Type:
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                id="web"
                name="type"
                value="web"
                checked={data.type === "web"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="web" className="mr-4">
                Web
              </label>
              <input
                type="radio"
                id="mobile"
                name="type"
                value="mobile"
                checked={data.type === "mobile"}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="mobile">Mobile</label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Technologies:
            </label>
            <input
              type="text"
              name="technologies"
              value={data.technologies.join(", ")}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  technologies: e.target.value.split(", "),
                }))
              }
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Repository Link:
            </label>
            <input
              type="text"
              name="repoLink"
              value={data.repoLink}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Live Demo Link:
            </label>
            <input
              type="text"
              name="liveDemoLink"
              value={data.liveDemoLink}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Images:
            </label>
            <input
              type="text"
              name="images"
              value={data.images.join(", ")}
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  images: e.target.value.split(", "),
                }))
              }
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold"
          >
            {project ? "Update Project" : "Add Project"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectAdd;
