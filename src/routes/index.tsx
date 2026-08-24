import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Scissors,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Sparkles,
  Timer,
  CalendarCheck,
  Wrench,
  Crown,
  Instagram,
  Mail,
  MessageCircle,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { defaultBarber } from "@/lib/barbers";
import { distanceService } from "@/lib/distance";
import { calculateQuote, formatZAR } from "@/lib/pricing";

import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import c9 from "@/assets/client-9.jpg.asset.json";
import c10 from "@/assets/client-10.jpg.asset.json";
import c12 from "@/assets/client-12.jpg.asset.json";
import c13 from "@/assets/client-13.jpg.asset.json";
import c17 from "@/assets/client-17.jpg.asset.json";
import c18 from "@/assets/client-18.jpg.asset.json";
import c19 from "@/assets/client-19.jpg.asset.json";
import c20 from "@/assets/client-20.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOR ALL BARBER — Luxury Barbering. On Demand." },
      { name: "description", content: "Premium house-call barber service. Book a professional barber to your home, office, hotel, or event in minutes." },
      { property: "og:title", content: "FOR ALL BARBER — Premium Haircuts. Delivered." },
      { property: "og:description", content: "Luxury house-call barber service. We come to you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "FOR ALL BARBER",
          description: "Luxury house-call barber service",
          priceRange: "$$",
        }),
      },
    ],
  }),
  component: Landing,
});

const services = [
  { name: "Chiskop", desc: "Clean buzz cut.", price: "R30", duration: "20 min" },
  { name: "Razor Chiskop", desc: "Ultra-close razor finish.", price: "R40", duration: "25 min" },
  { name: "Trimming", desc: "Neat shape-up.", price: "R20", duration: "15 min" },
  { name: "Brush", desc: "Wash and style.", price: "R40", duration: "25 min" },
  { name: "Standard Fade", desc: "Classic fade, crisp lines.", price: "R60", duration: "35 min" },
  { name: "Fade with Powder", desc: "Matte, smooth finish.", price: "R80", duration: "40 min" },
  { name: "Fade with Black Spray", desc: "Deeper, fuller tone.", price: "R100", duration: "45 min" },
  { name: "Fade with Dye", desc: "Bold colour, expert blend.", price: "R150", duration: "50 min" },
  { name: "Fade with Dye & Design", desc: "Colour fade + hair art.", price: "R200", duration: "60 min" },
  { name: "Colour Dye", desc: "Full-head colour.", price: "R200", duration: "55 min" },
  { name: "Fade with Colour Dye", desc: "Fade paired with colour.", price: "R250", duration: "65 min" },
  { name: "Fade with Colour Dye + Design", desc: "Bespoke premium finish.", price: "R300", duration: "75 min" },
];

const steps = [
  { n: "01", title: "Choose", desc: "Pick your service.", Icon: Scissors },
  { n: "02", title: "Schedule", desc: "Today or later.", Icon: Calendar },
  { n: "03", title: "We travel", desc: "To your door.", Icon: MapPin },
  { n: "04", title: "Fresh cut", desc: "Sit back.", Icon: Sparkles },
];

const benefits = [
  { Icon: Timer, title: "No waiting rooms" },
  { Icon: MapPin, title: "We travel to you" },
  { Icon: Wrench, title: "Sterilised tools" },
  { Icon: Clock, title: "On-time arrival" },
  { Icon: CalendarCheck, title: "60-second booking" },
  { Icon: Crown, title: "Five-star service" },
];

const reviews = [
  { name: "Marcus T.", role: "Finance Executive", quote: "Sharper than my old salon, and it comes to me." },
  { name: "Daniel R.", role: "Hotel Concierge", quote: "Professional, punctual, worth every cent." },
  { name: "Alessandro K.", role: "Creative Director", quote: "A private barbershop teleported to my apartment." },
];

const galleryImages = [
  { src: c20.url, h: "h-72", alt: "Signature hair design and skin fade" },
  { src: c12.url, h: "h-96", alt: "Fresh line-up with steam finish" },
  { src: c13.url, h: "h-80", alt: "Custom colour and precision fade" },
  { src: c18.url, h: "h-96", alt: "Bespoke hair art design" },
  { src: c9.url, h: "h-64", alt: "Client after tapered cut" },
  { src: c17.url, h: "h-80", alt: "Signature hair tattoo detail" },
  { src: c19.url, h: "h-72", alt: "Clean bald fade with design" },
  { src: c10.url, h: "h-80", alt: "Relaxed client post-service" },
];

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [distanceLoading, setDistanceLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, []);

  // Debounced (mock) distance lookup — swaps cleanly for a real API later.
  useEffect(() => {
    const trimmed = address.trim();
    if (trimmed.length < 4) {
      setDistanceKm(null);
      setDistanceLoading(false);
      return;
    }
    setDistanceLoading(true);
    let cancelled = false;
    const timer = setTimeout(async () => {
      const res = await distanceService.getDistance({
        barber: defaultBarber,
        destinationAddress: trimmed,
      });
      if (cancelled) return;
      setDistanceKm(res.distanceKm);
      setDistanceLoading(false);
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [address]);

  const quote = useMemo(
    () =>
      selectedService && distanceKm != null
        ? calculateQuote({ barber: defaultBarber, servicePrice: selectedService.price, distanceKm })
        : null,
    [selectedService, distanceKm],
  );

  const canAdvance = step === 0 ? !!selectedService : step === 1 ? !!quote?.withinServiceArea && !!date && !!time : true;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong py-3" : "py-5"}`}>
        <div className="mx-auto max-w-6xl px-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full border border-white/20 grid place-items-center">
              <Scissors className="h-3.5 w-3.5" />
            </div>
            <span className="truncate text-[11px] tracking-[0.3em] font-medium">FOR ALL BARBER</span>
          </a>
          <a href="#book" className="shrink-0 text-[11px] tracking-[0.2em] font-medium px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition">
            BOOK
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] flex items-end">
        <video
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Barber at work"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

        <div className="relative z-10 w-full px-5 pb-16 pt-32 mx-auto max-w-6xl">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground">AVAILABLE NOW IN YOUR AREA</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] tracking-tight">
              Premium
              <br />
              Haircuts.
              <br />
              <span className="italic text-gradient-silver">Delivered.</span>
            </h1>
            <p className="mt-5 max-w-sm text-base text-muted-foreground leading-relaxed">
              A professional barber to your home, office, hotel or event — in minutes.
            </p>

            <a
              href="#book"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition shadow-luxe"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "12k+", v: "Cuts" },
              { k: "4.96", v: "Rating" },
              { k: "28 min", v: "Arrival" },
            ].map((s) => (
              <div key={s.v} className="border-l border-white/10 pl-3">
                <div className="text-xl font-display">{s.k}</div>
                <div className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — compact row */}
      <section className="border-y border-white/5 py-8 px-5">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((s) => (
            <div key={s.n} className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-white/5 grid place-items-center">
                <s.Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground">{s.n}</div>
                <div className="truncate text-sm font-display">{s.title}</div>
                <div className="truncate text-[11px] text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING — one decision at a time */}
      <section id="book" className="py-16 px-5">
        <div className="mx-auto max-w-2xl">
          <SectionLabel>Booking</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">
            Book in under <span className="italic">60 seconds.</span>
          </h2>

          {/* progress */}
          <div className="mt-8 flex items-center gap-2">
            {["Service", "Details", "Confirm"].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-[3px] rounded-full transition-all duration-500 ${i <= step ? "bg-gold-hex" : "bg-white/10"}`} />
                <div className={`mt-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${i === step ? "text-gold-hex" : "text-muted-foreground"}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-matte border border-border-subtle rounded-[18px] p-5 sm:p-6 shadow-luxe">
            {step === 0 && (
              <div key="s0" className="animate-fade-up grid gap-3">
                {services.map((s) => {
                  const selected = selectedService?.name === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => {
                        setSelectedService(s);
                        setStep(1);
                      }}
                      className={`group relative w-full text-left rounded-[18px] bg-card-charcoal border px-4 py-3.5 transition-all duration-200 ease-out ${
                        selected ? "border-gold-hex shadow-[0_0_40px_-14px_#D4AF37]" : "border-border-subtle hover:-translate-y-[2px] hover:border-white/20"
                      }`}
                    >
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-base font-display font-medium">{s.name}</div>
                          <div className="truncate text-[12px] text-muted-foreground mt-0.5">
                            {s.desc} · {s.duration}
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <span className={`text-lg font-display font-medium ${selected ? "text-gold-hex" : ""}`}>{s.price}</span>
                          <span
                            className={`h-6 w-6 rounded-full grid place-items-center border transition ${
                              selected ? "border-gold-hex/40 bg-gold-hex/10" : "border-white/10"
                            }`}
                          >
                            {selected && <Check className="h-3.5 w-3.5 text-gold-hex" />}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <div key="s1" className="animate-fade-up grid gap-4">
                <SelectedPill service={selectedService!} onChange={() => setStep(0)} />
                <Field label="Address" icon={<MapPin className="h-4 w-4" />}>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Where should we come?"
                    className="bg-transparent w-full text-foreground outline-none text-base placeholder:text-muted-foreground/60"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Date" icon={<Calendar className="h-4 w-4" />}>
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="bg-transparent w-full text-foreground outline-none text-base [color-scheme:dark]" />
                  </Field>
                  <Field label="Time" icon={<Clock className="h-4 w-4" />}>
                    <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="bg-transparent w-full text-foreground outline-none text-base [color-scheme:dark]" />
                  </Field>
                </div>
                <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="+27 00 000 0000"
                    className="bg-transparent w-full text-foreground outline-none text-base placeholder:text-muted-foreground/60"
                  />
                </Field>
                <TravelNote address={address} distanceKm={distanceKm} loading={distanceLoading} quote={quote} />
              </div>
            )}

            {step === 2 && (
              <div key="s2" className="animate-fade-up grid gap-4">
                <SelectedPill service={selectedService!} onChange={() => setStep(0)} />
                <PricingSummary
                  serviceName={selectedService!.name}
                  servicePriceLabel={selectedService!.price}
                  address={address}
                  distanceKm={distanceKm}
                  loading={distanceLoading}
                  quote={quote}
                  barberName={defaultBarber.name}
                />
                <div className="text-[12px] text-muted-foreground">
                  {date && time ? `${date} at ${time}` : "Time to be confirmed"} · {address || "No address"}
                </div>
              </div>
            )}

            {/* nav */}
            <div className="mt-6 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground hover:border-white/25 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <button
                type="button"
                disabled={!canAdvance}
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-foreground/90 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {step === 2 ? "Confirm Booking" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-[11px] text-center text-muted-foreground">No charge until your barber arrives.</p>
          </div>
        </div>
      </section>

      {/* WHY US — compact landscape grid */}
      <section className="py-14 px-5">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Why us</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background px-5 py-6 flex min-w-0 items-center gap-3 hover:bg-card transition">
                <b.Icon className="h-4 w-4 shrink-0 text-gold-hex" />
                <span className="truncate text-sm">{b.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-14 px-5">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight leading-tight">
            The <span className="italic">work.</span>
          </h2>
          <div className="mt-8 columns-2 lg:columns-3 gap-3 [column-fill:_balance]">
            {galleryImages.map((img, i) => (
              <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-2xl group relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full ${img.h} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-14 px-5">
        <div className="mx-auto max-w-3xl glass-strong rounded-3xl p-7 sm:p-10">
          <div className="flex gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-foreground text-foreground" />
            ))}
          </div>
          <blockquote key={reviewIdx} className="animate-fade-up text-xl sm:text-2xl font-display font-light leading-snug">
            "{reviews[reviewIdx].quote}"
          </blockquote>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{reviews[reviewIdx].name}</div>
              <div className="truncate text-xs text-muted-foreground">{reviews[reviewIdx].role}</div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  aria-label={`Show review ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${i === reviewIdx ? "w-8 bg-foreground" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-12 pb-32 px-5">
        <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 shrink-0 rounded-full border border-white/20 grid place-items-center">
                <Scissors className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] tracking-[0.3em] font-medium">FOR ALL BARBER</span>
            </div>
            <p className="text-xl font-display font-light leading-tight">
              Luxury Barbering. <span className="italic">On Demand.</span>
            </p>
          </div>
          <ul className="space-y-2.5 text-sm sm:justify-self-end">
            <li><a href="tel:+27000000000" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"><Phone className="h-4 w-4" /> +27 00 000 0000</a></li>
            <li><a href="mailto:hello@forallbarber.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"><Mail className="h-4 w-4" /> hello@forallbarber.com</a></li>
            <li><a href="https://wa.me/27000000000" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"><MessageCircle className="h-4 w-4" /> WhatsApp</a></li>
            <li><a href="https://instagram.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"><Instagram className="h-4 w-4" /> @forallbarber</a></li>
          </ul>
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="hairline mt-10 mb-5" />
          <div className="text-[11px] text-muted-foreground tracking-wider">© {new Date().getFullYear()} FOR ALL BARBER.</div>
        </div>
      </footer>

      {/* STICKY BOOK (mobile) */}
      <a
        href="#book"
        className="fixed bottom-5 left-5 right-20 z-40 sm:hidden inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium tracking-wide shadow-luxe"
      >
        Book Now
        <ArrowRight className="h-4 w-4" />
      </a>

      <a
        href="https://wa.me/27000000000"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-emerald-500 text-white grid place-items-center shadow-luxe hover:scale-105 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function SelectedPill({ service, onChange }: { service: (typeof services)[number]; onChange: () => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border border-gold-hex/30 bg-gold-hex/[0.06] px-4 py-3">
      <div className="min-w-0">
        <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Service</div>
        <div className="truncate text-sm font-display">
          {service.name} · {service.price}
        </div>
      </div>
      <button type="button" onClick={onChange} className="shrink-0 text-[11px] tracking-[0.15em] uppercase text-gold-hex">
        Change
      </button>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="h-px w-6 bg-white/30" />
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{children}</span>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 hover:border-white/15 focus-within:border-gold-hex/40 transition">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
        {icon}
        {label}
      </div>
      {children}
    </label>
  );
}

function TravelNote({
  address,
  distanceKm,
  loading,
  quote,
}: {
  address: string;
  distanceKm: number | null;
  loading: boolean;
  quote: ReturnType<typeof calculateQuote> | null;
}) {
  const hasAddress = address.trim().length >= 4;
  if (!hasAddress) return <p className="text-[12px] text-muted-foreground">Travel fee is calculated from your address.</p>;
  if (loading || distanceKm == null) return <p className="text-[12px] text-muted-foreground">Calculating distance…</p>;
  if (quote && !quote.withinServiceArea)
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive-foreground animate-fade-up">
        Sorry, this location is outside our service area.
      </div>
    );
  return (
    <p className="text-[12px] text-muted-foreground animate-fade-up">
      {distanceKm} km away · travel fee {quote ? formatZAR(quote.travelFee) : "—"}
    </p>
  );
}

function PricingSummary({
  serviceName,
  servicePriceLabel,
  address,
  distanceKm,
  loading,
  quote,
  barberName,
}: {
  serviceName: string;
  servicePriceLabel: string;
  address: string;
  distanceKm: number | null;
  loading: boolean;
  quote: ReturnType<typeof calculateQuote> | null;
  barberName: string;
}) {
  const hasAddress = address.trim().length >= 4;
  const outOfArea = quote && !quote.withinServiceArea;

  return (
    <div className="rounded-[18px] bg-card-charcoal border border-border-subtle p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Summary</div>
        <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{barberName}</div>
      </div>

      <div className="space-y-3 text-sm">
        <Row label="Service" sub={serviceName} value={servicePriceLabel} />
        <div className="hairline" />
        <Row
          label="Travel"
          sub={
            !hasAddress
              ? "Enter your address"
              : loading || distanceKm == null
                ? "Calculating…"
                : outOfArea
                  ? `${distanceKm} km — outside area`
                  : `${distanceKm} km × R${quote!.perKmRate} + R${quote!.baseCalloutFee}`
          }
          value={quote && quote.withinServiceArea ? formatZAR(quote.travelFee) : loading ? "…" : "—"}
        />
        <div className="hairline" />
        <div className="flex items-end justify-between pt-1">
          <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Total</div>
          <div key={quote?.total ?? "pending"} className="text-3xl font-display font-medium text-gold-hex animate-fade-up">
            {quote && quote.withinServiceArea ? formatZAR(quote.total) : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, sub, value }: { label: string; sub?: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
      <div className="min-w-0">
        <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</div>
        {sub && <div className="text-sm text-foreground/90 mt-1 truncate">{sub}</div>}
      </div>
      <div className="text-base font-display font-medium text-foreground shrink-0">{value}</div>
    </div>
  );
}
