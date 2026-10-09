import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Compass, MousePointer2, Search, Sparkles } from "lucide-react";

import { IndustryExplorer } from "@/components/sections/industries/industry-explorer";
import { Container } from "@/components/shared/container";
import { StrivnButton } from "@/components/shared/strivn-button";
import { getIndustriesByTier } from "@/lib/industries";

import styles from "@/components/sections/industries/industries.module.css";

export const metadata: Metadata = {
  title: "Websites built around your business — Strivn Industries",
  description: "Custom websites for restaurants, practices, and local businesses. Explore our approach to menus, ordering, bookings, and inquiries, with ongoing website care.",
};

const partnership = [
  { title: "Define the win.", body: "We start with the customers you want, the work you want more of, and what your website needs to help make happen.", deliverable: "Your goals → a focused plan" },
  { title: "Build the confidence.", body: "We shape the design, page structure, and content around what your customers need to see, understand, and believe.", deliverable: "Your expertise → a reason to choose you" },
  { title: "Connect the next step.", body: "We build and check the agreed contact, booking, or purchase path, so interest has somewhere useful to go.", deliverable: "Customer interest → a clear action" },
  { title: "Keep it working.", body: "Optional care plans give you a team for hosting, maintenance, and included edits as your services and priorities change.", deliverable: "A live website → ongoing support" },
];

export default function IndustriesPage() {
  const industries = getIndustriesByTier(1);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="industries-title">
        <Container>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><span className={styles.smallCross} aria-hidden="true">+</span> Built around your business</p>
              <h1 id="industries-title" className={styles.heroTitle}>Your business.<br /><span className="text-orange-gradient">Its next chapter.</span></h1>
              <p className={styles.heroDescription}>A booked consultation. A signed project. A new customer. Your website should help move your business toward what comes next.</p>
              <p className={styles.heroDetail}>We bring strategy, design, and development together around the people you serve and the decisions that make them choose you.</p>
              <div className={styles.heroActions}>
                <StrivnButton arrow asChild><Link scroll={false} href="/book">Let’s talk about your goals</Link></StrivnButton>
                <a href="#find-your-industry" className={styles.textLink}>Find your industry <ArrowDown size={16} aria-hidden="true" /></a>
              </div>
            </div>

            <div className={styles.journeyVisual} aria-label="A website’s role: help customers find you, trust you, and take the next step">
              <div className={styles.visualHeading}><span className={styles.eyebrow}>The website’s job</span><Compass size={20} strokeWidth={1.25} aria-hidden="true" /></div>
              <p className={styles.visualTitle}>From curious<br />to committed.</p>
              <ol className={styles.journeySteps}>
                <li className={styles.journeyStep}>
                  <span className={styles.stepIcon}><Search size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <div><span className={styles.stepLabel}>01 / Get discovered</span><p>“This is what I’m looking for.”</p></div>
                </li>
                <li className={styles.journeyStep}>
                  <span className={styles.stepIcon}><Sparkles size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <div><span className={styles.stepLabel}>02 / Earn their confidence</span><p>“These are my kind of people.”</p></div>
                </li>
                <li className={styles.journeyStep}>
                  <span className={styles.stepIcon}><MousePointer2 size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <div><span className={styles.stepLabel}>03 / Make action easy</span><p>“Let’s make it happen.”</p></div>
                </li>
              </ol>
              <div className={styles.visualOutcome}><Check size={18} aria-hidden="true" /><span>A clear path to your next customer.</span></div>
            </div>
          </div>
          <div className={styles.heroFootnote}><span>Local businesses. Real ambitions.</span><span>Strategy <i>/</i> Design <i>/</i> Development <i>/</i> Care</span></div>
        </Container>
      </section>

      <section id="find-your-industry" className={styles.industrySection} aria-labelledby="industry-heading">
        <Container>
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / Your business, understood</p><h2 id="industry-heading">Different businesses.<br /><span className="text-orange-gradient">Different reasons to say yes.</span></h2></div>
            <p>A new patient and a future homeowner need different things to feel ready. We build around the moments that matter to your customers.</p>
          </div>
          <IndustryExplorer industries={industries.map(({ slug, shortName }) => ({ slug, name: shortName }))}>
            {industries.map((industry, index) => (
              <article key={industry.slug} aria-labelledby={`heading-${industry.slug}`}>
                <div className={styles.industryMeta}><p className={styles.eyebrow}>{industry.name}</p><span className={styles.industryCount}>{String(index + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}</span></div>
                <h3 id={`heading-${industry.slug}`} className={styles.industryTitle}>{industry.headline}</h3>
                <p className={styles.industryDecision}>{industry.decision}</p>
                <p className={styles.approachLabel}>How Strivn helps move things forward</p>
                <div className={styles.approachGrid}>
                  {industry.approach.map((move, moveIndex) => (
                    <div key={move.title} className={styles.approachItem}>
                      <span className={styles.approachNumber} aria-hidden="true">{String(moveIndex + 1).padStart(2, "0")}</span>
                      <h4>{move.title}</h4><p>{move.description}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.businessOutcome}>
                  <ol aria-label="Your customer’s path" className={styles.customerPath}>
                    {industry.journey.map((step, stepIndex) => <li key={step}>{stepIndex > 0 && <ArrowRight size={14} aria-hidden="true" />}<span>{step}</span></li>)}
                  </ol>
                  <div className={styles.outcomeGoal}><div><span className={styles.eyebrow}>What we’re building toward</span><p>{industry.goal}</p></div><ArrowUpRight size={28} strokeWidth={1.3} aria-hidden="true" /></div>
                </div>
                {industry.caseStudy && (
                  <div className={styles.industryProject}>
                    <Image
                      src={industry.caseStudy.image}
                      alt={industry.caseStudy.imageAlt}
                      width={1440}
                      height={765}
                      sizes="(max-width: 800px) 90vw, 30vw"
                      className={styles.industryProjectImage}
                    />
                    <div>
                      <p className={styles.eyebrow}>See the work</p>
                      <h4>{industry.caseStudy.title}</h4>
                      <p className={styles.industryProjectDescription}>{industry.caseStudy.description}</p>
                      <Link scroll={false} href={industry.caseStudy.href} className={styles.textLink}>Explore the restaurant website <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </div>
                  </div>
                )}
                {industry.ongoingSupport && (
                  <div className={styles.industryCare}>
                    <p className={styles.eyebrow}>After launch</p>
                    <h4>{industry.ongoingSupport.title}</h4>
                    <p>{industry.ongoingSupport.description}</p>
                    <div className={styles.closingActions}>
                      <StrivnButton arrow asChild><Link scroll={false} href="/book">Let’s talk about your restaurant</Link></StrivnButton>
                      <Link scroll={false} href="/pricing#care" className={styles.textLink}>Explore monthly care <ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </IndustryExplorer>
          <p className={styles.scopeNote}>The right features start with the right plan. Pages, content, integrations, and ongoing support are agreed in your project scope.</p>
        </Container>
      </section>

      <section className={`dark void ${styles.partnership}`} aria-labelledby="partnership-heading">
        <Container>
          <div className={styles.partnershipHeading}>
            <div><p className={styles.eyebrow}>02 / A team behind the website</p><h2 id="partnership-heading">From the planning board<br />to the next <span className="text-orange-gradient">“yes.”</span></h2></div>
            <p>You know your business. We help translate it into a website with purpose, connecting the big picture to the details that move a customer forward.</p>
          </div>
          <ol className={styles.partnershipSteps}>
            {partnership.map((step, index) => (
              <li key={step.title}><div className={styles.partnershipNumber}><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight size={20} strokeWidth={1.3} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.body}</p><span className={styles.deliverable}>{step.deliverable}</span></li>
            ))}
          </ol>
          <div className={styles.partnershipFooter}>
            <Link scroll={false} href="/process" className={styles.textLink}>Get to know our process <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link scroll={false} href="/work/sahara-grill" className={styles.projectLink}><span>See the thinking in practice</span><strong>Sahara Grill <ArrowUpRight size={16} aria-hidden="true" /></strong><span>A menu-forward path to online ordering.</span></Link>
          </div>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="closing-heading">
        <Container className={styles.closingGrid}>
          <div><p className={styles.eyebrow}>03 / Let’s build what’s next</p><h2 id="closing-heading">What should your website<br /><span className="text-orange-gradient">make possible?</span></h2></div>
          <div className={styles.closingCopy}><p>Tell us where you want your business to go. We’ll talk through what your website needs to do to help you get there.</p><div className={styles.closingActions}><StrivnButton arrow asChild><Link scroll={false} href="/book">Talk through your project</Link></StrivnButton><Link scroll={false} href="/pricing" className={styles.textLink}>Explore pricing <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>
        </Container>
      </section>
    </main>
  );
}
