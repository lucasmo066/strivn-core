import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use — Strivn",
  description: `Terms governing use of the ${BRAND.name} website. Project work is covered by a separate agreement.`,
};

const LAST_UPDATED = "July 22, 2026";

export default function TermsPage() {
  return (
    <main>
      <section className="section-y">
        <Container className="max-w-2xl space-y-10">
          <header className="space-y-3">
            <MonoLabel>Legal</MonoLabel>
            <h1 className="font-display text-[var(--text-h2)]">
              Terms of Use
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </header>

          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Agreement
              </h2>
              <p>
                These Terms of Use (“Terms”) govern your access to and use of
                the {BRAND.name} website at{" "}
                <span className="text-foreground">strivn.com</span> (the
                “Site”). By using the Site, you agree to these Terms. If you
                do not agree, do not use the Site.
              </p>
              <p>
                These Terms apply to the Site only. Design, development,
                hosting, and retainer work are governed by a separate written
                agreement (proposal, statement of work, or master services
                agreement) between you and {BRAND.name}.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                The Site
              </h2>
              <p>
                We provide the Site for information about our services,
                portfolio, pricing, and how to contact us. Content is for
                general informational purposes and may change without notice.
                Pricing shown on the Site is indicative and may be updated;
                a signed proposal controls for any engagement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Acceptable use
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Use the Site in any way that violates applicable law or
                  regulation
                </li>
                <li>
                  Attempt to gain unauthorized access to the Site, related
                  systems, or data
                </li>
                <li>
                  Interfere with or disrupt the Site’s operation, security, or
                  other users
                </li>
                <li>
                  Scrape, harvest, or bulk-collect content or contact details
                  without our prior written consent
                </li>
                <li>
                  Submit false, misleading, or harmful content through forms or
                  other channels on the Site
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Intellectual property
              </h2>
              <p>
                The Site and its content — including text, design, logos,
                graphics, and code — are owned by {BRAND.name} or our
                licensors and are protected by intellectual property laws. You
                may view and use the Site for personal, non-commercial
                evaluation of our services. You may not copy, modify,
                distribute, or create derivative works from Site content
                without our prior written permission, except as allowed by
                law.
              </p>
              <p>
                Client project work and deliverables are addressed in the
                applicable client agreement, not these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Third-party links
              </h2>
              <p>
                The Site may link to third-party websites or tools. We are not
                responsible for their content, policies, or practices. Your
                use of third-party sites is at your own risk and subject to
                their terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Disclaimer
              </h2>
              <p>
                The Site is provided “as is” and “as available.” To the fullest
                extent permitted by law, {BRAND.name} disclaims all warranties,
                express or implied, including merchantability, fitness for a
                particular purpose, and non-infringement. We do not warrant
                that the Site will be uninterrupted, error-free, or free of
                harmful components.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, {BRAND.name} and its
                owners, employees, and contractors will not be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits, data, or goodwill, arising
                from your use of the Site. Our total liability arising out of
                or relating to the Site will not exceed one hundred U.S.
                dollars (USD $100).
              </p>
              <p>
                Some jurisdictions do not allow certain limitations; in those
                cases, our liability is limited to the maximum extent permitted
                by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Indemnity
              </h2>
              <p>
                You agree to indemnify and hold harmless {BRAND.name} from
                claims, damages, and expenses (including reasonable attorneys’
                fees) arising from your misuse of the Site or violation of
                these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Governing law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Colorado,
                without regard to conflict-of-law rules. Exclusive venue for
                disputes arising from these Terms or the Site lies in the state
                or federal courts located in Colorado, and you consent to
                personal jurisdiction there.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Changes
              </h2>
              <p>
                We may revise these Terms at any time by posting an updated
                version on the Site. The “Last updated” date will change when
                we do. Continued use of the Site after changes constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Contact
              </h2>
              <p>
                Questions about these Terms:{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {BRAND.email}
                </a>
                , or our{" "}
                <Link
                  href="/#contact"
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  contact form
                </Link>
                .
              </p>
              <p>
                {BRAND.name} · {BRAND.location}
              </p>
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
