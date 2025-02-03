"use client";

import React, { useEffect, useState } from "react";
import { AdminAuth } from "../auth";

const page = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AdminAuth.isLoggedIn();
      setAuth(auth);
    };

    checkAuth();
  }, []);

  const quit = async () => {
    await AdminAuth.logout();
    window.location.href = "/admin/login";
  }

  return (
    <div>
      Admin Page
      {auth && 
      <div className="float-right p-2">
      <div onClick={quit} className="btn btn-outline-danger">Quit
        </div>
        </div>
        }
    </div>
  );
};

export default page;
