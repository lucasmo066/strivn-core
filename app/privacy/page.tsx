import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy — Strivn",
  description: `How ${BRAND.name} collects, uses, and protects information when you visit our website or contact us.`,
};

const LAST_UPDATED = "July 22, 2026";

export default function PrivacyPage() {
  return (
    <main>
      <section className="section-y">
        <Container className="max-w-2xl space-y-10">
          <header className="space-y-3">
            <MonoLabel>Legal</MonoLabel>
            <h1 className="font-display text-[var(--text-h2)]">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </header>

          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Who we are
              </h2>
              <p>
                {BRAND.name} (“we,” “us,” or “our”) is a web design and
                development studio based in {BRAND.location}. This policy
                explains how we handle information when you visit{" "}
                <span className="text-foreground">strivn.com</span> (the
                “Site”) or contact us about our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Information we collect
              </h2>
              <p>We may collect:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="text-foreground">Contact details</span> you
                  submit through our contact form or email — such as name,
                  email address, business name, and project details.
                </li>
                <li>
                  <span className="text-foreground">
                    Technical and usage data
                  </span>{" "}
                  that browsers and hosting providers typically log — IP
                  address, browser type, pages viewed, and approximate
                  location derived from IP.
                </li>
                <li>
                  <span className="text-foreground">
                    Communications
                  </span>{" "}
                  you send us by email, phone, or other channels.
                </li>
              </ul>
              <p>
                We do not intentionally collect sensitive personal information
                through the Site. Please do not include payment card numbers or
                confidential business data in the contact form.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                How we use information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Respond to inquiries and schedule discovery calls</li>
                <li>Provide, improve, and secure the Site and our services</li>
                <li>Send project-related or follow-up communications you request</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
              <p>
                We do not sell your personal information. We do not use contact
                form submissions for third-party advertising.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                How we store and process leads
              </h2>
              <p>
                Inquiries submitted through the Site may be stored in our CRM
                or project tools (for example, email and Notion) so we can
                follow up. Access is limited to people who need it to respond
                to your request or deliver services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Cookies and analytics
              </h2>
              <p>
                The Site may use essential cookies required for security and
                basic functionality. If we enable analytics (such as privacy-
                conscious or first-party analytics), we use them to understand
                aggregate traffic and improve the Site — not to build
                advertising profiles. You can control cookies through your
                browser settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Retention
              </h2>
              <p>
                We keep contact and project communications for as long as
                needed to respond, deliver services, maintain business records,
                or meet legal requirements. When information is no longer
                needed, we delete or anonymize it where practical.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Sharing
              </h2>
              <p>
                We may share information with service providers who help us
                operate the Site and run our business (hosting, email, form
                processing), under agreements that limit their use of your
                data. We may also disclose information if required by law or to
                protect our rights, users, or the public.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Your choices
              </h2>
              <p>
                You may request access to, correction of, or deletion of
                personal information we hold about you, subject to applicable
                law. To make a request, email{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {BRAND.email}
                </a>
                . We may need to verify your identity before responding.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Children
              </h2>
              <p>
                The Site is directed at business customers and is not intended
                for children under 13. We do not knowingly collect personal
                information from children.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Changes
              </h2>
              <p>
                We may update this policy from time to time. The “Last updated”
                date at the top will change when we do. Continued use of the
                Site after changes means you accept the revised policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-lg text-foreground">
                Contact
              </h2>
              <p>
                Questions about privacy:{" "}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {BRAND.email}
                </a>
                , or use our{" "}
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
