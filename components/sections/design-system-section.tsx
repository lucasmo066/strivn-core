import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/shared/container";
import { MonoLabel } from "@/components/shared/mono-label";
import { StrivnButton } from "@/components/shared/strivn-button";
import { StatusChip } from "@/components/hud/status-chip";
import {
  HairlineCard,
  HairlineCardContent,
  HairlineCardDescription,
  HairlineCardHeader,
  HairlineCardTitle,
} from "@/components/surfaces/hairline-card";
import { VALUE_WORDS } from "@/lib/constants";

export function DesignSystemSection() {
  return (
    <section id="services" className="section-y border-b border-border">
      <Container className="space-y-10">
        <div className="space-y-3">
          <MonoLabel>Hairline OS · Design system</MonoLabel>
          <h2 className="font-display text-[var(--text-h2)]">
            Calm to read. Sharp to operate.
          </h2>
          <p className="max-w-2xl font-ui text-muted-foreground">
            Monochrome ink-on-paper with orange used only where it earns a
            click. Borders define depth — no shadows, no filler.
          </p>
        </div>

        <Tabs defaultValue="components" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <HairlineCard brackets>
                <HairlineCardHeader>
                  <HairlineCardTitle>Buttons</HairlineCardTitle>
                  <HairlineCardDescription>
                    Primary CTA uses orange. Everything else stays ink.
                  </HairlineCardDescription>
                </HairlineCardHeader>
                <HairlineCardContent className="flex flex-wrap gap-2">
                  <StrivnButton variant="primary" arrow>
                    Primary
                  </StrivnButton>
                  <StrivnButton variant="outline">Outline</StrivnButton>
                  <StrivnButton variant="ghost">Ghost</StrivnButton>
                </HairlineCardContent>
              </HairlineCard>

              <HairlineCard brackets accentBrackets>
                <HairlineCardHeader>
                  <HairlineCardTitle>HUD</HairlineCardTitle>
                  <HairlineCardDescription>
                    Pixel tier for status and metadata only.
                  </HairlineCardDescription>
                </HairlineCardHeader>
                <HairlineCardContent className="flex flex-wrap items-center gap-2">
                  <StatusChip>[ LVL 07 ]</StatusChip>
                  <Badge variant="outline">Badge</Badge>
                </HairlineCardContent>
              </HairlineCard>

              <HairlineCard>
                <HairlineCardHeader>
                  <HairlineCardTitle>Forms</HairlineCardTitle>
                  <HairlineCardDescription>
                    Command-menu aesthetic for inputs.
                  </HairlineCardDescription>
                </HairlineCardHeader>
                <HairlineCardContent className="space-y-3">
                  <Input placeholder="your@email.com" />
                  <div className="flex items-center justify-between">
                    <MonoLabel>Retainer updates</MonoLabel>
                    <Switch />
                  </div>
                </HairlineCardContent>
              </HairlineCard>
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="mt-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Paper", token: "--paper", swatch: "#F8F7F4" },
                { name: "Ink", token: "--ink", swatch: "#0A0A0A" },
                { name: "Orange", token: "--orange", swatch: "#FF5C00" },
                { name: "Void", token: "--void", swatch: "#0A0A0A" },
              ].map((color) => (
                <HairlineCard key={color.token}>
                  <HairlineCardContent className="space-y-2 pt-4">
                    <div
                      className="h-10 rounded-md border border-border"
                      style={{ backgroundColor: color.swatch }}
                    />
                    <p className="font-ui text-sm font-medium">{color.name}</p>
                    <p className="font-ui text-xs text-muted-foreground">
                      {color.token}
                    </p>
                  </HairlineCardContent>
                </HairlineCard>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {VALUE_WORDS.map((word) => (
                <Badge key={word} variant="secondary">
                  {word}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
