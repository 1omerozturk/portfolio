"use client";

import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { SocialService } from "../../service/socialService";
import Loading from "../../components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Message from "../../../components/Message";
import { DynamicIcon } from "../../../components/DynamicIcon";

const AdminSocialLinks = () => {
  const navigate = useRouter();
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    setLoading(true);
    try {
      const response = await SocialService.getSocials()
        .then((res) => {
          return res.data;
        })
        .finally(() => {
          setLoading(false);
        });
      setSocialLinks(response);
    } catch (error) {
      console.error("Error fetching social links", error);
      setLoading(false);
    }
  };

  const onEdit = (id) => {
    navigate.push(`social/edit/${id}`);
  };
  const onDelete = async (id) => {
    const response = await SocialService.deleteSocial(id).then((res) => {
      return res;
    });
    if (Number(response.status) === 200) {
      const updatedData = socialLinks.filter((social) => id !== social._id);
      setSocialLinks(updatedData);
      Message.ToastMessage(
        "success",
        response.data.name + " is deleting successfully."
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Link title="Add" href={"social/add"} className="text-end">
          <button className="btn btn-outline-light mb-2">
            <FaPlusCircle className="text-xl" />
          </button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-center">
            <table className="table w-fit table-dark table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>
                    <button disabled className="btn  btn-sm btn-success">
                      Name
                    </button>
                  </th>
                  <th>
                    <button disabled className="btn btn-sm btn-info">
                      Icon
                    </button>
                  </th>
                  <th>
                    <button disabled className="btn btn-sm btn-warning">
                      Edit
                    </button>
                  </th>
                  <th>
                    <button disabled className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {socialLinks?.map((link, index) => (
                  <tr key={index}>
                    <td>{link.name}</td>
                    <td>
                      <Link
                        className="flex items-center justify-center"
                        href={link.url}
                        target="_blank"
                      >
                        <DynamicIcon iconName={link.icon} />
                      </Link>
                    </td>

                    <td>
                      {" "}
                      <button
                        onClick={() => onEdit(link._id)}
                        className="btn btn-outline-warning"
                      >
                        <FaEdit />
                      </button>{" "}
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => onDelete(link._id)}
                        className="btn btn-outline-danger"
                      >
                        <FaTrash />
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSocialLinks;
