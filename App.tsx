import { useEffect, useRef, useState } from "react";
import { FormProvider, toBn, useForm, type Values } from "./form/FormContext";
import { MONTHS_BN, UPASHAKHA_LIST } from "./form/constants";
import PageReport1 from "./pages/PageReport1";
import PageReport2 from "./pages/PageReport2";
import PagePlan from "./pages/PagePlan";
import SignatureUpload from "./components/SignatureUpload";
import { cn } from "./utils/cn";

const A4_PX = 794;

const SIGS: [string, string][] = [
  ["sig_secretary", "সেক্রেটারির স্বাক্ষর"],
  ["sig_baytulmal", "বায়তুলমাল সম্পাদকের স্বাক্ষর"],
  ["sig_president", "সভাপতির স্বাক্ষর"],
];

function scrollToPage(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ControlPanel({
  zoom,
  setZoom,
  fitWidth,
  fields,
  setFields,
  incl,
  togglePage,
  avroMode,
  setAvroMode,
}: {
  zoom: number;
  setZoom: (z: number) => void;
  fitWidth: () => void;
  fields: boolean;
  setFields: (b: boolean) => void;
  incl: boolean[];
  togglePage: (i: number) => void;
  avroMode: boolean;
  setAvroMode: (b: boolean) => void;
}) {
  const { v, set, reset, load } = useForm();
  const fileRef = useRef<HTMLInputElement>(null);

  const years = Array.from({ length: 7 }, (_, i) =>
    toBn(String(new Date().getFullYear() - 2 + i)),
  );

  const download = () => {
    const blob = new Blob([JSON.stringify(v, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `masik-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="panel-container">
        <div className="panel-header">
          <span>📋 সাধারণ তথ্য</span>
          <span className="text-[13px] font-normal opacity-90">
            এখানে দিলে তিন পৃষ্ঠাতেই বসে যাবে
          </span>
        </div>
        <div className="glass-content">
          <div className="input-grid">
            <div>
              <label className="ui-label">উপশাখার নাম</label>
              <select
                className="ui-input"
                value={v.hdr_upashakha ?? ""}
                onChange={(e) => set("hdr_upashakha", e.target.value)}
              >
                {UPASHAKHA_LIST.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="ui-label">ওয়ার্ড</label>
              <input
                className="ui-input"
                value={v.hdr_ward ?? ""}
                onChange={(e) => set("hdr_ward", toBn(e.target.value))}
              />
            </div>
            <div>
              <label className="ui-label">মাস</label>
              <select
                className="ui-input"
                value={v.hdr_mas ?? ""}
                onChange={(e) => set("hdr_mas", e.target.value)}
              >
                {MONTHS_BN.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="ui-label">সেশন</label>
              <select
                className="ui-input"
                value={v.hdr_session ?? ""}
                onChange={(e) => set("hdr_session", e.target.value)}
              >
                {years.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-container">
        <div className="panel-header">
          <span>✍️ স্বাক্ষর আপলোড</span>
          <span className="text-[13px] font-normal opacity-90">
            আপলোড করা স্বাক্ষর প্রিন্টেও আসবে
          </span>
        </div>
        <div className="glass-content">
          <div className="input-grid">
            {SIGS.map(([id, label]) => (
              <SignatureUpload key={id} id={id} title={label} />
            ))}
          </div>
        </div>
      </div>

      <div className="panel-container">
        <div className="panel-header">
          <span>🖨️ প্রিন্ট ও সংরক্ষণ</span>
          <div className="flex items-center gap-2">
            <button
              className="rounded-full bg-white/20 px-3 py-1 text-[18px] font-bold leading-none"
              onClick={() => setZoom(Math.max(0.3, +(zoom - 0.1).toFixed(2)))}
            >
              −
            </button>
            <span className="w-[52px] text-center text-[15px]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className="rounded-full bg-white/20 px-3 py-1 text-[18px] font-bold leading-none"
              onClick={() => setZoom(Math.min(2.5, +(zoom + 0.1).toFixed(2)))}
            >
              +
            </button>
            <button
              className="rounded-full bg-white/20 px-3 py-1 text-[13px] font-bold leading-none"
              onClick={fitWidth}
            >
              ↔ ফিট
            </button>
          </div>
        </div>
        <div className="glass-content">
          <div className="mb-3 flex flex-wrap gap-2">
            <button className="btn btn-accent" onClick={() => window.print()}>
              🖨️ প্রিন্ট / PDF সেভ করুন
            </button>
            <button className="btn btn-green" onClick={download}>
              💾 ব্যাকআপ
            </button>
            <button
              className="btn btn-primary"
              onClick={() => fileRef.current?.click()}
            >
              📂 রিস্টোর
            </button>
            <button
              className="btn btn-gray"
              onClick={() => setFields(!fields)}
            >
              {fields ? "👁️ ঘর হাইলাইট চালু" : "🚫 ঘর হাইলাইট বন্ধ"}
            </button>
            <button
              className="btn btn-red"
              onClick={() => {
                if (confirm("সব তথ্য মুছে ফেলতে চান?")) reset();
              }}
            >
              🗑️ খালি করুন
            </button>
            <button
              className={cn(
                "btn",
                avroMode ? "btn-green" : "btn-gray",
              )}
              onClick={() => setAvroMode(!avroMode)}
            >
              {avroMode ? "⌨️ Avro অন" : "⌨️ Avro বন্ধ"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const fr = new FileReader();
                  fr.onload = () => {
                    try {
                      load(JSON.parse(String(fr.result)) as Values);
                    } catch {
                      alert("ফাইলটি পড়া যায়নি। সঠিক ব্যাকআপ ফাইল দিন।");
                    }
                  };
                  fr.readAsText(f);
                }
                e.target.value = "";
              }}
            />
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <b className="text-[14px]">প্রিন্টে থাকবে:</b>
            {["পৃষ্ঠা ১ (রিপোর্ট)", "পৃষ্ঠা ২ (আয়-ব্যয়)", "পৃষ্ঠা ৩ (পরিকল্পনা)"].map(
              (label, i) => (
                <label
                  key={label}
                  className={cn(
                    "cursor-pointer select-none rounded-full px-3 py-1.5 text-[13px] font-bold ring-1 transition-colors",
                    incl[i]
                      ? "bg-[#1b5e20] text-white ring-[#1b5e20]"
                      : "bg-white text-gray-500 ring-gray-300",
                  )}
                >
                  <input
                    type="checkbox"
                    className="mr-1.5 align-middle"
                    checked={incl[i]}
                    onChange={() => togglePage(i)}
                  />
                  {label}
                </label>
              ),
            )}
          </div>

          <div className="rounded-lg bg-white p-3 text-[13.5px] leading-relaxed ring-1 ring-gray-200">
            <b className="text-[#004d99]">ব্যবহারবিধি:</b> সংখ্যার ঘরে যে ভাষাতেই
            লিখুন, স্বয়ংক্রিয়ভাবে <b>বাংলা সংখ্যায়</b> রূপান্তর হবে (মোবাইলে
            নাম্বার কিবোর্ড আসবে)। <b>Tab</b> চাপলে পরের ঘরে, <b>Shift + Tab</b>{" "}
            চাপলে আগের ঘরে যাবে; <b>Enter</b> দিলেও পরের ঘরে যাবে।{" "}
            <b>তারিখ/সময়ের</b> ঘরে ক্লিক করলে ক্যালেন্ডার ও ঘড়ি আসবে। সবুজ ঘরগুলোর
            যোগফল নিজে থেকেই বসে, তবে চাইলে হাতে লিখে পরিবর্তনও করা যাবে (ঘর খালি
            করলে আবার অটো হিসাব ফিরে আসবে)। প্রিন্টে <b>A4</b>,{" "}
            <b>Margins = None</b> ও <b>Background graphics</b> চালু রাখুন।
          </div>
        </div>
      </div>
    </>
  );
}

function Shell() {
  const [zoom, setZoomState] = useState(1);
  const [fields, setFields] = useState(true);
  const [menu, setMenu] = useState(false);
  const [incl, setIncl] = useState<boolean[]>([true, true, true]);
  const [avroMode, setAvroMode] = useState(true);
  const lastIncluded = incl.lastIndexOf(true);

  const togglePage = (i: number) =>
    setIncl((prev) => {
      const next = prev.map((x, j) => (j === i ? !x : x));
      return next.some(Boolean) ? next : prev;
    });

  const fitWidth = () => {
    const w = window.innerWidth - 24;
    setZoomState(Math.min(1, Math.max(0.28, +(w / A4_PX).toFixed(2))));
  };

  useEffect(() => {
    fitWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wrapRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA") return;
    e.preventDefault();
    const nodes = Array.from(
      wrapRef.current?.querySelectorAll<HTMLElement>("input, textarea, select") ?? [],
    );
    const i = nodes.indexOf(target);
    if (i >= 0 && i < nodes.length - 1) nodes[i + 1].focus();
  };

  const go = (fn: () => void) => () => {
    setMenu(false);
    setTimeout(fn, 120);
  };

  useEffect(() => {
    const onInput = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target || !isTextField(target)) return;

      const el = target as HTMLInputElement | HTMLTextAreaElement;
      const numeric = isNumericField(el);

      if (numeric) {
        const nextValue = toBanglaNum(el.value);
        if (nextValue !== el.value) el.value = nextValue;
        return;
      }

      if (!avroMode) return;
      const nextValue = transliterateBangla(el.value);
      if (nextValue !== el.value) {
        el.value = nextValue;
      }
    };

    document.addEventListener("input", onInput, true);
    return () => document.removeEventListener("input", onInput, true);
  }, [avroMode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !isTextField(target)) return;

      const el = target as HTMLInputElement | HTMLTextAreaElement;
      if (isNumericField(el)) {
        el.setAttribute("lang", "bn");
        return;
      }

      if (!avroMode) return;
      if ((event.altKey || event.ctrlKey) && event.key === " ") {
        event.preventDefault();
        cycleCurrentWord(el);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        cycleCurrentWord(el);
        return;
      }

      if (event.altKey || event.ctrlKey || event.metaKey) return;
      el.setAttribute("lang", "bn");
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [avroMode]);

  return (
    <div className="min-h-screen" lang="bn">
      <div className="no-print fixed left-3 top-3 z-[1001]">
        <button
          className="hamburger"
          onClick={() => setMenu((m) => !m)}
          aria-label="menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={cn("side-menu no-print", menu && "active")}>
        <a onClick={go(() => scrollToPage("page-1"))}>📄 পৃষ্ঠা ১ — মাসিক রিপোর্ট</a>
        <a onClick={go(() => scrollToPage("page-2"))}>📄 পৃষ্ঠা ২ — আয়-ব্যয় ও তালিকা</a>
        <a onClick={go(() => scrollToPage("page-3"))}>📄 পৃষ্ঠা ৩ — মাসিক পরিকল্পনা</a>
        <a onClick={go(() => window.scrollTo({ top: 0, behavior: "smooth" }))}>
          ⚙️ কন্ট্রোল প্যানেল
        </a>
        <a onClick={go(() => window.print())}>🖨️ প্রিন্ট / PDF সেভ</a>
        <a onClick={go(fitWidth)}>↔ স্ক্রিনে ফিট করুন</a>
        <a onClick={go(() => setFields(!fields))}>
          {fields ? "🚫 ঘর হাইলাইট বন্ধ করুন" : "👁️ ঘর হাইলাইট চালু করুন"}
        </a>
      </div>

      {menu && (
        <div
          className="no-print fixed inset-0 z-[999] bg-black/25"
          onClick={() => setMenu(false)}
        />
      )}

      <div className="no-print mx-auto max-w-[1200px] px-4 pb-1 pt-6">
        <div className="mb-6 text-center">
          <h1 className="main-title">মাসিক রিপোর্ট ও পরিকল্পনা</h1>
          <div className="sub-title">উপশাখা / ইউনিট — ফরম পূরণ ও প্রিন্ট</div>
        </div>

        <ControlPanel
          zoom={zoom}
          setZoom={setZoomState}
          fitWidth={fitWidth}
          fields={fields}
          setFields={setFields}
          incl={incl}
          togglePage={togglePage}
          avroMode={avroMode}
          setAvroMode={setAvroMode}
        />
      </div>

      <div className="pagesScroll">
        <div
          ref={wrapRef}
          onKeyDown={onKeyDown}
          className={cn("pagesWrap pb-6", fields && "fieldsOn")}
          style={{ ["--zoom" as string]: zoom }}
        >
          {[
            <PageReport1 key="1" />,
            <PageReport2 key="2" />,
            <PagePlan key="3" />,
          ].map((node, i) => (
            <div
              key={i}
              className={cn(
                !incl[i] && "print-hide",
                incl[i] && i === lastIncluded && "print-last",
              )}
            >
              {node}
            </div>
          ))}
        </div>
      </div>

      <div className="no-print pb-8 text-center text-[13px] font-bold text-[#004d99]">
        মোট ৩টি A4 পৃষ্ঠা — উপশাখা/ইউনিটের মাসিক রিপোর্ট (২ পৃষ্ঠা) ও উপশাখার মাসিক
        পরিকল্পনা (১ পৃষ্ঠা)
      </div>
    </div>
  );
}

const AVRO_CONSONANTS: [string, string][] = [
  ["kh", "খ"],["gh", "ঘ"],["ng", "ং"],["ch", "চ"],["jh", "ঝ"],
  ["sh", "শ"],["ss", "ষ"],["th", "থ"],["dh", "ধ"],["ph", "ফ"],
  ["bh", "ভ"],["rr", "র"],["k", "ক"],["g", "গ"],["c", "চ"],["j", "জ"],
  ["t", "ত"],["d", "দ"],["n", "ন"],["p", "প"],["b", "ব"],["m", "ম"],
  ["y", "য"],["r", "র"],["l", "ল"],["s", "স"],["h", "হ"],["q", "ক"],
  ["w", "ও"],["v", "ভ"],["x", "ক্স"],["z", "জ"],
];

const AVRO_VOWELS: [string, string][] = [
  ["aa", "আ"],["A", "আ"],["a", "া"],
  ["ii", "ী"],["ee", "ী"],["i", "ি"],["I", "ই"],
  ["uu", "ূ"],["u", "ু"],["U", "উ"],
  ["ou", "ৌ"],["oi", "ৈ"],["ai", "ৈ"],["au", "ৌ"],
  ["oo", "ূ"],["o", "ো"],["O", "ও"],
  ["E", "এ"],["e", "ে"],
];

const AVRO_RULES: [string, string][] = [
  ...AVRO_CONSONANTS,
  ...AVRO_VOWELS,
  ["0", "০"],["1", "১"],["2", "২"],["3", "৩"],["4", "৪"],
  ["5", "৫"],["6", "৬"],["7", "৭"],["8", "৮"],["9", "৯"],
];

const ALTERNATE_RULES: Record<string, string[]> = {
  a: ["া", "আ"],
  aa: ["আ", "া"],
  i: ["ি", "ই"],
  ii: ["ী", "ি"],
  ee: ["ী", "ি"],
  u: ["ু", "উ"],
  uu: ["ূ", "ু"],
  o: ["ো", "ও"],
  oo: ["ূ", "ু"],
  e: ["ে", "এ"],
  ai: ["ৈ", "ে"],
  oi: ["ৈ", "ে"],
  ou: ["ৌ", "ও"],
  au: ["ৌ", "ও"],
};

function wordCandidates(raw: string): string[] {
  const word = raw.trim();
  if (!word) return [""];

  const out: string[] = [""];

  for (let i = 0; i < word.length; ) {
    let matched: string | null = null;
    let mapping: string[] = [""];

    for (const [roman, bangla] of AVRO_RULES) {
      if (word.slice(i).toLowerCase().startsWith(roman.toLowerCase())) {
        const candidateList = ALTERNATE_RULES[roman.toLowerCase()] ?? [bangla];
        if (roman.length > (matched?.length ?? 0)) {
          matched = roman;
          mapping = candidateList;
        }
      }
    }

    if (!matched) {
      const next = out.map((v) => v + word[i]);
      out.splice(0, out.length, ...next);
      i += 1;
      continue;
    }

    const next: string[] = [];
    for (const base of out) {
      for (const opt of mapping) {
        next.push(base + opt);
      }
    }
    out.splice(0, out.length, ...next);
    i += matched.length;
  }

  return Array.from(new Set(out)).filter(Boolean);
}

function transliterateBangla(raw: string): string {
  if (!raw) return raw;

  const parts = raw.split(/(\s+)/);
  return parts
    .map((part) => {
      if (!part.trim()) return part;
      if (!/[a-zA-Z0-9]/.test(part)) return part;
      const candidates = wordCandidates(part.replace(/[^a-zA-Z0-9]/g, ""));
      return candidates[0] ?? part;
    })
    .join("");
}

function cycleCurrentWord(el: HTMLInputElement | HTMLTextAreaElement) {
  const pos = el.selectionStart ?? el.value.length;
  const before = el.value.slice(0, pos);
  const after = el.value.slice(pos);
  const match = before.match(/[A-Za-z0-9]+$/);
  if (!match) return;

  const word = match[0];
  const start = before.length - word.length;
  const options = wordCandidates(word);
  if (options.length < 2) return;

  const saved = (el as any).__avroState ?? { index: 0, options };
  const nextIndex = (saved.index + 1) % saved.options.length;
  saved.index = nextIndex;
  saved.options = options;
  (el as any).__avroState = saved;

  const newBefore = before.slice(0, start) + options[nextIndex];
  el.value = newBefore + after;
  const newPos = newBefore.length;
  el.setSelectionRange(newPos, newPos);
}

const isTextField = (el: HTMLElement) => {
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return false;
  const type = el.type.toLowerCase();
  return ![
    "button",
    "submit",
    "reset",
    "checkbox",
    "radio",
    "file",
    "hidden",
    "number",
    "date",
    "time",
    "email",
    "password",
  ].includes(type);
};

const isNumericField = (el: HTMLElement) => {
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return false;
  return ["number", "tel"].includes(el.type.toLowerCase()) || el.getAttribute("inputmode") === "numeric";
};

const toBanglaNum = (str: string | number | undefined | null): string => {
  if (str === undefined || str === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str.toString().replace(/[0-9]/g, (w) => banglaDigits[Number(w)]);
};

export default function App() {
  return (
    <FormProvider>
      <Shell />
    </FormProvider>
  );
}
