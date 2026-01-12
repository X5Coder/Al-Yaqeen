
export interface FirebaseJob {
  "الوظيفه": string;
  "النوع": string;
  "المؤهل": string;
  "عدد الساعات": string;
  "المرتب": string;
  "السلفه": string;
  "السن": string;
  "أيام العمل": string;
  "المواصلات": string;
  "الوجبات": string;
  "السكن": string;
  "العنوان": string;
  "الشروط والأوراق": string;
  "المميزات": string;
  "معلومات اضافيه": string;
}

export interface JobListing {
  id: string;
  fullTitle: string;
  salary: string;
  location: string;
  gender: string;
  raw: any; // استخدام any للسماح بمرونة في المفاتيح
}

export interface CompanyInfo {
  name: string;
  address: string[];
  workingHours: string;
  workingDays: string;
  holidays: string;
}
