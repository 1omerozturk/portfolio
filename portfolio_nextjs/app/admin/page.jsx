"use client";
import React, { useEffect, useState } from "react";
import { AdminAuth } from "./auth";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AdminAuth.checkAuth();
      setAuth(auth);
    };

    checkAuth();
  }, []);

  return auth ? (
    <div>Dashboard</div>
  ) : (
    <div className="flex justify-center items-center pt-5">
      <div
        className="btn btn-outline-dark"
        onClick={() => router.push("/admin/login")}
      >
        Login
      </div>
    </div>
  );
};

export default Admin;
