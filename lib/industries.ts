export type IndustryTier = 1 | 2 | 3;

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  tier: IndustryTier;
  homepage: boolean;
  headline: string;
  decision: string;
  approach: { title: string; description: string }[];
  journey: [string, string, string];
  goal: string;
  ongoingSupport?: { title: string; description: string };
  caseStudy?: { title: string; description: string; href: string; image: string; imageAlt: string };
};

export const INDUSTRIES: readonly Industry[] = [
  {
    slug: "med-spas",
    name: "Med spas & aesthetic clinics",
    shortName: "Med spas",
    tier: 1,
    homepage: true,
    headline: "Make confidence the first impression.",
    decision: "Before someone trusts you with their appearance, they need to feel good about your expertise. Your website is where interest in a treatment becomes confidence in the people providing it.",
    approach: [
      { title: "Match the experience", description: "Bring the care and character of your clinic online with thoughtful design, real photography, and a clear introduction to your providers." },
      { title: "Answer before they ask", description: "Give each treatment room to explain the experience, expectations, and common questions, so a prospective client can take the next step informed." },
      { title: "Turn interest into a conversation", description: "Put consultation requests within easy reach and connect your booking tool when it’s part of the scope." },
    ],
    journey: ["Explore a treatment", "Get to know your team", "Request a consultation"],
    goal: "More informed consultation requests.",
  },
  {
    slug: "dental-practices",
    name: "Dental practices",
    shortName: "Dental practices",
    tier: 1,
    homepage: true,
    headline: "Help a new patient feel at home. Before they arrive.",
    decision: "Choosing a dentist is personal. Someone might be anxious, new to the area, or unsure about cost. A useful website answers those concerns and makes that first appointment feel easier.",
    approach: [
      { title: "Make your care feel familiar", description: "Introduce your team, your space, and your approach so patients can picture themselves in your care." },
      { title: "Clear up the unknowns", description: "Organize services, new-patient information, and your payment or insurance guidance around the questions your front desk hears every day." },
      { title: "Make the first call simple", description: "Give mobile visitors a clear way to call or request an appointment, with location and hours close at hand." },
    ],
    journey: ["Find the right care", "Feel comfortable", "Request a first visit"],
    goal: "A clearer path to new-patient appointments.",
  },
  {
    slug: "law-firms",
    name: "Law firms",
    shortName: "Law firms",
    tier: 1,
    homepage: true,
    headline: "Be the clear next step in a complicated moment.",
    decision: "A prospective client often arrives with an urgent question and little certainty. Your site needs to show that you understand their situation, handle the right matters, and are easy to reach.",
    approach: [
      { title: "Help people find their fit", description: "Build practice-area pages around the situations you handle, who you serve, and what an initial conversation looks like." },
      { title: "Give credibility substance", description: "Present attorney experience, your approach, and firm-approved credentials in a design that feels considered and professional." },
      { title: "Create a useful first inquiry", description: "Keep the contact path clear and intake questions focused, helping your team understand the inquiry and follow up." },
    ],
    journey: ["Recognize their situation", "Understand your expertise", "Request a conversation"],
    goal: "Inquiries that better fit your practice.",
  },
  {
    slug: "real-estate-teams",
    name: "Real estate teams & boutique brokerages",
    shortName: "Real estate teams",
    tier: 1,
    homepage: true,
    headline: "Give people a reason to choose your team.",
    decision: "A property may bring someone to your site. Your local knowledge and approach give them a reason to stay. Build a presence that helps buyers and sellers see the value of having you in their corner.",
    approach: [
      { title: "Show the local advantage", description: "Connect neighborhood knowledge, team profiles, and your market perspective so visitors see what you bring to their move." },
      { title: "Let your work make the case", description: "Give listings and approved past-sale stories thoughtful presentation, with room to explain the work behind each property." },
      { title: "Separate the next steps", description: "Create distinct routes for buying and selling, from an initial property inquiry to a conversation about listing a home." },
    ],
    journey: ["Explore your market", "Choose a local partner", "Plan the next move"],
    goal: "More meaningful buyer and seller conversations.",
  },
  {
    slug: "home-remodeling",
    name: "Home remodeling & custom home builders",
    shortName: "Remodeling & builders",
    tier: 1,
    homepage: true,
    headline: "Turn “we love your work” into “let’s talk about ours.”",
    decision: "A homeowner is trusting you with their space, budget, and daily life. Great project photos start the conversation. A clear explanation of your process helps them feel ready to have it.",
    approach: [
      { title: "Show the thinking behind the finish", description: "Build project stories around the brief, the craftsmanship, and the finished space, so visitors understand the value behind the photographs." },
      { title: "Set the right expectations", description: "Explain the work you take on, where you build, and how a project moves forward. Help homeowners recognize whether you’re the right fit." },
      { title: "Start with a better brief", description: "Shape inquiries around project type, location, timing, and budget, giving your team useful context before the first call." },
    ],
    journey: ["See the possibilities", "Understand the process", "Discuss their project"],
    goal: "Project inquiries that fit the work you want.",
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    shortName: "Restaurants",
    tier: 1,
    homepage: true,
    headline: "Make the next meal an easy choice.",
    decision: "A hungry guest wants to see the food, check the menu, and know how to order or visit. Your website should bring the character of your restaurant online and make those decisions easy, especially on a phone.",
    approach: [
      { title: "Put the menu first", description: "Give your food room to shine with real photography, clear categories, descriptions, and prices. Build a menu that is easy to read on a phone and keep current as dishes change." },
      { title: "Turn a local search into a visit", description: "Bring your hours, location, directions, and contact details together. Give search engines useful information about your restaurant and guests the details they need to make a plan." },
      { title: "Make ordering the easy part", description: "Connect guests to your ordering or reservation platform, with a clear route for catering inquiries. We shape the next steps around how your restaurant actually serves people." },
    ],
    journey: ["Discover the food", "Explore the menu", "Order or plan a visit"],
    goal: "An easier path to orders, visits, and catering inquiries.",
    ongoingSupport: {
      title: "A website that keeps up with your kitchen.",
      description: "Seasonal menus, holiday hours, new photos, and promotions should be easy to keep current. Monthly care gives you a responsive partner for included updates and performance monitoring. Growth adds content and search support; Premium adds a monthly strategy call to plan what comes next. Larger additions are scoped and quoted before work starts.",
    },
    caseStudy: {
      title: "The Sahara Grill",
      description: "A custom website for a family-owned Mediterranean restaurant in Woodstock, Georgia. Explore its mobile-friendly menu, clear takeout and delivery links, and menu tools the restaurant can update itself.",
      href: "/work/sahara-grill",
      image: "/assets/work/sahara-grill/homepage-desktop.webp",
      imageAlt: "The Sahara Grill website with Mediterranean food photography and clear menu and ordering links",
    },
  },
  {
    slug: "financial-advisors",
    name: "Financial advisors & wealth management",
    shortName: "Financial advisors",
    tier: 1,
    homepage: false,
    headline: "Make a personal connection before the first meeting.",
    decision: "A referral can get your name in front of someone. Your website helps them understand who you work with, how you think, and whether your approach fits what they’re looking for.",
    approach: [
      { title: "Make your fit clear", description: "Explain the clients and life stages you serve, using plain language that helps people recognize their own priorities." },
      { title: "Put your approach into focus", description: "Give your team, planning process, and firm-approved information a thoughtful home, with space for the disclosures your reviewers require." },
      { title: "Make introductions approachable", description: "Explain what to expect from a first conversation and provide a simple way to request it, without asking for sensitive financial details." },
    ],
    journey: ["Follow a referral", "Understand your approach", "Arrange an introduction"],
    goal: "Better-fit introductions for your advisory team.",
  },
  {
    slug: "chiropractors",
    name: "Chiropractors & physical therapy clinics",
    shortName: "Chiropractic & PT",
    tier: 1,
    homepage: false,
    headline: "Make the first step toward care feel manageable.",
    decision: "Someone looking for help wants to know whether you treat their concern and what happens next. Your website can turn an unfamiliar process into a clear, welcoming first step.",
    approach: [
      { title: "Connect needs with services", description: "Organize practitioner-reviewed service information so visitors can find relevant care and understand your approach." },
      { title: "Take the mystery out of a visit", description: "Show your practitioners and space, explain a first appointment, and make practical details easy to find." },
      { title: "Help people reach your team", description: "Build a straightforward mobile path to calling or requesting an appointment, with directions and hours where they’re needed." },
    ],
    journey: ["Explore care options", "Know what to expect", "Request an appointment"],
    goal: "More confident first-appointment inquiries.",
  },
  {
    slug: "veterinary",
    name: "Veterinary clinics & specialty animal hospitals",
    shortName: "Veterinary clinics",
    tier: 1,
    homepage: false,
    headline: "Care for the pet starts with reassuring the person.",
    decision: "Pet owners need warmth and clarity, whether they’re choosing a regular vet or looking for timely help. Your site should help them find the right information without adding to the worry.",
    approach: [
      { title: "Put a face to your care", description: "Introduce your team, your facilities, and the animals you treat so new clients can understand your practice." },
      { title: "Make practical answers immediate", description: "Keep service details, hours, location, and your clinic-approved urgent-care instructions easy to find on a phone." },
      { title: "Welcome new clients clearly", description: "Explain the first visit and create a simple inquiry or appointment path, helping owners know what to do and what to bring." },
    ],
    journey: ["Find the right clinic", "Feel reassured", "Arrange a visit"],
    goal: "A smoother welcome for new clients and their pets.",
  },
  {
    slug: "architecture",
    name: "Architecture & interior design firms",
    shortName: "Architecture & interiors",
    tier: 1,
    homepage: false,
    headline: "Let your next client see themselves in your work.",
    decision: "A beautiful portfolio catches the eye. The story behind it helps a prospective client understand your perspective, your process, and why you’re the right partner for their space.",
    approach: [
      { title: "Give the work room to breathe", description: "Create carefully paced, image-led project pages that preserve the detail of your work and feel good to browse on any screen." },
      { title: "Show more than a signature style", description: "Explain the brief, design decisions, and collaboration behind each project to make your expertise tangible." },
      { title: "Invite the right commissions", description: "Make your services and process clear, then shape an inquiry around the type, scale, and timing of the project." },
    ],
    journey: ["Connect with the work", "See the design thinking", "Share a project brief"],
    goal: "New commissions aligned with your practice.",
  },
  {
    slug: "salons",
    name: "High-end salons & barbershops",
    shortName: "Salons & barbershops",
    tier: 1,
    homepage: false,
    headline: "Bring the feeling of your space to the first click.",
    decision: "Someone may discover your work on social. Your site is where they find the right service, get to know a stylist, and decide to make an appointment. Keep that experience as considered as the one in your chair.",
    approach: [
      { title: "Carry your style through", description: "Bring your photography, personality, and atmosphere together in a site that feels like an extension of your space." },
      { title: "Help clients find their match", description: "Give services, pricing guidance, and stylist specialties a clear structure so people can choose with confidence." },
      { title: "Keep booking within reach", description: "Create a direct mobile path to your chosen booking platform when included in scope, with location and visit details close by." },
    ],
    journey: ["Discover your style", "Find a service & stylist", "Book time in the chair"],
    goal: "An easier path from social interest to an appointment.",
  },
];

export function getHomepageIndustries(): Industry[] {
  return INDUSTRIES.filter((industry) => industry.homepage);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustriesByTier(tier: IndustryTier): Industry[] {
  return INDUSTRIES.filter((industry) => industry.tier === tier);
}
