"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api-error";
import DashboardLoading from "./DashboardLoading";
import EmptyState from "./EmptyState";

interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  country: string;
  createdAt: string;
}

function formatSubmittedAt(value: string) {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function ContactSubmissionsManager() {
  const queryClient = useQueryClient();

  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const res = await fetch("/api/contact-submissions");
      if (!res.ok) {
        const msg = await parseApiError(
          res,
          "Failed to fetch contact submissions"
        );
        toast.error(msg);
        throw new Error(msg);
      }
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/contact-submissions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await parseApiError(
          res,
          "Failed to delete contact submission"
        );
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      toast.success("Contact submission deleted");
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete contact submission"
      );
    },
  });

  if (isLoading) return <DashboardLoading />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium">Contact Submissions</h2>
        <p className="mt-2 text-sm text-gray-500">
          Review incoming messages from the contact form and remove entries you no
          longer need.
        </p>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          icon={HiOutlineEnvelope}
          title="No contact submissions yet"
          description="Incoming messages from your contact form will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="group rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-white/5 dark:hover:border-gray-600"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-medium text-foreground">
                      {submission.firstName} {submission.lastName}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {formatSubmittedAt(submission.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await copyToClipboard(submission.email);
                          toast.success("Email copied to clipboard");
                        } catch {
                          toast.error("Failed to copy email");
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-2.5 py-1 text-left font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
                    >
                      <HiOutlineClipboardDocument className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                      {submission.email}
                    </button>
                    <span>{submission.country}</span>
                  </div>
                  <p className="max-w-3xl whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                    {submission.message}
                  </p>
                </div>

                <div className="flex items-center justify-end md:min-w-24">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this contact submission?")) {
                        deleteMutation.mutate(submission.id);
                      }
                    }}
                    className="text-sm font-medium text-red-400 transition-colors hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
