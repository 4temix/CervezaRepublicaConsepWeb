import { useEffect, useRef } from "react";

const TIP_OFFSET_K = 0.45;

export default function MousePointer() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const move = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;

      const el = circleRef.current;
      if (el) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const dx = (targetX - x) * TIP_OFFSET_K;
        const dy = (targetY - y) * TIP_OFFSET_K;
        const px = x + dx - w / 2;
        const py = y + dy - h / 2;
        el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    const show = (event: MouseEvent) => {
      if (circleRef.current) {
        circleRef.current.style.opacity = "1";
        move(event);
      }

      const target = event.target;

      if (target instanceof Element) {
        const cursorStyle = window.getComputedStyle(target).cursor;

        if (cursorStyle === "pointer" && circleRef.current) {
          circleRef.current.style.opacity = "0";
        }
      }
    };

    const hide = () => {
      if (circleRef.current) {
        circleRef.current.style.opacity = "0";
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target;

      if (target instanceof Element) {
        const cursor = window.getComputedStyle(target).cursor;

        if (cursor === "pointer" && circleRef.current) {
          circleRef.current.style.backgroundColor = "transparent";
        }
      }
    };

    document.addEventListener("mousemove", show);
    document.addEventListener("mouseleave", hide);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "2%",
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        borderWidth: "2px",
        borderColor: "red",
        pointerEvents: "none",
        transition: "opacity 0.1s",
        zIndex: "999",
        transformOrigin: "center",
      }}
    />
  );
}
