"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AdminAuth } from "../auth";
import { login } from "../../api/api";
import Message from "../../components/Message";

const Login = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("password");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    await AdminAuth.login(formData.username, formData.password)
      .then((res) => {
        if (res) {
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-max mt-5 w-2/3 md:w-2/5 mx-auto flex justify-center items-center">
      <div className="bg-white border-2 border-indigo-300 p-10 rounded-md w-full shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center select-none">
          Login - (Admin){" "}
        </h2>
        <form method={"post"} onSubmit={loginHandle}>
          <div className="mb-4">
            <label
              className="block select-none text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border rounded-md px-3 py-2 w-full"
              type="text"
              autoFocus
              onChange={handleChange}
              id="username"
              name="username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block select-none text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex justify-center items-center space-x-2">
              <input
                className="border rounded-md px-3 py-2 w-full"
                type={type}
                id="password"
                name="password"
                onChange={handleChange}
              />
              {/* hide show password icon  */}
              <div title="Show/Hide" className="cursor-pointer w-fit">
                {show ? (
                  <FaEye
                    onClick={() => {
                      setShow(false);
                      setType("password");
                    }}
                    className="text-indigo-500"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => {
                      setShow(true);
                      setType("text");
                    }}
                    className="text-gray-500"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mx-auto block select-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
