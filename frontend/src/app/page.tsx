import { getLocale, pageMetadata } from "@/lib/i18n";
import { Hero } from "@/components/landing/hero";
import { VslIntroduction, Challenges } from "@/components/landing/introduction";
import { OriginStory, Journey } from "@/components/landing/story";
import { Community } from "@/components/landing/community";

export async function generateMetadata() {
  return pageMetadata("home");
}
export default async function Home() {
  const locale = await getLocale();
  return (
    <main id="main">
      <Hero locale={locale} />
      <VslIntroduction locale={locale} />
      <Challenges locale={locale} />
      <OriginStory locale={locale} />
      <Journey locale={locale} />
      <Community locale={locale} />
    </main>
  );
}
