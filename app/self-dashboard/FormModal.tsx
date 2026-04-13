"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { HiXMark } from "react-icons/hi2";

interface FormModalProps {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}

export default function FormModal({
  title,
  description,
  onClose,
  children,
}: FormModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f]/95 shadow-2xl shadow-black/40"
        style={{ zoom: "80%" }}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">{children}</div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
