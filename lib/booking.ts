/** Only a specific Calendly profile/event can be embedded. Never expose secret configuration. */
export function calendlyUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "calendly.com" ||
        url.username || url.password || url.port || !url.pathname.replaceAll("/", "")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
