import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <h1 className="text-[clamp(4rem,12vw,8rem)] font-bold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
          404
        </span>
      </h1>
      <p className="mt-4 text-lg text-foreground/80">
        This page doesn&apos;t exist — or it wandered off.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-accent/40 px-6 py-3 text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent/10"
      >
        Back to home
      </Link>
    </main>
  );
}
