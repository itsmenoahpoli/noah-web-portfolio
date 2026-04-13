"use client";

import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput,
} from "@/lib/validations/contact";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      country: "Philippines",
    },
  });

  const onSubmit = async (data: ContactSubmissionInput) => {
    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send message");
      }

      toast.success("Message sent successfully.");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans">
      <Header />
      <main>
        <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                CONTACT US
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                In need of a website? mobile application? or a software
                solution?
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form below and our team will get back to you
                shortly.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-3xl border border-white/50 bg-white/55 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 sm:p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName")}
                      className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:ring-slate-500"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName")}
                      className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:ring-slate-500"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:ring-slate-500"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:ring-slate-500"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                  >
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      {...register("country")}
                      className="w-full appearance-none rounded-xl border border-white/60 bg-white/80 px-4 py-2.5 pr-10 text-gray-900 shadow-sm backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/80 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:focus:ring-slate-500"
                    >
                      <option value="Philippines">Philippines</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.country && (
                    <p className="mt-2 text-sm text-rose-500 dark:text-rose-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* add recaptcha here to block spams */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-950/5 bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-slate-100/10 dark:text-white dark:hover:bg-slate-100/18"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
