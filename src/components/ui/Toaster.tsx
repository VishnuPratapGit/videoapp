import { useToast } from "@/src/hooks/useToast";

const POSITION_CLASSES: Record<string, string> = {
  "top-start": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-end": "top-4 right-4 items-end",
  "bottom-start": "bottom-4 left-4 items-start flex-col-reverse",
  "bottom-center":
    "bottom-4 left-1/2 -translate-x-1/2 items-center flex-col-reverse",
  "bottom-end": "bottom-4 right-4 items-end flex-col-reverse",
};

const TYPE_STYLES = {
  success: {
    wrapper: "bg-emerald-50 border border-emerald-200 text-emerald-900",
    icon: "bg-emerald-500 text-white",
    symbol: "✓",
  },
  error: {
    wrapper: "bg-red-50 border border-red-200 text-red-900",
    icon: "bg-red-500 text-white",
    symbol: "✕",
  },
  info: {
    wrapper: "bg-blue-50 border border-blue-200 text-blue-900",
    icon: "bg-blue-500 text-white",
    symbol: "i",
  },
};

export function Toaster({toasts, dismiss}) {
  const { toasts, dismiss } = useToast();

  // Group toasts by position
  const grouped = toasts.reduce<Record<string, typeof toasts>>((acc, t) => {
    (acc[t.position] ??= []).push(t);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(grouped).map(([position, group]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 pointer-events-none ${POSITION_CLASSES[position]}`}
        >
          {group.map((toast) => {
            const style = TYPE_STYLES[toast.type];
            return (
              <div
                key={toast.id}
                className={`
                  flex items-start gap-3 px-4 py-3 rounded-xl shadow-md
                  min-w-65 max-w-sm pointer-events-auto
                  animate-in slide-in-from-right-4 fade-in duration-300
                  ${style.wrapper}
                `}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${style.icon}`}
                >
                  {style.symbol}
                </span>
                <div className="flex-1 min-w-0">
                  {toast.name && (
                    <p className="text-sm font-medium leading-tight">
                      {toast.name}
                    </p>
                  )}
                  {toast.description && (
                    <p className="text-xs opacity-75 mt-0.5">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="opacity-50 hover:opacity-100 text-lg leading-none shrink-0"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
