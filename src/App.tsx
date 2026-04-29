import { useEffect, useRef, useState } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MousePointer from "./components/MousePointer";
import ValorSlider from "./components/ValorSlider";
import BrandAccentLines from "./components/BrandAccentLines";

gsap.registerPlugin(ScrollTrigger);

/** Refresco cuando cambia la altura útil (barra URL móvil, teclado, etc.) */
const SCROLL_TRIGGER_REFRESH_MS = 200;

const IG_URL = "https://www.instagram.com/cervezarepublicard/";

const HISTORIA_COPIA =
  'Cerveza República, conocida como "La Tuya", es una marca dominicana lanzada en 2022 por el productor y comunicador Santiago Matías (Alofoke), marcando su incursión fuera de los medios. Comercializada por Vinícola del Norte, busca competir en el mercado local, destacando por su rápida popularidad y planes de establecer su propia cervecería.';

function App() {
  const [historiaExpandida, setHistoriaExpandida] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mapa = useRef<HTMLDivElement>(null);
  const parallaxBackRef = useRef<HTMLDivElement>(null);
  const parallaxMidRef = useRef<HTMLDivElement>(null);
  const parallaxGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
    });
    return () => {
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const scheduleRefresh = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        ScrollTrigger.refresh();
      }, SCROLL_TRIGGER_REFRESH_MS);
    };

    window.addEventListener("resize", scheduleRefresh);
    window.visualViewport?.addEventListener("resize", scheduleRefresh);

    return () => {
      window.removeEventListener("resize", scheduleRefresh);
      window.visualViewport?.removeEventListener("resize", scheduleRefresh);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const back = parallaxBackRef.current;
    const mid = parallaxMidRef.current;
    const glow = parallaxGlowRef.current;
    if (!root || !hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let pulseDelay: gsap.core.Tween | undefined;

    let ctx: gsap.Context;
    ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".brand-line-anim", { scaleX: 1, opacity: 1 });
      } else {
        const mountLines =
          gsap.utils.toArray<HTMLElement>(".brand-line--mount");
        mountLines.forEach((el, i) => {
          gsap.fromTo(
            el,
            { scaleX: 0, opacity: 0.35 },
            {
              scaleX: 1,
              opacity: 0.92,
              duration: 1.12,
              ease: "power3.out",
              delay: 0.72 + i * 0.08,
            },
          );
        });

        const prodLines = gsap.utils.toArray<HTMLElement>(
          ".brand-line--scroll-product",
        );
        if (prodLines.length) {
          gsap.fromTo(
            prodLines,
            { scaleX: 0, opacity: 0.35 },
            {
              scaleX: 1,
              opacity: 0.94,
              ease: "none",
              stagger: 0.07,
              scrollTrigger: {
                trigger: ".beer-section",
                start: "top center",
                end: "bottom 90%",
                scrub: 1,
              },
            },
          );
        }

        const valorLines = gsap.utils.toArray<HTMLElement>(
          ".brand-line--scroll-valor",
        );
        if (valorLines.length) {
          gsap.fromTo(
            valorLines,
            { scaleX: 0, opacity: 0.35 },
            {
              scaleX: 1,
              opacity: 0.92,
              ease: "none",
              stagger: 0.08,
              scrollTrigger: {
                trigger: ".valor-brand-wrap",
                start: "top 90%",
                end: "top 32%",
                scrub: 0.55,
              },
            },
          );
        }

        const galLines = gsap.utils.toArray<HTMLElement>(
          ".brand-line--scroll-gallery",
        );
        if (galLines.length) {
          gsap.fromTo(
            galLines,
            { scaleX: 0, opacity: 0.45 },
            {
              scaleX: 1,
              opacity: 0.92,
              duration: 0.92,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".gallery-brand-wrap",
                start: "top 80%",
                once: true,
                scrub: 0.1,
              },
            },
          );
        }

        const aboutLines = gsap.utils.toArray<HTMLElement>(
          ".brand-line--scroll-about",
        );
        if (aboutLines.length) {
          gsap.fromTo(
            aboutLines,
            { scaleX: 0, opacity: 0.4 },
            {
              scaleX: 1,
              opacity: 0.92,
              duration: 0.88,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".historia-section",
                start: "top 76%",
                once: true,
              },
            },
          );
        }

        pulseDelay = gsap.delayedCall(1.85, () => {
          gsap.utils
            .toArray<HTMLElement>(".brand-line-anim--pulse")
            .forEach((el, i) => {
              gsap.to(el, {
                opacity: 0.38,
                duration: 2.25 + (i % 4) * 0.28,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.09,
              });
            });
        });
      }

      gsap.fromTo(
        ".hero-line",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      if (back && mid && glow) {
        gsap.to(back, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
        gsap.to(mid, {
          y: 180,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.75,
          },
        });
        gsap.to(glow, {
          y: 48,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      gsap.from(mapa.current, {
        opacity: 0,
        duration: 1.6,
        onComplete: () => {
          gsap.to(mapa.current, {
            scale: 1.5,
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              scrub: 1,
            },
          });
        },
      });

      const beerSection = root.querySelector<HTMLElement>(".beer-section");
      const beerEls = gsap.utils.toArray<HTMLElement>(".cerveza");
      const attachBeerScroll = () => {
        beerEls.forEach((el, index) => {
          gsap.to(el, {
            y: 25 * index + 2,
            scrollTrigger: {
              trigger: beerSection ?? ".beer-section",
              start: "top top",
              end: "center top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      };

      if (prefersReducedMotion) {
        gsap.set(beerEls, { opacity: 1, clearProps: "transform" });
        attachBeerScroll();
      } else if (beerEls.length && beerSection) {
        gsap.set(beerEls, { opacity: 0, y: 40 });
        const beerIntroTl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: beerSection,
            start: "top center",
            once: true,
          },
          onComplete: () => {
            ctx.add(attachBeerScroll);
          },
        });
        beerEls.forEach((el, i) => {
          beerIntroTl.to(
            el,
            { opacity: 1, y: 0, duration: 0.58 },
            i === 0 ? 0 : ">-0.36",
          );
        });
      } else if (beerEls.length) {
        gsap.set(beerEls, { opacity: 1 });
        attachBeerScroll();
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest(".gallery-brand-wrap")) return;
        gsap.from(el, {
          opacity: 0,
          y: 44,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      const galleryWrap = root.querySelector(".gallery-brand-wrap");
      const galleryMain = root.querySelector("[data-gallery-main]");
      const galleryMainScroll = galleryWrap?.querySelector<HTMLElement>(
        "[data-gallery-main-scroll]",
      );
      const galleryReveal = gsap.utils.toArray<HTMLElement>(
        "[data-gallery-reveal]",
      );

      if (galleryWrap && galleryMain && galleryReveal.length >= 2) {
        if (prefersReducedMotion) {
          gsap.set(galleryMain, { opacity: 1, y: 0 });
          if (galleryMainScroll) {
            gsap.set(galleryMainScroll, { clearProps: "transform" });
          }
          gsap.set(galleryReveal, { clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          gsap.set(galleryMain, { opacity: 0, y: 28 });
          gsap.set(galleryReveal, {
            clipPath: "inset(0% 0% 100% 0%)",
          });

          const galleryTl = gsap.timeline({
            scrollTrigger: {
              trigger: galleryWrap,
              start: "top center",
              once: true,
            },
          });

          galleryTl
            .to(galleryMain, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            })
            .to(
              galleryReveal[0],
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.82,
                ease: "power2.inOut",
              },
              "+=0.2",
            )
            .to(
              galleryReveal[1],
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.82,
                ease: "power2.inOut",
              },
              "+=0.14",
            );

          if (galleryMainScroll) {
            gsap.fromTo(
              galleryMainScroll,
              { y: 20 },
              {
                y: -20,
                ease: "none",
                force3D: true,
                scrollTrigger: {
                  trigger: galleryWrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.55,
                },
              },
            );
          }

          galleryWrap
            .querySelectorAll<HTMLElement>("[data-gallery-float]")
            .forEach((floatEl, i) => {
              gsap.to(floatEl, {
                y: i === 0 ? -8 : 8,
                duration: 2.25,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.5,
                force3D: true,
              });
            });
        }
      }
    }, root);

    return () => {
      pulseDelay?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <MousePointer />
      <div
        ref={rootRef}
        className="min-h-screen overflow-x-hidden bg-brand-bg text-brand-cream font-body selection:bg-brand-gold/30 selection:text-brand-cream"
      >
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded bg-brand-gold px-4 py-2 font-body text-sm font-medium text-brand-bg opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-brand-cream"
        >
          Ir al contenido
        </a>

        <main id="contenido">
          <section
            ref={heroRef}
            className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-28"
          >
            <div className="absolute w-full h-full bottom-0" ref={mapa}>
              <img
                src="/mapa.png"
                className="md:object-fill w-full h-full opacity-15 object-cover"
                alt=""
              />
            </div>

            <BrandAccentLines variant="hero" />

            {/* <div
            ref={mouseGlowRef}
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 will-change-transform"
            aria-hidden
          >
            <div
              ref={parallaxGlowRef}
              className="h-64 w-64 rounded-full bg-red-600/50 blur-[10px] will-change-transform md:h-96 md:w-96"
            />
          </div> */}

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="hero-line hero-crest flex flex-col items-center">
                <div
                  className="hero-crest-bars mb-1 flex w-[min(17rem,90vw)] items-center justify-between px-0.5 md:mb-1.5"
                  aria-hidden
                >
                  <span className="h-0.5 w-9 rounded-full bg-blue-900 md:h-0.5 md:w-12" />
                  <span className="h-0.5 w-9 rounded-full bg-red-600 md:w-12" />
                </div>
                <div
                  className="hero-crest-emblem mb-0.5 flex items-end justify-center gap-[0.12rem] md:mb-1 md:gap-1"
                  aria-hidden
                >
                  <img
                    src="/star-republica.png"
                    alt=""
                    className="h-2 w-2 -translate-y-px -rotate-6 object-contain opacity-95 md:h-4 md:w-4"
                    width={16}
                    height={16}
                  />
                  <img
                    src="/star-republica.png"
                    alt=""
                    className="h-2.5 w-2.5 -translate-y-1 object-contain opacity-95 md:h-5 md:w-5 md:-translate-y-1.5"
                    width={20}
                    height={20}
                  />
                  <img
                    src="/republica-centro.png"
                    alt=""
                    className="hero-crest-icon mx-px h-7 w-auto max-h-8 max-w-[2.1rem] shrink-0 -translate-y-1 object-contain object-center opacity-95 md:mx-0.5 md:h-10 md:max-h-11 md:max-w-[2.85rem] md:-translate-y-1.5"
                    width={44}
                    height={44}
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.src.endsWith("/lofoFoke.png")) {
                        el.src = "/lofoFoke.png";
                      }
                    }}
                  />
                  <img
                    src="/star-republica.png"
                    alt=""
                    className="h-2.5 w-2.5 -translate-y-1 object-contain opacity-95 md:h-5 md:w-5 md:-translate-y-1.5"
                    width={20}
                    height={20}
                  />
                  <img
                    src="/star-republica.png"
                    alt=""
                    className="h-2 w-2 translate-y-px rotate-6 object-contain opacity-95 md:h-4 md:w-4"
                    width={16}
                    height={16}
                  />
                </div>
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-red-500 md:text-3xl">
                  Cerveza
                </h3>
              </div>
              <h1 className="hero-line mt-4 font-heading text-6xl text-blue-900 font-semibold uppercase leading-[0.95] md:text-7xl lg:text-8xl">
                República
              </h1>

              <h2 className="hero-line mt-1 font-heading text-3xl font-medium uppercase tracking-[0.2em] text-blue-900 md:text-4xl">
                La Tuya
              </h2>
              <p className="hero-line mx-auto mt-8 max-w-lg font-body text-lg leading-relaxed text-brand-muted md:text-xl">
                Hecha para compartir. Orgullo que se brinda en cada ocasión.
              </p>
            </div>

            <div
              className="scroll-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-brand-muted"
              aria-hidden
            >
              <span className="font-body text-xs uppercase tracking-widest">
                Descubre más
              </span>
              <span className="scroll-cue-arrow-wrap text-brand-gold/95">
                <svg
                  className="scroll-cue-arrow"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </section>

          <section
            className="valor-section relative border-t border-white/5 bg-gray-200 py-24 md:py-32"
            aria-label="Historia y valores de República"
          >
            <div className="absolute w-full top-0">
              <img
                src="/borde.png"
                className="object-cover w-full opacity-15"
                alt=""
              />
            </div>

            <div className="valor-brand-wrap relative mx-auto w-full max-w-4xl">
              <BrandAccentLines variant="valor" />
              <ValorSlider />
            </div>
          </section>

          <section
            className="relative beer-section px-6 py-24 md:py-32"
            aria-labelledby="producto-heading"
          >
            <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2 md:items-center md:gap-20">
              <div>
                <h2
                  id="producto-heading"
                  className="font-heading text-3xl font-semibold uppercase tracking-wide text-blue-900 md:text-4xl"
                  data-reveal
                >
                  Sabor claro, carácter firme
                </h2>
                <p
                  className="mt-6 font-body text-lg leading-relaxed text-brand-muted md:text-xl"
                  data-reveal
                >
                  Es una cerveza clara, suave y fácil de tomar: no te deja la
                  boca amarga ni pesada. Sirve bien fría, para el día a día, en
                  la mesa con la familia o con los amigos cuando quieres algo
                  rico sin armar un show.
                </p>
                <ul
                  className="mt-8 space-y-3 font-body text-blue-900/85"
                  data-reveal
                >
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                    Ligera y fácil de beber
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                    Ideal bien fría
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                    Presentación en lata o botella según disponibilidad en tu
                    punto de venta
                  </li>
                </ul>
                <div data-reveal className="inline-block btn-saber">
                  <a href="#historia-republica" className="btn-saber-mas">
                    <span>Saber más</span>
                  </a>
                </div>
              </div>

              <div className="beer-showcase-frame mx-auto w-full max-w-[520px]">
                <div
                  className="beer-showcase-inner relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden p-8 md:p-12"
                  data-reveal
                >
                  <div
                    className="pointer-events-none absolute bottom-5 right-5 z-30 rounded-lg border border-blue-900/15 bg-white/90 px-3 py-2 shadow-md shadow-blue-900/10 backdrop-blur-sm md:bottom-7 md:right-7"
                    aria-hidden
                  >
                    <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-brand-muted">
                      Vol. alc.
                    </p>
                    <p className="font-heading text-2xl font-bold tabular-nums text-brand-accent md:text-3xl">
                      5.0<span className="text-lg font-semibold">%</span>
                    </p>
                  </div>

                  {/* Botella Izquierda - Usando % para que no se salga */}
                  <div className="cerveza absolute left-[12%] md:left-[15%] w-[30%] cursor-pointer">
                    <img
                      src="/botella.png"
                      className="w-full h-auto"
                      alt="Botella"
                    />
                  </div>

                  {/* Lata Central - La más grande */}
                  <div className="cerveza absolute bottom-[6%] w-[80%]">
                    <img
                      src="/lataGrande.webp"
                      className="w-full h-auto"
                      alt="Lata Grande"
                    />
                  </div>

                  {/* Lata Pequeña Derecha */}
                  <div className="cerveza absolute right-[13%] md:right-[15%] bottom-[9%] w-[27%]">
                    <img
                      src="/pequenia.png"
                      className="w-full h-auto"
                      alt="Lata Pequeña"
                    />
                  </div>

                  <BrandAccentLines variant="product" />
                </div>
              </div>
            </div>
          </section>

          <section
            id="historia-republica"
            className="historia-section relative border-t border-gray-300/60 bg-slate-100 px-6 py-20 md:py-28"
            aria-labelledby="historia-heading"
          >
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="order-2 md:order-1">
                <h2
                  id="historia-heading"
                  className="font-heading text-3xl font-semibold uppercase tracking-wide text-blue-900 md:text-4xl"
                  data-reveal
                >
                  Historia
                </h2>
                <p
                  id="historia-texto"
                  className={`mt-6 font-body text-lg leading-relaxed text-slate-700 md:text-xl ${historiaExpandida ? "" : "line-clamp-5"}`}
                  data-reveal
                >
                  {HISTORIA_COPIA}
                </p>
                <div
                  className="mt-6 flex flex-wrap items-center gap-4"
                  data-reveal
                >
                  {!historiaExpandida ? (
                    <button
                      type="button"
                      className="btn-saber-mas !mt-0"
                      onClick={() => setHistoriaExpandida(true)}
                      aria-expanded={false}
                      aria-controls="historia-texto"
                    >
                      <span>Saber más</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="font-body text-sm font-semibold uppercase tracking-wider text-blue-900 underline decoration-blue-900/30 underline-offset-4 hover:text-blue-950"
                      onClick={() => setHistoriaExpandida(false)}
                      aria-expanded={true}
                      aria-controls="historia-texto"
                    >
                      Ver menos
                    </button>
                  )}
                </div>
              </div>

              <div className="order-1 mx-auto w-full max-w-md md:order-2">
                <div className="historia-showcase-frame">
                  <div className="historia-showcase-inner relative aspect-[3/4] max-h-[min(88vh,520px)] w-full overflow-hidden">
                    <img
                      src="/santiago-matias.png"
                      alt="Santiago Matías (Alofoke), fundador de Cerveza República"
                      className="h-full w-full object-cover object-[center_12%]"
                      width={720}
                      height={960}
                      decoding="async"
                      fetchPriority="low"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.endsWith("/foto7.jpeg")) {
                          img.src = "/foto7.jpeg";
                        }
                      }}
                    />
                    <BrandAccentLines variant="about" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="comunidad-republica"
            className="relative bg-gray-200 px-6 py-20 md:py-28"
            aria-labelledby="cta-heading"
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
              {/* 🔹 GALERÍA */}
              <div className="w-full md:w-1/2">
                <div className="gallery-brand-wrap relative w-full max-w-md mx-auto">
                  {/* imagen principal — scroll mueve el marco; timeline anima el interior */}
                  <div
                    data-gallery-main-scroll
                    className="relative will-change-transform"
                  >
                    <div
                      data-gallery-main
                      className="relative bg-white p-2 shadow-lg will-change-transform"
                    >
                      <img
                        src="/foto3.heic"
                        className="block w-full object-cover"
                        alt=""
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  </div>

                  {/* imagen 1 — ancla + rotación fuera; marco blanco flota con transform (GPU) */}
                  <div className="absolute top-0 right-0 z-20 w-[60%] translate-x-1/4 -translate-y-1/4 rotate-6 sm:w-[50%] md:w-[40%]">
                    <div
                      data-gallery-float
                      className="bg-white p-2 shadow-md will-change-transform"
                    >
                      <div
                        data-gallery-reveal
                        className="gallery-reveal-clip overflow-hidden"
                      >
                        <img
                          src="/foto1.jpeg"
                          className="block w-full object-cover"
                          alt=""
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* imagen 2 */}
                  <div className="absolute bottom-0 left-0 z-0 w-[60%] -translate-x-1/4 translate-y-1/4 -rotate-6 sm:w-[50%] md:w-[70%]">
                    <div
                      data-gallery-float
                      className="bg-white p-2 shadow-md will-change-transform"
                    >
                      <div
                        data-gallery-reveal
                        className="gallery-reveal-clip overflow-hidden"
                      >
                        <img
                          src="/foto2.jpg"
                          className="block w-full object-cover"
                          alt=""
                          decoding="async"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <BrandAccentLines variant="gallery" />
                </div>
              </div>

              {/* 🔹 TEXTO */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2
                  id="cta-heading"
                  className="text-3xl md:text-4xl font-semibold uppercase tracking-wide text-red-700"
                >
                  Síguenos
                </h2>

                <p className="mt-4 text-lg text-gray-600">
                  Novedades, eventos y la comunidad República La Tuya en
                  Instagram.
                </p>

                <div className="mt-8">
                  <a
                    href={IG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 
          rounded-full border border-red-500/40 bg-red-500/10 
          px-8 py-4 font-medium text-red-700 
          transition hover:border-red-600 hover:bg-red-500/20"
                  >
                    @cervezarepublicard
                  </a>
                </div>

                <p className="mt-12 text-xs leading-relaxed text-gray-500">
                  El consumo de bebidas alcohólicas es solo para mayores de
                  edad. Bebe con responsabilidad.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 px-6 py-8 text-center font-body text-xs text-brand-muted">
          © {new Date().getFullYear()} web consepto
        </footer>
      </div>
    </>
  );
}

export default App;
