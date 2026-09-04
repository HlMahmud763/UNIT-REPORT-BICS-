import React, { useState, useEffect } from 'react';

// টাইপ ডিফিনিশন
interface IncomeRow {
  total: string;
  aday: string;
  dharya: string;
  prapto: string;
}

interface IncomeData {
  kormi: IncomeRow;
  somorthok: IncomeRow;
  shubhakankhi: IncomeRow;
  ekkalin: IncomeRow;
  shahitya: IncomeRow;
  prokashona: IncomeRow;
  chatrokollan: IncomeRow;
  kormosuchi: IncomeRow;
}

interface ExpenseData {
  eyanat: string;
  yatayat: string;
  office: string;
  apyayon: string;
  dak: string;
  pathagar: string;
  shahitya: string;
  prokashona: string;
  chatrokollan: string;
  kormosuchi: string;
}

// বাংলা সংখ্যা কনভার্সন হেল্পার
const toBanglaNum = (str: string | number | undefined | null): string => {
  if (str === undefined || str === null) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, (w) => banglaDigits[parseInt(w, 10)]);
};

const parseNum = (str: string | number | undefined | null): number => {
  if (!str) return 0;
  const engStr = str.toString().replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d).toString());
  const val = parseFloat(engStr);
  return isNaN(val) ? 0 : val;
};

export default function PageReport2() {
  // আয় স্টেট (সদস্য ও সাথী বাদ দেওয়া হয়েছে)
  const [incomeData, setIncomeData] = useState<IncomeData>({
    kormi: { total: '', aday: '', dharya: '', prapto: '' },
    somorthok: { total: '', aday: '', dharya: '', prapto: '' },
    shubhakankhi: { total: '', aday: '', dharya: '', prapto: '' },
    ekkalin: { total: '', aday: '', dharya: '', prapto: '' },
    shahitya: { total: '', aday: '', dharya: '', prapto: '' },
    prokashona: { total: '', aday: '', dharya: '', prapto: '' },
    chatrokollan: { total: '', aday: '', dharya: '', prapto: '' },
    kormosuchi: { total: '', aday: '', dharya: '', prapto: '' },
  });

  // ব্যয় স্টেট
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    eyanat: '', yatayat: '', office: '', apyayon: '', dak: '',
    pathagar: '', shahitya: '', prokashona: '', chatrokollan: '', kormosuchi: ''
  });

  const [thisMonthIncome, setThisMonthIncome] = useState<string>('');
  const [lastMonthIncomeBalance, setLastMonthIncomeBalance] = useState<string>('');
  const [totalIncome, setTotalIncome] = useState<string>('');

  const [thisMonthExpense, setThisMonthExpense] = useState<string>('');
  const [lastMonthExpenseDeficit, setLastMonthExpenseDeficit] = useState<string>('');
  const [totalExpense, setTotalExpense] = useState<string>('');
  const [currentBalance, setCurrentBalance] = useState<string>('');

  // তারিখ স্টেট
  const [secDate, setSecDate] = useState<string>('');
  const [presDate, setPresDate] = useState<string>('');

  // ১. কর্মী থেকে শুভাকাঙ্ক্ষী ও এককালীন প্রাপ্ত টাকার যোগফল -> ব্যয়ের 'উর্ধ্বতন এয়ানত পরিশোধ'
  // ২. সাহিত্য, প্রকাশনা, ছাত্রকল্যাণ, কর্মসূচি আয়ে দিলে -> ব্যয়ের সংশ্লিষ্ট ঘরে অটো বসবে
  const handleIncomePraptoChange = (key: keyof IncomeData, val: string) => {
    const formattedVal = toBanglaNum(val);
    
    // আয়ে মান সেট
    const newIncome = {
      ...incomeData,
      [key]: { ...incomeData[key], prapto: formattedVal }
    };
    setIncomeData(newIncome);

    // অটো ট্রান্সফার লজিক ব্যয়ের জন্য
    if (['kormi', 'somorthok', 'shubhakankhi', 'ekkalin'].includes(key)) {
      const eyanatSum = parseNum(newIncome.kormi.prapto) +
                        parseNum(newIncome.somorthok.prapto) +
                        parseNum(newIncome.shubhakankhi.prapto) +
                        parseNum(newIncome.ekkalin.prapto);
      setExpenseData(prev => ({ ...prev, eyanat: eyanatSum ? toBanglaNum(eyanatSum) : '' }));
    } else if (['shahitya', 'prokashona', 'chatrokollan', 'kormosuchi'].includes(key)) {
      setExpenseData(prev => ({ ...prev, [key]: formattedVal }));
    }
  };

  // এ মাসের মোট আয় হিসাব
  useEffect(() => {
    let sum = 0;
    (Object.keys(incomeData) as Array<keyof IncomeData>).forEach((key) => {
      sum += parseNum(incomeData[key].prapto);
    });
    setThisMonthIncome(sum ? toBanglaNum(sum) : '');
  }, [incomeData]);

  // সর্বমোট আয়
  useEffect(() => {
    const total = parseNum(thisMonthIncome) + parseNum(lastMonthIncomeBalance);
    setTotalIncome(total ? toBanglaNum(total) : '');
  }, [thisMonthIncome, lastMonthIncomeBalance]);

  // এ মাসের মোট ব্যয় হিসাব
  useEffect(() => {
    let sum = 0;
    (Object.keys(expenseData) as Array<keyof ExpenseData>).forEach((key) => {
      sum += parseNum(expenseData[key]);
    });
    setThisMonthExpense(sum ? toBanglaNum(sum) : '');
  }, [expenseData]);

  // সর্বমোট ব্যয়
  useEffect(() => {
    const total = parseNum(thisMonthExpense) + parseNum(lastMonthExpenseDeficit);
    setTotalExpense(total ? toBanglaNum(total) : '');
  }, [thisMonthExpense, lastMonthExpenseDeficit]);

  // বর্তমান উদ্বৃত্ত/ঘাটতি
  useEffect(() => {
    const bal = parseNum(totalIncome) - parseNum(totalExpense);
    setCurrentBalance(bal !== 0 ? toBanglaNum(bal) : '');
  }, [totalIncome, totalExpense]);

  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    setter(toBanglaNum(e.target.value));
  };

  return (
    <>
      <style>{`
        .report-container {
          font-family: 'SolaimanLipi', 'Tiro Bangla', sans-serif;
          color: #000;
        }
        .report-table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
        }
        .report-table th, .report-table td {
          border: 1px solid #000;
          padding: 1px 2px;
          height: 18px;
          font-weight: normal;
          color: #000;
          vertical-align: middle;
        }
        .cell-input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          text-align: center;
          font-size: 10px;
          color: #000;
          padding: 0;
          margin: 0;
        }
        .cell-input:focus,
        textarea:focus {
          background: #e9b50b !important;
          box-shadow: inset 0 0 0 1px #eba73b;
          outline: none;
        }
        .fieldsOn .report-table .cell-input,
        .fieldsOn .report-table textarea {
          background: #eff6ff;
        }
        .fieldsOn .report-table .cell-input:focus,
        .fieldsOn .report-table textarea:focus {
          background: #e9b50b !important;
          box-shadow: inset 0 0 0 1px #eba73b;
        }
        /* কালার থিম */
        .hdr-green { background-color: #d1e7dd; font-weight: bold !important; color: #000; }
        .hdr-blue { background-color: #dbeceb; font-weight: bold !important; color: #000; }
        .hdr-orange { background-color: #ffe8cc; font-weight: bold !important; color: #000; }
        
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-align: center;
          white-space: nowrap;
          font-weight: bold;
          color: #000;
        }
      `}</style>

      <div className="report-container w-[210mm] min-h-[297mm] p-4 bg-white mx-auto border border-gray-300 text-[10px] leading-tight select-none">
        
       

        {/* ২. সভাসমূহ ও প্রশিক্ষণ */}
        <div className="mb-1.0 grid grid-cols-2 gap-1.0">
          <table className="report-table">
            <thead>
              <tr className="hdr-blue">
                <th className="w-[45%] text-left pl-1">সভাসমূহ</th>
                <th className="w-[18%]">সংখ্যা</th>
                <th className="w-[20%]">মোট উপস্থিতি</th>
                <th className="w-[17%]">গড়</th>
              </tr>
            </thead>
            <tbody>
              {[
                'কর্মী বৈঠক', 'সাধারণ সভা', 'সমর্থক সভা',
                'সাধারণ জ্ঞান/কুইজ প্রতিযোগিতা', 'বক্তৃতা/বিতর্ক প্রতিযোগিতা',
                'ফল/চা-চক্র/ফলচক্র', 'নবাগত/কৃতী ছাত্র সংবর্ধনা',
                'শিক্ষা সফর/বনভোজন', 'ক্রীড়া প্রতিযোগিতা'
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="text-left pl-1 font-semibold">{item}</td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="report-table">
            <thead>
              <tr className="hdr-blue">
                <th className="w-[45%] text-left pl-1">প্রশিক্ষণ</th>
                <th className="w-[18%]">সংখ্যা</th>
                <th className="w-[20%]">মোট উপস্থিতি</th>
                <th className="w-[17%]">গড়</th>
              </tr>
            </thead>
            <tbody>
              {[
                'কুরআন তালিম', 'সামষ্টিক পাঠ', 'সমর্থক শিক্ষা বৈঠক',
                'সামষ্টিক ভোজ', 'বইপাঠ প্রতিযোগিতা'
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="text-left pl-1 font-semibold">{item}</td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ৩. পাঠাগার, জনশক্তি ও অনলাইন পাঠচক্র */}
        <div className="mb-1.5 grid grid-cols-12 gap-1.0">
          <div className="col-span-6">
            <table className="report-table">
              <thead>
                <tr className="hdr-orange">
                  <th className="text-left pl-1">পাঠাগার</th>
                  <th className="w-[20%]">পূর্ব সংখ্যা</th>
                  <th className="w-[20%]">বর্তমান</th>
                  <th className="w-[18%]">বৃদ্ধি</th>
                  <th className="w-[18%]">ঘাটতি</th>
                </tr>
              </thead>
              <tbody>
                {['সংখ্যা', 'বই সংখ্যা', 'ব্যক্তিগত পাঠাগার'].map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-left pl-1 font-semibold">{item}</td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-3">
            <table className="report-table">
              <thead>
                <tr className="hdr-orange">
                  <th className="text-left pl-1">জনশক্তি</th>
                  <th className="w-[40%]">সংখ্যা</th>
                </tr>
              </thead>
              <tbody>
                {['পাঠক', 'ইস্যুকৃত বই', 'পঠিত বই'].map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-left pl-1 font-semibold">{item}</td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-3">
            <table className="report-table">
              <thead>
                <tr className="hdr-orange">
                  <th className="text-left pl-1">অনলাইন পাঠচক্র</th>
                  <th className="w-[40%]">সংখ্যা</th>
                </tr>
              </thead>
              <tbody>
                {['অনলাইনে পঠিত বই', 'অনলাইনে প্রেরিত বই', 'অনলাইনে আপলোড'].map((item, idx) => (
                  <tr key={idx}>
                    <td className="text-left pl-1 font-semibold">{item}</td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৪. অর্থনৈতিক প্রতিবেদন */}
        <div className="mb-1.5 flex border border-black">
          <div className="w-6 hdr-blue border-r border-black flex items-center justify-center p-1">
            <span className="vertical-text text-[11px]">অর্থনৈতিক প্রতিবেদন</span>
          </div>

          <div className="flex-1 grid grid-cols-12 divide-x divide-black">
            {/* আয় */}
            <div className="col-span-7 flex flex-col justify-between">
              <div>
                <div className="hdr-blue text-center border-b border-black py-0.5 font-bold">আয়</div>
                <table className="report-table">
                  <thead>
                    <tr className="hdr-blue">
                      <th className="w-[30%] text-left pl-1">আয়ের খাত</th>
                      <th className="w-[17.5%]">মোট সংখ্যা</th>
                      <th className="w-[17.5%]">আদায় সংখ্যা</th>
                      <th className="w-[17.5%]">ধার্য পরিমাণ</th>
                      <th className="w-[17.5%]">প্রাপ্ত টাকা</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'kormi', label: 'কর্মী' },
                      { key: 'somorthok', label: 'সমর্থক' },
                      { key: 'shubhakankhi', label: 'শুভাকাঙ্ক্ষী এয়ানত' },
                      { key: 'ekkalin', label: 'এককালীন' },
                      { key: 'shahitya', label: 'সাহিত্য' },
                      { key: 'prokashona', label: 'প্রকাশনা' },
                      { key: 'chatrokollan', label: 'ছাত্রকল্যাণ' },
                      { key: 'kormosuchi', label: 'কর্মসূচি বাস্তবায়ন' },
                    ].map((row) => (
                      <tr key={row.key}>
                        <td className="text-left pl-1 font-semibold">{row.label}</td>
                        <td><input inputMode="numeric" value={incomeData[row.key as keyof IncomeData]?.total} className="cell-input" onChange={(e) => handleNumChange(e, (v) => setIncomeData(p => ({...p, [row.key]: {...p[row.key as keyof IncomeData], total: v}})))} /></td>
                        <td><input inputMode="numeric" value={incomeData[row.key as keyof IncomeData]?.aday} className="cell-input" onChange={(e) => handleNumChange(e, (v) => setIncomeData(p => ({...p, [row.key]: {...p[row.key as keyof IncomeData], aday: v}})))} /></td>
                        <td><input inputMode="numeric" value={incomeData[row.key as keyof IncomeData]?.dharya} className="cell-input" onChange={(e) => handleNumChange(e, (v) => setIncomeData(p => ({...p, [row.key]: {...p[row.key as keyof IncomeData], dharya: v}})))} /></td>
                        <td><input inputMode="numeric" value={incomeData[row.key as keyof IncomeData]?.prapto} className="cell-input font-bold" onChange={(e) => handleIncomePraptoChange(row.key as keyof IncomeData, e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-black">
                <table className="report-table">
                  <tbody>
                    <tr>
                      <td className="text-right pr-2 font-semibold w-[65%]">এ মাসের মোট আয়</td>
                      <td className="w-[35%]"><input inputMode="numeric" value={thisMonthIncome} onChange={(e) => handleNumChange(e, setThisMonthIncome)} className="cell-input font-bold" /></td>
                    </tr>
                    <tr>
                      <td className="text-right pr-2 font-semibold">গত মাসের উদ্বৃত্ত</td>
                      <td><input inputMode="numeric" value={lastMonthIncomeBalance} onChange={(e) => handleNumChange(e, setLastMonthIncomeBalance)} className="cell-input font-bold" /></td>
                    </tr>
                    <tr className="font-bold">
                      <td className="text-right pr-2">সর্বমোট আয়</td>
                      <td><input inputMode="numeric" value={totalIncome} onChange={(e) => handleNumChange(e, setTotalIncome)} className="cell-input font-bold" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ব্যয় */}
            <div className="col-span-5 flex flex-col justify-between">
              <div>
                <div className="hdr-blue text-center border-b border-black py-0.5 font-bold">ব্যয়</div>
                <table className="report-table">
                  <thead>
                    <tr className="hdr-blue">
                      <th className="w-[70%] text-left pl-1">ব্যয়ের খাত</th>
                      <th className="w-[30%]">পরিমাণ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'eyanat', label: 'উর্ধ্বতন এয়ানত পরিশোধ' },
                      { key: 'yatayat', label: 'যাতায়াত' },
                      { key: 'office', label: 'অফিস স্টেশনারি' },
                      { key: 'apyayon', label: 'আপ্যায়ন' },
                      { key: 'dak', label: 'ডাক ও তার' },
                      { key: 'pathagar', label: 'পাঠাগার' },
                      { key: 'shahitya', label: 'সাহিত্য' },
                      { key: 'prokashona', label: 'প্রকাশনা' },
                      { key: 'chatrokollan', label: 'ছাত্রকল্যাণ' },
                      { key: 'kormosuchi', label: 'কর্মসূচি বাস্তবায়ন' },
                    ].map((row) => (
                      <tr key={row.key}>
                        <td className="text-left pl-1 font-semibold">{row.label}</td>
                        <td><input inputMode="numeric" value={expenseData[row.key as keyof ExpenseData]} className="cell-input font-bold" onChange={(e) => handleNumChange(e, (v) => setExpenseData(p => ({...p, [row.key]: v})))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-black">
                <table className="report-table">
                  <tbody>
                    <tr>
                      <td className="text-right pr-2 font-semibold w-[65%]">এ মাসের মোট ব্যয়</td>
                      <td className="w-[35%]"><input inputMode="numeric" value={thisMonthExpense} onChange={(e) => handleNumChange(e, setThisMonthExpense)} className="cell-input font-bold" /></td>
                    </tr>
                    <tr>
                      <td className="text-right pr-2 font-semibold">গত মাসের ঘাটতি</td>
                      <td><input inputMode="numeric" value={lastMonthExpenseDeficit} onChange={(e) => handleNumChange(e, setLastMonthExpenseDeficit)} className="cell-input font-bold" /></td>
                    </tr>
                    <tr className="font-bold">
                      <td className="text-right pr-2">সর্বমোট ব্যয়</td>
                      <td><input inputMode="numeric" value={totalExpense} onChange={(e) => handleNumChange(e, setTotalExpense)} className="cell-input font-bold" /></td>
                    </tr>
                    <tr className="font-bold border-t border-black">
                      <td className="text-right pr-2">সর্বমোট আয়</td>
                      <td><input inputMode="numeric" value={totalIncome} readOnly className="cell-input font-bold" /></td>
                    </tr>
                    <tr className="font-bold hdr-green">
                      <td className="text-right pr-2">বর্তমান উদ্বৃত্ত/ঘাটতি</td>
                      <td><input inputMode="numeric" value={currentBalance} onChange={(e) => handleNumChange(e, setCurrentBalance)} className="cell-input font-bold" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ৫. ছাত্রকল্যাণ */}
        <div className="mb-1.0 flex border border-black">
          <div className="w-6 hdr-green border-r border-black flex items-center justify-center p-1">
            <span className="vertical-text text-[10px]">ছাত্রকল্যাণ</span>
          </div>

          <div className="flex-1 grid grid-cols-12 divide-x divide-black">
            <div className="col-span-7">
              <table className="report-table">
                <thead>
                  <tr className="hdr-green">
                    <th className="w-[30%] text-left pl-1">বিবরণ</th>
                    <th className="w-[17.5%]">সংখ্যা</th>
                    <th className="w-[17.5%]">বৃদ্ধি</th>
                    <th className="w-[17.5%]">আদায় সংখ্যা</th>
                    <th className="w-[17.5%]">প্রাপ্ত টাকা</th>
                  </tr>
                </thead>
                <tbody>
                  {['টেবিল ব্যাংক', 'কলম', 'দোকান বন্ধ'].map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-left pl-1 font-semibold">{item}</td>
                      <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                      <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                      <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                      <td><input inputMode="numeric" className="cell-input font-bold" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="text-center">মোট</td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-span-5">
              <table className="report-table">
                <thead>
                  <tr className="hdr-green">
                    <th className="text-left pl-1">ছাত্র সমস্যা সমাধান</th>
                    <th className="w-[30%]">সংখ্যা</th>
                  </tr>
                </thead>
                <tbody>
                  {['টিউশন', 'লজিং', 'লজিং লাইব্রেরি', 'ফ্রি কোচিং'].map((item, idx) => (
                    <tr key={idx}>
                      <td className="text-left pl-1 font-semibold">{item}</td>
                      <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ৬. জনশক্তি বৃদ্ধি ও ঘাটতি তালিকা */}
        <div className="mb-1.5 grid grid-cols-2 gap-1.5">
          <table className="report-table">
            <thead>
              <tr className="hdr-blue">
                <th colSpan={6}>জনশক্তি বৃদ্ধি তালিকা</th>
              </tr>
              <tr className="hdr-blue text-[9px]">
                <th className="w-[8%]">ক্রম</th>
                <th className="w-[32%] text-left pl-1">নাম</th>
                <th className="w-[15%]">মান</th>
                <th className="w-[20%]">শিক্ষা প্রতিষ্ঠান</th>
                <th className="w-[12.5%]">শ্রেণি/বর্ষ</th>
                <th className="w-[12.5%]">কিভাবে</th>
              </tr>
            </thead>
            <tbody>
              {['১', '২', '৩', '৪', '৫', '৬'].map((num) => (
                <tr key={num}>
                  <td className="font-bold">{num}</td>
                  <td><input className="cell-input text-left px-1" /></td>
                  <td><input className="cell-input" /></td>
                  <td><input className="cell-input text-left px-1" /></td>
                  <td><input className="cell-input" /></td>
                  <td><input className="cell-input" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="report-table">
            <thead>
              <tr className="hdr-blue">
                <th colSpan={6}>জনশক্তি ঘাটতি তালিকা</th>
              </tr>
              <tr className="hdr-blue text-[9px]">
                <th className="w-[8%]">ক্রম</th>
                <th className="w-[32%] text-left pl-1">নাম</th>
                <th className="w-[15%]">মান</th>
                <th className="w-[20%]">শিক্ষা প্রতিষ্ঠান</th>
                <th className="w-[12.5%]">শ্রেণি/বর্ষ</th>
                <th className="w-[12.5%]">কারণ</th>
              </tr>
            </thead>
            <tbody>
              {['১', '২', '৩', '৪', '৫', '৬'].map((num) => (
                <tr key={num}>
                  <td className="font-bold">{num}</td>
                  <td><input className="cell-input text-left px-1" /></td>
                  <td><input className="cell-input" /></td>
                  <td><input className="cell-input text-left px-1" /></td>
                  <td><input className="cell-input" /></td>
                  <td><input className="cell-input" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ৭. সফর রিপোর্ট */}
        <div className="mb-1.5 flex border border-black">
          <div className="w-6 hdr-orange border-r border-black flex items-center justify-center p-1">
            <span className="vertical-text text-[10px]">সফর রিপোর্ট</span>
          </div>
          <div className="flex-1">
            <table className="report-table">
              <thead>
                <tr className="hdr-orange">
                  <th className="w-[6%]">ক্রম</th>
                  <th className="w-[36%] text-left pl-1">সফরকারীর নাম</th>
                  <th className="w-[10%]">সংখ্যা</th>
                  <th className="w-[6%]">ক্রম</th>
                  <th className="w-[32%] text-left pl-1">সফরকারীর নাম</th>
                  <th className="w-[10%]">সংখ্যা</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { r1: '১', r2: '৪' },
                  { r1: '২', r2: '৫' },
                  { r1: '৩', r2: '৬' },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-bold">{row.r1}</td>
                    <td><input className="cell-input text-left px-1" /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                    <td className="font-bold">{row.r2}</td>
                    <td><input className="cell-input text-left px-1" /></td>
                    <td><input inputMode="numeric" className="cell-input" onChange={(e) => handleNumChange(e, () => {})} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ৮. মন্তব্য রিপোর্ট */}
        <div className="mb-3 flex border border-black">
          <div className="w-6 hdr-blue border-r border-black flex items-center justify-center p-1">
            <span className="vertical-text text-[10px]">মন্তব্য রিপোর্ট</span>
          </div>
          <div className="flex-1">
            <table className="report-table">
              <thead>
                <tr className="hdr-blue">
                  <th className="w-[50%]">সমস্যা</th>
                  <th className="w-[50%]">সম্ভাবনা</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-0 h-10"><textarea className="w-full h-full p-1 resize-none border-none outline-none text-[10px]" /></td>
                  <td className="p-0 h-10"><textarea className="w-full h-full p-1 resize-none border-none outline-none text-[10px]" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ৯. স্বাক্ষরসমূহ ও আলাদা তারিখ অপশন */}
        <div className="flex justify-between items-end pt-4 px-2 text-[10px] font-bold">
          <div className="flex flex-col items-center">
            <div className="w-40 border-t border-black text-center pt-0.5">
              সেক্রেটারির স্বাক্ষর
            </div>
            <div className="flex items-center gap-1 mt-1 text-[9px] font-normal">
              <span>তারিখ:</span>
              <input 
                type="date" 
                value={secDate} 
                onChange={(e) => setSecDate(e.target.value)} 
                className="border border-black rounded px-1 text-[9px] outline-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 border-t border-black text-center pt-0.5">
              বায়তুলমাল সম্পাদকের স্বাক্ষর
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-40 border-t border-black text-center pt-0.5">
              সভাপতি'র স্বাক্ষর
            </div>
            <div className="flex items-center gap-1 mt-1 text-[9px] font-normal">
              <span>তারিখ:</span>
              <input 
                type="date" 
                value={presDate} 
                onChange={(e) => setPresDate(e.target.value)} 
                className="border border-black rounded px-1 text-[9px] outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}