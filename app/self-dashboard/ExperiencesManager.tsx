"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  HiBars3,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toast } from "sonner";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { parseApiError } from "@/lib/api-error";
import { formatExperienceDuration, formatExperienceMonthYear } from "@/lib/experience-dates";
import ImageUpload from "./ImageUpload";
import FormModal from "./FormModal";
import DashboardLoading from "./DashboardLoading";
import EmptyState from "./EmptyState";

interface Experience {
  id: string;
  company: string;
  companyLogo: string | null;
  sortOrder: number;
  categories: string[];
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  companyLogo: z.string().optional(),
  categories: z.array(z.enum(["Full-time", "Part-time (Consultant)"])),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

const EXPERIENCE_CATEGORY_OPTIONS = [
  "Full-time",
  "Part-time (Consultant)",
] as const;

type ExperienceCategory = (typeof EXPERIENCE_CATEGORY_OPTIONS)[number];
type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface SortableExperienceCardProps {
  experience: Experience;
  index: number;
  total: number;
  disableInteractions: boolean;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

function SortableExperienceCard({
  experience,
  index,
  total,
  disableInteractions,
  onEdit,
  onDelete,
}: SortableExperienceCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: experience.id,
      disabled: disableInteractions,
    });

  const duration = formatExperienceDuration(experience.startDate, experience.endDate);

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`group relative flex gap-4 pb-6 last:pb-0 ${
        isDragging ? "z-10 opacity-80" : ""
      }`}
    >
      <div className="relative flex w-10 shrink-0 justify-center">
        {index < total - 1 && (
          <div className="absolute top-10 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
        )}
        <button
          type="button"
          {...attributes}
          {...listeners}
          disabled={disableInteractions}
          className="relative mt-1 inline-flex h-10 w-10 cursor-grab items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:border-gray-300 hover:text-black active:cursor-grabbing dark:border-gray-700 dark:bg-slate-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Reorder ${experience.company}`}
        >
          <HiBars3 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/5 dark:hover:border-gray-600">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            {experience.companyLogo ? (
              <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/5">
                <Image
                  src={experience.companyLogo}
                  alt={`${experience.company} logo`}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-100 px-2 text-center text-[10px] uppercase tracking-widest text-gray-400 dark:border-gray-800 dark:bg-white/5">
                No logo
              </div>
            )}

            <div>
              <h3 className="font-medium text-foreground">{experience.company}</h3>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-300">
                {experience.position}
              </p>
              <p className="mt-1 text-xs text-gray-400">{experience.location}</p>
              {experience.categories.length > 0 && (
                <p className="mt-2 text-[11px] text-gray-500">
                  {experience.categories.join(" • ")}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {formatExperienceMonthYear(experience.startDate)} -{" "}
                {experience.endDate
                  ? formatExperienceMonthYear(experience.endDate)
                  : "Present"}
              </p>
              {duration && <p className="text-xs text-gray-400">{duration}</p>}
            </div>

            <div className="flex items-center space-x-4 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onEdit(experience)}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-black dark:hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(experience.id)}
                className="text-sm font-medium text-red-400 transition-colors hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencesManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [orderedExperiences, setOrderedExperiences] = useState<Experience[]>([]);
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  useEffect(() => {
    setOrderedExperiences(experiences);
  }, [experiences]);

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

  const reorderMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await fetch("/api/experiences/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) {
        const msg = await parseApiError(res, "Failed to update experience order");
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      toast.success("Experience order updated");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (err) => {
      setOrderedExperiences(experiences);
      toast.error(
        err instanceof Error ? err.message : "Failed to update experience order",
      );
    },
  });

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id || reorderMutation.isPending) {
      return;
    }

    setOrderedExperiences((currentExperiences) => {
      const oldIndex = currentExperiences.findIndex(
        (experience) => experience.id === active.id,
      );
      const newIndex = currentExperiences.findIndex(
        (experience) => experience.id === over.id,
      );

      if (oldIndex === -1 || newIndex === -1) {
        return currentExperiences;
      }

      const nextExperiences = arrayMove(currentExperiences, oldIndex, newIndex);
      reorderMutation.mutate(nextExperiences.map((experience) => experience.id));
      return nextExperiences;
    });
  };

  if (isLoading) return <DashboardLoading />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-medium">Experiences</h2>
          <p className="text-sm text-gray-500">
            Drag entries by the handle to change their display order.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingExperience(null);
            setIsEditing(true);
          }}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90 dark:bg-white dark:text-black"
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
                companyLogo: editingExperience?.companyLogo || "",
                categories: editingExperience?.categories || [],
                position: editingExperience?.position || "",
                location: editingExperience?.location || "",
                startDate: editingExperience?.startDate || "",
                endDate: editingExperience?.endDate ?? "",
                description: editingExperience?.description || "",
              }}
              enableReinitialize
              validationSchema={toFormikValidationSchema(experienceSchema)}
              onSubmit={(values) =>
                mutation.mutate({
                  ...values,
                  categories: values.categories.filter(
                    (category): category is ExperienceCategory =>
                      EXPERIENCE_CATEGORY_OPTIONS.includes(
                        category as ExperienceCategory,
                      ),
                  ),
                  id: editingExperience?.id,
                })
              }
            >
              {({ isSubmitting, setFieldValue, values }) => (
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
                      Company Logo
                    </label>
                    <ImageUpload
                      currentImage={values.companyLogo}
                      onUpload={(path) => setFieldValue("companyLogo", path)}
                    />
                    <ErrorMessage
                      name="companyLogo"
                      component="div"
                      className="text-[10px] font-medium text-red-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 md:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {EXPERIENCE_CATEGORY_OPTIONS.map((category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition-all hover:bg-white/10"
                        >
                          <Field
                            type="checkbox"
                            name="categories"
                            value={category}
                            className="h-4 w-4 rounded border-white/20 bg-transparent text-white focus:ring-white"
                          />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="categories"
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

      {orderedExperiences.length === 0 ? (
        <EmptyState
          icon={HiOutlineBriefcase}
          title="No experiences yet"
          description="Add a work experience entry to start building your career timeline."
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-500 dark:border-gray-800 dark:bg-white/5 dark:text-gray-400">
            <span>Drag the grip icon on the left to reorder experiences.</span>
            <span>{reorderMutation.isPending ? "Saving order..." : "Auto-saves on drop"}</span>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedExperiences.map((experience) => experience.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-0">
                {orderedExperiences.map((experience, index) => (
                  <SortableExperienceCard
                    key={experience.id}
                    experience={experience}
                    index={index}
                    total={orderedExperiences.length}
                    disableInteractions={reorderMutation.isPending}
                    onEdit={(selectedExperience) => {
                      setEditingExperience(selectedExperience);
                      setIsEditing(true);
                    }}
                    onDelete={(id) => {
                      if (confirm("Are you sure?")) {
                        deleteMutation.mutate(id);
                      }
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
