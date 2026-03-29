'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Milestone, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { translations } from '@/lib/translations';
import { Logo } from '@/components/logo';
import { LanguageToggle } from '@/components/language-toggle';

const featurePlaceholders = {
  'feature-1': {
    src: "https://picsum.photos/seed/analysis/600/400",
    hint: "data analysis"
  },
  'feature-2': {
    src: "https://picsum.photos/seed/guidance/600/400",
    hint: "checklist guidance"
  },
  'feature-3': {
    src: "https://picsum.photos/seed/document/600/400",
    hint: "document generation"
  }
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language].landing;

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: t.features[0].title,
      description: t.features[0].description,
      img: featurePlaceholders['feature-1'],
    },
    {
      icon: <Milestone className="h-8 w-8 text-primary" />,
      title: t.features[1].title,
      description: t.features[1].description,
      img: featurePlaceholders['feature-2'],
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: t.features[2].title,
      description: t.features[2].description,
      img: featurePlaceholders['feature-3'],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="flex items-center gap-4">
            <LanguageToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">{t.login}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t.getStarted}</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-50%] left-[-20%] h-[200%] w-[150%] animate-[spin_30s_linear_infinite] bg-gradient-to-r from-primary/10 via-background to-background"></div>
            </div>
            <h1 className="text-4xl font-headline font-bold tracking-tight md:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  {t.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tight md:text-4xl">
                {t.featuresTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {t.featuresSubtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                    {feature.icon}
                    <div className="flex-1">
                      <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                   <div className="mt-auto aspect-video w-full">
                    <Image
                      src={feature.img.src}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                      data-ai-hint={feature.img.hint}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="rounded-lg bg-primary p-12 text-center text-primary-foreground shadow-lg">
                    <h2 className="text-3xl font-bold font-headline">{t.cta.title}</h2>
                    <p className="mx-auto mt-4 max-w-xl">{t.cta.subtitle}</p>
                    <Button variant="secondary" size="lg" className="mt-8" asChild>
                        <Link href="/signup">{t.cta.button}</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NyaySahayak. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
