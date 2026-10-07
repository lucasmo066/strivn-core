import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { PackageRequest } from "@/components/sections/pricing/package-request";
import { BUILD_PACKAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Choose your package — Strivn",
  description: "Choose a website package and share your project details. Start with a written scope, without booking a sales call first.",
};

export default async function StartPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const requested = (await searchParams).package;
  const selected = BUILD_PACKAGES.find((pkg) => pkg.name.toLowerCase() === requested)?.name ?? "Starter";
  return (
    <main className="pt-8 pb-20 sm:pt-12 sm:pb-28">
      <Container>
        <Link scroll={false} href="/pricing" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" aria-hidden />Back to pricing</Link>
        <header className="mt-8 max-w-2xl">
          <MonoLabel className="text-orange">Start with a package</MonoLabel>
          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] leading-tight">Your project.<br /><span className="text-orange-gradient">Your first step.</span></h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">Choose a package and tell us what you have in mind. We’ll confirm the scope and next steps by email. No sales call required to send a request.</p>
        </header>
        <PackageRequest initialPackage={selected} />
      </Container>
    </main>
  );
}
