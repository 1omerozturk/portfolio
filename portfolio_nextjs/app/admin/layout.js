import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from './adminLayout'

export default function AdminPageLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}
