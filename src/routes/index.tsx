import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Scissors,
  MapPin,
  Calendar,
  Clock,
  Phone,
  ChevronRight,
  Sparkles,
  Timer,
  CalendarCheck,
  ShieldCheck,
  Wrench,
  Crown,
  Instagram,
  Mail,
  MessageCircle,
  Star,
  ArrowRight,
  Check,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOR ALL BARBER — Luxury Barbering. On Demand." },
      { name: "description", content: "Premium house-call barber service. Book a professional barber to your home, office, hotel, or event in minutes." },
      { property: "og:title", content: "FOR ALL BARBER — Premium Haircuts. Delivered." },
      { property: "og:description", content: "Luxury house-call barber service. We come to you." },
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
          priceRange: "$$$",
          image: "/og-image.jpg",
        }),
      },
    ],
  }),
  component: Landing,
});

const services = [
  { name: "Signature Haircut", desc: "Precision cut tailored to your style and face shape.", price: "$80", duration: "45 min" },
  { name: "Haircut + Beard", desc: "Full grooming experience with hot towel finish.", price: "$120", duration: "75 min" },
  { name: "Kids Cut", desc: "Patient, expert cuts for the next generation.", price: "$55", duration: "30 min" },
  { name: "VIP House Call", desc: "Premium private session with your dedicated barber.", price: "$200", duration: "90 min" },
  { name: "Event Grooming", desc: "Wedding, photoshoot or red-carpet ready.", price: "$250", duration: "Custom" },
  { name: "Corporate Grooming", desc: "On-site service for executives and teams.", price: "On request", duration: "Flexible" },
];

const steps = [
  { n: "01", title: "Choose Your Service", desc: "Select from our curated grooming menu.", Icon: Scissors },
  { n: "02", title: "Pick A Time", desc: "Same-day or schedule in advance.", Icon: Calendar },
  { n: "03", title: "We Come To You", desc: "Your barber arrives at your location.", Icon: MapPin },
  { n: "04", title: "Get Your Fresh Cut", desc: "Sit back and enjoy the experience.", Icon: Sparkles },
];

const benefits = [
  { Icon: Timer, title: "No Waiting Rooms", desc: "Your time is precious. We respect it." },
  { Icon: MapPin, title: "We Travel To You", desc: "Home. Office. Hotel. Anywhere." },
  { Icon: Wrench, title: "Professional Equipment", desc: "Sterilised, salon-grade tools." },
  { Icon: Clock, title: "On-Time Arrival", desc: "Live tracking from booking to door." },
  { Icon: CalendarCheck, title: "Online Booking", desc: "Confirmed in under 60 seconds." },
  { Icon: Crown, title: "Premium Experience", desc: "Five-star service, every visit." },
];

const reviews = [
  { name: "Marcus T.", role: "Finance Executive", quote: "Best house-call barber service I've used. The convenience is unmatched and the cut is sharper than my old salon." },
  { name: "Daniel R.", role: "Hotel Concierge", quote: "Professional, punctual and worth every cent. My guests are consistently impressed." },
  { name: "Alessandro K.", role: "Creative Director", quote: "Genuinely a luxury experience. Feels like a private barbershop teleported to my apartment." },
  { name: "James W.", role: "Founder", quote: "I haven't stepped into a barbershop in eight months. Why would I?" },
];

const galleryImages = [
  { src: g1, h: "h-72", alt: "Fresh skin fade haircut" },
  { src: g3, h: "h-96", alt: "Barber working in luxury home" },
  { src: g2, h: "h-80", alt: "Beard grooming with razor" },
  { src: g5, h: "h-96", alt: "Well-groomed client in suite" },
  { src: g4, h: "h-64", alt: "Premium barber tools" },
  { src: g6, h: "h-80", alt: "Professional barber portrait" },
];

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-strong py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full border border-white/20 grid place-items-center">
              <Scissors className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] tracking-[0.3em] font-medium">FOR ALL BARBER</span>
          </a>
          <a
            href="#book"
            className="text-[11px] tracking-[0.2em] font-medium px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition"
          >
            BOOK
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-end">
        <img
          src={heroImg}
          alt="Luxury barber giving a haircut in a premium penthouse"
          width={1024}
          height={1536}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

        <div className="relative z-10 w-full px-5 pb-24 pt-32 mx-auto max-w-7xl">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="text-[10px] tracking-[0.25em] text-muted-foreground">AVAILABLE NOW IN YOUR AREA</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-light leading-[0.95] tracking-tight">
              Premium
              <br />
              Haircuts.
              <br />
              <span className="italic text-gradient-silver">Delivered.</span>
            </h1>
            <p className="mt-6 max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
              Book a professional barber to your home, office, hotel, or event in minutes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#book"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition shadow-luxe"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-4 text-sm font-medium tracking-wide hover:bg-white/5 transition"
              >
                View Services
              </a>
            </div>
          </div>

          {/* hero stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "12k+", v: "Cuts delivered" },
              { k: "4.96", v: "Avg. rating" },
              { k: "28 min", v: "Avg. arrival" },
            ].map((s) => (
              <div key={s.v} className="border-l border-white/10 pl-3">
                <div className="text-xl sm:text-2xl font-display">{s.k}</div>
                <div className="text-[10px] tracking-[0.15em] text-muted-foreground uppercase mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-white/5 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex items-center gap-12 px-6 text-xs tracking-[0.3em] text-muted-foreground/70 font-light">
              {["HOME VISITS", "·", "PRIVATE EVENTS", "·", "HOTEL SUITES", "·", "CORPORATE", "·", "WEDDINGS", "·", "PHOTOSHOOTS", "·"].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="py-24 px-5">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Booking</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
            Book In Under <span className="italic">60 Seconds.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Tell us where, when and what. We'll dispatch your barber instantly.
          </p>

          <div className="mt-12 glass-strong rounded-3xl p-6 sm:p-8 shadow-luxe">
            <div className="grid gap-5">
              <Field label="Service">
                <select className="bg-transparent w-full text-foreground outline-none text-base appearance-none">
                  {services.map((s) => (
                    <option key={s.name} className="bg-charcoal text-foreground">
                      {s.name} — {s.price}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Address" icon={<MapPin className="h-4 w-4" />}>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="bg-transparent w-full text-foreground outline-none text-base placeholder:text-muted-foreground/60"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date" icon={<Calendar className="h-4 w-4" />}>
                  <input type="date" className="bg-transparent w-full text-foreground outline-none text-base [color-scheme:dark]" />
                </Field>
                <Field label="Time" icon={<Clock className="h-4 w-4" />}>
                  <input type="time" className="bg-transparent w-full text-foreground outline-none text-base [color-scheme:dark]" />
                </Field>
              </div>
              <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="bg-transparent w-full text-foreground outline-none text-base placeholder:text-muted-foreground/60"
                />
              </Field>
            </div>

            {/* live status */}
            <div className="hairline my-7" />
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1.5">Barber</div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 grid place-items-center text-[10px] font-medium">M</div>
                  <span className="text-sm">Marco D.</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1.5">ETA</div>
                <div className="text-sm">~28 min</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1.5">Total</div>
                <div className="text-sm font-medium">$120.00</div>
              </div>
            </div>

            <button className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition">
              Confirm Booking
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-[11px] text-center text-muted-foreground">
              No charge until your barber arrives. Cancel free up to 1 hr before.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Process</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight max-w-2xl">
            How It Works.
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="group relative overflow-hidden rounded-3xl glass p-7 hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-12">
                  <div className="h-10 w-10 rounded-full bg-white/5 grid place-items-center group-hover:bg-foreground group-hover:text-background transition-colors">
                    <s.Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] text-muted-foreground">{s.n}</span>
                </div>
                <h3 className="text-xl font-display font-light leading-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/30 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-5 relative">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <SectionLabel>Services</SectionLabel>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
                The <span className="italic">Menu.</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Every service tailored to your space, your time, your style.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <article
                key={s.name}
                className="group relative rounded-3xl glass p-7 flex flex-col hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="text-2xl font-display font-light leading-tight">{s.name}</h3>
                  <Scissors className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                <div className="hairline my-6" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">From</span>
                  <span className="text-lg font-display">{s.price}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
                  <span>Duration</span>
                  <span>{s.duration}</span>
                </div>

                <a
                  href="#book"
                  className="mt-6 inline-flex items-center justify-between rounded-full bg-white/5 hover:bg-foreground hover:text-background transition px-5 py-3 text-xs tracking-[0.15em] font-medium"
                >
                  BOOK NOW
                  <ChevronRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Why Us</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight max-w-2xl">
            A standard <span className="italic">above.</span>
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {benefits.map((b) => (
              <div key={b.title} className="bg-background p-8 hover:bg-card transition group">
                <div className="h-12 w-12 rounded-2xl border border-white/10 grid place-items-center mb-5 group-hover:border-white/30 transition">
                  <b.Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-display font-light">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight max-w-2xl">
            The <span className="italic">work.</span>
          </h2>

          <div className="mt-12 columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl group relative`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full ${img.h} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Reviews</SectionLabel>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
            From our <span className="italic">clients.</span>
          </h2>

          <div className="mt-12 relative">
            <div className="glass-strong rounded-3xl p-8 sm:p-12 min-h-[280px]">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <blockquote
                key={reviewIdx}
                className="animate-fade-up text-xl sm:text-2xl md:text-3xl font-display font-light leading-snug"
              >
                "{reviews[reviewIdx].quote}"
              </blockquote>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{reviews[reviewIdx].name}</div>
                  <div className="text-xs text-muted-foreground">{reviews[reviewIdx].role}</div>
                </div>
                <div className="flex gap-1.5">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIdx(i)}
                      aria-label={`Show review ${i + 1}`}
                      className={`h-1 rounded-full transition-all ${
                        i === reviewIdx ? "w-8 bg-foreground" : "w-4 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-5xl relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-background to-onyx" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight">
              Ready when <span className="italic">you are.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Your next cut is one tap away. No waiting rooms. No compromises.
            </p>
            <a
              href="#book"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium tracking-wide hover:bg-foreground/90 transition shadow-luxe"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-16 pb-32 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-full border border-white/20 grid place-items-center">
                  <Scissors className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] tracking-[0.3em] font-medium">FOR ALL BARBER</span>
              </div>
              <p className="text-2xl font-display font-light leading-tight max-w-xs">
                Luxury Barbering. <span className="italic">On Demand.</span>
              </p>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-4">Contact</div>
              <ul className="space-y-3 text-sm">
                <li><a href="tel:+15550000000" className="flex items-center gap-2 hover:text-foreground text-muted-foreground transition"><Phone className="h-4 w-4" /> +1 (555) 000-0000</a></li>
                <li><a href="mailto:hello@forallbarber.com" className="flex items-center gap-2 hover:text-foreground text-muted-foreground transition"><Mail className="h-4 w-4" /> hello@forallbarber.com</a></li>
                <li><a href="https://wa.me/15550000000" className="flex items-center gap-2 hover:text-foreground text-muted-foreground transition"><MessageCircle className="h-4 w-4" /> WhatsApp</a></li>
                <li><a href="https://instagram.com" className="flex items-center gap-2 hover:text-foreground text-muted-foreground transition"><Instagram className="h-4 w-4" /> @forallbarber</a></li>
              </ul>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-4">Book</div>
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-xs tracking-[0.15em] font-medium hover:bg-foreground/90 transition"
              >
                BOOK A BARBER
                <ArrowRight className="h-4 w-4" />
              </a>
              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-3 w-3" /> Free cancellation up to 1 hour</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3" /> Insured & sterilised tools</li>
                <li className="flex items-center gap-2"><Check className="h-3 w-3" /> 100% satisfaction promise</li>
              </ul>
            </div>
          </div>

          <div className="hairline mt-16 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground tracking-wider">
            <span>© {new Date().getFullYear()} FOR ALL BARBER. All rights reserved.</span>
            <span>Crafted for the discerning few.</span>
          </div>
        </div>
      </footer>

      {/* STICKY BOOK BUTTON (mobile) */}
      <a
        href="#book"
        className="fixed bottom-5 left-5 right-20 z-40 sm:hidden inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium tracking-wide shadow-luxe"
      >
        Book Now
        <ArrowRight className="h-4 w-4" />
      </a>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/15550000000"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-emerald-500 text-white grid place-items-center shadow-luxe hover:scale-105 transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="h-px w-6 bg-white/30" />
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">{children}</span>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 hover:border-white/15 focus-within:border-white/30 transition">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
        {icon}
        {label}
      </div>
      {children}
    </label>
  );
}
