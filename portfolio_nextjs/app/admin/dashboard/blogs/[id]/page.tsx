"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BlogForm from "../../../components/BlogForm";
import Loading from "../../../components/Loading";
import { BlogAdminService } from "../../../service/blogAdminService";
import type { Blog } from "../../../../models/blogs";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [attempt, setAttempt] = useState(0);
  const key = id + ":" + attempt;
  const [result, setResult] = useState<{ key: string; blog: Blog | null } | null>(null);
  useEffect(() => {
    let active = true;
    BlogAdminService.getBlog(id).then(blog => { if (active) setResult({ key, blog: blog ?? null }); }).catch(() => { if (active) setResult({ key, blog: null }); });
    return () => { active = false; };
  }, [id, key]);
  if (!result || result.key !== key) return <Loading />;
  if (!result.blog) return <section className="surface-card p-6"><h1 className="text-2xl font-bold">Blog yüklenemedi</h1><button className="button-secondary mt-4" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button><Link href="/admin/dashboard/blogs" className="button-secondary mt-4">Bloglara dön</Link></section>;
  return <BlogForm key={id} blog={result.blog} />;
}
