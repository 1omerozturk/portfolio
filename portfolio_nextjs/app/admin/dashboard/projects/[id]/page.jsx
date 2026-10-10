import { redirect } from "next/navigation";
export default async function ProjectDetail({ params }) {
  const { id } = await params;
  redirect("/admin/dashboard/projects/edit/" + encodeURIComponent(id));
}
