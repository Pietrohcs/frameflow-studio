type FeedbackMessageProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export function FeedbackMessage({
  message,
  type = "info",
}: FeedbackMessageProps) {
  if (!message) {
    return null;
  }

  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-sky-200 bg-sky-50 text-sky-800",
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      {message}
    </div>
  );
}
