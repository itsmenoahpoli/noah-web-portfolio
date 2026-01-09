"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageUpload from "./ImageUpload";

interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  slug: string;
  publishedAt: string;
}

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  image: z.string().min(1, "Image is required").or(z.literal("")).optional(),
});

export default function BlogsManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const method = values.id ? "PUT" : "POST";
      const url = values.id ? `/api/blogs/${values.id}` : "/api/blogs";
      
      const payload = {
        ...values,
        tags: typeof values.tags === "string" 
          ? values.tags.split(",").map((t: string) => t.trim()) 
          : values.tags
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save blog");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsEditing(false);
      setEditingBlog(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Blogs</h2>
        <button
          onClick={() => {
            setEditingBlog(null);
            setIsEditing(true);
          }}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all"
        >
          Add New Blog
        </button>
      </div>

      {isEditing && (
        <Formik
          initialValues={{
            title: editingBlog?.title || "",
            slug: editingBlog?.slug || "",
            author: editingBlog?.author || "",
            description: editingBlog?.description || "",
            content: editingBlog?.content || "",
            tags: editingBlog?.tags?.join(", ") || "",
            image: editingBlog?.image || "",
          }}
          validationSchema={toFormikValidationSchema(blogSchema)}
          onSubmit={(values) => mutation.mutate({ ...values, id: editingBlog?.id })}
        >
          {({ isSubmitting, setFieldValue, values, handleChange }) => {
            const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              const generatedSlug = e.target.value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
              setFieldValue("slug", generatedSlug);
            };

            return (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-black/40 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Title</label>
                  <Field
                    name="title"
                    placeholder="Blog Title"
                    onChange={handleTitleChange}
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Slug (Auto-generated)</label>
                  <Field
                    name="slug"
                    placeholder="blog-title-url"
                    className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm text-gray-500 cursor-not-allowed focus:outline-none"
                    readOnly
                  />
                  <ErrorMessage name="slug" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Author</label>
                  <Field
                    name="author"
                    placeholder="Author Name"
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                  <ErrorMessage name="author" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Tags</label>
                  <Field
                    name="tags"
                    placeholder="Tech, Life, Coding"
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                  />
                  <ErrorMessage name="tags" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Feature Image</label>
                  <ImageUpload
                    currentImage={values.image}
                    onUpload={(path) => setFieldValue("image", path)}
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Short summary of the blog..."
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all h-20 resize-none"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Content</label>
                  <Field
                    as="textarea"
                    name="content"
                    placeholder="Write your blog content here..."
                    className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all h-64 resize-none"
                  />
                  <ErrorMessage name="content" component="div" className="text-red-500 text-[10px] font-medium" />
                </div>

                <div className="flex space-x-3 md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {editingBlog ? "Update Blog" : "Publish Blog"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingBlog(null);
                    }}
                    className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}

      <div className="grid grid-cols-1 gap-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="group flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center space-x-4">
              {blog.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                  <img src={blog.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800 text-gray-400 text-xs">
                  No img
                </div>
              )}
              <div>
                <h3 className="font-medium text-[var(--foreground)]">{blog.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">/{blog.slug}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditingBlog(blog);
                  setIsEditing(true);
                }}
                className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteMutation.mutate(blog.id);
                  }
                }}
                className="text-sm font-medium text-red-400 hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
