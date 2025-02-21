"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import Loading from "../../components/Loading";
import Link from "next/link";
import { ContentService } from "../../service/contentService";
import { useRouter } from "next/navigation";

const ContentsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState([]);
  const navigate = useRouter();

  const onEdit = (id) => {
    navigate.push(`contents/edit/${id}`);
  };

  const onDelete = async (id) => {
    const response = await ContentService.deleteContent(id).then((res) => {
      return res;
    });
    if (Number(response.status) === 200) {
      const updatedData = contents.filter((content) => id !== content._id);
      setContents(updatedData);
      Message.ToastMessage(
        "success",
        response.data.name + " is deleting successfully."
      );
    }
  };

  const fetchData = async () => {
    try {
      await ContentService.getContents()
        .then((res) => {
          setContents(res.data);
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [contents.length]);

  return (
    <div className="flex flex-col">
      <Link title="Add" href={"contents/add"} className="text-end">
        <button className="btn btn-outline-light mb-2">
          <FaPlusCircle className="text-xl" />
        </button>
      </Link>
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
                      Image
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
                {contents?.map((content, index) => (
                  <tr key={index}>
                    <td>{content.name}</td>
                    <td>
                      <img
                        src={content.image}
                        alt={content.name}
                        className="h-28 w-28 bg-cover mx-auto"
                      />
                    </td>

                    <td>
                      {" "}
                      <button
                        onClick={() => onEdit(content._id)}
                        className="btn btn-outline-warning"
                      >
                        <FaEdit />
                      </button>{" "}
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => onDelete(content._id)}
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

export default ContentsDashboard;
