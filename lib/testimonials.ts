export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  industrySlug?: string;
  featured?: boolean;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "We needed a site that looked as good as our food and didn't take months to launch. Strivn delivered a clean, fast site that our customers actually use to find our menu and hours.",
    author: "Client name",
    role: "Owner",
    company: "Sahara Grill",
    location: "Denver, CO",
    featured: true,
  },
] as const;
