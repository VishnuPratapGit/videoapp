import crypto from "crypto";

export function buildBaseSlug(displayName: string) {
  return displayName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 20);
}

export function buildSlugWithSuffix(base: string) {
  const unique = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `@${base}_${unique}`;
}
