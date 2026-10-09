export const TAGLINES = {
  primary: "Custom websites that bring in business",
  heroSub:
    "Fast, custom sites for small businesses. Built to get you found and booked.",
  heroDetail: "Launch in weeks, not months.",
  cta: "Tell us about your project",
  heroCta: "Book a call",
  navCta: "Book a call",
  speed: "Found fast. Sold faster.",
  closing: "Ready when you are",
} as const;

/** Canonical build floor. Keep stat bar, work teaser, and pricing intro in sync. */
export const PRICING_FLOOR = "From $2,000";

export const HERO_PROOF = [
  { value: "2-4 wks", label: "Typical launch" },
  { value: PRICING_FLOOR.replace("From ", ""), label: "Website builds from" },
  { value: "1 day", label: "Reply time" },
] as const;

/** Hero plate media. Poster for instant paint; video remains available for later use. */
export const HERO_MEDIA = {
  still: "/assets/hero/lakeside-town.webp",
  stillWidth: 1024,
  stillHeight: 576,
  blur: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoUAAwAPzmGuVOvKSWisAgB4CcJZACdACIjDjk3E6o30MltAAD+sgguJMuNnLVsF0y5JYE+2piENv69h9C+SpVjuD+3nknkqO4UGxQcBesLtgJsiLIOUe+ohRMBRUgDWdolrXmDLZSpQAAA",
  video: "/assets/hero/alpine-lakeside.mp4",
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
  "Turn local interest into booked appointments.";

export const SERVICES_AI_LINE =
  "We also wire AI that recovers after-hours inquiries, so missed calls turn into booked appointments, not lost leads.";

export const SERVICES = [
  {
    title: "Design that earns trust",
    description:
      "Show what makes your practice the right choice, with a clear path to booking.",
  },
  {
    title: "Live in weeks",
    description:
      "Fast on every screen, with a focused build and a clear route to launch.",
  },
  {
    title: "Found in local search",
    description:
      "Help nearby patients and clients find the services they are already looking for.",
  },
  {
    title: "Care after launch",
    description:
      "Hosting, updates, and ongoing edits that keep your site in step with your business.",
  },
] as const;

/**
 * Services bento, central image.
 * Portrait still at public/assets/services/front-range-valley.webp.
 * Mobile/tablet use a centered 16:9 crop; desktop shows 4:5.
 * Keep the focal subject in the central 50% and adjust objectPosition if needed.
 */
export const SERVICES_MEDIA: {
  src: string | null;
  alt: string;
  objectPosition: string;
  backgroundColor: string;
} = {
  src: "/assets/services/front-range-valley.webp",
  alt: "Stippled alpine valley with green slopes, a river, and cabins",
  objectPosition: "50% 50%",
  backgroundColor: "#437d66",
};

export type WorkMedia = {
  src: string;
  alt: string;
  objectPosition?: string;
  isDemo?: boolean;
};

export type WorkProject = {
  id: string;
  title: string;
  category: string;
  location?: string;
  description: string;
  media: WorkMedia | null;
} & (
  | { status: "Live"; href: string }
  | { status: "Planned" | "In development"; href?: never }
);

/**
 * Portfolio carousel. Only live projects have case-study destinations.
 * Add approved 4:3 stills (ideally 1600 x 1200 WebP/AVIF) under
 * public/assets/work/, then replace the relevant demo media with
 * { src: "/assets/work/project-name.webp", alt: "Description of the image" }.
 * The media component uses the shared pointer-driven ChromaticImage treatment.
 * Current demo images come from the user's Aceternity carousel sample and
 * are visibly labelled. Remove isDemo only when supplying real project media.
 */
export const WORK_ITEMS: readonly WorkProject[] = [
  {
    id: "sahara-grill",
    title: "The Sahara Grill",
    category: "Restaurant",
    location: "Woodstock, GA",
    description: "Menu-forward site built for local search and online ordering.",
    status: "Live",
    media: {
      src: "/assets/work/sahara-grill-sign.webp",
      alt: "The Sahara Grill storefront sign, red and green lettering above a Fresh Mediterranean banner",
    },
    href: "/work/sahara-grill",
  },
  {
    id: "iconic-stripes",
    title: "Iconic Stripes",
    category: "Shopify",
    description: "A planned Shopify storefront for Iconic Stripes.",
    status: "Planned",
    media: {
      src: "/assets/work/iconic-stripes.webp",
      alt: "Mountain landscape from the Aceternity carousel demo, not an Iconic Stripes screenshot",
      isDemo: true,
    },
  },
  {
    id: "vertical-template",
    title: "Vertical template",
    category: "Service business",
    description: "A planned website template for a priority service industry.",
    status: "Planned",
    media: {
      src: "/assets/work/vertical-template.webp",
      alt: "Classical columns at sunset from the Aceternity carousel demo, not a template screenshot",
      isDemo: true,
    },
  },
];

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
  { label: "Process", href: "/process" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/#contact" },
] as const;

export const FOOTER_LINK_GROUPS = [
  { label: "Explore", links: NAV_LINKS },
  {
    label: "Get started",
    links: [
      { label: "Choose a package", href: "/start" },
      { label: "Monthly care", href: "/pricing#care" },
      { label: "Add-ons", href: "/pricing#add-ons" },
    ],
  },
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
  {
    category: "Visibility",
    name: "SEO setup + keyword research",
    description: "Keyword map and on-page launch foundations.",
    price: "$300",
  },
  {
    category: "Visibility",
    name: "Google Analytics + Search Console",
    description: "Reporting and search-visibility tracking.",
    price: "$150",
  },
  {
    category: "Brand & conversion",
    name: "Logo / basic brand kit",
    description: "A focused mark, colors, and simple usage direction.",
    price: "$400",
  },
  {
    category: "Brand & conversion",
    name: "Booking or scheduling integration",
    description: "Connect the calendar or scheduling tool you use.",
    price: "$200",
  },
  {
    category: "Content & commerce",
    name: "Menu or catalog build-out",
    description: "Organize customer-facing menu or product details.",
    price: "$250",
  },
  {
    category: "Content & commerce",
    name: "Product upload (per 10 items)",
    description: "Add and format up to 10 store items.",
    price: "$100",
  },
  {
    category: "Site operations",
    name: "Extra page beyond package",
    description: "One additional scoped page beyond your package.",
    price: "$200 each",
  },
  {
    category: "Site operations",
    name: "Domain transfer (to new registrar)",
    description: "Move your domain to a new registrar.",
    price: "$175",
  },
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
    yearly: 170,
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
    yearly: 297.5,
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
    yearly: 510,
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
  { label: "Yearly discount", value: "15%", suffix: "off monthly" },
  { label: "Overage rate", value: "$85", suffix: "/hr" },
  { label: "Deposit", value: "50%", suffix: "at signing" },
  { label: "Balance", value: "50%", suffix: "at launch" },
  { label: "Payment due", value: "7 days", suffix: "from invoice" },
] as const;

export const PRICING_PROCESS = [
  {
    title: "Tell us about the project",
    body: "Book a call or send a note through the contact form. Bring an idea, an existing website, or a problem you want to solve.",
  },
  {
    title: "Agree a fixed package and scope",
    body: `Scope is fixed per tier. Extra pages are ${EXTRA_PAGE_PRICE} each.`,
  },
  {
    title: "Pay half to start",
    body: "50% deposit at signing. The balance is 50% at launch, due within 7 days of the invoice.",
  },
  {
    title: "Launch in weeks",
    body: "A typical build launches in 2–4 weeks.",
  },
  {
    title: "Care after launch, if you want it",
    body: "An optional monthly care plan covers hosting and included edits. Medium and large edits are estimated in writing and approved before any extra charge.",
  },
] as const;

export const PRICING_COPY = {
  intro: `Website builds ${PRICING_FLOOR.replace("From ", "from ")}. Clear tiers, fixed scope.`,
  buildSub:
    "One-time project fee. 50% deposit at signing, 50% at launch. Scope is fixed per tier; extra pages billed separately.",
  retainerSub:
    "Ongoing hosting, maintenance, and growth support. Billed on the 1st. A yearly commitment saves 15%. All Medium and Large edits are billed separately.",
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
  email: "hello@strivnagency.com",
  phone: "(720) 555-0142",
  phoneHref: "tel:+17205550142",
  accent: "#FF5C00",
} as const;

export const SAHARA_CASE_STUDY = {
  title: "The Sahara Grill",
  category: "Restaurant",
  location: "Woodstock, GA",
  summary:
    "A menu-forward restaurant website focused on local discovery and online ordering.",
} as const;
