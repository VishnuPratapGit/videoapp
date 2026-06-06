import { useState, useCallback } from "react";

type ToastType = "success" | "error" | "info";
type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export interface ToastOptions {
  name?: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  type: ToastType;
}

export interface Toast extends Required<Omit<ToastOptions, "position">> {
  id: string;
  position: ToastPosition;
  createdAt: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = crypto.randomUUID();
    const newToast: Toast = {
      id,
      name: options.name ?? "",
      description: options.description ?? "",
      duration: options.duration ?? 3500,
      position: options.position ?? "top-end",
      type: options.type,
      createdAt: Date.now(),
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => dismiss(id), newToast.duration);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return { toast, dismiss, dismissAll, toasts };
}
