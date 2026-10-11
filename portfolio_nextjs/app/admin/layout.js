import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './adminLayout'
import AdminNotifications from './components/AdminNotifications'

export const metadata = {
  title: 'Yönetim',
  robots: { index: false, follow: false },
};

export default function AdminPageLayout({ children }) {
  return <><AdminNotifications /><AdminLayout>{children}</AdminLayout></>
}
