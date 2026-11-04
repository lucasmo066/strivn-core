import type { Metadata } from "next";

export const SITE_URL = "https://strivnagency.com";
export const SITE_TITLE = "Strivn Agency | Web Design & Development";
export const SITE_DESCRIPTION = "Strivn Agency builds custom websites for Colorado businesses, with mobile-friendly design, booking and ordering connections, and optional website care.";
export const SHARE_IMAGE = {
  url: `${SITE_URL}/assets/social/strivn-share-v1.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Strivn Agency logo",
};

/** Keep each page's search and share metadata aligned, including the brand image. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const shareTitle = path === "/" ? SITE_TITLE : `${title} | Strivn Agency`;
  return {
    title: path === "/" ? { absolute: SITE_TITLE } : title,
    description,
    alternates: { canonical: new URL(path, SITE_URL).href },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Strivn Agency",
      title: shareTitle,
      description,
      url: new URL(path, SITE_URL).href,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: SHARE_IMAGE.url, alt: SHARE_IMAGE.alt }],
    },
  };
}
