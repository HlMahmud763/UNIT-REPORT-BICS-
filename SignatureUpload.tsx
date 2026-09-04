import { useRef } from "react";
import { useForm } from "../form/FormContext";

/** Reads a file, scales it down and stores it as a data-URL in the form store. */
function compress(file: File, cb: (dataUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const MAX_W = 360;
      const MAX_H = 120;
      const ratio = Math.min(MAX_W / img.width, MAX_H / img.height, 1);
      const w = Math.max(1, Math.round(img.width * ratio));
      const h = Math.max(1, Math.round(img.height * ratio));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        cb(String(reader.result));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      cb(canvas.toDataURL("image/png"));
    };
    img.onerror = () => cb(String(reader.result));
    img.src = String(reader.result);
  };
  reader.readAsDataURL(file);
}

export default function SignatureUpload({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { v, set } = useForm();
  const ref = useRef<HTMLInputElement>(null);
  const src = v[id];

  return (
    <div>
      <label className="ui-label">{title}</label>
      <div className="sig-upload-box">
        <input
          ref={ref}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) compress(f, (d) => set(id, d));
            e.target.value = "";
          }}
        />
        <span
          className="sig-upload-label"
          onClick={() => ref.current?.click()}
          role="button"
        >
          {src ? "🔄 স্বাক্ষর পরিবর্তন করুন" : "⬆️ স্বাক্ষরের ছবি আপলোড করুন"}
        </span>
        {src ? (
          <>
            <img src={src} alt={title} className="sig-preview-img mx-auto" />
            <button
              className="mt-1 text-[12px] font-bold text-red-600 hover:underline"
              onClick={() => set(id, "")}
            >
              ✖ মুছুন
            </button>
          </>
        ) : (
          <div className="mt-1 text-[11.5px] text-gray-500">
            PNG (স্বচ্ছ ব্যাকগ্রাউন্ড হলে ভালো)
          </div>
        )}
      </div>
    </div>
  );
}
