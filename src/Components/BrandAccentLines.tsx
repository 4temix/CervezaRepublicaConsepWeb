type Variant = "hero" | "product" | "gallery" | "valor" | "about";

type Props = {
  variant: Variant;
  className?: string;
};

/**
 * Líneas horizontales rojas y azules inspiradas en el empaque de República La Tuya.
 * Las animaciones GSAP se aplican desde HomePage vía clases `.brand-line-anim`.
 */
export default function BrandAccentLines({ variant, className = "" }: Props) {
  if (variant === "hero") {
    return (
      <div
        className={`brand-accent-lines brand-accent-lines--hero pointer-events-none ${className}`}
        aria-hidden
      >
        <span
          className="brand-line-anim brand-line-anim--pulse brand-line--blue brand-line--mount brand-line-hero-tl"
        />
        <span
          className="brand-line-anim brand-line-anim--pulse brand-line--red brand-line--mount brand-line-hero-tr"
        />
        <span
          className="brand-line-anim brand-line-anim--pulse brand-line--blue brand-line--mount brand-line-hero-bl"
        />
        <span
          className="brand-line-anim brand-line-anim--pulse brand-line--red brand-line--mount brand-line-hero-br"
        />
        <div className="brand-line-hero-bottom-wrap">
          <span className="brand-line-anim brand-line-anim--pulse brand-line--red brand-line--mount brand-line-hero-bottom-inner" />
        </div>
      </div>
    );
  }

  if (variant === "valor") {
    return (
      <div
        className={`brand-accent-lines brand-accent-lines--valor pointer-events-none ${className}`}
        aria-hidden
      >
        <span className="brand-line-anim brand-line--blue brand-line--scroll-valor brand-line-valor-left" />
        <span className="brand-line-anim brand-line--red brand-line--scroll-valor brand-line-valor-right" />
      </div>
    );
  }

  if (variant === "about") {
    return (
      <div
        className={`brand-accent-lines brand-accent-lines--about pointer-events-none ${className}`}
        aria-hidden
      >
        <span className="brand-line-anim brand-line--blue brand-line--scroll-about brand-line-about-tl" />
        <span className="brand-line-anim brand-line--red brand-line--scroll-about brand-line-about-tr" />
        <span className="brand-line-anim brand-line--blue brand-line--scroll-about brand-line-about-mid" />
        <div className="brand-line-about-bottom-wrap">
          <span className="brand-line-anim brand-line--red brand-line--scroll-about brand-line-about-bottom-inner" />
        </div>
      </div>
    );
  }

  if (variant === "product") {
    return (
      <div
        className={`brand-accent-lines brand-accent-lines--product pointer-events-none ${className}`}
        aria-hidden
      >
        <span className="brand-line-anim brand-line--blue brand-line--scroll-product brand-line-prod-tl" />
        <span className="brand-line-anim brand-line--red brand-line--scroll-product brand-line-prod-tr" />
        <span className="brand-line-anim brand-line--blue brand-line--scroll-product brand-line-prod-mid" />
        <div className="brand-line-prod-bottom-wrap">
          <span className="brand-line-anim brand-line--red brand-line--scroll-product brand-line-prod-bottom-inner" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`brand-accent-lines brand-accent-lines--gallery pointer-events-none ${className}`}
      aria-hidden
    >
      <span className="brand-line-anim brand-line--blue brand-line--scroll-gallery brand-line-gal-tl" />
      <span className="brand-line-anim brand-line--red brand-line--scroll-gallery brand-line-gal-tr" />
      <span className="brand-line-anim brand-line--red brand-line--scroll-gallery brand-line-gal-br" />
      <span className="brand-line-anim brand-line--blue brand-line--scroll-gallery brand-line-gal-bl" />
    </div>
  );
}
