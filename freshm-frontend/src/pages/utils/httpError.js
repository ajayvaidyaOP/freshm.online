// Pulls the real, human-readable message out of an axios error so
// "save failed" screens actually tell you WHY (the backend's
// GlobalExceptionHandler returns { message, status, ... }).
export function httpError(err, fallback = "Something went wrong. Please try again.") {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.status === 413) return "File too large. Max 10 MB per file.";
  if (err?.response?.status === 401) return "Session expired. Please sign in again.";
  if (err?.response?.status === 403) return "You don't have access to do that.";
  if (err?.message === "Network Error") return "Can't reach the server. Is the backend running on :8080?";
  return err?.message || fallback;
}
