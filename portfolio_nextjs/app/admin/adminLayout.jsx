"use client";
import React, { useEffect, useState } from "react";
import { AdminAuth } from "./auth";
import { useRouter } from "next/navigation";
import AdminSideBar from "./components/AdminSideBar";
import Login from "./login/page";
import Loading from "./components/Loading";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(null); // Auth durumunu takip et

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AdminAuth.isLoggedIn();
      setAuth(authStatus);
      if (!authStatus) {
        router.replace("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await AdminAuth.logout();
    setAuth(false); // Auth durumunu güncelle
    router.replace("/admin/login");
  };

  if (auth === null) {
    return (
      // Loading Animation
      /*  <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500">
        </div>
      </div> */
      <Loading />
    );
  }

  return auth ? (
    <div className="flex h-screen text-white">
      <AdminSideBar onLogout={handleLogout} />
      {/* Logout fonksiyonunu Sidebar'a geç */}
      <div className="flex-1 p-6 bg-indigo-800 overflow-auto">{children}</div>
    </div>
  ) : (
    <Login />
  );
};

export default AdminLayout;
