import A4Page from "../components/A4Page";
import AcademicTable from "../components/AcademicTable";
import { C, Calc, Cols, E, H, L, Sel, U } from "../components/Field";
import { VH } from "../components/Field";
import { fmt, num, useForm } from "../form/FormContext";
import { MONTHS_BN, UPASHAKHA_LIST } from "../form/constants";

const JS_ROWS = ["সাথী", "সাথীপ্রার্থী", "কর্মী"];

const JS_COLS = [
  "purbo",
  "bortoman",
  "b_songkhya",
  "b_manon",
  "b_agomon",
  "target",
  "bastob",
  "g_songkhya",
  "g_manon",
  "g_chatrotto",
  "g_sthanantor",
  "g_byatikrom",
  "g_uccho",
  "g_chakri",
  "g_intekal",
  "g_shasti",
  "g_kormiman",
  "g_mukto",
];

const DW_ROWS = [
  "সমর্থক",
  "বন্ধু",
  "অমুসলিম সমর্থক",
  "অমুসলিম বন্ধু",
  "শুভাকাঙ্ক্ষী",
];

const DW_COLS = [
  "purbo",
  "bortoman",
  "mot_briddhi",
  "byaktigat",
  "group",
  "school",
  "madrasa",
  "college",
  "university",
  "pokkho",
  "chena",
  "target",
  "bastob",
  "ghatti",
];

const UPOKORON_LEFT = [
  "কুরআন",
  "হাদীস",
  "পরিচিতি",
  "সাহিত্য",
  "স্টিকার/কার্ড",
  "রুটিন",
  "ক্যালেন্ডার",
  "ডায়েরি/নোটবুক",
  "অন্যান্য",
];

const UPOKORON_RIGHT = [
  "কিশোর পত্রিকা বাংলা",
  "কিশোর পত্রিকা ইংরেজি",
  "ছাত্রসংবাদ",
  "ইংরেজি ম্যাগাজিন",
  "সসাস পত্রিকা",
  "মাদরাসা পত্রিকা",
  "স্টুডেন্ট ভিউজ",
  "বিজ্ঞান ম্যাগাজিন",
  "শাখা থেকে প্রকাশিত পত্রিকা",
];

export default function PageReport1() {
  const { v } = useForm();
  const jsTotal = (col: string) =>
    fmt(JS_ROWS.reduce((a, r) => a + num(v[`js_${r}_${col}`]), 0));

  return (
    <A4Page id="page-1">
      {/* ---------------- title ---------------- */}
      <div className="border border-black pb-[3px]">
        <div className="pt-[3px] text-center text-[12px] leading-tight">
          বিসমিল্লাহির রাহমানির রাহিম
        </div>
        <div className="text-center text-[21px] font-bold leading-tight">
          উপশাখা/ইউনিটের মাসিক রিপোর্ট
        </div>
      </div>

      {/* ---------------- header strip ---------------- */}
      <table className="frm mt-[4px]">
        <Cols w={[14, 25, 8, 15, 7, 13, 8, 12]} />
        <tbody>
          <tr style={{ height: 27 }}>
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
      <table className="frm mt-[6px]">
        <Cols
          w={[
            11, 6.6, 6.6, 6.4, 4.6, 4.6, 4.4, 4.4, 6.4, 4.6, 4.6, 4.6, 4.6, 4.4,
            4.4, 4.4, 4.4, 4.4, 4.6,
          ]}
        />
        <thead>
          <tr>
            <H rowSpan={3} className="f13">
              জনশক্তি
            </H>
            <VH rowSpan={3} h={88}>
              পূর্বের সংখ্যা
            </VH>
            <VH rowSpan={3} h={88}>
              বর্তমান সংখ্যা
            </VH>
            <H colSpan={3} className="f11">
              বৃদ্ধি
            </H>
            <VH rowSpan={3} h={88}>
              টার্গেট
            </VH>
            <VH rowSpan={3} h={88}>
              বাস্তবায়ন হার %
            </VH>
            <H colSpan={11} className="f11">
              ঘাটতি
            </H>
          </tr>
          <tr>
            <H rowSpan={2} className="f10">
              সংখ্যা
            </H>
            <VH rowSpan={2} h={70}>
              মানোন্নয়ন
            </VH>
            <VH rowSpan={2} h={70}>
              আগমন
            </VH>
            <H rowSpan={2} className="f10">
              সংখ্যা
            </H>
            <VH rowSpan={2} h={70}>
              মানোন্নয়ন
            </VH>
            <VH rowSpan={2} h={70}>
              ছাত্রত্ব শেষ
            </VH>
            <VH rowSpan={2} h={70}>
              স্থানান্তর
            </VH>
            <VH rowSpan={2} h={70}>
              ব্যতিক্রম
            </VH>
            <H colSpan={2} className="f10">
              বিদেশ
            </H>
            <VH rowSpan={2} h={70}>
              ইন্তেকাল
            </VH>
            <VH rowSpan={2} h={70}>
              শাস্তিপ্রাপ্ত
            </VH>
            <VH rowSpan={2} h={70} tiny>
              কর্মী মান অবনতি
            </VH>
            <VH rowSpan={2} h={70}>
              মুক্তদৃষ্টি
            </VH>
          </tr>
          <tr>
            <VH h={42} tiny>
              উচ্চশিক্ষা
            </VH>
            <VH h={42} tiny>
              চাকরি
            </VH>
          </tr>
        </thead>
        <tbody>
          {JS_ROWS.map((r) => (
            <tr key={r} style={{ height: 22 }}>
              <L className="f12">{r}</L>
              {JS_COLS.map((c) => (
                <C key={c} id={`js_${r}_${c}`} />
              ))}
            </tr>
          ))}
          <tr style={{ height: 22 }}>
            <L className="f12 bold">মোট</L>
            {JS_COLS.map((c) => (
              <Calc key={c} id={`js_total_${c}`} value={jsTotal(c)} />
            ))}
          </tr>
        </tbody>
      </table>

      {/* ---------------- দাওয়াত ---------------- */}
      <table className="frm mt-[6px]">
        <Cols
          w={[13, 8, 8, 6.8, 6.8, 6.4, 4.4, 4.4, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 5.6]}
        />
        <thead>
          <tr>
            <H rowSpan={2} className="f13">
              দাওয়াত
            </H>
            <H rowSpan={2} className="f10">
              পূর্বের সংখ্যা
            </H>
            <H rowSpan={2} className="f10">
              বর্তমান সংখ্যা
            </H>
            <H colSpan={9} className="f11">
              বৃদ্ধি
            </H>
            <VH rowSpan={2} h={78}>
              টার্গেট
            </VH>
            <VH rowSpan={2} h={78}>
              বাস্তবায়ন হার %
            </VH>
            <VH rowSpan={2} h={78}>
              ঘাটতি
            </VH>
          </tr>
          <tr>
            <H className="f10">মোট বৃদ্ধি</H>
            <H className="f10">ব্যক্তিগত দাওয়াত</H>
            <H className="f10">গ্রুপ দাওয়াত</H>
            <VH h={78} tiny>
              স্কুল দাওয়াতি সপ্তাহ
            </VH>
            <VH h={78} tiny>
              মাদরাসা দাওয়াতি সপ্তাহ
            </VH>
            <VH h={78} tiny>
              কলেজ দাওয়াতি সপ্তাহ
            </VH>
            <VH h={78} tiny>
              বিশ্ববিদ্যালয় দাওয়াতি সপ্তাহ
            </VH>
            <VH h={78} tiny>
              দাওয়াতি পক্ষ/সপ্তাহ
            </VH>
            <VH h={78} tiny>
              চেনা জনে যাই
            </VH>
          </tr>
        </thead>
        <tbody>
          {DW_ROWS.map((r) => (
            <tr key={r} style={{ height: 21 }}>
              <L className="f12">{r}</L>
              {DW_COLS.map((c) => (
                <C key={c} id={`dw_${r}_${c}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- একাডেমিক আউটপুট ---------------- */}
      <div className="mt-[6px] border border-black tone-green text-center text-[12.5px] font-bold leading-[18px]">
        বৃদ্ধিকৃতদের মধ্য থেকে আউটপুট ক্যাটাগরিভুক্ত
      </div>
      <AcademicTable
        rows={["সাথী", "কর্মী", "সমর্থক"]}
        prefix="out1"
        rowH={19}
        vhead={84}
      />

      {/* ---------------- দাওয়াতের অতিরিক্ত কাজ ---------------- */}
      <table className="frm mt-[6px]">
        <Cols w={[16, 8.5, 8.5, 6.5, 6, 6, 6, 23, 7, 7]} />
        <thead>
          <tr>
            <H rowSpan={2} tone="green" className="f11">
              দাওয়াতের অতিরিক্ত কাজ
            </H>
            <H colSpan={3} tone="green" className="f11">
              অংশগ্রহণকারী
            </H>
            <H rowSpan={2} tone="green" className="f9">
              দাওয়াত প্রাপ্ত
            </H>
            <H rowSpan={2} tone="green" className="f9">
              বন্ধু বৃদ্ধি
            </H>
            <H rowSpan={2} tone="green" className="f9">
              সমর্থক বৃদ্ধি
            </H>
            <H rowSpan={2} tone="none" className="bg-[#f2f2f2] f12">
              বিবরণ
            </H>
            <H rowSpan={2} tone="none" className="bg-[#f2f2f2] f10">
              সংখ্যা
            </H>
            <H rowSpan={2} tone="none" className="bg-[#f2f2f2] f10">
              বৃদ্ধি
            </H>
          </tr>
          <tr>
            <H tone="green" className="f9">
              পূর্বের সংখ্যা
            </H>
            <H tone="green" className="f9">
              বর্তমান সংখ্যা
            </H>
            <H tone="green" className="f9">
              বৃদ্ধি
            </H>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: 20 }}>
            <L className="f11">ব্যক্তিগত দাওয়াতি কাজ</L>
            <C id="ad_bek_purbo" />
            <C id="ad_bek_bort" />
            <C id="ad_bek_briddhi" />
            <C id="ad_bek_prapto" />
            <C id="ad_bek_bondhu" />
            <C id="ad_bek_somorthok" />
            <E />
            <E />
            <E />
          </tr>
          <tr style={{ height: 20 }}>
            <L className="f11">গ্রুপ দাওয়াতি কাজ</L>
            <C id="ad_grp_purbo" />
            <C id="ad_grp_bort" />
            <C id="ad_grp_briddhi" />
            <C id="ad_grp_prapto" />
            <C id="ad_grp_bondhu" />
            <C id="ad_grp_somorthok" />
            <L className="f11">দাওয়াতি গ্রুপ</L>
            <C id="ad_dgroup_songkhya" />
            <C id="ad_dgroup_briddhi" />
          </tr>
          <tr style={{ height: 20 }}>
            <L className="f11">মুহররমাদের মাঝে কাজ</L>
            <C id="ad_muh_purbo" />
            <C id="ad_muh_bort" />
            <C id="ad_muh_briddhi" />
            <C id="ad_muh_prapto" />
            <C id="ad_muh_bondhu" />
            <C id="ad_muh_somorthok" />
            <L className="f10">জনশক্তিদের মোট মুহররমা কতজন</L>
            <C id="ad_muhtotal_songkhya" />
            <C id="ad_muhtotal_briddhi" />
          </tr>
          <tr style={{ height: 20 }}>
            <L className="f11">আত্মীয় ও প্রতিবেশী</L>
            <C id="ad_atm_purbo" />
            <C id="ad_atm_bort" />
            <C id="ad_atm_briddhi" />
            <C id="ad_atm_prapto" />
            <C id="ad_atm_bondhu" />
            <C id="ad_atm_somorthok" />
            <L className="f10">আত্মীয় ও প্রতিবেশী মোট কতজন</L>
            <C id="ad_atmtotal_songkhya" />
            <C id="ad_atmtotal_briddhi" />
          </tr>
        </tbody>
      </table>

      {/* ---------------- মসজিদভিত্তিক কাজ ---------------- */}
      <table className="frm mt-[6px]">
        <Cols w={[17, 14, 15, 15, 13, 14, 12]} />
        <tbody>
          <tr style={{ height: 20 }}>
            <L rowSpan={4} tone="blue" align="center" className="f12 bold">
              মসজিদভিত্তিক কাজ
            </L>
            <L align="center" className="f10">
              মোট মসজিদ সংখ্যা
            </L>
            <L align="center" className="f10">
              পূর্বে কাজ হত কতটিতে
            </L>
            <L align="center" className="f10">
              বর্তমানে কাজ হয় কতটি
            </L>
            <L align="center" className="f10">
              কাজ নেই কতটিতে
            </L>
            <L align="center" className="f10">
              কাজ বৃদ্ধি কতটিতে
            </L>
            <L align="center" className="f10">
              কাজ ঘাটতি
            </L>
          </tr>
          <tr style={{ height: 20 }}>
            <C id="ms_mot" />
            <C id="ms_purbe" />
            <C id="ms_bortomane" />
            <C id="ms_nei" />
            <C id="ms_briddhi" />
            <C id="ms_ghatti" />
          </tr>
          <tr style={{ height: 20 }}>
            <L align="center" className="f10">
              দারসে কুরআন
            </L>
            <L align="center" className="f10">
              হাদীস পাঠ
            </L>
            <L align="center" className="f10">
              কুরআন শিক্ষা কোর্স
            </L>
            <L align="center" className="f10">
              বক্তব্য
            </L>
            <L colSpan={2} align="center" className="f10">
              অন্যান্য
            </L>
          </tr>
          <tr style={{ height: 20 }}>
            <C id="ms_dars" />
            <C id="ms_hadis" />
            <C id="ms_course" />
            <C id="ms_boktobbo" />
            <C id="ms_onnanno" colSpan={2} />
          </tr>
        </tbody>
      </table>

      {/* ---------------- দাওয়াতি উপকরণ ---------------- */}
      <table className="frm mt-[6px]">
        <Cols w={[17, 10, 10, 25, 9.5, 9.5, 9.5, 9.5]} />
        <thead>
          <tr style={{ height: 19 }}>
            <H tone="green" className="f11">
              দাওয়াতি উপকরণ
            </H>
            <H tone="green" className="f10">
              বিক্রয়
            </H>
            <H tone="green" className="f10">
              বিতরণ
            </H>
            <H tone="green" className="f11">
              দাওয়াতি উপকরণ
            </H>
            <H tone="green" className="f10">
              সংখ্যা
            </H>
            <H tone="green" className="f10">
              বিক্রয়
            </H>
            <H tone="green" className="f10">
              বিতরণ
            </H>
            <H tone="green" className="f9">
              গ্রাহক বৃদ্ধি
            </H>
          </tr>
        </thead>
        <tbody>
          {UPOKORON_LEFT.map((left, i) => {
            const right = UPOKORON_RIGHT[i];
            return (
              <tr key={left} style={{ height: 18 }}>
                <L className="f11">{left}</L>
                <C id={`up_${left}_bikroy`} />
                <C id={`up_${left}_bitoron`} />
                <L className="f10">{right}</L>
                <C id={`upr_${right}_songkhya`} />
                <C id={`upr_${right}_bikroy`} />
                <C id={`upr_${right}_bitoron`} />
                <C id={`upr_${right}_grahok`} />
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-auto pt-[4px] text-center text-[10px] text-black/70">
        পৃষ্ঠা ১ / ৩
      </div>
    </A4Page>
  );
}
