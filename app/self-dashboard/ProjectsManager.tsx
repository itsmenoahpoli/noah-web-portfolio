"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { parseApiError } from "@/lib/api-error";
import FormModal from "./FormModal";
import ProjectImagesUpload from "./ProjectImagesUpload";
import DashboardLoading from "./DashboardLoading";
import EmptyState from "./EmptyState";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
  technologies: z.string().min(1, "Technologies are required"),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")).or(z.string().regex(/^\//)),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")).or(z.string().regex(/^\//)),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectsManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const closeModal = () => {
    setIsEditing(false);
    setEditingProject(null);
  };

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to fetch projects");
        toast.error(msg);
        throw new Error(msg);
      }
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
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to save project");
        throw new Error(msg);
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      toast.success(variables.id ? "Project updated" : "Project created");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      closeModal();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to delete project");
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete project");
    },
  });

  if (isLoading) return <DashboardLoading />;

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

      <AnimatePresence>
        {isEditing && (
          <FormModal
            title={editingProject ? "Edit Project" : "Create Project"}
            description="Update the project details and save when you're ready."
            onClose={closeModal}
          >
            <Formik
              initialValues={{
                title: editingProject?.title || "",
                description: editingProject?.description || "",
                images:
                  editingProject?.images?.length
                    ? editingProject.images
                    : editingProject?.image
                      ? [editingProject.image]
                      : [],
                technologies: editingProject?.technologies || "",
                githubUrl: editingProject?.githubUrl || "",
                liveUrl: editingProject?.liveUrl || "",
              }}
              enableReinitialize
              validationSchema={toFormikValidationSchema(projectSchema)}
              onSubmit={(values) =>
                mutation.mutate({ ...values, id: editingProject?.id })
              }
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </label>
                  <Field
                    name="title"
                    placeholder="e.g. Portfolio Website"
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Technologies
                  </label>
                  <Field
                    name="technologies"
                    placeholder="Next.js, Tailwind, Prisma"
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="technologies"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Images
                  </label>
                  <ProjectImagesUpload
                    currentImages={values.images}
                    onChange={(images) => setFieldValue("images", images)}
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    GitHub URL
                  </label>
                  <Field
                    name="githubUrl"
                    placeholder="https://github.com/..."
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="githubUrl"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Live URL
                  </label>
                  <Field
                    name="liveUrl"
                    placeholder="https://..."
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="liveUrl"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Briefly describe the project..."
                    className="h-32 resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex space-x-3 pt-2 md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:opacity-90 disabled:opacity-50"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-medium text-gray-300 transition-all hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
                </Form>
              )}
            </Formik>
          </FormModal>
        )}
      </AnimatePresence>

      {projects.length === 0 ? (
        <EmptyState
          icon={HiOutlineFolderOpen}
          title="No projects yet"
          description="Add your first project to start showcasing your portfolio work."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {projects.map((project) => (
            <div key={project.id} className="group flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-4">
                {project.image ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                    <Image
                      src={project.image}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800 text-gray-400 text-xs">
                    No img
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-foreground">{project.title}</h3>
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
      )}
    </div>
  );
}
