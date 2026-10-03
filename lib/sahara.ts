export interface ProjectCapture {
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Add actual captures from the confirmed live site. Do not substitute concept screens.
export const SAHARA_CAPTURES: readonly ProjectCapture[] = [];

export function saharaSiteUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
}
