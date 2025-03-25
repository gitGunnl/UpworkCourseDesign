import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 right-0 flex flex-col p-4 gap-2 z-50 max-w-[420px]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white rounded-lg border shadow-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="font-semibold">{toast.title}</div>
            {toast.description && (
              <div className="text-sm text-gray-500 mt-1">{toast.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
