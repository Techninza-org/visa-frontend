"use client";

import type React from "react";

import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "default" | "large";
}

export function ModalWrapper({
  isOpen,
  onClose,
  title,
  children,
  size = "default",
}: ModalWrapperProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full bg-white rounded-xl shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95",
          "border border-gray-100",
          "max-h-[90vh] overflow-hidden flex flex-col",
          size === "default" ? "max-w-2xl" : "max-w-4xl"
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b bg-white/95 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="overflow-auto p-6 flex-grow">{children}</div>
      </div>
    </div>
  );
}
