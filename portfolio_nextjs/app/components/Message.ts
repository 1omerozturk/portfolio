"use client"
import { toast } from 'react-toastify';

class Message {
  async ToastMessage(type:string,message:string) {
    switch (type) {
        case 'success':
          toast.success(message, {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
          })
          break
        case 'error':
          toast.error(message, {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
          })
    
          break
        case 'warning':
          toast.warn(message, {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
          })
    
          break
        case 'info':
          toast.info(message, {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
          })
          break
      }
  }
}


const message = new Message();
export default message;

