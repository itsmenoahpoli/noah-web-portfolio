"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import Header from "../components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    country: "Philippines",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                CONTACT US
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get in touch with sales
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
                We'll help you find the right solutions and pricing for your
                business. Fill out the form below and our team will get back to
                you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
                    />
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
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
                    />
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400"
                  />
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 resize-none"
                  />
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
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-400 appearance-none pr-10"
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
                </div>

                {/* add recaptcha here to block spams */}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-400 hover:bg-green-500 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Send message
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <iframe
                src="https://maps.google.com/maps?q=Makati+City,+Philippines&t=&z=11&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Makati City, Philippines"
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
