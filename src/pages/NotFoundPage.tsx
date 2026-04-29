import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdConstruction } from "react-icons/md";
import gsap from "gsap";
import "../App.css";

export default function NotFoundPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      const q = gsap.utils.selector(root);

      gsap.fromTo(
        q(".nf-bg"),
        { opacity: 0, scale: 1.06 },
        { opacity: 0.07, scale: 1, duration: 1.05, ease: "power2.out" },
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.1,
      });

      tl.from(q(".nf-icon-wrap"), {
        scale: 0.5,
        opacity: 0,
        rotation: -14,
        duration: 0.72,
      })
        .from(
          q(".nf-title"),
          { y: 36, opacity: 0, duration: 0.58 },
          "-=0.42",
        )
        .from(
          q(".nf-sub"),
          { y: 22, opacity: 0, duration: 0.48 },
          "-=0.36",
        )
        .from(
          q(".nf-cta"),
          { y: 26, opacity: 0, duration: 0.52 },
          "-=0.34",
        );

      gsap.to(q(".nf-icon-wrap"), {
        y: -5,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.85,
      });

      gsap.to(q(".nf-icon-svg"), {
        rotation: 4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-bg px-6 py-16 text-center"
    >
      <div
        className="nf-bg pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgb(30 58 138) 0%, transparent 45%), radial-gradient(circle at 70% 80%, rgb(185 28 28) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-[1] flex max-w-md flex-col items-center">
        <div className="nf-icon-wrap mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-blue-900/35 bg-gradient-to-b from-blue-950/40 to-blue-900/20 shadow-lg shadow-blue-900/20 md:h-28 md:w-28">
          <MdConstruction
            className="nf-icon-svg h-14 w-14 text-brand-gold md:h-16 md:w-16"
            aria-hidden
          />
        </div>

        <h1 className="nf-title font-heading text-4xl font-semibold uppercase tracking-wide text-blue-900 md:text-5xl">
          Próximamente
        </h1>
        <p className="nf-sub mt-3 font-body text-lg italic text-brand-muted md:text-xl">
          …o tal vez no.
        </p>

        <Link
          to="/"
          className="nf-cta btn-saber-mas !mt-12 inline-flex min-h-[2.75rem] px-10"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }}
        >
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
}
