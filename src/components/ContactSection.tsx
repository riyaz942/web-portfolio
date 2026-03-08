export default function ContactSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-24 px-8 relative z-20 rounded-t-[2.5rem] md:rounded-t-[4rem] border-t border-white/5 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] overflow-hidden"
      style={{ marginTop: "-100vh" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] to-background -z-10" />
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-8 tracking-tight">
          Contact
        </h2>
        <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted max-w-xl mx-auto leading-relaxed">
          Let&apos;s create something amazing together.
        </p>
      </div>
    </section>
  );
}
