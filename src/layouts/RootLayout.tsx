import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdAutoStories, MdGroups, MdHome, MdLocalBar } from "react-icons/md";
import gsap from "gsap";
import MousePointer from "../Components/MousePointer";

/** IDs de sección en HomePage (hero = inicio) */
const SECTION_IDS = [
  "inicio-republica",
  "producto-heading",
  "historia-republica",
  "comunidad-republica",
] as const;

const SECTION_LINKS = [
  {
    id: "producto-heading" as const,
    label: "Producto",
    to: "/#producto-heading" as const,
  },
  {
    id: "historia-republica" as const,
    label: "Historia",
    to: "/#historia-republica" as const,
  },
  {
    id: "comunidad-republica" as const,
    label: "Comunidad",
    to: "/#comunidad-republica" as const,
  },
] as const;

const MOBILE_LINK_ICONS = [MdLocalBar, MdAutoStories, MdGroups] as const;

/** Banda horizontal en el viewport: el ancla activa es la última cuyo top está por encima de esa línea. */
function computeActiveSectionId(): string {
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - window.innerHeight;
  if (maxScroll > 0 && window.scrollY >= maxScroll - 4) {
    return SECTION_IDS[SECTION_IDS.length - 1];
  }

  const bandFromTop = Math.min(window.innerHeight * 0.28, 220);
  let chosen: (typeof SECTION_IDS)[number] = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top <= bandFromTop + 12) chosen = id;
  }

  return chosen;
}

const ringEase = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Anillo azul con entrada/salida suave (escala + opacidad). Punto rojo siempre. */
function NavDot({ active }: { active: boolean }) {
  const ringTransition = `transform 0.6s ${ringEase}, opacity 0.5s ${ringEase}`;
  const dotTransition = `transform 0.5s ${ringEase}, width 0.5s ${ringEase}, height 0.5s ${ringEase}`;

  return (
    <span
      className="relative flex h-14 w-14 shrink-0 items-center justify-center xl:h-16 xl:w-16"
      aria-hidden
    >
      <span
        className="pointer-events-none absolute flex h-[2.65rem] w-[2.65rem] items-center justify-center rounded-full border-[3px] border-red-600 bg-transparent xl:h-12 xl:w-12 xl:border-[3.5px]"
        style={{
          transform: active ? "scale(1)" : "scale(0.2)",
          opacity: active ? 1 : 0,
          transition: ringTransition,
        }}
      />
      <span
        className={`relative z-[1] shrink-0 rounded-full bg-blue-900 ${
          active ? "h-3.5 w-3.5 xl:h-4 xl:w-4" : "h-4 w-4 xl:h-5 xl:w-5"
        }`}
        style={{
          transform: active ? "scale(1)" : "scale(0.92)",
          transition: dotTransition,
        }}
      />
    </span>
  );
}

function labelTextClass(isActive: boolean) {
  if (isActive) {
    return "section-nav-label max-w-[16rem] overflow-hidden whitespace-nowrap font-semibold uppercase tracking-[0.16em] text-blue-900 opacity-100 transition-[opacity,max-width,color] duration-200 ease-out";
  }
  return "section-nav-label max-w-0 overflow-hidden whitespace-nowrap font-semibold uppercase tracking-[0.16em] text-red-600 opacity-0 transition-[opacity,max-width,color] duration-200 ease-out group-hover/nav:max-w-[16rem] group-hover/nav:opacity-100";
}

function useActiveSectionId(pathname: string, hash: string) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      const clear = window.setTimeout(() => setActiveId(null), 0);
      return () => clearTimeout(clear);
    }

    let raf = 0;
    let cancelled = false;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      attempts += 1;
      if (!SECTION_IDS.every((id) => document.getElementById(id))) {
        if (attempts < 180) raf = requestAnimationFrame(tick);
        return;
      }
      setActiveId(computeActiveSectionId());
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const t = window.setTimeout(() => {
      tick();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, hash]);

  return activeId;
}

type MobileNavProps = {
  activeId: string | null;
  homeActive: boolean;
  goHomeTop: (e: React.MouseEvent) => void;
};

function MobileBottomNav({ activeId, homeActive, goHomeTop }: MobileNavProps) {
  const tabBase =
    "flex min-h-[3.25rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 outline-none transition-colors duration-200 active:bg-white/5 focus-visible:ring-2 focus-visible:ring-blue-900/40";

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-white/15 bg-brand-bg/94 px-1 pt-1 shadow-[0_-8px_24px_rgb(0_0_0/0.2)] backdrop-blur-md xl:hidden"
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between gap-0.5">
        <button
          type="button"
          onClick={goHomeTop}
          className={`${tabBase} ${homeActive ? "text-blue-900" : "text-red-600"}`}
        >
          <MdHome className="h-6 w-6 shrink-0" aria-hidden />
          <span className="max-w-full truncate text-center font-body text-[10px] font-semibold uppercase leading-tight tracking-wide">
            República
          </span>
        </button>

        {SECTION_LINKS.map(({ id, label, to }, i) => {
          const isActive = activeId === id;
          const Icon = MOBILE_LINK_ICONS[i];
          return (
            <Link
              key={id}
              to={to}
              className={`${tabBase} ${isActive ? "text-blue-900" : "text-red-600"}`}
            >
              <Icon className="h-6 w-6 shrink-0" aria-hidden />
              <span className="max-w-full truncate text-center font-body text-[10px] font-semibold uppercase leading-tight tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = useActiveSectionId(location.pathname, location.hash);
  const desktopNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = desktopNavRef.current;
    if (!nav) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1280px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-desktop-nav-item]",
          nav,
        );
        if (items.length === 0) return;
        gsap.set(items, { opacity: 0, x: -20 });
        const tl = gsap.timeline({ delay: 0.1 });
        items.forEach((el, i) => {
          tl.fromTo(
            el,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
            i === 0 ? 0 : ">",
          );
        });
      });
      return () => {
        mm.revert();
      };
    }, nav);
    return () => ctx.revert();
  }, [location.pathname]);

  const goHomeTop = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate({ pathname: "/", hash: "" }, { replace: true });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [navigate],
  );

  const homeActive = activeId === "inicio-republica";

  const rowClass =
    "flex items-center gap-5 py-1.5 text-left outline-none xl:gap-6 xl:py-2 focus-visible:ring-2 focus-visible:ring-blue-900/35 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent";

  return (
    <>
      <MousePointer />
      {/* Escritorio: puntos laterales */}
      <nav
        ref={desktopNavRef}
        aria-label="Secciones de la página"
        className="group/nav pointer-events-none fixed left-14 top-1/2 z-[95] hidden -translate-y-1/2 xl:flex xl:flex-col xl:left-20 2xl:left-24"
      >
        <div className="pointer-events-auto flex flex-col gap-8 xl:gap-10">
          <button
            type="button"
            data-desktop-nav-item
            onClick={goHomeTop}
            aria-label="Ir al inicio — República"
            className={rowClass}
          >
            <NavDot active={homeActive} />
            <span
              className={`${labelTextClass(homeActive)} font-heading text-sm tracking-[0.1em] xl:text-base`}
            >
              República
            </span>
          </button>

          {SECTION_LINKS.map(({ id, label, to }) => {
            const isActive = activeId === id;
            return (
              <Link key={id} data-desktop-nav-item to={to} className={rowClass}>
                <NavDot active={isActive} />
                <span
                  className={`${labelTextClass(isActive)} font-body text-xs xl:text-[0.8125rem]`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="pb-[calc(5.35rem+env(safe-area-inset-bottom,0px))] xl:pb-0">
        <Outlet />
        <footer className="border-t border-white/5 bg-brand-bg px-6 py-8 text-center font-body text-xs text-brand-muted">
          © {new Date().getFullYear()} web consepto
        </footer>
      </div>

      <MobileBottomNav
        activeId={activeId}
        homeActive={homeActive}
        goHomeTop={goHomeTop}
      />
    </>
  );
}

export default RootLayout;
