
import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import AddressSection from './components/AddressSection';
import { COMPANY_DATA, FIREBASE_URL } from './constants';
import { JobListing } from './types';

const App: React.FC = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(FIREBASE_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        if (data) {
          const mappedJobs: JobListing[] = Object.entries(data).map(([key, value]) => ({
            id: key,
            fullTitle: (value as any)["الوظيفه"] || (value as any)["الوظيفة"] || "غير متوفر",
            salary: (value as any)["المرتب"] || "غير متوفر",
            location: (value as any)["العنوان"] || "غير متوفر",
            gender: (value as any)["النوع"] || "غير متوفر",
            raw: value
          }));
          setJobs(mappedJobs);
        }
      } catch (err) {
        setError('تعذر تحميل البيانات.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-10">
      <header className="px-6 pt-10 pb-6 max-w-md mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src="https://i.ibb.co/1fhF06Mh/1000172655.jpg" alt="Logo" className="w-12 h-12 rounded-2xl shadow-md object-cover border border-slate-100 -rotate-2" />
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-none">خزنة <span className="text-indigo-600">اليقين</span></h1>
              <p className="text-[9px] text-slate-400 font-bold mt-1">شركة اليقين | المتخصصه لتدريب و توريد العمالة</p>
            </div>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-lg text-indigo-600 font-black text-[10px] shrink-0 uppercase">
            {loading ? 'تحميل...' : 'نشط'}
          </div>
        </div>

        <button 
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className={`w-full py-4 px-6 rounded-3xl flex items-center justify-between transition-all duration-300 ${isLocationOpen ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-700'}`}
        >
          <span className="font-black text-sm">موقع الشركة وكيفية الوصول</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isLocationOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {!isLocationOpen && (
          <div className="mt-2">
            <h2 className="text-3xl font-black text-slate-900">{jobs.length} وظيفة متاحة</h2>
          </div>
        )}
      </header>

      <main className="max-w-md mx-auto px-6">
        <AddressSection info={COMPANY_DATA} isOpen={isLocationOpen} />
        {loading && <div className="text-center py-20 font-bold text-slate-400">جاري جلب الوظائف...</div>}
        <div className="space-y-4">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
        <footer className="mt-12 text-center pb-8 border-t border-slate-50 pt-8">
          <p className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em]">Developed By Kimo_</p>
          <p className="text-slate-300 text-[8px] mt-2">نظام اليقين للتوظيف v3.9</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
