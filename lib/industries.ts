export type IndustryTier = 1 | 2 | 3;

export type Industry = {
  slug: string;
  name: string;
  shortName?: string;
  tier: IndustryTier;
  homepage: boolean;
  tagline: string;
  painPoints: string[];
  outcomes: string[];
  relatedSlugs?: string[];
};

export const INDUSTRIES: readonly Industry[] = [
  {
    slug: "med-spas",
    name: "Med spas & aesthetic clinics",
    shortName: "Med spas",
    tier: 1,
    homepage: true,
    tagline:
      "Your entire business sells on looking premium — a dated site breaks that promise before they book.",
    painPoints: [
      "Template-heavy sites create cognitive dissonance with a luxury brand",
      "Instagram looks polished but the website feels like an afterthought",
      "Competitors with cleaner sites win the consultation booking",
    ],
    outcomes: [
      "Visual-first design that matches your in-clinic experience",
      "Clear treatment pages that convert browsers into bookings",
      "Fast load times on mobile where most research happens",
    ],
    relatedSlugs: ["dental-practices", "salons"],
  },
  {
    slug: "dental-practices",
    name: "Dental practices",
    shortName: "Dental",
    tier: 1,
    homepage: true,
    tagline:
      "New patients Google first — your website decides whether they call or bounce.",
    painPoints: [
      "Cosmetic and general dentistry sells on trust and aesthetics",
      "An outdated site undermines the quality of care you deliver",
      "Existing sites often underperform without a clear mobile experience",
    ],
    outcomes: [
      "Trust-building design with clear new-patient pathways",
      "Service pages structured for local search visibility",
      "Online scheduling and contact flows that reduce friction",
    ],
    relatedSlugs: ["med-spas", "veterinary"],
  },
  {
    slug: "law-firms",
    name: "Law firms",
    shortName: "Law firms",
    tier: 1,
    homepage: true,
    tagline:
      "Prospective clients judge your credibility within seconds of landing on your site.",
    painPoints: [
      "Competitive practice areas require a site that stands apart from templates",
      "High case values justify marketing spend — but the site must earn trust first",
      "Slow decision-making means the site needs to answer objections upfront",
    ],
    outcomes: [
      "Professional layouts that signal competence and authority",
      "Practice-area pages optimized for search and conversion",
      "Lead capture that respects the seriousness of legal inquiries",
    ],
    relatedSlugs: ["financial-advisors"],
  },
  {
    slug: "real-estate-teams",
    name: "Real estate teams & boutique brokerages",
    shortName: "Real estate teams",
    tier: 1,
    homepage: true,
    tagline:
      "A polished web presence separates your team from the sea of cookie-cutter brokerage templates.",
    painPoints: [
      "Individual agent sites blend together with no brand differentiation",
      "Teams live and die on perceived professionalism and market expertise",
      "Lead generation depends on a site that showcases listings and results",
    ],
    outcomes: [
      "Brand-forward design that elevates your team above the brokerage default",
      "Listing and agent pages built for local search and referrals",
      "Clear CTAs for buyers, sellers, and investor leads",
    ],
  },
  {
    slug: "home-remodeling",
    name: "Home remodeling & custom home builders",
    shortName: "Home remodeling",
    tier: 1,
    homepage: true,
    tagline:
      "Homeowners visit three to five contractor sites before calling — the best portfolio wins.",
    painPoints: [
      "High-ticket projects require a site that builds trust before the first call",
      "Poor photography presentation loses jobs to competitors with cleaner portfolios",
      "Some owners are skeptical of digital — the site must demonstrate clear ROI",
    ],
    outcomes: [
      "Portfolio-forward layouts that showcase craftsmanship and finished work",
      "Service-area structure for local SEO across the Front Range",
      "Quote and consultation flows that capture qualified leads",
    ],
    relatedSlugs: ["architecture"],
  },
  {
    slug: "financial-advisors",
    name: "Financial advisors & wealth management",
    shortName: "Financial advisors",
    tier: 1,
    homepage: true,
    tagline:
      "Compliance limits social reach — for many RIAs, the website is the primary marketing asset.",
    painPoints: [
      "Trust and credibility are everything; a dated site erodes both instantly",
      "Compliance review can slow updates, so the foundation needs to be right from launch",
      "Prospects compare multiple advisors online before ever scheduling a call",
    ],
    outcomes: [
      "Clean, compliant-ready structure for services and disclosures",
      "Trust-focused design that reflects the caliber of your practice",
      "Lead capture paths for consultations and portfolio reviews",
    ],
    relatedSlugs: ["law-firms"],
  },
  {
    slug: "chiropractors",
    name: "Chiropractors & physical therapy clinics",
    shortName: "Chiropractors",
    tier: 1,
    homepage: false,
    tagline:
      "Patient acquisition is search-driven — and most chiropractic sites are leaving leads on the table.",
    painPoints: [
      "Embarrassingly outdated sites are common in this vertical",
      "Owners understand the site is a sales tool, not a brochure — but theirs doesn't perform",
      "Mobile experience is critical for patients searching symptoms and providers nearby",
    ],
    outcomes: [
      "Modern, accessible design that builds patient confidence",
      "Condition and service pages structured for local SEO",
      "Booking and contact flows that turn searches into appointments",
    ],
    relatedSlugs: ["dental-practices", "veterinary"],
  },
  {
    slug: "veterinary",
    name: "Veterinary clinics & specialty animal hospitals",
    shortName: "Veterinary",
    tier: 1,
    homepage: false,
    tagline:
      "Pet owners research extensively online before trusting someone with their animal.",
    painPoints: [
      "Outdated or confusing sites lose clients to the clinic down the street",
      "Emotional decision-making means design and tone matter as much as information",
      "Younger practice owners expect a digital presence that matches their standards",
    ],
    outcomes: [
      "Warm, trustworthy design that reflects your care approach",
      "Clear service and emergency information for anxious pet owners",
      "New client intake paths that reduce phone tag",
    ],
    relatedSlugs: ["dental-practices"],
  },
  {
    slug: "architecture",
    name: "Architecture & interior design firms",
    shortName: "Architecture",
    tier: 1,
    homepage: false,
    tagline:
      "Visual professionals know design value — a poorly presented portfolio directly costs projects.",
    painPoints: [
      "The website is the portfolio, and many firms underpresent their best work",
      "Premium-rate firms need a site that reflects the quality they charge for",
      "Project galleries often load slowly or fail on mobile",
    ],
    outcomes: [
      "Portfolio-first layouts that let work speak before words do",
      "Fast, image-optimized pages that hold up on any device",
      "Inquiry flows that attract the right clients, not just any client",
    ],
    relatedSlugs: ["home-remodeling"],
  },
  {
    slug: "salons",
    name: "High-end salons & barbershops",
    shortName: "Salons",
    tier: 1,
    homepage: false,
    tagline:
      "Premium clientele expects a polished experience from the first Google search to the chair.",
    painPoints: [
      "Brand investment in interiors and photography doesn't extend to the website",
      "Online booking and service menus are often clunky or outdated",
      "Discount chains dominate search — premium shops need to stand out visually",
    ],
    outcomes: [
      "Brand-aligned design that matches your in-salon aesthetic",
      "Service and stylist pages that convert lookers into bookings",
      "Mobile-first experience for clients searching on the go",
    ],
    relatedSlugs: ["med-spas"],
  },
] as const;

export function getHomepageIndustries(): Industry[] {
  return INDUSTRIES.filter((industry) => industry.homepage);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustriesByTier(tier: IndustryTier): Industry[] {
  return INDUSTRIES.filter((industry) => industry.tier === tier);
}
