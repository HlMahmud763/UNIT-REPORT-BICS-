import { C, Cols, H, L, VH } from "./Field";

/**
 * "বৃদ্ধিকৃতদের মধ্য থেকে আউটপুট ক্যাটাগরিভুক্ত" table – shared by the
 * monthly report (page 1) and the monthly plan (page 3).
 */
export default function AcademicTable({
  rows,
  prefix,
  rowH = 18,
  vhead = 84,
}: {
  rows: string[];
  prefix: string;
  rowH?: number;
  vhead?: number;
}) {
  const cols = [
    "medha",
    "jsc",
    "ssc",
    "hsc",
    "press_sar",
    "press_besar",
    "protishthan",
    "science",
    "qawmi",
    "medical",
    "adarsha",
    "prokoushol",
    "krishi",
    "bigyan",
    "byabsay",
    "manobik",
  ];

  return (
    <table className="frm">
      <Cols
        w={[
          8.4, 4.2, 6.4, 6.4, 6.4, 6, 6, 4.2, 4.2, 4.2, 4.2, 4.2, 6, 5.6, 6.4,
          6.4, 5.8,
        ]}
      />
      <thead>
        <tr>
          <H rowSpan={3} className="f12">
            মান
          </H>
          <VH rowSpan={3} h={vhead} tiny>
            মেধাভিত্তিক ডিপার্টমেন্ট (১-৫)
          </VH>
          <H colSpan={3} className="f10">
            সর্বশেষ পরীক্ষায় GPA-5 প্রাপ্ত
          </H>
          <H colSpan={2} className="f10">
            ডিপার্টমেন্টে প্রেসধারী (১-৫)
          </H>
          <VH rowSpan={3} h={vhead} tiny>
            প্রতিষ্ঠান পরিচালনা সংসদ
          </VH>
          <VH rowSpan={3} h={vhead} tiny>
            মাধ্যমিক ও উচ্চ মাধ্যমিকে বিজ্ঞানে অধ্যয়নরত
          </VH>
          <VH rowSpan={3} h={vhead} tiny>
            কওমি মাদরাসায় অধ্যয়নরত
          </VH>
          <VH rowSpan={3} h={vhead} tiny>
            মেডিকেলে অধ্যয়নরত
          </VH>
          <VH rowSpan={3} h={vhead} tiny>
            আদর্শ কলেজে অধ্যয়নরত
          </VH>
          <H colSpan={5} className="f10">
            সরকারি বিশ্ববিদ্যালয়ে অধ্যয়নরত (বিভাগভিত্তিক)
          </H>
        </tr>
        <tr>
          <H rowSpan={2} className="f9">
            JSC/JDC
            <br />
            GPA-5
          </H>
          <H rowSpan={2} className="f9">
            SSC/Dakhil
            <br />
            GPA-5
          </H>
          <H rowSpan={2} className="f9">
            HSC/Alim
            <br />
            GPA-5
          </H>
          <H rowSpan={2} className="f95">
            সরকারি
          </H>
          <H rowSpan={2} className="f95">
            বেসরকারি
          </H>
          <H rowSpan={2} className="f95">
            প্রকৌশল
          </H>
          <H rowSpan={2} className="f95">
            কৃষি শিক্ষা
          </H>
          <H rowSpan={2} className="f95">
            সাধারণ বিজ্ঞান
          </H>
          <H rowSpan={2} className="f95">
            ব্যবসায় শিক্ষা
          </H>
          <H rowSpan={2} className="f95">
            মানবিক
          </H>
        </tr>
        <tr />
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r} style={{ height: rowH }}>
            <L className="f11">{r}</L>
            {cols.map((c) => (
              <C key={c} id={`${prefix}_${r}_${c}`} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
