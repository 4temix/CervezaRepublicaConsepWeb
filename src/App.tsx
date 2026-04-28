import { useEffect, useRef } from "react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IG_URL = "https://www.instagram.com/cervezarepublicard/";

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const mapa = useRef<HTMLDivElement>(null);
  const parallaxBackRef = useRef<HTMLDivElement>(null);
  const parallaxMidRef = useRef<HTMLDivElement>(null);
  const parallaxGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    const back = parallaxBackRef.current;
    const mid = parallaxMidRef.current;
    const glow = parallaxGlowRef.current;
    if (!root || !hero) return;

    const ctx = gsap.context(() => {
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

      gsap.utils.toArray<HTMLElement>(".cerveza").forEach((el, index) => {
        gsap.to(el, {
          y: 25 * index + 2,
          scrollTrigger: {
            trigger: ".beer-section",
            start: "top top",
            end: "center top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
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
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
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
            <h3 className="hero-line font-body text-sm font-medium uppercase text-red-500 font-semibold tracking-[0.35em] md:text-3xl">
              Cerveza
            </h3>
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
            className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-brand-muted"
            aria-hidden
          >
            <span className="font-body text-xs uppercase tracking-widest">
              Descubre más
            </span>
            <span className="h-10 w-px bg-gradient-to-b from-brand-gold to-transparent" />
          </div>
        </section>

        <section
          className="relative border-t border-white/5 bg-gray-200 py-24 md:py-32 relative"
          aria-labelledby="valor-heading"
        >
          <div className="absolute w-full top-0">
            <img
              src="/borde.png"
              className="object-cover w-full opacity-15"
              alt=""
            />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="valor-heading"
              className="font-heading text-3xl font-semibold uppercase tracking-wide text-brand-cream md:text-4xl"
              data-reveal
            >
              Raíces que se sienten
            </h2>
            <p
              className="mt-6 font-body text-lg leading-relaxed text-brand-muted md:text-xl"
              data-reveal
            >
              Una cerveza pensada para quienes celebran lo nuestro: el barrio,
              la familia y los momentos que importan. Calidad que acompaña tu
              historia, sin artificios.
            </p>
          </div>
        </section>

        <section
          className="relative beer-section px-6 py-24 md:py-32"
          aria-labelledby="producto-heading"
        >
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <h2
                id="producto-heading"
                className="font-heading text-3xl font-semibold uppercase tracking-wide text-brand-cream md:text-4xl"
                data-reveal
              >
                Sabor claro, carácter firme
              </h2>
              <p
                className="mt-6 font-body text-lg leading-relaxed text-brand-muted"
                data-reveal
              >
                Perfil tipo lager / pilsen: frescura en el aroma, equilibrio
                entre malta y un amargor suave. Ideal para acompañar comidas
                cotidianas o una tarde con amigos.
              </p>
              <ul
                className="mt-8 space-y-3 font-body text-brand-cream/90"
                data-reveal
              >
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                  Cuerpo ligero y fácil de beber
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
            </div>

            <div
              className="relative flex aspect-[4/5] w-full max-w-[500px] items-center justify-center p-10 border mx-auto"
              data-reveal
            >
              {/* Botella Izquierda - Usando % para que no se salga */}
              <div className="cerveza absolute left-[12%] md:left-[15%] w-[30%]">
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
            </div>
          </div>
        </section>

        <section
          className="relative border-t border-white/5 bg-gradient-to-b from-brand-bg to-brand-surface/60 px-6 py-24 md:py-32"
          aria-labelledby="cta-heading"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-heading"
              className="font-heading text-3xl font-semibold uppercase tracking-wide md:text-4xl"
              data-reveal
            >
              Síguenos
            </h2>
            <p className="mt-4 font-body text-lg text-brand-muted" data-reveal>
              Novedades, eventos y la comunidad República La Tuya en Instagram.
            </p>
            <div className="mt-10" data-reveal>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-8 py-4 font-body font-medium text-brand-gold-bright transition hover:border-brand-gold hover:bg-brand-gold/20"
              >
                @cervezarepublicard
              </a>
            </div>
            <p
              className="mt-16 font-body text-xs leading-relaxed text-brand-muted/80"
              data-reveal
            >
              El consumo de bebidas alcohólicas es solo para mayores de edad.
              Bebe con responsabilidad.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 px-6 py-8 text-center font-body text-xs text-brand-muted">
        © {new Date().getFullYear()} Presentación República La Tuya. Marca
        registrada de sus titulares.
      </footer>
    </div>
  );
}

export default App;
