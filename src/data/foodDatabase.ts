import { Food } from '@/types';

// ฐานข้อมูลอาหารไทยพื้นฐานสำหรับ CKD
export const FOOD_DATABASE: Food[] = [
  // ข้าวและผลิตภัณฑ์แป้ง
  {
    id: 'rice-white',
    nameTh: 'ข้าวขาวสวย',
    nameEn: 'White Rice',
    category: 'แป้ง',
    serving: '1 ถ้วย (158g)',
    nutrients: {
      sodium: 5,
      potassium: 55,
      protein: 4.3,
      phosphorus: 68,
      fluid: 0,
      calories: 205
    }
  },
  {
    id: 'rice-brown',
    nameTh: 'ข้าวกล้อง',
    nameEn: 'Brown Rice',
    category: 'แป้ง',
    serving: '1 ถ้วย (195g)',
    nutrients: {
      sodium: 10,
      potassium: 84,
      protein: 5,
      phosphorus: 162,
      fluid: 0,
      calories: 216
    }
  },
  {
    id: 'noodle-rice',
    nameTh: 'ก๋วยเตี๋ยวเส้นใหญ่',
    nameEn: 'Rice Noodles',
    category: 'แป้ง',
    serving: '1 ถ้วย (175g)',
    nutrients: {
      sodium: 14,
      potassium: 30,
      protein: 3.8,
      phosphorus: 47,
      fluid: 0,
      calories: 192
    }
  },

  // เนื้อสัตว์และโปรตีน
  {
    id: 'chicken-breast',
    nameTh: 'ไก่อกต้ม',
    nameEn: 'Boiled Chicken Breast',
    category: 'เนื้อสัตว์',
    serving: '85g (1 ชิ้น)',
    nutrients: {
      sodium: 74,
      potassium: 220,
      protein: 26,
      phosphorus: 196,
      fluid: 0,
      calories: 140
    }
  },
  {
    id: 'fish-sea-bass',
    nameTh: 'ปลากะพงนึ่ง',
    nameEn: 'Steamed Sea Bass',
    category: 'เนื้อสัตว์',
    serving: '85g (1 ชิ้น)',
    nutrients: {
      sodium: 68,
      potassium: 279,
      protein: 20,
      phosphorus: 143,
      fluid: 0,
      calories: 105
    }
  },
  {
    id: 'egg-chicken',
    nameTh: 'ไข่ไก่ต้ม',
    nameEn: 'Boiled Egg',
    category: 'เนื้อสัตว์',
    serving: '1 ฟอง (50g)',
    nutrients: {
      sodium: 62,
      potassium: 63,
      protein: 6,
      phosphorus: 86,
      fluid: 0,
      calories: 68
    }
  },

  // ผักและผลไม้
  {
    id: 'cabbage',
    nameTh: 'กะหล่ำปลีต้ม',
    nameEn: 'Boiled Cabbage',
    category: 'ผัก',
    serving: '1 ถ้วย (150g)',
    nutrients: {
      sodium: 6,
      potassium: 146,
      protein: 1.4,
      phosphorus: 26,
      fluid: 140,
      calories: 33
    }
  },
  {
    id: 'cucumber',
    nameTh: 'แตงกวาสด',
    nameEn: 'Fresh Cucumber',
    category: 'ผัก',
    serving: '1 ถ้วย (119g)',
    nutrients: {
      sodium: 2,
      potassium: 147,
      protein: 0.7,
      phosphorus: 24,
      fluid: 115,
      calories: 14
    }
  },
  {
    id: 'apple',
    nameTh: 'แอปเปิ้ล',
    nameEn: 'Apple',
    category: 'ผลไม้',
    serving: '1 ลูกกลาง (182g)',
    nutrients: {
      sodium: 2,
      potassium: 195,
      protein: 0.5,
      phosphorus: 20,
      fluid: 156,
      calories: 95
    }
  },
  {
    id: 'watermelon',
    nameTh: 'แตงโม',
    nameEn: 'Watermelon',
    category: 'ผลไม้',
    serving: '1 ถ้วย (152g)',
    nutrients: {
      sodium: 2,
      potassium: 170,
      protein: 0.9,
      phosphorus: 17,
      fluid: 139,
      calories: 46
    }
  },

  // เครื่องดื่ม
  {
    id: 'water',
    nameTh: 'น้ำเปล่า',
    nameEn: 'Water',
    category: 'เครื่องดื่ม',
    serving: '1 แก้ว (240ml)',
    nutrients: {
      sodium: 0,
      potassium: 0,
      protein: 0,
      phosphorus: 0,
      fluid: 240,
      calories: 0
    }
  },
  {
    id: 'coconut-water',
    nameTh: 'น้ำมะพร้าวสด',
    nameEn: 'Fresh Coconut Water',
    category: 'เครื่องดื่ม',
    serving: '1 แก้ว (240ml)',
    nutrients: {
      sodium: 252,
      potassium: 600,
      protein: 1.7,
      phosphorus: 20,
      fluid: 240,
      calories: 46
    }
  },

  // อาหารแปรรูป (ควรระวัง)
  {
    id: 'instant-noodle',
    nameTh: 'บะหมี่กึ่งสำเร็จรูป',
    nameEn: 'Instant Noodles',
    category: 'อาหารแปรรูป',
    serving: '1 ซอง (85g)',
    nutrients: {
      sodium: 1820,
      potassium: 98,
      protein: 10,
      phosphorus: 135,
      fluid: 0,
      calories: 371
    }
  },
  {
    id: 'fish-sauce',
    nameTh: 'น้ำปลา',
    nameEn: 'Fish Sauce',
    category: 'เครื่องปรุง',
    serving: '1 ช้อนโต๊ะ (15ml)',
    nutrients: {
      sodium: 1413,
      potassium: 28,
      protein: 1.4,
      phosphorus: 12,
      fluid: 0,
      calories: 6
    }
  }
];

export const FOOD_CATEGORIES = [
  'ทั้งหมด',
  'แป้ง',
  'เนื้อสัตว์', 
  'ผัก',
  'ผลไม้',
  'เครื่องดื่ม',
  'อาหารแปรรูป',
  'เครื่องปรุง',
  'อื่นๆ'
];

export const MEAL_TYPES = {
  breakfast: 'อาหารเช้า',
  lunch: 'อาหารกลางวัน', 
  dinner: 'อาหารเย็น',
  snack: 'ของว่าง'
};