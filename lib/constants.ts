export const TAGLINES = {
  primary: "Custom websites that bring in business.",
  heroSub:
    "We design and build fast, conversion-focused sites for small businesses on the Front Range.",
  heroDetail:
    "No templates, no bloated agency process — launch in weeks, not months.",
  cta: "Ready to grow your business online?",
  heroCta: "Start your project",
  navCta: "Book a call",
  speed: "Found fast. Sold faster.",
  closing: "Let's build something that works.",
} as const;

export const HERO_PROOF = [
  { value: "2–4 wks", label: "Typical launch timeline" },
  { value: "99", label: "Lighthouse performance target" },
] as const;

export const SERVICES = [
  {
    title: "Custom design",
    description:
      "Brand-aligned layouts built for your market — not a template with your logo dropped in.",
    points: [
      "Mobile-first page structure",
      "Clear calls to action",
      "On-brand typography and color",
    ],
  },
  {
    title: "Development & launch",
    description:
      "Fast, accessible sites on modern infrastructure — engineered to load quickly and rank cleanly.",
    points: [
      "Next.js performance stack",
      "Forms, booking, and integrations",
      "Analytics and Search Console setup",
    ],
  },
  {
    title: "Local SEO foundation",
    description:
      "Get found by customers already searching across the Front Range.",
    points: [
      "On-page SEO structure",
      "Google Business Profile alignment",
      "Keyword-informed page copy",
    ],
  },
  {
    title: "Ongoing care",
    description:
      "After launch, we handle hosting, updates, and the small changes that keep your site current.",
    points: [
      "Monthly maintenance plans",
      "Defined edit sizes — no surprise scope",
      "Priority support on Growth+ plans",
    ],
  },
] as const;

export const WORK_ITEMS = [
  {
    title: "Sahara Grill",
    category: "Restaurant",
    location: "Denver, CO",
    description:
      "Menu-forward site with strong local presence and a foundation for online ordering.",
    metric: "Live · Lighthouse 98",
    featured: true,
  },
  {
    title: "Summit First",
    category: "Financial services",
    location: "Boulder, CO",
    description:
      "Trust-focused layout with clear service pages and lead capture for a growing advisory firm.",
    metric: "In progress · LCP 0.9s",
  },
  {
    title: "Your business",
    category: "Next project",
    location: "Front Range",
    description:
      "Restaurants, trades, clinics, shops — if you need customers online, we should talk.",
    metric: "Builds from $2,000",
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
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
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
    time: "30 min – 2 hrs",
    billing: "$75–$150 per edit",
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
  "Standard overage rate. Client receives a written estimate before any billable work begins. Approval is required — overages are never charged without it. Medium edits typically run $75–$150. Large edits are quoted as a fixed project fee.";

export const PRICING_QUICK_REF = [
  { label: "Build range", value: "$2,000", suffix: "– $6,000" },
  { label: "Retainer range", value: "$200", suffix: "– $600/mo" },
  { label: "Yearly discount", value: "10%", suffix: "off monthly" },
  { label: "Overage rate", value: "$85", suffix: "/hr" },
  { label: "Deposit", value: "50%", suffix: "at signing" },
  { label: "Balance", value: "50%", suffix: "at launch" },
  { label: "Payment due", value: "7 days", suffix: "from invoice" },
] as const;

export const PRICING_COPY = {
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
  region: "Front Range",
  accent: "#FF5C00",
} as const;
