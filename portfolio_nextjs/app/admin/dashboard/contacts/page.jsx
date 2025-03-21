"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageService } from "../../service/messageService";
import Loading from "../../components/Loading";
import { IoMdMailUnread } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
import ConfirmationModal from "../../components/ConfirmationModal";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const intervalRef = useRef(null);

  // Mesajları getir
  const getMessages = async () => {
    try {
      const res = await MessageService.getMessages();
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mesaj durumunu güncelle
  const updateMessageState = (updatedMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      )
    );
    if (selectedMessage?._id === updatedMessage._id) {
      setSelectedMessage(updatedMessage);
    }
  };

  // Mesajı okundu/okunmadı olarak işaretle
  const handleMarkStatus = async (id, isRead) => {
    try {
      const updatedMessage = await MessageService.markMessage(id, isRead);
      updateMessageState(updatedMessage);
    } catch (error) {
      console.error("Failed to update message status:", error);
    }
  };

  // Mesaj seçildiğinde otomatik olarak okundu olarak işaretle
  const handleSelectMessage = (message) => {
    if (!message.isRead) {
      handleMarkStatus(message._id, true); // Otomatik olarak okundu yap
    }
    setSelectedMessage(message);
  };

  // deleting

  // Silme işlemi için onay modal'ını aç
  const openDeleteModal = (id) => {
    setMessageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Silme işlemini onayla
  const handleDeleteConfirm = async () => {
    try {
      await MessageService.deleteMessage(messageToDelete);
      setMessages(messages.filter((msg) => msg._id !== messageToDelete));
      setSelectedMessage(null);
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete message.");
    } finally {
      setIsDeleteModalOpen(false);
      setMessageToDelete(null);
    }
  };

  // Silme işlemini iptal et
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setMessageToDelete(null);
  };

  // Bileşen yüklendiğinde mesajları getir
  useEffect(() => {
    getMessages();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex h-fit">
      {loading ? (
        <Loading />
      ) : messages.length === 0 ? (
        <div className="mx-auto text-2xl">No New Messages</div>
      ) : (
        <div className="flex flex-col w-full sm:flex-row">
          {/* Mesaj Listesi */}
          <div
            className={`min-w-max ${
              selectedMessage && "hidden sm:block"
            } h-screen bg-slate-500 overflow-y-auto rounded-md`}
          >
            <h4 className="text-center font-serif font-semibold border-b-2 border-b-black">
              Messages
            </h4>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`p-4 cursor-pointer hover:bg-gray-500 border-b border-b-indigo-500 rounded-md my-1 shadow-lg shadow-white
                    ${selectedMessage?._id === msg._id ? "bg-gray-400" : ""}`}
                onClick={() => handleSelectMessage(msg)}
              >
                <div className="float-right">
                  {!msg.isRead && (
                    <i className="pi pi-dot bg-green-400 rounded-full p-1" />
                  )}
                </div>
                <p className="text-sm font-semibold">{msg.email}</p>
                <p className="text-xs text-slate-200">
                  {msg.name} {msg.lastName}
                </p>
              </div>
            ))}
          </div>

          {/* Mesaj Detayları */}
          <div
            className={`${
              !selectedMessage && "hidden"
            } w-full container p-4 bg-white`}
          >
            {selectedMessage && (
              <div>
                <div className="float-right flex items-center gap-6">
                  {/* Okundu/Okunmadı İkonu */}
                  <div
                    title={
                      selectedMessage.isRead ? "Mark as unread" : "Mark as read"
                    }
                    onClick={() =>
                      handleMarkStatus(
                        selectedMessage._id,
                        !selectedMessage.isRead
                      )
                    }
                    className="text-2xl cursor-pointer"
                  >
                    {selectedMessage.isRead ? (
                      <MdMarkEmailRead className="text-slate-950 hover:text-slate-500 transition-colors duration-200" />
                    ) : (
                      <IoMdMailUnread className="text-green-500 hover:text-green-300 transition-colors duration-200" />
                    )}
                  </div>

                  {/* Kapatma İkonu */}
                  <i
                    onClick={() => setSelectedMessage(null)}
                    className="pi pi-times text-2xl text-slate-900 cursor-pointer hover:text-slate-500 hover:drop-shadow-xl hover:shadow-black"
                  />
                </div>
                <h2 className="text-lg font-semibold text-black">
                  {selectedMessage.name} {selectedMessage.lastName}
                </h2>
                <hr className="w-full h-1 bg-slate-500" />
                <p className="text-md text-black">{selectedMessage.message}</p>
                <hr className="my-4" />
                <p className="text-xs text-gray-500">
                  Sending date:{" "}
                  {new Date(selectedMessage.sentAt).toLocaleString()}
                </p>
                <div className="flex items-center justify-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => openDeleteModal(selectedMessage._id)}
                  >
                    Delete
                    <i className="pi pi-trash ml-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            title="Delete Message"
            message="Are you sure you want to delete this message? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
