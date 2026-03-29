import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4 md:p-8">
        <div className="absolute top-8 left-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <Image
          src="https://picsum.photos/seed/courthouse/1000/1200"
          alt="A modern and grand courthouse building facade"
          fill
          className="object-cover"
          data-ai-hint="court building"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-blue-500/10" />
      </div>
    </div>
  );
}
