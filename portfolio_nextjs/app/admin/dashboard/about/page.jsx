"use client";
import React, { useState, useEffect, useCallback } from "react";
import { AdminAuth } from "../../auth";
import { useRouter } from "next/navigation";

const AboutDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  const goToEdit = () => {
    router.push("/admin/dashboard/about/edit");
  };

  const getAdmin = useCallback(async () => {
    const admin = await AdminAuth.getAdmin();
    setAdmin(admin);
  });

  useEffect(() => {
    getAdmin();
  }, [getAdmin]);

  return (
    // Admin About Dashboard for About management
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">About Dashboard</h1>

          <div className="card mt-5">
            {/* right edit icon */}

            <div className="card-body text-center">
              <button
                onClick={goToEdit}
                title="Edit"
                className="btn btn-outline-warning float-right"
              >
                <i className="pi pi-pencil text-2xl text-indigo-500"></i>
              </button>
              {/* image */}
              <img
                src={admin?.profilePciture || "/ozturkomer.webp"}
                alt="Admin"
                className="rounded-circle h-80 w-80 mx-auto d-block"
              />
              <h2 className="card-text"> {admin?.username}</h2>
              <h5 className="card-text">{admin?.fullName}</h5>
              <h6 className="card-text">{admin?.email}</h6>
              <h6 className="card-text text-red-800">{admin?.role}</h6>
              <p className="card-text text-slate-400">
                {admin?.createdAt?.split("T")[0] +
                  "-" +
                  admin?.createdAt?.split("T")[1].split(".")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDashboard;
