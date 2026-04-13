export function parseProjectImages(value: string | null | undefined): string[] {
  if (!value) return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean);
    }
  } catch {
    // Legacy single-image values are stored as plain strings.
  }

  return [trimmed];
}

export function serializeProjectImages(images: string[]): string {
  return JSON.stringify(
    images.map((image) => image.trim()).filter(Boolean),
  );
}

export function getPrimaryProjectImage(value: string | null | undefined): string {
  return parseProjectImages(value)[0] ?? "";
}
