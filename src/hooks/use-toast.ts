import { toast as sonnerToast } from "sonner";
type ToastOptions = {
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  style?: React.CSSProperties;
  className?: string;
  description?: string; // Added description to ToastOptions
};

type ToastParams = {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
} & ToastOptions;

// Funcția generală toast
function toast({ title, description, action, ...props }: ToastParams) {
  return sonnerToast(title, {
    description,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    ...props,
  });
}

// Funcții rapide toast.success, toast.error, toast.info
toast.success = (title: string, options?: ToastOptions) =>
  sonnerToast.success(title, options);

toast.error = (title: string, options?: ToastOptions) =>
  sonnerToast.error(title, options);

toast.info = (title: string, options?: ToastOptions) =>
  sonnerToast.info(title, options);

toast.warning = (title: string, options?: ToastOptions) =>
  sonnerToast.warning
    ? sonnerToast.warning(title, options) // sonner 1.0+ are warning separat
    : sonnerToast.error(title, { ...options, description: "⚠️ " + (options?.description || "") });

function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}

export { useToast, toast };
