import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MONTHS_BN, UPASHAKHA_LIST, WARD_DEFAULT } from "./constants";

export type Values = Record<string, string>;

type Ctx = {
  v: Values;
  set: (key: string, value: string) => void;
  reset: () => void;
  load: (data: Values) => void;
};

const FormCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "monthly-report-form-v2";

/* ------------------------------------------------------------------ */
/* Bengali digits                                                       */
/* ------------------------------------------------------------------ */
const BN_D = "০১২৩৪৫৬৭৮৯";

const BN_TO_EN: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/** Converts every ASCII digit inside a string to a Bengali digit. */
export function toBn(s: string): string {
  return s.replace(/[0-9]/g, (d) => BN_D[Number(d)]);
}

/** Keeps only digits / separators and returns them in Bengali. */
export function sanitizeNumeric(s: string): string {
  const cleaned = s.replace(/[^0-9০-৯.,\-+/%\s]/g, "");
  return toBn(cleaned);
}

/** Parses a value that may contain Bengali or English digits. */
export function num(raw?: string): number {
  if (!raw) return 0;
  let s = "";
  for (const ch of raw) s += BN_TO_EN[ch] ?? ch;
  const cleaned = s.replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** Formats a computed number as a Bengali-digit string. */
export function fmt(n: number): string {
  if (!n) return "";
  return toBn(String(Math.round(n * 100) / 100));
}

/** "2026-03-05" → "০৫/০৩/২০২৬" */
export function bnDate(iso: string): string {
  if (!iso) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return toBn(iso);
  return toBn(`${m[3]}/${m[2]}/${m[1]}`);
}

/** "14:30" → "০২:৩০ PM" */
export function bnTime(raw: string): string {
  if (!raw) return "";
  const m = /^(\d{1,2}):(\d{2})/.exec(raw);
  if (!m) return toBn(raw);
  let h = Number(m[1]);
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${toBn(String(h).padStart(2, "0"))}:${toBn(m[2])} ${ap}`;
}

/* ------------------------------------------------------------------ */
/* provider                                                             */
/* ------------------------------------------------------------------ */
function readStore(): Values {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as Values;
  } catch {
    /* ignore */
  }
  return {};
}

function withDefaults(data: Values): Values {
  const next = { ...data };
  if (!next.hdr_upashakha) next.hdr_upashakha = UPASHAKHA_LIST[0];
  if (!next.hdr_ward) next.hdr_ward = WARD_DEFAULT;
  if (!next.hdr_mas) next.hdr_mas = MONTHS_BN[new Date().getMonth()];
  if (!next.hdr_session) next.hdr_session = toBn(String(new Date().getFullYear()));
  return next;
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [v, setV] = useState<Values>(() => withDefaults(readStore()));

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
      } catch {
        /* ignore */
      }
    }, 250);
    return () => clearTimeout(t);
  }, [v]);

  const set = useCallback((key: string, value: string) => {
    setV((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setV(withDefaults({})), []);
  const load = useCallback((data: Values) => setV(withDefaults(data ?? {})), []);

  const value = useMemo(() => ({ v, set, reset, load }), [v, set, reset, load]);

  return <FormCtx.Provider value={value}>{children}</FormCtx.Provider>;
}

export function useForm(): Ctx {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error("useForm must be used inside <FormProvider>");
  return ctx;
}
