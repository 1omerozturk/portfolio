"use client";
import React, { useEffect, useState } from "react";
import {
  FaDotCircle,
  FaEdit,
  FaPlusCircle,
  FaRegDotCircle,
  FaTrash,
} from "react-icons/fa";
import Loading from "../../components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EducationService } from "../../service/educationService";
import { FormatDate } from "../../components/FormatDate";

const EducationsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [educations, setEducations] = useState([]);
  const navigate = useRouter();

  const onEdit = (id) => {
    navigate.push(`educations/edit/${id}`);
  };

  const onDelete = async (id) => {
    const response = await EducationService.deleteEducation(id).then((res) => {
      return res;
    });
    if (Number(response.status) === 200) {
      const updatedData = educations.filter(
        (education) => id !== education._id
      );
      setContents(updatedData);
      Message.ToastMessage(
        "success",
        response.data.name + " is deleting successfully."
      );
    }
  };

  const fetchData = async () => {
    try {
      await EducationService.getEducations()
        .then((res) => {
          setEducations(res.data);
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
  }, [educations.length]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Link title="Add" href={"educations/add"} className="">
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
            <table className="table w-fit table-dark table-bordered text-center">
              <thead>
                <tr>
                  <th>
                    <button disabled className="btn  btn-sm btn-secondary">
                      Institution
                    </button>
                  </th>
                  <th>
                    <button disabled className="btn  btn-sm btn-secondary">
                      Date
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
              <tbody className="align-middle">
                {educations?.map((education, index) => (
                  <tr key={index}>
                    <td>
                      <h6>{education.institution}</h6>
                      <img
                        src={education.institutionLogo}
                        alt={education.institution}
                        className="h-28 w-28 bg-cover mx-auto"
                      />
                      <div className="flex flex-col text-center">
                        <em>{education.degree}</em>
                        <em>{education.grade}</em>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-y-2">
                        <div className="flex flex-row mx-auto justify-start items-center gap-x-3">
                          <FaRegDotCircle />
                          {FormatDate(education.startDate)}
                        </div>
                        <div className="flex flex-row mx-auto justify-start items-center gap-x-3">
                          <FaDotCircle />
                          <div>{FormatDate(education.endDate)}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {" "}
                      <Link href={`educations/edit/${education._id}`}>
                        <button
                          onClick={() => onEdit(education._id)}
                          className="btn btn-outline-warning"
                        >
                          <FaEdit />
                        </button>{" "}
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => onDelete(education._id)}
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

export default EducationsDashboard;
