import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * A fixed A4 sheet. If the content ends up a bit taller than the printable
 * area (font metrics differ from machine to machine) it is scaled down
 * automatically, so nothing is ever clipped or cut in half.
 */
export default function A4Page({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const settled = useRef(false);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (settled.current) return;
    const el = inner.current;
    if (!el) return;
    const avail = el.clientHeight;
    const need = el.scrollHeight;
    if (!avail || !need) return;
    if (need > avail + 1) {
      const next = Math.max(0.6, +((avail / need) * scale - 0.004).toFixed(4));
      if (next < scale - 0.0008) {
        setScale(next);
        return;
      }
    }
    settled.current = true;
  });

  useEffect(() => {
    const remeasure = () => {
      settled.current = false;
      setScale(1);
    };
    window.addEventListener("resize", remeasure);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(remeasure).catch(() => undefined);
    const t = setTimeout(remeasure, 1200);
    return () => {
      window.removeEventListener("resize", remeasure);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="page" id={id}>
      <div
        ref={inner}
        className="pageInner"
        style={{
          transform: scale === 1 ? undefined : `scale(${scale})`,
          width: `${(100 / scale).toFixed(3)}%`,
          height: `${(100 / scale).toFixed(3)}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
