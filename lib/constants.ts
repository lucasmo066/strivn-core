export const TAGLINES = {
  primary: "Built to be found. Built to be chosen.",
  cta: "Get found. Get chosen. Get booked.",
  speed: "Found fast. Sold faster.",
  closing: "One website. Then another.",
} as const;

export const VALUE_WORDS = [
  "Forward motion",
  "Clarity",
  "Performance",
  "Trust",
  "Partnership",
  "Results",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const BUILD_PACKAGES = [
  { name: "Starter", pages: "3 pages", price: "$2,000" },
  { name: "Standard", pages: "5 pages", price: "$3,000" },
  { name: "Pro", pages: "8+ pages", price: "$4,500+", featured: true },
  {
    name: "Shopify / E-commerce",
    pages: "Custom",
    price: "$3,500 to $6,000",
  },
] as const;

export const EXTRA_PAGE_PRICE = "$200";

export const ADD_ONS = [
  { name: "SEO setup and keyword research", price: "$300" },
  { name: "Google Analytics + Search Console", price: "$150" },
  { name: "Logo / basic brand kit", price: "$400" },
  { name: "Booking or scheduling integration", price: "$200" },
  { name: "Menu or catalog build-out", price: "$250" },
  { name: "Product upload (per 10 items)", price: "$100" },
] as const;

export const RETAINER_PLANS = [
  {
    name: "Basic",
    monthly: 200,
    yearly: 180,
    included: ["Hosting", "Uptime monitoring", "2 small edits/mo"],
  },
  {
    name: "Growth",
    monthly: 350,
    yearly: 315,
    included: [
      "Everything in Basic",
      "2 SEO posts/mo",
      "Google Business Profile updates",
      "Monthly performance report",
    ],
    featured: true,
  },
  {
    name: "Premium",
    monthly: 600,
    yearly: 540,
    included: [
      "Everything in Growth",
      "Unlimited small edits",
      "Priority support",
      "Monthly strategy call",
    ],
  },
] as const;

export const EDIT_SIZES = [
  {
    name: "Small",
    label: "Included",
    description:
      "Text changes, image swaps, hours/menu update, contact info. Under 30 min.",
    price: null,
  },
  {
    name: "Medium",
    label: "Billable",
    description: "New section, new form, new integration.",
    price: "$75 to $150",
  },
  {
    name: "Large",
    label: "Quoted separately",
    description: "New page, redesign, new feature.",
    price: null,
  },
] as const;

export const OVERAGE_RATE = "$85/hr";

export const BRAND = {
  name: "Strivn",
  location: "Denver & Boulder, CO",
  accent: "#FF5C00",
} as const;
