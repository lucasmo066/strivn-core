export interface ProjectCapture {
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SAHARA_SITE_URL = "https://www.thesaharagrill.com/";

export type SaharaDevice = "desktop" | "tablet" | "mobile";
export type SaharaPage = "home" | "menu";

export interface SaharaCapture extends ProjectCapture {
  device: SaharaDevice;
  page: SaharaPage;
}

// Actual production captures, October 7, 2026. Source details live in
// docs/sahara-captures.json; no concept screens or simulated CMS interfaces.
export const SAHARA_CAPTURES: readonly SaharaCapture[] = [
  { device: "desktop", page: "home", title: "Homepage on desktop", caption: "Food photography leads, with the menu and ordering one step away.", src: "/assets/work/sahara-grill/homepage-desktop.webp", alt: "Sahara Grill desktop homepage with Mediterranean food photography, See Menu and Order Now links", width: 1440, height: 765 },
  { device: "tablet", page: "home", title: "Homepage on tablet", caption: "The same clear choices, with a layout that adapts to a smaller screen.", src: "/assets/work/sahara-grill/homepage-tablet-full.webp", alt: "Sahara Grill tablet homepage with navigation, restaurant logo and menu and ordering links", width: 834, height: 1112 },
  { device: "mobile", page: "home", title: "Homepage on mobile", caption: "Menu, delivery and takeout stay within easy reach on a phone.", src: "/assets/work/sahara-grill/homepage-phone-full.webp", alt: "Sahara Grill phone homepage with compact navigation, Delivery, Takeout, See Menu and Order Now", width: 390, height: 844 },
  { device: "desktop", page: "menu", title: "Menu on desktop", caption: "Photography, descriptions and prices sit together in a spacious two-column layout.", src: "/assets/work/sahara-grill/menu-desktop.webp", alt: "Sahara Grill desktop menu with Food and Drinks tabs, a hummus photo, appetizer descriptions and prices", width: 1440, height: 1000 },
  { device: "tablet", page: "menu", title: "Menu on tablet", caption: "A balanced menu layout keeps the food and the details side by side.", src: "/assets/work/sahara-grill/menu-tablet.webp", alt: "Sahara Grill tablet menu with appetizer photography beside readable menu items and prices", width: 834, height: 1112 },
  { device: "mobile", page: "menu", title: "Menu on mobile", caption: "A single-column menu gives each image, description and price room to breathe.", src: "/assets/work/sahara-grill/menu-mobile.webp", alt: "Sahara Grill mobile menu with Food and Drinks tabs, appetizer photography and a clearly priced hummus item", width: 390, height: 844 },
];

export function saharaSiteUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
}
