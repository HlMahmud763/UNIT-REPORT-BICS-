import A4Page from "../components/A4Page";
import AcademicTable from "../components/AcademicTable";
import {
  C,
  CP,
  CT,
  Cols,
  E,
  H,
  L,
  SecBar,
  Sel,
  Sig,
  U,
} from "../components/Field";
import { MONTHS_BN, UPASHAKHA_LIST } from "../form/constants";

const RH = 19;
const HH = 18;

const PLAN_SOVA = [
  "কর্মী বৈঠক",
  "সাধারণ সভা",
  "সমর্থক সভা",
  "সাধারণ জ্ঞান/কুইজ প্রতিযোগিতা",
  "ফল/চা-চক্র/ফলচক্র",
  "ক্রীড়া প্রতিযোগিতা",
];

const PLAN_TRAIN = [
  "কুরআন তালিম",
  "সামষ্টিক পাঠ",
  "সমর্থক শিক্ষাবৈঠক",
  "সামষ্টিক ভোজ",
];

const BITORON_ROWS: [string, string, string][] = [
  ["কুরআন/ হাদিস", "স্টিকার/কার্ড", "কিশোর পত্রিকা বাংলা"],
  ["সাহিত্য", "ক্লাস রুটিন", "কিশোর পত্রিকা ইংরেজি"],
  ["পরিচিতি", "হাতে লেখা চিঠি/অন্যান্য", "ছাত্রসংবাদ"],
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-1.5 text-[12px] leading-[19px]">
      <span className="text-[8px] leading-[19px]">▪</span>
      {children}
    </div>
  );
}

export default function PagePlan() {
  return (
    <A4Page id="page-3">
      {/* ---------------- title ---------------- */}
      <div className="text-center text-[12px] leading-[16px]">
        বিসমিল্লাহির রাহমানির রাহিম
      </div>
      <div className="text-center text-[21px] font-bold leading-[26px]">
        উপশাখার মাসিক পরিকল্পনা
      </div>

      {/* ---------------- header ---------------- */}
      <table className="frm mt-[5px]">
        <Cols w={[14, 25, 8, 15, 7, 13, 8, 12]} />
        <tbody>
          <tr style={{ height: 26 }}>
            <L className="f13 bold">উপশাখার নাম</L>
            <td className="p-0">
              <Sel id="hdr_upashakha" options={UPASHAKHA_LIST} className="hdrfld" />
            </td>
            <L className="f13 bold">ওয়ার্ড</L>
            <td className="p-0">
              <U id="hdr_ward" className="hdrfld hdru w-full" />
            </td>
            <L className="f13 bold">মাস</L>
            <td className="p-0">
              <Sel id="hdr_mas" options={MONTHS_BN} className="hdrfld" />
            </td>
            <L className="f13 bold">সেশন</L>
            <td className="p-0">
              <U id="hdr_session" className="hdrfld hdru w-full" numeric />
            </td>
          </tr>
        </tbody>
      </table>

      {/* ---------------- জনশক্তি ---------------- */}
      <div className="mt-[6px]">
        <SecBar>জনশক্তি</SecBar>
        <div className="px-[10px] py-[1px]">
          {[
            ["সাথী বৃদ্ধি সংখ্যা:", "sathi"],
            ["সাথীপ্রার্থী বৃদ্ধি সংখ্যা:", "sathiprarthi"],
            ["কর্মী বৃদ্ধি সংখ্যা:", "kormi"],
          ].map(([label, key]) => (
            <Bullet key={key}>
              <span className="whitespace-nowrap">{label}</span>
              <span className="w-[46px]">
                <U
                  id={`pl_js_${key}_no`}
                  className="w-full"
                  align="center"
                  numeric
                />
              </span>
              <span className="whitespace-nowrap">নাম:</span>
              <span className="flex-1">
                <U id={`pl_js_${key}_nam`} className="w-full" />
              </span>
            </Bullet>
          ))}
        </div>
      </div>

      {/* ---------------- দাওয়াত ---------------- */}
      <div className="mt-[4px]">
        <SecBar>দাওয়াত</SecBar>
        <div className="px-[10px] py-[1px]">
          <Bullet>
            <span className="whitespace-nowrap">সমর্থক বৃদ্ধি সংখ্যা:</span>
            <span className="w-[46px]">
              <U id="pl_dw_somorthok_no" className="w-full" align="center" numeric />
            </span>
            <span className="whitespace-nowrap">নাম:</span>
            <span className="flex-1">
              <U id="pl_dw_somorthok_nam" className="w-full" />
            </span>
          </Bullet>
          <Bullet>
            <span className="whitespace-nowrap">বন্ধু বৃদ্ধি সংখ্যা:</span>
            <span className="w-[46px]">
              <U id="pl_dw_bondhu_no" className="w-full" align="center" numeric />
            </span>
            <span className="whitespace-nowrap">নাম:</span>
            <span className="flex-1">
              <U id="pl_dw_bondhu_nam" className="w-full" />
            </span>
          </Bullet>
          <div className="flex gap-5">
            <Bullet>
              <span className="whitespace-nowrap">অমুসলিম সমর্থক বৃদ্ধিঃ</span>
              <span className="w-[130px]">
                <U id="pl_dw_omuslim_somorthok" className="w-full" />
              </span>
            </Bullet>
            <Bullet>
              <span className="whitespace-nowrap">অমুসলিম বন্ধু বৃদ্ধিঃ</span>
              <span className="w-[130px]">
                <U id="pl_dw_omuslim_bondhu" className="w-full" />
              </span>
            </Bullet>
          </div>
          <Bullet>
            <span className="whitespace-nowrap">শুভাকাঙ্ক্ষী বৃদ্ধিঃ</span>
            <span className="flex-1">
              <U id="pl_dw_shubhakankhi" className="w-full" />
            </span>
          </Bullet>
        </div>
      </div>

      {/* ---------------- একাডেমিক আউটপুট পরিকল্পনা ---------------- */}
      <div className="mt-[4px]">
        <SecBar>একাডেমিক আউটপুট পরিকল্পনা</SecBar>
        <AcademicTable
          rows={["সাথী", "কর্মী", "সমর্থক"]}
          prefix="plan"
          rowH={RH}
          vhead={82}
        />
      </div>

      {/* ---------------- গ্রুপ দাওয়াতি কাজ ---------------- */}
      <div className="mt-[4px]">
        <SecBar>গ্রুপ দাওয়াতি কাজ: প্রতি সোমবার</SecBar>
        <table className="frm">
          <Cols w={[12, 12.5, 12.5, 15, 12, 12, 12, 15]} />
          <thead>
            <tr style={{ height: HH }}>
              {["বার", "তারিখ", "সময়", "স্থান", "বার", "তারিখ", "সময়", "স্থান"].map(
                (t, i) => (
                  <H key={i} tone="none" className="f11">
                    {t}
                  </H>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {[
              ["১ম সোমবার", "৩য় সোমবার"],
              ["২য় সোমবার", "৪র্থ সোমবার"],
            ].map(([a, b]) => (
              <tr key={a} style={{ height: RH }}>
                <L className="f11">{a}</L>
                <CP id={`pl_grp_${a}_tarikh`} kind="date" />
                <CP id={`pl_grp_${a}_somoy`} kind="time" />
                <CT id={`pl_grp_${a}_sthan`} align="center" />
                <L className="f11">{b}</L>
                <CP id={`pl_grp_${b}_tarikh`} kind="date" />
                <CP id={`pl_grp_${b}_somoy`} kind="time" />
                <CT id={`pl_grp_${b}_sthan`} align="center" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- মসজিদভিত্তিক দাওয়াতি কাজ ---------------- */}
      <div className="mt-[4px]">
        <SecBar>মসজিদভিত্তিক দাওয়াতি কাজ</SecBar>
        <table className="frm">
          <Cols w={[24, 42, 34]} />
          <thead>
            <tr style={{ height: HH }}>
              <H tone="none" className="f11">
                কতটি মসজিদে কাজ করা হবে
              </H>
              <H tone="none" className="f11">
                মসজিদের নাম
              </H>
              <H tone="none" className="f11">
                প্রোগ্রামের ধরণ
              </H>
            </tr>
          </thead>
          <tbody>
            {[0, 1].map((i) => (
              <tr key={i} style={{ height: RH }}>
                <C id={`pl_mosjid_${i}_koyti`} />
                <CT id={`pl_mosjid_${i}_nam`} />
                <CT id={`pl_mosjid_${i}_dhoron`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- বিতরণ ---------------- */}
      <div className="mt-[4px]">
        <SecBar>বিতরণ</SecBar>
        <table className="frm">
          <Cols w={[16, 9.5, 18, 9.5, 20, 9.5, 13]} />
          <thead>
            <tr style={{ height: HH }}>
              <H tone="none" className="f11">
                উপকরণ
              </H>
              <H tone="none" className="f11">
                সংখ্যা
              </H>
              <H tone="none" className="f11">
                উপকরণ
              </H>
              <H tone="none" className="f11">
                সংখ্যা
              </H>
              <H tone="none" className="f11">
                উপকরণ
              </H>
              <H tone="none" className="f11">
                সংখ্যা
              </H>
              <H tone="none" className="f10">
                গ্রাহক বৃদ্ধি
              </H>
            </tr>
          </thead>
          <tbody>
            {BITORON_ROWS.map(([a, b, c]) => (
              <tr key={a} style={{ height: RH }}>
                <L className="f11">{a}</L>
                <C id={`pl_bit_${a}`} />
                <L className="f11">{b}</L>
                <C id={`pl_bit_${b}`} />
                <L className="f11">{c}</L>
                <C id={`pl_bit_${c}`} />
                <C id={`pl_bit_${c}_grahok`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- সভাসমূহ / প্রশিক্ষণ ---------------- */}
      <table className="frm mt-[4px]">
        <Cols w={[20, 6.5, 10.5, 9, 11, 17, 6.5, 9.5, 9, 11]} />
        <thead>
          <tr style={{ height: HH }}>
            <H tone="green" className="f12">
              সভাসমূহ
            </H>
            <H tone="green" className="f10">
              সংখ্যা
            </H>
            <H tone="green" className="f10">
              তারিখ
            </H>
            <H tone="green" className="f10">
              সময়
            </H>
            <H tone="green" className="f10">
              স্থান
            </H>
            <H tone="green" className="f12">
              প্রশিক্ষণ
            </H>
            <H tone="green" className="f10">
              সংখ্যা
            </H>
            <H tone="green" className="f10">
              তারিখ
            </H>
            <H tone="green" className="f10">
              সময়
            </H>
            <H tone="green" className="f10">
              স্থান
            </H>
          </tr>
        </thead>
        <tbody>
          {PLAN_SOVA.map((s, i) => (
            <tr key={s} style={{ height: 19 }}>
              <L className="f11">{s}</L>
              <C id={`pl_sv_${s}_songkhya`} />
              <CP id={`pl_sv_${s}_tarikh`} kind="date" />
              <CP id={`pl_sv_${s}_somoy`} kind="time" />
              <CT id={`pl_sv_${s}_sthan`} align="center" />
              <L className="f11">{PLAN_TRAIN[i] ?? ""}</L>
              {PLAN_TRAIN[i] ? (
                <>
                  <C id={`pl_pr_${PLAN_TRAIN[i]}_songkhya`} />
                  <CP id={`pl_pr_${PLAN_TRAIN[i]}_tarikh`} kind="date" />
                  <CP id={`pl_pr_${PLAN_TRAIN[i]}_somoy`} kind="time" />
                  <CT id={`pl_pr_${PLAN_TRAIN[i]}_sthan`} align="center" />
                </>
              ) : (
                <>
                  <E />
                  <E />
                  <E />
                  <E />
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- ছাত্রকল্যাণ / পাঠাগার ---------------- */}
      <table className="frm mt-[4px]">
        <Cols w={[15, 15, 15, 15, 14, 13, 13]} />
        <thead>
          <tr style={{ height: HH }}>
            <H colSpan={4} tone="green" className="f12">
              ছাত্রকল্যাণ ও ছাত্রসমস্যা
            </H>
            <H colSpan={3} tone="green" className="f12">
              পাঠাগার
            </H>
          </tr>
          <tr style={{ height: 17 }}>
            {[
              "লজিং",
              "টিউশন",
              "টেবিল ব্যাংক",
              "কলসি",
              "পাঠাগার বৃদ্ধি",
              "বই বৃদ্ধি",
              "পাঠক বৃদ্ধি",
            ].map((t, i) => (
              <H key={i} tone="none" className="f11">
                {t}
              </H>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: 21 }}>
            {[
              "lojing",
              "tuition",
              "table_bank",
              "kolsi",
              "pathagar",
              "boi",
              "pathok",
            ].map((k) => (
              <C key={k} id={`pl_kl_${k}`} />
            ))}
          </tr>
        </tbody>
      </table>

      {/* ---------------- বিবিধ ---------------- */}
      <div className="mt-[4px]">
        <SecBar>বিবিধ</SecBar>
        <div className="px-[10px] py-[1px]">
          <Bullet>
            <span className="whitespace-nowrap">
              ঊর্ধ্বতন সংগঠনের কর্মসূচি পালন:
            </span>
          </Bullet>
          <div className="flex items-end gap-2 pl-[16px] text-[12px] leading-[19px]">
            {["১", "২", "৩", "৪"].map((n, i) => (
              <span key={n} className="flex flex-1 items-end gap-1">
                <span>{n}.</span>
                <U id={`pl_kormosuchi_${i}`} className="w-full" />
              </span>
            ))}
          </div>
          <Bullet>
            <span className="whitespace-nowrap">
              দাওয়াতি গ্রুপ প্রেরণ (প্রতিষ্ঠান ও এলাকার নামসহ)
            </span>
            <span className="flex-1">
              <U id="pl_dawati_group_preron" className="w-full" />
            </span>
          </Bullet>
        </div>
      </div>

      {/* ---------------- signature (সভাপতি, ডান পাশে) ---------------- */}
      <div className="mt-auto flex justify-end pr-[26px] pt-[10px]">
        <Sig id="sig_president" label="সভাপতির স্বাক্ষর" dateId="plan_pres_date" />
      </div>
    </A4Page>
  );
}
