import { MdAcUnit, MdCelebration, MdGroups } from "react-icons/md";

const SENSORY = [
  {
    title: "Sabor",
    tag: "Claro y honesto",
    body: "Frescura al primer trago y un final limpio que invita al siguiente sin empalagar.",
    gradient:
      "from-slate-400/25 via-zinc-400/12 to-transparent",
    orb: "bg-slate-400/28",
  },
  {
    title: "Aroma",
    tag: "Cerca, sin artificio",
    body: "Malta suave y matices discretos: se nota al acercar la lata o la copa, sin tapar la conversación.",
    gradient:
      "from-sky-500/20 via-blue-600/10 to-transparent",
    orb: "bg-sky-400/25",
  },
  {
    title: "Textura",
    tag: "Ligera en boca",
    body: "Burbuja fina y paso suave — pensada para el calor, la mesa larga y el que sigue.",
    gradient:
      "from-red-500/20 via-rose-500/8 to-transparent",
    orb: "bg-red-500/20",
  },
] as const;

const RITUAL = [
  {
    step: "01",
    title: "Frío de verdad",
    body: "Del refri o con hielo: así se abre el perfil y se siente lo que la marca busca entregar.",
    Icon: MdAcUnit,
  },
  {
    step: "02",
    title: "El brindis",
    body: "Levantar la lata o la botella es celebrar lo de siempre: familia, barrio, los tuyos.",
    Icon: MdCelebration,
  },
  {
    step: "03",
    title: "Compartir",
    body: "“La tuya” va con los tuyos: mesa, patio o after — el momento manda, la cerveza acompaña.",
    Icon: MdGroups,
  },
] as const;

export default function ExperienciaRepublica() {
  return (
    <>
      <section
        id="experiencia-sensorial"
        className="experiencia-sensorial-section relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-20 text-slate-100 md:py-28"
        aria-labelledby="sensorial-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
        >
          <div
            data-exp-blob
            className="absolute -left-1/4 top-0 h-[min(80%,32rem)] w-[min(90%,42rem)] rounded-full bg-blue-600/25 blur-[100px] will-change-transform"
          />
          <div
            data-exp-blob
            className="absolute -right-1/4 bottom-0 h-[min(70%,28rem)] w-[min(85%,36rem)] rounded-full bg-red-600/20 blur-[90px] will-change-transform"
          />
        </div>
        <div className="landing-grain opacity-[0.12]" aria-hidden />

        <div className="relative z-[1] mx-auto max-w-6xl">
          <div className="exp-sensorial-intro">
            <p className="text-center font-body text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
              Más que datos — sensación
            </p>
            <h2
              id="sensorial-heading"
              className="mt-3 text-center font-heading text-3xl font-semibold uppercase tracking-wide text-white md:text-4xl"
            >
              Lo que se siente
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-body text-base leading-relaxed text-slate-400 md:text-lg">
              Tres formas de acercarte a República sin leer un manual: sabor,
              aroma y textura, en una sola pasada visual.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {SENSORY.map((item) => (
              <li
                key={item.title}
                className="sensorial-card group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.55)] backdrop-blur-sm md:p-8"
              >
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110 ${item.orb}`}
                  aria-hidden
                />
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity duration-500 group-hover:opacity-100 ${item.gradient}`}
                  aria-hidden
                />
                <div className="relative z-[1]">
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-slate-300">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-semibold uppercase tracking-wide text-white md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-slate-400 md:text-base">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="ritual-republica"
        className="ritual-republica-section border-t border-slate-200/80 bg-gradient-to-b from-stone-100 to-stone-200/90 px-6 py-20 md:py-28"
        aria-labelledby="ritual-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="exp-ritual-intro">
            <h2
              id="ritual-heading"
              className="text-center font-heading text-3xl font-semibold uppercase tracking-wide text-blue-900 md:text-4xl"
            >
              La tuya, en tu mesa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center font-body text-lg text-slate-600 md:text-xl">
              Un recorrido corto: cómo se disfruta mejor, sin perder el tono de
              República.
            </p>
          </div>

          <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
            {RITUAL.map(({ step, title, body, Icon }) => (
              <li key={step}>
                <div className="ritual-gsap-card ritual-card group relative flex h-full flex-col rounded-2xl border border-blue-900/10 bg-white/90 p-6 shadow-lg shadow-blue-900/5 transition-[transform,box-shadow] duration-300 ease-out md:p-8 md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-blue-900/10">
                  <span
                    className="font-heading text-5xl font-bold tabular-nums leading-none text-blue-900/12 transition-colors duration-300 group-hover:text-red-600/25 md:text-6xl"
                    aria-hidden
                  >
                    {step}
                  </span>
                  <span className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 text-red-700 transition-transform duration-300 md:group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold uppercase tracking-wide text-blue-900 md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-slate-600 md:text-base">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
