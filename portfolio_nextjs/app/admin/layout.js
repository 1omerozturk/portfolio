import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './adminLayout'
import AdminNotifications from './components/AdminNotifications'

export default function AdminPageLayout({ children }) {
  return <><AdminNotifications /><AdminLayout>{children}</AdminLayout></>
}
