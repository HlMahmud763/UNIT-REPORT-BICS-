import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import {
  bnDate,
  bnTime,
  sanitizeNumeric,
  toBn,
  useForm,
} from "../form/FormContext";

type Align = "left" | "center" | "right";

/* ------------------------------------------------------------------ */
/* raw inputs                                                           */
/* ------------------------------------------------------------------ */

/** numeric field – always shows Bengali digits, numeric keypad on mobile */
export function F({
  id,
  align = "center",
  className,
}: {
  id: string;
  align?: Align;
  className?: string;
}) {
  const { v, set } = useForm();
  return (
    <input
      size={1}
      inputMode="numeric"
      autoComplete="off"
      className={cn(
        "inp",
        align === "left" && "left",
        align === "right" && "right",
        className,
      )}
      value={v[id] ?? ""}
      onChange={(e) => set(id, sanitizeNumeric(e.target.value))}
    />
  );
}

/** free-text field (names, remarks …) */
export function FT({
  id,
  align = "left",
  className,
}: {
  id: string;
  align?: Align;
  className?: string;
}) {
  const { v, set } = useForm();
  return (
    <input
      size={1}
      autoComplete="off"
      className={cn(
        "inp",
        align === "left" && "left",
        align === "right" && "right",
        className,
      )}
      value={v[id] ?? ""}
      onChange={(e) => set(id, toBn(e.target.value))}
    />
  );
}

/** underline style text field */
export function U({
  id,
  className,
  align = "left",
  numeric,
}: {
  id: string;
  className?: string;
  align?: Align;
  numeric?: boolean;
}) {
  const { v, set } = useForm();
  return (
    <input
      size={1}
      autoComplete="off"
      inputMode={numeric ? "numeric" : undefined}
      className={cn(
        "uline",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      value={v[id] ?? ""}
      onChange={(e) =>
        set(id, numeric ? sanitizeNumeric(e.target.value) : toBn(e.target.value))
      }
    />
  );
}

/** date / time field – opens the native picker, displays Bengali digits */
export function Picker({
  id,
  kind,
  className,
}: {
  id: string;
  kind: "date" | "time";
  className?: string;
}) {
  const { v, set } = useForm();
  const [editing, setEditing] = useState(false);
  const raw = v[id] ?? "";

  if (editing) {
    return (
      <input
        type={kind}
        autoFocus
        className={cn("inp picker", className)}
        value={raw}
        onChange={(e) => set(id, e.target.value)}
        onBlur={() => setEditing(false)}
      />
    );
  }
  return (
    <input
      readOnly
      className={cn("inp cursor-pointer", className)}
      value={kind === "date" ? bnDate(raw) : bnTime(raw)}
      onFocus={() => setEditing(true)}
      onClick={() => setEditing(true)}
    />
  );
}

/** select field rendered borderless so it prints like plain text */
export function Sel({
  id,
  options,
  className,
  align = "left",
}: {
  id: string;
  options: string[];
  className?: string;
  align?: Align;
}) {
  const { v, set } = useForm();
  return (
    <select
      className={cn(
        "inp selfld",
        align === "left" && "left",
        align === "center" && "text-center",
        className,
      )}
      value={v[id] ?? ""}
      onChange={(e) => set(id, e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* ------------------------------------------------------------------ */
/* table cells                                                          */
/* ------------------------------------------------------------------ */
type CellBase = {
  colSpan?: number;
  rowSpan?: number;
  className?: string;
};

/** numeric input cell */
export function C({
  id,
  align = "center",
  colSpan,
  rowSpan,
  className,
}: CellBase & { id: string; align?: Align }) {
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} className={cn("p-0", className)}>
      <F id={id} align={align} />
    </td>
  );
}

/** text input cell */
export function CT({
  id,
  align = "left",
  colSpan,
  rowSpan,
  className,
}: CellBase & { id: string; align?: Align }) {
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} className={cn("p-0", className)}>
      <FT id={id} align={align} />
    </td>
  );
}

/** date / time cell */
export function CP({
  id,
  kind,
  colSpan,
  rowSpan,
  className,
}: CellBase & { id: string; kind: "date" | "time" }) {
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} className={cn("p-0", className)}>
      <Picker id={id} kind={kind} />
    </td>
  );
}

/**
 * auto-calculated cell that can still be overridden by hand.
 * Empty the box and the calculated value comes back.
 */
export function Calc({
  id,
  value,
  colSpan,
  rowSpan,
  className,
}: CellBase & { id: string; value: string }) {
  const { v, set } = useForm();
  const manual = v[id];
  const shown = manual && manual.length ? manual : value;
  return (
    <td colSpan={colSpan} rowSpan={rowSpan} className={cn("p-0", className)}>
      <input
        size={1}
        inputMode="numeric"
        autoComplete="off"
        className={cn("inp", manual ? "manual" : "calc")}
        value={shown}
        onChange={(e) => set(id, sanitizeNumeric(e.target.value))}
        title="স্বয়ংক্রিয় হিসাব — চাইলে নিজে লিখে পরিবর্তন করা যাবে"
      />
    </td>
  );
}

/** textarea cell */
export function TA({
  id,
  rows = 4,
  colSpan,
  rowSpan,
  className,
  style,
}: CellBase & { id: string; rows?: number; style?: React.CSSProperties }) {
  const { v, set } = useForm();
  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn("p-0 align-top", className)}
      style={style}
    >
      <textarea
        rows={rows}
        className="inp ta"
        value={v[id] ?? ""}
        onChange={(e) => set(id, toBn(e.target.value))}
      />
    </td>
  );
}

/** label cell */
export function L({
  children,
  colSpan,
  rowSpan,
  className,
  align = "left",
  tone,
}: CellBase & {
  children?: ReactNode;
  align?: Align;
  tone?: "blue" | "green" | "orange";
}) {
  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        align === "left" && "lbl",
        align === "right" && "text-right pr-1",
        tone && `tone-${tone}`,
        className,
      )}
    >
      {children}
    </td>
  );
}

/** header cell */
export function H({
  children,
  colSpan,
  rowSpan,
  className,
  tone = "blue",
  align = "center",
}: CellBase & {
  children?: ReactNode;
  tone?: "blue" | "green" | "orange" | "none";
  align?: Align;
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(
        tone !== "none" && `tone-${tone}`,
        align === "left" && "lbl",
        className,
      )}
    >
      {children}
    </th>
  );
}

/** vertical (rotated) header cell */
export function VH({
  children,
  colSpan,
  rowSpan,
  className,
  tone = "blue",
  h = 84,
  tiny,
}: CellBase & {
  children?: ReactNode;
  tone?: "blue" | "green" | "orange" | "none";
  h?: number;
  tiny?: boolean;
}) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={cn(tone !== "none" && `tone-${tone}`, "p-0", className)}
    >
      <span
        className={cn("vt wrap", tiny && "tiny")}
        style={{ maxHeight: h, height: h }}
      >
        {children}
      </span>
    </th>
  );
}

/** vertical label used at the left edge of a block */
export function VL({
  children,
  rowSpan,
  className,
  tone,
}: CellBase & { children?: ReactNode; tone?: "blue" | "green" | "orange" }) {
  return (
    <td
      rowSpan={rowSpan}
      className={cn("p-0", tone && `tone-${tone}`, className)}
    >
      <span className="vt" style={{ whiteSpace: "nowrap" }}>
        {children}
      </span>
    </td>
  );
}

/** empty cell */
export function E({ colSpan, rowSpan, className }: CellBase) {
  return <td colSpan={colSpan} rowSpan={rowSpan} className={className} />;
}

/** colgroup helper – takes relative weights */
export function Cols({ w }: { w: number[] }) {
  const total = w.reduce((a, b) => a + b, 0) || 1;
  return (
    <colgroup>
      {w.map((x, i) => (
        <col key={i} style={{ width: `${((x / total) * 100).toFixed(4)}%` }} />
      ))}
    </colgroup>
  );
}

/** section bar used on the planning page */
export function SecBar({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "orange";
}) {
  return <div className={cn("sechead", `tone-${tone}`)}>{children}</div>;
}

/** signature slot printed at the bottom of a page */
export function Sig({
  id,
  label,
  dateId,
}: {
  id: string;
  label: string;
  dateId?: string;
}) {
  const { v } = useForm();
  const src = v[id];
  return (
    <div className="text-center">
      <div className="flex h-[70px] items-end justify-center">
        {src ? <img src={src} alt="" className="sigimg" /> : null}
      </div>
      <div className="sigline">{label}</div>
      {dateId ? (
        <div className="flex items-end justify-center gap-1 text-[11.5px]">
          <span>তারিখঃ</span>
          <span className="inline-block w-[92px]">
            <Picker id={dateId} kind="date" className="uline-look" />
          </span>
        </div>
      ) : null}
    </div>
  );
}
