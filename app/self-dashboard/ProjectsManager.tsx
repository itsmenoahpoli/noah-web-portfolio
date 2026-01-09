"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ImageUpload from "./ImageUpload";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  technologies: z.string().min(1, "Technologies are required"),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).or(z.string().regex(/^\//)),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")).or(z.string().regex(/^\//)),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectsManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ProjectFormValues & { id?: string }) => {
      const method = values.id ? "PUT" : "POST";
      const url = values.id ? `/api/projects/${values.id}` : "/api/projects";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsEditing(false);
      setEditingProject(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsEditing(true);
          }}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all"
        >
          Add New Project
        </button>
      </div>

      {isEditing && (
        <Formik
          initialValues={{
            title: editingProject?.title || "",
            description: editingProject?.description || "",
            image: editingProject?.image || "",
            technologies: editingProject?.technologies || "",
            githubUrl: editingProject?.githubUrl || "",
            liveUrl: editingProject?.liveUrl || "",
          }}
          validationSchema={toFormikValidationSchema(projectSchema)}
          onSubmit={(values) => mutation.mutate({ ...values, id: editingProject?.id })}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-black/40 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Title</label>
                <Field
                  name="title"
                  placeholder="e.g. Portfolio Website"
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Technologies</label>
                <Field
                  name="technologies"
                  placeholder="Next.js, Tailwind, Prisma"
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                />
                <ErrorMessage name="technologies" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Image</label>
                <ImageUpload
                  currentImage={values.image}
                  onUpload={(path) => setFieldValue("image", path)}
                />
                <ErrorMessage name="image" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">GitHub URL</label>
                <Field
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                />
                <ErrorMessage name="githubUrl" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Live URL</label>
                <Field
                  name="liveUrl"
                  placeholder="https://..."
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                />
                <ErrorMessage name="liveUrl" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Briefly describe the project..."
                  className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-3 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all h-32 resize-none"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-[10px] font-medium" />
              </div>

              <div className="flex space-x-3 md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProject(null);
                  }}
                  className="bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <div key={project.id} className="group flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center space-x-4">
              {project.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                  <img src={project.image} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800 text-gray-400 text-xs">
                  No img
                </div>
              )}
              <div>
                <h3 className="font-medium text-[var(--foreground)]">{project.title}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{project.technologies}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditingProject(project);
                  setIsEditing(true);
                }}
                className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteMutation.mutate(project.id);
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
