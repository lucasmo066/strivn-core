import { STILLWATER_DEMO } from "@/lib/work-examples";

export const TAGLINES = {
  primary: "Custom websites that bring in business",
  heroSub:
    "We handle your website from design to launch, with clear mobile pages, working inquiries, and the booking or ordering connections agreed for your business.",
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
      "Help visitors understand your business and find the next step, with clear content and layouts that work on a phone.",
  },
  {
    title: "Live in weeks",
    description:
      "One team handles design, agreed setup, testing, and launch, with your scope and review stages settled before work starts.",
  },
  {
    title: "Found in local search",
    description:
      "Give search engines clear service information and visitors useful answers, with search setup matched to your package.",
  },
  {
    title: "A partner after launch",
    description:
      "Keep ownership of your accounts, get a clear handoff, and choose optional care or handle routine updates with an agreed editor.",
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
  | { status: "Demo"; href: string; ctaLabel: string }
  | { status: "Planned" | "In development"; href?: never }
  | { status: "Your turn"; href: string; ctaLabel: string }
);

/**
 * Portfolio carousel. Client work links to case studies; demos link to their live previews.
 * Add approved 4:3 stills (ideally 1600 x 1200 WebP/AVIF) under
 * public/assets/work/, then replace the relevant demo media with
 * { src: "/assets/work/project-name.webp", alt: "Description of the image" }.
 * The media component uses the shared pointer-driven ChromaticImage treatment.
 * Current demo images come from the user's Aceternity carousel sample.
 * Remove isDemo only when supplying real project media.
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
    id: "stillwater",
    title: STILLWATER_DEMO.title,
    category: "Med spa website demo",
    description: STILLWATER_DEMO.description,
    status: "Demo",
    media: { src: STILLWATER_DEMO.image, alt: STILLWATER_DEMO.imageAlt },
    href: STILLWATER_DEMO.href,
    ctaLabel: STILLWATER_DEMO.ctaLabel,
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
    id: "your-business",
    title: "Be our next business",
    category: "Your business, next",
    description: "Let’s build a website worth showing off, with a partner who stays involved after launch.",
    status: "Your turn",
    media: null,
    href: "/start",
    ctaLabel: "Start your project",
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
      { label: "Website care", href: "/pricing#care" },
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
      "Contact form delivered to your designated inbox",
      "Fast-loading pages",
      "Existing domain connection + launch testing",
      "2 consolidated revision rounds + access handoff",
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
      "Basic editor for agreed content + training session",
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
      "Mobile-ready shopping experience",
      "Existing domain connection + access handoff",
      "Shopify editor + handoff training",
      "Launch testing + 2 consolidated revision rounds",
    ],
  },
] as const;

/** Industry-specific offer; kept out of the general pricing tiers. */
export const MED_SPA_PACKAGE = {
    name: "Med Spa",
    pages: "8 pages · single location",
    price: "$4,500",
    priceNote: "flat fee · 3–4 weeks",
    includes: [
      "Your brand on our med spa template",
      "Home, About/team, Treatments, FAQ, Contact/booking",
      "3 individual treatment pages",
      "Mobile design + one booking tool connection",
      "Copy refinement from your supplied content",
      "Launch SEO + analytics + inquiry/booking-click tracking",
      "2 consolidated revision rounds + handoff",
      "30 days of post-launch defect fixes",
    ],
  } as const;

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
    description: "Connect one existing scheduling service using a supported link or embed. Custom booking systems and provider fees are separate.",
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
    category: "Content & commerce",
    name: "On-site photography",
    description: "Original photos for your website, menu, or service pages, captured for your business.",
    price: "Custom quote",
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

/** Prices are full quarterly and annual charges, never monthly equivalents. */
export type RetainerPlan = {
  name: string;
  quarterly: number;
  yearly: number;
  summary: string;
  featured?: boolean;
  sections: RetainerSection[];
};

export const RETAINER_PLANS: readonly RetainerPlan[] = [
  {
    name: "Essential Care",
    quarterly: 375,
    yearly: 1350,
    summary: "Hosting, monitoring, routine maintenance, and 1 hour of content edits per quarter.",
    sections: [
      { label: "Website operations", items: [
        { text: "Standard website hosting within agreed usage limits", included: true },
        { text: "Uptime monitoring + deployment recovery", included: true },
        { text: "Routine security and dependency maintenance", included: true },
        { text: "Monthly form and booking-link checks", included: true },
      ] },
      { label: "Edits & support", items: [
        { text: "1 hour of content edits per quarter", included: true },
        { text: "Response within 2 business days", included: true },
        { text: "Ongoing SEO, blog posts, and advertising", included: false },
      ] },
    ],
  },
  {
    name: "Seasonal Care",
    quarterly: 675,
    yearly: 2430,
    summary: "Essential operations, 3 total editing hours per quarter, a quarterly review, and next-business-day response.",
    featured: true,
    sections: [
      { label: "Website operations", items: [
        { text: "All Essential Care hosting and maintenance", included: true },
      ] },
      { label: "Edits & support", items: [
        { text: "3 total hours of content edits per quarter", included: true },
        { text: "Quarterly performance summary and planning review", included: true },
        { text: "Next-business-day response", included: true },
        { text: "Ongoing SEO, blog posts, and advertising", included: false },
      ] },
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
    billing: "Uses your quarterly editing allowance",
  },
  {
    name: "Medium",
    tag: "medium" as const,
    definition:
      "New section on existing page, new form, new third-party integration (booking, chat, etc.)",
    time: "30 min - 2 hrs",
    billing: "$100–$200 per edit",
    billingNote: "billed at $100/hr, estimated first",
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

export const OVERAGE_RATE = "$100/hr";

export const OVERAGE_COPY =
  "Client receives a written estimate before any billable work begins. Approval is required. Overages are never charged without it. Medium edits typically run $100–$200. Large edits are quoted as a fixed project fee.";

export const PRICING_QUICK_REF = [
  { label: "Build range", value: "$2,000", suffix: "- $6,000" },
  { label: "Retainer range", value: "$375", suffix: "–$675/quarter" },
  { label: "Yearly discount", value: "10%", suffix: "off four quarterly payments" },
  { label: "Overage rate", value: "$100", suffix: "/hr" },
  { label: "Deposit", value: "50%", suffix: "at signing" },
  { label: "Balance", value: "50%", suffix: "before launch" },
  { label: "Payment due", value: "7 days", suffix: "from invoice" },
] as const;

export const PRICING_PROCESS = [
  {
    title: "Tell us about the project",
    body: "Book a call or send a note through the contact form. Bring an idea, an existing website, or a problem you want to solve.",
  },
  {
    title: "Agree a fixed package and scope",
    body: `Agree on the result, included pages, content responsibilities, integrations, and editing options before work starts. Extra pages beyond the package are ${EXTRA_PAGE_PRICE} each.`,
  },
  {
    title: "Pay half to start",
    body: "50% deposit at signing. The remaining 50% is due before launch.",
  },
  {
    title: "Launch in weeks",
    body: "A typical build launches in 2–4 weeks after deposit, approved scope, content, branding, and access. Client feedback delays shift the launch date.",
  },
  {
    title: "Keep improving after launch",
    body: "Keep your accounts in your name and choose how to manage updates. Pro includes an agreed content editor and training; Shopify includes its platform editor and training. Optional care handles maintenance plus a quarterly editing allowance.",
  },
] as const;

export const PRICING_COPY = {
  intro: `Website builds ${PRICING_FLOOR.replace("From ", "from ")}. Design, agreed setup, testing, and launch in one scoped package.`,
  buildSub:
    "One-time project fee. 50% deposit at signing, 50% before launch. Scope is fixed per tier; extra pages billed separately.",
  retainerSub:
    "Optional website care, billed quarterly or yearly in advance. Annual prepayment saves 10% versus four quarterly payments. Editing allowances reset each quarter.",
  editSub:
    "How we classify maintenance or change requests. This determines whether work is included in your retainer or billed separately.",
  addonSub:
    "Optional work beyond your included scope, quoted before we start. Existing-service connections use the provider’s supported link or embed; custom systems and external subscriptions are separate.",
  overageSub:
    "Any Medium or Large edit, or any work beyond included plan scope, is billed at the standard overage rate. Written client approval is always required before charging overages.",
} as const;

export const BRAND = {
  name: "Strivn",
  legalName: "Strivn Agency",
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
