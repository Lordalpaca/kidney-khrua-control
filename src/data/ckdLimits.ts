import { CKDLimits } from '@/types';

// ขีดจำกัดสารอาหารตามระยะ CKD (อ้างอิงแนวทางการรักษา)
export const CKD_LIMITS: Record<number, CKDLimits> = {
  1: {
    stage: 1,
    sodium: { max: 2300, warning: 2000 },
    potassium: { max: 4000, warning: 3500 },
    protein: { max: 120, warning: 100 },
    phosphorus: { max: 1400, warning: 1200 },
    fluid: { max: 3000, warning: 2500 }
  },
  2: {
    stage: 2,
    sodium: { max: 2000, warning: 1800 },
    potassium: { max: 3500, warning: 3000 },
    protein: { max: 100, warning: 80 },
    phosphorus: { max: 1200, warning: 1000 },
    fluid: { max: 2500, warning: 2000 }
  },
  3: {
    stage: 3,
    sodium: { max: 1800, warning: 1500 },
    potassium: { max: 3000, warning: 2500 },
    protein: { max: 80, warning: 60 },
    phosphorus: { max: 1000, warning: 800 },
    fluid: { max: 2000, warning: 1800 }
  },
  4: {
    stage: 4,
    sodium: { max: 1500, warning: 1200 },
    potassium: { max: 2500, warning: 2000 },
    protein: { max: 60, warning: 45 },
    phosphorus: { max: 800, warning: 600 },
    fluid: { max: 1800, warning: 1500 }
  },
  5: {
    stage: 5,
    sodium: { max: 1200, warning: 1000 },
    potassium: { max: 2000, warning: 1500 },
    protein: { max: 45, warning: 35 },
    phosphorus: { max: 600, warning: 400 },
    fluid: { max: 1500, warning: 1200 }
  }
};

export const NUTRIENT_UNITS = {
  sodium: 'mg',
  potassium: 'mg',
  protein: 'g',
  phosphorus: 'mg',
  fluid: 'ml',
  calories: 'kcal'
};

export const NUTRIENT_NAMES_TH = {
  sodium: 'โซเดียม',
  potassium: 'โพแทสเซียม',
  protein: 'โปรตีน',
  phosphorus: 'ฟอสฟอรัส',
  fluid: 'น้ำ',
  calories: 'แคลอรี่'
};