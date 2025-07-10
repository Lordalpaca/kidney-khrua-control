// ประเภทข้อมูลสำหรับแอป CKD

export interface NutrientValues {
  sodium: number; // โซเดียม (mg)
  potassium: number; // โพแทสเซียม (mg)
  protein: number; // โปรตีน (g)
  phosphorus: number; // ฟอสฟอรัส (mg)
  fluid: number; // น้ำ (ml)
  calories: number; // แคลอรี่ (kcal)
}

export interface Food {
  id: string;
  nameTh: string; // ชื่อไทย
  nameEn?: string; // ชื่ออังกฤษ
  category: string; // หมวดหมู่อาหาร
  serving: string; // หน่วยเสิร์ฟ (เช่น "1 ถ้วย", "1 ชิ้น")
  nutrients: NutrientValues; // ค่าสารอาหารต่อหน่วยเสิร์ฟ
}

export interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  servings: number; // จำนวนหน่วยเสิร์ฟ
  nutrients: NutrientValues; // ค่าสารอาหารรวม
  timestamp: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  customFood?: boolean; // อาหารที่ผู้ใช้เพิ่มเอง
}

export type CKDStage = 1 | 2 | 3 | 4 | 5;

export interface CKDLimits {
  stage: CKDStage;
  sodium: { max: number; warning: number }; // mg/day
  potassium: { max: number; warning: number }; // mg/day
  protein: { max: number; warning: number }; // g/day
  phosphorus: { max: number; warning: number }; // mg/day
  fluid: { max: number; warning: number }; // ml/day
}

export interface DailyIntake {
  date: string; // YYYY-MM-DD
  meals: MealEntry[];
  totalNutrients: NutrientValues;
  warnings: string[];
  ckdStage: CKDStage;
}

export interface UserProfile {
  id: string;
  name: string;
  ckdStage: CKDStage;
  weight: number; // kg
  medicalTeam?: {
    doctorName: string;
    nurseContact: string;
  };
  customLimits?: Partial<CKDLimits>; // ขีดจำกัดที่แพทย์กำหนดเฉพาะ
}