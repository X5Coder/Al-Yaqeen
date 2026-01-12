
import React, { useState } from 'react';
import { JobListing } from '../types';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [copied, setCopied] = useState(false);
  const { raw } = job;

  // وظيفة بحث ذكية جداً تبحث عن المفتاح بأي صيغة (ة/ه، أ/ا، مسافات)
  const getValue = (searchKey: string) => {
    if (!raw) return "غير متوفر";

    // 1. محاولة المطابقة المباشرة
    if (raw[searchKey] && raw[searchKey].toString().trim() !== "") {
      return raw[searchKey].toString().trim();
    }

    // 2. تعريف خرائط المفاتيح المتوقعة بناءً على صورة قاعدة البيانات
    const keyMaps: Record<string, string[]> = {
      "الوظيفه": ["الوظيفه", "الوظيفة", "عامل انتاج"],
      "المرتب": ["المرتب", "الراتب"],
      "السلفه": ["السلفه", "السلفة", "سلف"],
      "معلومات اضافيه": ["معلومات اضافيه", "معلومات إضافية", "معلومات اخرى", "معلومات أخرى"],
      "العنوان": ["العنوان", "القاهره", "العنوان "],
      "الوجبات": ["الوجبات", "وجبات"],
      "المواصلات": ["المواصلات", "مواصلات"]
    };

    const targets = keyMaps[searchKey] || [searchKey];
    
    // البحث في الخريطة
    for (const target of targets) {
      if (raw[target] && raw[target].toString().trim() !== "") {
        return raw[target].toString().trim();
      }
    }

    // 3. البحث الأخير: هل يوجد مفتاح يحتوي على الكلمة المطلوبة؟
    const flexKey = Object.keys(raw).find(k => 
      k.replace(/\s/g, '').includes(searchKey.replace(/\s/g, '').replace('ة','ه').replace('إ','ا'))
    );
    
    if (flexKey && raw[flexKey] && raw[flexKey].toString().trim() !== "") {
      return raw[flexKey].toString().trim();
    }

    return "غير متوفر";
  };

  const handleCopy = () => {
    let text = `✅ إعلان وظيفه : ${getValue("الوظيفه")}\n\n`;
    text += `📍 الموقع : ${getValue("العنوان")}\n`;
    text += `👥 الفئه : ${getValue("النوع")}\n`;
    text += `🎓 المؤهل : ${getValue("المؤهل")}\n`;
    text += `🔞 السن : ${getValue("السن")}\n`;
    text += `🏠 السكن : ${getValue("السكن")}\n`;
    text += `🚌 المواصلات : ${getValue("المواصلات")}\n`;
    text += `🍱 الوجبات : ${getValue("الوجبات")}\n`;
    text += `💸 السلف : ${getValue("السلفه")}\n`;
    text += `✨ المميزات : ${getValue("المميزات")}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const InfoRow = ({ label, vKey }: { label: string, vKey: string }) => (
    <div className="flex items-start gap-4">
      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-200 shrink-0"></div>
      <p className="text-slate-700 text-sm font-bold leading-relaxed">
        <span className="text-slate-400 ml-1 font-black">{label}:</span> {getValue(vKey)}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 mb-6 border border-slate-100 vault-card transition-all relative overflow-hidden flex flex-col border-b-4 border-b-slate-50/50">
      <div className="flex justify-between items-center mb-5">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">تفاصيل الفرصة</span>
          <span className="text-slate-900 font-black text-xs">متاح الآن</span>
        </div>
        <div className="px-4 py-1.5 rounded-full text-[11px] font-black border bg-blue-50 text-blue-600 border-blue-100 shadow-sm">
          {getValue("النوع")}
        </div>
      </div>
      
      <div className="mb-6 bg-slate-50/50 p-4 rounded-3xl border border-slate-50">
        <h2 className="text-xl font-black text-slate-900 leading-[1.4] mb-4">{getValue("الوظيفه")}</h2>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">المرتب</span>
            <div className="text-indigo-600 font-black text-lg leading-none">{getValue("المرتب")}</div>
          </div>
          <div className="text-right">
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">مكان العمل</span>
             <p className="text-slate-600 font-bold text-xs">{getValue("العنوان")}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-8 px-2">
        <InfoRow label="عدد الساعات" vKey="عدد الساعات" />
        <InfoRow label="أيام العمل" vKey="أيام العمل" />
        <InfoRow label="المؤهل" vKey="المؤهل" />
        <InfoRow label="السن" vKey="السن" />
        <InfoRow label="السكن" vKey="السكن" />
        <InfoRow label="المواصلات" vKey="المواصلات" />
        <InfoRow label="الوجبات" vKey="الوجبات" />
        <InfoRow label="السلفة" vKey="السلفه" />
        <InfoRow label="الشروط والأوراق" vKey="الشروط والأوراق" />
        <InfoRow label="المميزات" vKey="المميزات" />
        <InfoRow label="معلومات إضافية" vKey="معلومات اضافيه" />
      </div>

      <div className="flex items-center justify-end border-t border-slate-50 pt-5 mt-auto">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[12px] transition-all duration-300 transform active:scale-90 ${
            copied ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200'
          }`}
        >
          {copied ? <span>تم النسخ ✅</span> : <span>نسخ الإعلان</span>}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
