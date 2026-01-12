
import React from 'react';
import { CompanyInfo } from '../types';

interface AddressSectionProps {
  info: CompanyInfo;
  isOpen: boolean;
}

const AddressSection: React.FC<AddressSectionProps> = ({ info, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="mb-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-top-6 duration-500 shadow-2xl shadow-slate-100">
      <div className="p-8">
        <h4 className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-indigo-600 rounded-sm rotate-45"></span>
          خريطة الوصول للمقر
        </h4>
        
        <div className="space-y-4 mb-8">
          {info.address.map((line, idx) => (
            <div key={idx} className="flex gap-4 group">
              <span className="text-slate-300 font-black text-sm pt-0.5 shrink-0 transition-colors group-hover:text-indigo-400">0{idx + 1}</span>
              <p className="text-slate-700 text-sm font-bold leading-relaxed">{line}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-8">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مواعيد الحضور</span>
            <p className="text-slate-900 font-black text-xs leading-tight">{info.workingHours}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">أيام الحضور</span>
            <p className="text-slate-900 font-black text-xs leading-tight">{info.workingDays}</p>
          </div>
          <div className="col-span-2 bg-red-50 p-4 rounded-2xl border border-red-100 mt-2">
            <p className="text-[10px] font-black text-red-400 uppercase tracking-widest text-center mb-1">الإجازة الرسمية</p>
            <p className="text-red-700 font-black text-sm text-center">{info.holidays}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
