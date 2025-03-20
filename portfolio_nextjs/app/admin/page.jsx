"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AdminAuth } from "./auth";
import Loading from "./components/Loading";
import Dashboard from "./dashboard/page";

const page = () => {
  const [admin, setAdmin] = useState(null);

  const getAdmin = useCallback(async () => {
    const admin = await AdminAuth.getAdmin();
    setAdmin(admin);
  }, []);

  useEffect(() => {
    getAdmin();
  }, [getAdmin]);

  useEffect(() => {}, [admin]);

  return (
    <div>
      {admin === null && <Loading />}

      {admin && (
        <Dashboard />
        // <div className="container">
        //   <div className="row justify-content-center">
        //     <div className="col-md-8">
        //       <div className="card">
        //         <div className="card-header">Dashboard</div>
        //         <div className="card-body">
        //           <h5 className="card-title">Welcome {admin?.fullName}</h5>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default page;
