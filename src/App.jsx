import { useState, useEffect, useRef } from "react";

/* ── Font loader ── */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* ── Custom cursor ── */
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block top-0 left-0 fixed bg-white rounded-full w-2 h-2 pointer-events-none"
        style={{ zIndex: 100, willChange: "transform" }}
      />
      <div
        ref={followerRef}
        className="hidden md:block top-0 left-0 fixed border border-white/30 rounded-full w-8 h-8 transition-transform duration-100 pointer-events-none"
        style={{ zIndex: 99, willChange: "transform" }}
      />
    </>
  );
}

/* ── Scroll reveal with better easing ── */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
            entry.target.style.filter = "blur(0px)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px) scale(0.98)";
      el.style.filter = "blur(4px)";
      el.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${el.dataset.delay || "0s"}, transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${el.dataset.delay || "0s"}, filter 0.8s ease ${el.dataset.delay || "0s"}`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

/* ── DATA ── */
const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Landing Page",
    desc: "High-converting landing pages that turn visitors into customers. Fully responsive and SEO-optimized.",
    price: "Starting Rp 500K",
    gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
    border: "hover:border-indigo-500/40",
    tag: "bg-indigo-500/10 text-indigo-300",
    features: ["SEO Ready", "Mobile First", "Analytics"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Brand Identity",
    desc: "Complete brand systems including logos, color palettes, and guidelines that make your brand unforgettable.",
    price: "Starting Rp 300K",
    gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
    border: "hover:border-rose-500/40",
    tag: "bg-rose-500/10 text-rose-300",
    features: ["Logo Design", "Color System", "Typography"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Social Media",
    desc: "Engaging content strategies and templates that build trust and drive meaningful engagement.",
    price: "Starting Rp 200K",
    gradient: "from-cyan-500/10 via-teal-500/5 to-transparent",
    border: "hover:border-cyan-500/40",
    tag: "bg-cyan-500/10 text-cyan-300",
    features: ["Content Calendar", "Custom Templates", "Analytics"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Growth Package",
    desc: "Complete digital solution: website, branding, and content strategy all in one powerful package.",
    price: "Starting Rp 900K",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    border: "hover:border-amber-500/40",
    tag: "bg-amber-500/10 text-amber-300",
    features: ["Everything Included", "Priority Support", "Strategy Call"],
  },
];

const steps = [
  { num: "01", title: "Discovery Call", desc: "Share your vision and goals. We listen and craft the perfect strategy for your business." },
  { num: "02", title: "Design & Development", desc: "Our team brings ideas to life with regular updates and feedback loops." },
  { num: "03", title: "Review & Refine", desc: "Unlimited revisions until every pixel meets your expectations." },
  { num: "04", title: "Launch & Grow", desc: "Go live with confidence and watch your business transform." },
];

const testimonials = [
  { stars: 5, text: "The team transformed our online presence completely. Our conversion rate doubled within a month of launching the new site.", name: "Sarah Chen", role: "Founder, Bloom Cosmetics", emoji: "🌟", image: "https://i.pravatar.cc/100?img=1" },
  { stars: 5, text: "Working with them was seamless. They understood our brand vision and delivered beyond expectations. Highly recommended!", name: "Michael Rodriguez", role: "Creative Director", emoji: "🎨", image: "https://i.pravatar.cc/100?img=2" },
  { stars: 5, text: "The attention to detail and commitment to quality is unmatched. Best investment we made for our digital presence.", name: "Emma Watson", role: "CEO, TechStart", emoji: "💼", image: "https://i.pravatar.cc/100?img=3" },
];

/* ── NAVBAR ── */
const navLinks = [
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Testimonials", id: "testimonials" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [...navLinks.map(l => l.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.3 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6 lg:px-8 py-5 max-w-6xl">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group relative font-bold text-2xl tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-white">YUMY</span>
          <span className="bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-transparent">/PROJECT</span>
          <div className="-bottom-1 left-0 absolute bg-linear-to-r from-indigo-400 to-purple-400 w-0 group-hover:w-full h-0.5 transition-all duration-300" />
        </button>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                onMouseEnter={() => setHoveredLink(id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-2 font-medium text-sm tracking-wide transition-colors duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  active === id ? "text-white" : "text-white/40 hover:text-white/80"
                }`}>
                  {label}
                </span>
                {(active === id || hoveredLink === id) && (
                  <span className="bottom-0 absolute inset-x-0 bg-linear-to-r from-indigo-400 to-purple-400 rounded-full h-0.5 transition-all duration-300" />
                )}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo("contact")}
              className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full overflow-hidden font-medium text-sm hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="z-10 relative text-white">Start Project</span>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </li>
        </ul>

        <button
          className="md:hidden text-white/60 hover:text-white text-2xl transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0A0A]/95 slide-in-from-top backdrop-blur-xl px-6 py-6 border-white/10 border-t animate-in duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left py-2 text-sm font-medium transition-colors ${
                  active === id ? "text-white" : "text-white/50"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="bg-linear-to-r from-indigo-500 to-purple-500 mt-2 px-6 py-3 rounded-full font-medium text-sm text-center"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center bg-[#0A0A0A] px-6 pt-32 pb-24 min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
      <div
        className="absolute inset-0 opacity-30 transition-transform duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139,92,246,0.15) 0%, transparent 50%)`,
        }}
      />
      <div className="right-0 bottom-0 left-0 absolute bg-linear-to-r from-transparent via-white/10 to-transparent h-px" />

      {/* Container dengan text-center yang dipastikan */}
      <div className="relative w-full text-center">
        
        {/* Badge */}
        <div
          data-reveal
          data-delay="0s"
          className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm mb-8 px-5 py-2.5 border border-white/10 rounded-full"
        >
          <span className="relative flex w-2 h-2">
            <span className="inline-flex absolute bg-emerald-400 opacity-75 rounded-full w-full h-full animate-ping" />
            <span className="inline-flex relative bg-emerald-400 rounded-full w-2 h-2" />
          </span>
          <span className="font-medium text-white/60 text-xs tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            OPEN FOR COLLABORATION
          </span>
        </div>

        {/* Title */}
        <h1
          data-reveal
          data-delay="0.15s"
          className="mb-8 w-full font-bold text-white text-center leading-[1.1] tracking-tighter"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          Digital Presence
          <br />
          That 
          <span className="bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 ml-3 text-transparent">
            Stands Out
          </span>
        </h1>

        {/* Description - DIPASTIKAN CENTER */}
        <p
          data-reveal
          data-delay="0.3s"
          className="mx-auto mb-12 text-white/40 text-lg text-center leading-relaxed"
          style={{ 
            fontFamily: "'Inter', sans-serif", 
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        >
          We help businesses and brands build exceptional digital experiences 
          that drive real results — from stunning websites to complete brand identities.
        </p>

        {/* Buttons */}
        <div data-reveal data-delay="0.45s" className="flex flex-wrap justify-center gap-5 mb-28">
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }}
            className="group relative bg-linear-to-r from-indigo-500 hover:from-indigo-600 to-purple-500 hover:to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25 px-8 py-4 rounded-full overflow-hidden font-semibold text-white hover:scale-105 transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="z-10 relative flex items-center gap-2">
              Start Your Project 
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("services");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }}
            className="hover:bg-white/5 px-8 py-4 border border-white/10 hover:border-white/20 rounded-full font-medium text-white/60 hover:text-white transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore Services
          </button>
        </div>

        {/* Stats - FULLY CENTERED */}
        <div 
          data-reveal 
          data-delay="0.6s" 
          className="pt-12 border-white/5 border-t"
          style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { val: "150+", label: "PROJECTS COMPLETED" },
              { val: "98%", label: "CLIENT SATISFACTION" },
              { val: "2x", label: "AVERAGE ROI" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="font-bold text-white text-4xl whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {val}
                </span>
                <span className="font-medium text-white/30 text-xs text-center uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MARQUEE ── */
function Marquee() {
  const items = [
    "Web Development", "UI/UX Design", "Brand Strategy", "Mobile Apps", 
    "E-commerce", "Analytics", "SEO Optimization", "Cloud Solutions"
  ];
  return (
    <div className="bg-[#0F0F0F] py-5 border-white/5 border-y overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }
        `}</style>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 font-medium text-white/20 text-sm tracking-wide"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item}
            <span className="bg-white/20 rounded-full w-1 h-1" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── SERVICES ── */
function Services() {
  useScrollReveal();

  return (
    <section id="services" className="bg-[#0A0A0A] px-6 py-32 border-white/5 border-t">
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="flex md:flex-row flex-col justify-between md:items-end gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-linear-to-r from-indigo-400 to-purple-400 w-8 h-px" />
              <span className="font-semibold text-indigo-400 text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                What We Do
              </span>
            </div>
            <h2
              className="font-bold text-white leading-tight tracking-tighter"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Services That
              <br />
              <span className="bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-transparent">Deliver Results</span>
            </h2>
          </div>
          <p className="max-w-md text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Every project is crafted with precision and purpose. We combine creativity 
            with strategy to help your business grow.
          </p>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              data-reveal
              data-delay={`${index * 0.1}s`}
              className="group relative bg-[#0F0F0F] hover:shadow-2xl hover:shadow-indigo-500/5 p-7 border border-white/5 hover:border-white/15 rounded-2xl transition-all hover:-translate-y-2 duration-500"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                <div className="flex justify-center items-center bg-white/5 mb-6 border border-white/10 rounded-xl w-12 h-12 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="mb-3 font-bold text-white text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {service.title}
                </h3>
                
                <p className="mb-5 text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {service.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-white/20 text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="pt-5 border-white/5 border-t">
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${service.tag}`}>
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ── */
function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative bg-[#0A0A0A] px-6 py-32 border-white/5 border-t overflow-hidden">
      <div className="top-0 right-0 absolute bg-indigo-500/5 blur-3xl rounded-full w-96 h-96" />
      <div className="bottom-0 left-0 absolute bg-purple-500/5 blur-3xl rounded-full w-96 h-96" />

      <div className="relative mx-auto max-w-6xl">
        <div data-reveal className="mb-20 text-center">
          <div className="flex justify-center items-center gap-3 mb-5">
            <div className="bg-linear-to-r from-indigo-400 to-purple-400 w-8 h-px" />
            <span className="font-semibold text-indigo-400 text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
              How We Work
            </span>
            <div className="bg-linear-to-r from-purple-400 to-indigo-400 w-8 h-px" />
          </div>
          <h2 className="font-bold text-white leading-tight tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Simple Process,
            <br />
            <span className="bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-transparent">Powerful Results</span>
          </h2>
        </div>

        <div className="gap-16 grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white/5 border border-indigo-500/20 shadow-lg"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex gap-5">
                  <span className={`text-4xl font-bold ${activeStep === index ? "text-indigo-400" : "text-white/20"}`}>
                    {step.num}
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative bg-linear-to-br from-[#0F0F0F] to-[#0A0A0A] p-8 border border-white/10 rounded-2xl overflow-hidden">
            <div className="top-0 right-0 absolute bg-indigo-500/10 blur-2xl rounded-full w-40 h-40" />
            <div className="bottom-0 left-0 absolute bg-purple-500/10 blur-2xl rounded-full w-40 h-40" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-linear-to-r from-indigo-400 to-purple-400 border-[#0A0A0A] border-2 rounded-full w-8 h-8" />
                  ))}
                </div>
                <span className="text-white/40 text-xs">Active project</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/30 text-xs">Discovery</span>
                  <span className="text-indigo-400 text-xs">100%</span>
                </div>
                <div className="bg-white/5 rounded-full h-1 overflow-hidden">
                  <div className="bg-linear-to-r from-indigo-400 to-purple-400 rounded-full w-full h-full" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/30 text-xs">Design</span>
                  <span className="text-indigo-400 text-xs">75%</span>
                </div>
                <div className="bg-white/5 rounded-full h-1 overflow-hidden">
                  <div className="bg-linear-to-r from-indigo-400 to-purple-400 rounded-full w-3/4 h-full" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/30 text-xs">Development</span>
                  <span className="text-indigo-400 text-xs">40%</span>
                </div>
                <div className="bg-white/5 rounded-full h-1 overflow-hidden">
                  <div className="bg-linear-to-r from-indigo-400 to-purple-400 rounded-full w-2/5 h-full" />
                </div>
              </div>

              <div className="pt-6 border-white/10 border-t">
                <p className="text-white/30 text-sm italic">"Most projects delivered within 2 weeks"</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="bg-[#0A0A0A] px-6 py-32 border-white/5 border-t">
      <div className="mx-auto max-w-4xl">
        <div data-reveal className="mb-16 text-center">
          <div className="flex justify-center items-center gap-3 mb-5">
            <div className="bg-linear-to-r from-indigo-400 to-purple-400 w-8 h-px" />
            <span className="font-semibold text-indigo-400 text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
              Client Love
            </span>
            <div className="bg-linear-to-r from-purple-400 to-indigo-400 w-8 h-px" />
          </div>
          <h2 className="font-bold text-white leading-tight tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            What Our
            <br />
            <span className="bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-transparent">Clients Say</span>
          </h2>
        </div>

        <div className="relative bg-linear-to-br from-[#0F0F0F] to-[#0A0A0A] p-8 md:p-12 border border-white/10 rounded-2xl">
          <div className="-top-3 left-8 absolute text-indigo-500/20 text-6xl">"</div>
          <div className="relative">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="mb-8 text-white/70 text-lg text-center leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              "{testimonials[currentIndex].text}"
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex justify-center items-center bg-linear-to-r from-indigo-400 to-purple-400 rounded-full w-12 h-12 font-bold text-white">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-white/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-8 bg-indigo-400" : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thanks for subscribing! We'll be in touch.");
  };

  return (
    <section id="contact" className="relative bg-[#0A0A0A] px-6 py-32 border-white/5 border-t overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />
      
      <div className="relative mx-auto max-w-3xl text-center">
        <div data-reveal>
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="bg-linear-to-r from-indigo-400 to-purple-400 w-8 h-px" />
            <span className="font-semibold text-indigo-400 text-xs uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
              Let's Work Together
            </span>
            <div className="bg-linear-to-r from-purple-400 to-indigo-400 w-8 h-px" />
          </div>
          
          <h2 className="mb-5 font-bold text-white leading-tight tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Ready to Elevate
            <br />
            <span className="bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent">
              Your Brand?
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-md text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            Let's discuss your project and create something amazing together.
            Get a free consultation within 24 hours.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-linear-to-r from-indigo-500 hover:from-indigo-600 to-purple-500 hover:to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/25 px-8 py-4 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:hello@studioai.com"
              className="inline-flex items-center gap-3 hover:bg-white/5 px-8 py-4 border border-white/10 hover:border-white/20 rounded-full text-white/60 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex sm:flex-row flex-col gap-3 mx-auto max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white/5 px-6 py-3 border border-white/10 focus:border-indigo-500/50 rounded-full focus:outline-none text-white transition-colors placeholder-white/30"
              style={{ fontFamily: "'Inter', sans-serif" }}
              required
            />
            <button
              type="submit"
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-medium text-white transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] px-6 py-12 border-white/5 border-t">
      <div className="mx-auto max-w-6xl">
        <div className="gap-10 grid grid-cols-1 md:grid-cols-4 mb-10">
          <div className="md:col-span-2">
            <span className="inline-block mb-4 font-bold text-2xl tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-white">YUMY</span>
              <span className="bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 text-transparent">/PROJECT</span>
            </span>
            <p className="max-w-md text-white/30 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              Creating exceptional digital experiences that help brands stand out and grow.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white/60 text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {["Services", "Process", "Testimonials"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-white/30 hover:text-white/60 text-sm transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white/60 text-xs uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2">
              {["Instagram", "LinkedIn", "Twitter", "Dribbble"].map((social) => (
                <li key={social}>
                  <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-8 border-white/5 border-t">
          <p className="text-white/20 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 YUMY/PROJECT. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/20 hover:text-white/40 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App() {
  useScrollReveal();
  return (
    <div className="bg-[#0A0A0A] selection:bg-indigo-500/30 min-h-screen overflow-x-hidden text-white">
      <FontLoader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}