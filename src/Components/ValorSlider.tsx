import { useSyncExternalStore } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Keyboard,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

const SLIDES = [
  {
    title: "Raíces que se sienten",
    body: "Una cerveza pensada para quienes celebran lo nuestro: el barrio, la familia y los momentos que importan. Calidad que acompaña tu historia, sin artificios.",
  },
  {
    title: "Orgullo de barrio",
    body: "Cada sorbo lleva el sabor de lo cercano: la mesa del comedor, el calor del patio y la risa que se contagia. República es brindar por lo que nos une.",
  },
  {
    title: "Calma que sabe a confianza",
    body: "Un perfil equilibrado para el día a día: frescura al primer trago y un final limpio que invita a otro más. Sin complicaciones, con carácter.",
  },
  {
    title: "Tu mesa, tu historia",
    body: "Desde el almuerzo dominguero hasta el after con los de siempre: una compañera fiel que no compite con el momento, lo celebra.",
  },
];

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function ValorSlider() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const autoplay = prefersReducedMotion
    ? false
    : {
        delay: 5500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      };

  return (
    <div className="valor-swiper mx-auto max-w-3xl px-4" data-reveal>
      <Swiper
        modules={[Pagination, Keyboard, A11y, EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={480}
        grabCursor
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        autoplay={autoplay}
        loop
        className="valor-swiper-inner !pb-14"
        aria-label="Mensajes sobre República"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.title} className="!h-auto">
            <div className="mx-auto flex min-h-[200px] max-w-2xl flex-col justify-center px-2 text-center md:min-h-[220px]">
              <h2 className="font-heading text-3xl font-semibold uppercase tracking-wide text-blue-900 md:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-6 font-body text-lg leading-relaxed text-brand-muted md:text-xl">
                {slide.body}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
