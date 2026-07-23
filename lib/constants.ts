export const TAGLINES = {
  primary: "Custom websites that bring in business.",
  heroSub:
    "Fast, custom sites for small businesses. Built to get you found and booked.",
  heroDetail: "Launch in weeks, not months.",
  cta: "Tell us about your project.",
  heroCta: "Book a call",
  navCta: "Book a call",
  speed: "Found fast. Sold faster.",
  closing: "Ready when you are.",
} as const;

/** Canonical build floor — keep stat bar, work teaser, and pricing intro in sync. */
export const PRICING_FLOOR = "From $2,000";

export const HERO_PROOF = [
  { value: "2-4 wks", label: "Typical launch" },
  { value: PRICING_FLOOR, label: "Website builds" },
  { value: "1 day", label: "Reply time" },
] as const;

/** Hero plate media — still for now; swap in video when ready. */
export const HERO_MEDIA = {
  still: "/images/hero-sill.png",
  stillWidth: 2752,
  stillHeight: 1536,
  // video: "/assets/hero/alpine-lakeside.mp4",
} as const;

/** HUD popup bank over the hero plate. Orange = cause (1×); green = effect (3×). */
export const HERO_HUD = {
  causes: [
    "SITE LAUNCHED",
    "SIGNED WITH STRIVN",
    "NOW LIVE",
    "BUILT BY STRIVN",
  ],
  effects: [
    "NEW LEAD",
    "CALL BOOKED",
    "+$2,000",
    "QUOTE REQUESTED",
    "FORM SUBMITTED",
    "+$3,500",
    "RANKED #1 LOCAL",
    "5 NEW CALLS",
    "BOOKED SOLID",
  ],
} as const;

export const SERVICES_HEADLINE =
  "Built for Front Range practices that need to get booked.";

export const SERVICES_AI_LINE =
  "We also wire AI that recovers after-hours inquiries — so missed calls turn into booked appointments, not lost leads.";

export const SERVICES = [
  {
    title: "Design",
    description:
      "Trust-first design for med spas, dental, law, real estate, and remodeling — the look that gets the consult booked.",
  },
  {
    title: "Build & launch",
    description:
      "Fast, mobile-first sites live in weeks — where your patients and clients actually search.",
  },
  {
    title: "Get found",
    description:
      "Local SEO for service-area and practice-area search across the Front Range.",
  },
  {
    title: "Stay sharp",
    description:
      "Hosting, updates, and edits on retainer so the site keeps pace with your business.",
  },
] as const;

export const WORK_ITEMS = [
  {
    title: "Sahara Grill",
    category: "Restaurant",
    location: "Denver, CO",
    description: "Menu-forward site built for local search and online ordering.",
    metric: "Live / Lighthouse 98",
    featured: true,
    href: "/work/sahara-grill",
  },
  {
    title: "Your business",
    category: "Next project",
    location: "Your market",
    description: "Ready for a site that gets customers to call.",
    metric: PRICING_FLOOR,
  },
] as const;

export const VALUE_WORDS = [
  "Forward motion",
  "Clarity",
  "Performance",
  "Trust",
  "Partnership",
  "Results",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export const BUILD_PACKAGES = [
  {
    name: "Starter",
    pages: "3 pages",
    price: "$2,000",
    priceNote: "flat fee",
    includes: [
      "Home, About, Contact",
      "Mobile-responsive",
      "Contact form",
      "Vercel deploy",
    ],
  },
  {
    name: "Standard",
    pages: "5 pages",
    price: "$3,000",
    priceNote: "flat fee",
    includes: [
      "Everything in Starter",
      "Services page",
      "Custom page (FAQ, team, etc.)",
      "Basic on-page SEO",
    ],
  },
  {
    name: "Pro",
    pages: "8+ pages",
    price: "$4,500+",
    priceNote: "starting price",
    badge: "Most Popular",
    featured: true,
    includes: [
      "Everything in Standard",
      "Service-area pages",
      "Blog / resources setup",
      "Advanced SEO structure",
      "CMS integration",
    ],
  },
  {
    name: "Shopify",
    pages: "E-commerce, custom",
    price: "$3,500",
    priceNote: "up to $6,000",
    includes: [
      "Custom theme build",
      "Product catalog setup",
      "Checkout optimization",
      "Client pays Shopify plan",
    ],
  },
] as const;

export const EXTRA_PAGE_PRICE = "$200";

export const ADD_ONS = [
  { name: "SEO setup + keyword research", price: "$300" },
  { name: "Google Analytics + Search Console", price: "$150" },
  { name: "Logo / basic brand kit", price: "$400" },
  { name: "Booking or scheduling integration", price: "$200" },
  { name: "Menu or catalog build-out", price: "$250" },
  { name: "Product upload (per 10 items)", price: "$100" },
  { name: "Extra page beyond package", price: "$200 each" },
  { name: "Domain transfer (to new registrar)", price: "$175" },
] as const;

export type RetainerFeature = {
  text: string;
  included: boolean;
};

export type RetainerSection = {
  label: string;
  items: RetainerFeature[];
};

export const RETAINER_PLANS: ReadonlyArray<{
  name: string;
  monthly: number;
  yearly: number;
  featured?: boolean;
  sections: RetainerSection[];
}> = [
  {
    name: "Basic",
    monthly: 200,
    yearly: 180,
    sections: [
      {
        label: "Hosting & Infrastructure",
        items: [
          { text: "Vercel hosting", included: true },
          { text: "Uptime monitoring", included: true },
          { text: "Security updates", included: true },
          { text: "Performance monitoring", included: true },
        ],
      },
      {
        label: "Content Edits",
        items: [
          { text: "2 small edits/month", included: true },
          { text: "SEO blog posts", included: false },
          { text: "Google Business Profile", included: false },
          { text: "Monthly report", included: false },
        ],
      },
      {
        label: "Support",
        items: [
          { text: "Standard response time", included: true },
          { text: "Priority queue", included: false },
          { text: "Strategy call", included: false },
        ],
      },
    ],
  },
  {
    name: "Growth",
    monthly: 350,
    yearly: 315,
    featured: true,
    sections: [
      {
        label: "Hosting & Infrastructure",
        items: [{ text: "Everything in Basic", included: true }],
      },
      {
        label: "Content Edits",
        items: [
          { text: "2 small edits/month", included: true },
          { text: "2 SEO blog posts/month", included: true },
          { text: "Google Business Profile updates", included: true },
          { text: "Unlimited small edits", included: false },
        ],
      },
      {
        label: "Reporting",
        items: [
          { text: "Monthly performance report", included: true },
          { text: "Strategy call", included: false },
        ],
      },
    ],
  },
  {
    name: "Premium",
    monthly: 600,
    yearly: 540,
    sections: [
      {
        label: "Hosting & Infrastructure",
        items: [{ text: "Everything in Growth", included: true }],
      },
      {
        label: "Content Edits",
        items: [
          { text: "Unlimited small edits", included: true },
          { text: "2 SEO blog posts/month", included: true },
          { text: "Google Business Profile updates", included: true },
        ],
      },
      {
        label: "Support & Strategy",
        items: [
          { text: "Monthly performance report", included: true },
          { text: "Priority response queue", included: true },
          { text: "Monthly strategy call", included: true },
        ],
      },
    ],
  },
];

export const EDIT_SIZES = [
  {
    name: "Small",
    tag: "small" as const,
    definition:
      "Text changes, image swaps, hours or menu updates, contact info, minor copy tweaks",
    time: "Under 30 min",
    billing: "Included in plan (up to plan limit)",
  },
  {
    name: "Medium",
    tag: "medium" as const,
    definition:
      "New section on existing page, new form, new third-party integration (booking, chat, etc.)",
    time: "30 min - 2 hrs",
    billing: "$75-$150 per edit",
    billingNote: "billed at $85/hr, estimated first",
  },
  {
    name: "Large",
    tag: "large" as const,
    definition:
      "New page, redesign of an existing page, new feature or functionality",
    time: "2+ hrs",
    billing: "Fixed quote before work begins",
  },
] as const;

export const OVERAGE_RATE = "$85/hr";

export const OVERAGE_COPY =
  "Client receives a written estimate before any billable work begins. Approval is required. Overages are never charged without it. Medium edits typically run $75-$150. Large edits are quoted as a fixed project fee.";

export const PRICING_QUICK_REF = [
  { label: "Build range", value: "$2,000", suffix: "- $6,000" },
  { label: "Retainer range", value: "$200", suffix: "- $600/mo" },
  { label: "Yearly discount", value: "10%", suffix: "off monthly" },
  { label: "Overage rate", value: "$85", suffix: "/hr" },
  { label: "Deposit", value: "50%", suffix: "at signing" },
  { label: "Balance", value: "50%", suffix: "at launch" },
  { label: "Payment due", value: "7 days", suffix: "from invoice" },
] as const;

export const PRICING_COPY = {
  intro: `Website builds ${PRICING_FLOOR.replace("From ", "from ")}. Clear tiers, fixed scope.`,
  buildSub:
    "One-time project fee. 50% deposit at signing, 50% at launch. Scope is fixed per tier; extra pages billed separately.",
  retainerSub:
    "Ongoing hosting, maintenance, and growth support. Billed on the 1st. Yearly rate is 10% off monthly. All Medium and Large edits are billed separately.",
  editSub:
    "How we classify maintenance or change requests. This determines whether work is included in your retainer or billed separately.",
  addonSub:
    "Available at time of build or as standalone projects. Billed once, not recurring.",
  overageSub:
    "Any Medium or Large edit, or any work beyond included plan scope, is billed at the standard overage rate. Written client approval is always required before charging overages.",
} as const;

export const BRAND = {
  name: "Strivn",
  location: "Front Range, CO",
  basedIn: "Based in Colorado's Front Range",
  email: "hello@strivn.com",
  phone: "(720) 555-0142",
  phoneHref: "tel:+17205550142",
  accent: "#FF5C00",
} as const;

export const SAHARA_CASE_STUDY = {
  title: "Sahara Grill",
  category: "Restaurant",
  location: "Denver, CO",
  metric: "Live / Lighthouse 98",
  summary:
    "Menu-forward site built for local search and online ordering.",
  body: [
    "Sahara Grill needed a site that worked as hard as the kitchen — clear menus, fast mobile load, and a path from search to order without friction. The previous presence buried the food behind generic stock layouts and made it hard for Denver diners to see hours, specialties, or place an order on their phone. On mobile especially, the experience felt like a brochure instead of a storefront.",
    "We rebuilt around the menu: dish photography, dietary callouts, and ordering CTAs above the fold on every key page. Structure was tuned for local search — neighborhood and cuisine cues, Google Business alignment, and page speed that holds a Lighthouse score in the high 90s. Copy and hierarchy answer the questions diners actually ask first: what’s good, what’s open, and how do I order.",
    "The result is a live restaurant site that gets found, shows the food first, and moves hungry visitors into online ordering — not a brochure that stops at “looks nice.” Performance stays high enough that a slow connection on the Front Range doesn’t cost the sale. That same foundation is what we bring to Front Range service businesses that need credibility and conversions, not templates.",
  ],
} as const;
