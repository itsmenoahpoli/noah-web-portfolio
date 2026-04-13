"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { parseApiError } from "@/lib/api-error";
import FormModal from "./FormModal";
import DashboardLoading from "./DashboardLoading";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export default function ExperiencesManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const queryClient = useQueryClient();

  const closeModal = () => {
    setIsEditing(false);
    setEditingExperience(null);
  };

  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to fetch experiences");
        toast.error(msg);
        throw new Error(msg);
      }
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: ExperienceFormValues & { id?: string }) => {
      const method = values.id ? "PUT" : "POST";
      const url = values.id ? `/api/experiences/${values.id}` : "/api/experiences";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to save experience");
        throw new Error(msg);
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      toast.success(variables.id ? "Experience updated" : "Experience added");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      closeModal();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to save experience");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to delete experience");
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      toast.success("Experience deleted");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete experience");
    },
  });

  if (isLoading) return <DashboardLoading />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Experiences</h2>
        <button
          onClick={() => {
            setEditingExperience(null);
            setIsEditing(true);
          }}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all"
        >
          Add New Experience
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <FormModal
            title={editingExperience ? "Edit Experience" : "Add Experience"}
            description="Manage work history in a focused modal form."
            onClose={closeModal}
          >
            <Formik
              initialValues={{
                company: editingExperience?.company || "",
                position: editingExperience?.position || "",
                location: editingExperience?.location || "",
                startDate: editingExperience?.startDate || "",
                endDate: editingExperience?.endDate ?? "",
                description: editingExperience?.description || "",
              }}
              enableReinitialize
              validationSchema={toFormikValidationSchema(experienceSchema)}
              onSubmit={(values) =>
                mutation.mutate({ ...values, id: editingExperience?.id })
              }
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Company
                  </label>
                  <Field
                    name="company"
                    placeholder="Company Name"
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="company"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Position
                  </label>
                  <Field
                    name="position"
                    placeholder="Job Title"
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="position"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Location
                  </label>
                  <Field
                    name="location"
                    placeholder="e.g. Remote, New York, etc."
                    className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-[10px] font-medium text-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Start Date
                    </label>
                    <Field
                      name="startDate"
                      placeholder="Jan 2023"
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-[10px] font-medium text-red-500"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      End Date
                    </label>
                    <Field
                      name="endDate"
                      placeholder="Present"
                      className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-white"
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-[10px] font-medium text-red-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Key responsibilities and achievements..."
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
                    {editingExperience ? "Update Experience" : "Add Experience"}
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

      <div className="grid grid-cols-1 gap-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="group flex justify-between items-center bg-white dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div>
              <h3 className="font-medium text-[var(--foreground)]">{exp.company}</h3>
              <p className="text-gray-400 text-xs mt-0.5">{exp.position} • {exp.startDate} - {exp.endDate || "Present"}</p>
            </div>
            <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditingExperience(exp);
                  setIsEditing(true);
                }}
                className="text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteMutation.mutate(exp.id);
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
