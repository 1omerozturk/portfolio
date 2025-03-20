"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageService } from "../../service/messageService";
import Loading from "../../components/Loading";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const getMessages = async () => {
    console.log("Çalışti");
    await MessageService.getMessages()
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteMessage = async (id) => {
    await MessageService.deleteMessage(id).then(() => {
      setSelectedMessage(null);
      setMessages(messages.filter((msg) => msg._id !== id));
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <div className="flex h-fit">
      {loading ? (
        <Loading />
      ) : messages.length === 0 ? (
        <div className="mx-auto text-2xl">New Messages not found</div>
      ) : (
        <>
          {/* Sol panel: Kullanıcıların e-postaları */}
          <div className="flex flex-col w-full sm:flex-row">
            <div
              className={`min-w-max ${
                selectedMessage && "hidden sm:block"
              } h-screen bg-slate-500 overflow-y-auto rounded-md`}
            >
              <h4 className="text-center font-serif font-semibold border-b-2 border-b-black">
                Messages
              </h4>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 cursor-pointer hover:bg-gray-500 border-b border-b-indigo-500 rounded-md my-1 shadow-lg shadow-white
                    ${
                      selectedMessage && selectedMessage._id === msg._id
                        ? "bg-gray-400"
                        : ""
                    }`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <div className="float-right">
                    <i
                      className={`${
                        !msg.isRead
                          ? "pi pi-dot bg-green-400 rounded-full p-1"
                          : ""
                      }`}
                    ></i>
                  </div>
                  <p className="text-sm font-semibold">{msg.email}</p>
                  <p className="text-xs text-slate-200">
                    {msg.name} {msg.lastName}
                  </p>
                </div>
              ))}
            </div>

            {/* Sağ panel: Mesaj detayları */}
            <div
              className={`${
                !selectedMessage && "hidden"
              } w-full container p-4 bg-white`}
            >
              {selectedMessage ? (
                <div>
                  <div className="float-right items-center">
                    <i
                      onClick={() => setSelectedMessage(null)}
                      className="pi pi-times text-slate-900 cursor-pointer hover:text-slate-500 hover:drop-shadow-xl hover:shadow-black"
                    ></i>
                  </div>
                  <h2 className="text-lg font-semibold text-black">
                    {selectedMessage.name} {selectedMessage.lastName}
                  </h2>
                  <hr className=" w-full h-1 bg-slate-500 " />
                  {/* <p className="text-sm text-gray-600">{selectedMessage.email}</p> */}
                  {/* <p className="text-sm text-gray-600">{selectedMessage.phone}</p> */}
                  <hr className="my-4" />
                  <p className="text-md text-black">
                    {selectedMessage.message}
                  </p>
                  <hr className="my-4" />
                  <p className="text-xs text-gray-500">
                    Sending date:{" "}
                    {new Date(selectedMessage.sentAt).toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDeleteMessage(selectedMessage._id)}
                    >
                      Delete
                      <i className="pi pi-trash ml-3"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Mesaj görmek için bir kullanıcı seçin.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminContacts;
