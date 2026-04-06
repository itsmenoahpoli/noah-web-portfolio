/**
 * Read error message from a failed API response (JSON { error, details? }).
 */
export async function parseApiError(
  res: Response,
  fallback: string
): Promise<string> {
  try {
    const text = await res.text();
    if (!text.trim()) {
      return `${fallback} (${res.status})`;
    }
    const data = JSON.parse(text) as {
      error?: string;
      details?: string;
      issues?: unknown;
    };
    let msg = typeof data.error === "string" ? data.error : fallback;
    if (typeof data.details === "string") {
      msg = `${msg}: ${data.details}`;
    }
    return msg;
  } catch {
    return `${fallback} (${res.status})`;
  }
}
