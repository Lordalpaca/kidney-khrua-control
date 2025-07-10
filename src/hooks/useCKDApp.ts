import { useState, useEffect } from 'react';
import { DailyIntake, MealEntry, CKDStage, NutrientValues } from '@/types';
import { CKD_LIMITS } from '@/data/ckdLimits';
import { useToast } from '@/hooks/use-toast';

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split('T')[0];

export function useCKDApp() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'add-food' | 'weekly-stats'>('dashboard');
  const [ckdStage, setCkdStage] = useState<CKDStage>(3); // Default stage 3
  const [dailyIntakes, setDailyIntakes] = useState<Record<string, DailyIntake>>({});
  const { toast } = useToast();

  // Initialize today's intake if not exists
  useEffect(() => {
    const today = getTodayDate();
    if (!dailyIntakes[today]) {
      setDailyIntakes(prev => ({
        ...prev,
        [today]: {
          date: today,
          meals: [],
          totalNutrients: {
            sodium: 0,
            potassium: 0,
            protein: 0,
            phosphorus: 0,
            fluid: 0,
            calories: 0
          },
          warnings: [],
          ckdStage
        }
      }));
    }
  }, [ckdStage]);

  const calculateTotalNutrients = (meals: MealEntry[]): NutrientValues => {
    return meals.reduce((total, meal) => ({
      sodium: total.sodium + meal.nutrients.sodium,
      potassium: total.potassium + meal.nutrients.potassium,
      protein: total.protein + meal.nutrients.protein,
      phosphorus: total.phosphorus + meal.nutrients.phosphorus,
      fluid: total.fluid + meal.nutrients.fluid,
      calories: total.calories + meal.nutrients.calories
    }), {
      sodium: 0,
      potassium: 0,
      protein: 0,
      phosphorus: 0,
      fluid: 0,
      calories: 0
    });
  };

  const generateWarnings = (nutrients: NutrientValues, stage: CKDStage): string[] => {
    const limits = CKD_LIMITS[stage];
    const warnings: string[] = [];

    if (nutrients.sodium >= limits.sodium.max) {
      warnings.push(`โซเดียมเกินขีดจำกัด (${nutrients.sodium}/${limits.sodium.max} mg)`);
    } else if (nutrients.sodium >= limits.sodium.warning) {
      warnings.push(`โซเดียมใกล้เกินแล้ว (${nutrients.sodium}/${limits.sodium.max} mg)`);
    }

    if (nutrients.potassium >= limits.potassium.max) {
      warnings.push(`โพแทสเซียมเกินขีดจำกัด (${nutrients.potassium}/${limits.potassium.max} mg)`);
    } else if (nutrients.potassium >= limits.potassium.warning) {
      warnings.push(`โพแทสเซียมใกล้เกินแล้ว (${nutrients.potassium}/${limits.potassium.max} mg)`);
    }

    if (nutrients.protein >= limits.protein.max) {
      warnings.push(`โปรตีนเกินขีดจำกัด (${nutrients.protein}/${limits.protein.max} g)`);
    } else if (nutrients.protein >= limits.protein.warning) {
      warnings.push(`โปรตีนใกล้เกินแล้ว (${nutrients.protein}/${limits.protein.max} g)`);
    }

    if (nutrients.phosphorus >= limits.phosphorus.max) {
      warnings.push(`ฟอสฟอรัสเกินขีดจำกัด (${nutrients.phosphorus}/${limits.phosphorus.max} mg)`);
    } else if (nutrients.phosphorus >= limits.phosphorus.warning) {
      warnings.push(`ฟอสฟอรัสใกล้เกินแล้ว (${nutrients.phosphorus}/${limits.phosphorus.max} mg)`);
    }

    if (nutrients.fluid >= limits.fluid.max) {
      warnings.push(`น้ำเกินขีดจำกัด (${nutrients.fluid}/${limits.fluid.max} ml)`);
    } else if (nutrients.fluid >= limits.fluid.warning) {
      warnings.push(`น้ำใกล้เกินแล้ว (${nutrients.fluid}/${limits.fluid.max} ml)`);
    }

    return warnings;
  };

  const addMeal = (mealData: Omit<MealEntry, 'id' | 'timestamp'>) => {
    const today = getTodayDate();
    const newMeal: MealEntry = {
      ...mealData,
      id: generateId(),
      timestamp: new Date()
    };

    setDailyIntakes(prev => {
      const todayIntake = prev[today] || {
        date: today,
        meals: [],
        totalNutrients: { sodium: 0, potassium: 0, protein: 0, phosphorus: 0, fluid: 0, calories: 0 },
        warnings: [],
        ckdStage
      };

      const updatedMeals = [...todayIntake.meals, newMeal];
      const totalNutrients = calculateTotalNutrients(updatedMeals);
      const warnings = generateWarnings(totalNutrients, ckdStage);

      const updatedIntake: DailyIntake = {
        ...todayIntake,
        meals: updatedMeals,
        totalNutrients,
        warnings
      };

      // Show toast notification
      if (warnings.length > 0 && warnings.length > todayIntake.warnings.length) {
        const newWarnings = warnings.slice(todayIntake.warnings.length);
        toast({
          title: "คำเตือนสำคัญ!",
          description: newWarnings[0],
          variant: "destructive"
        });
      } else {
        toast({
          title: "บันทึกอาหารสำเร็จ",
          description: `เพิ่ม ${mealData.foodName} แล้ว`,
        });
      }

      return {
        ...prev,
        [today]: updatedIntake
      };
    });

    setCurrentView('dashboard');
  };

  const notifyMedicalTeam = () => {
    // Mock notification - ในการใช้งานจริงจะส่งผ่าน API
    toast({
      title: "แจ้งทีมแพทย์แล้ว",
      description: "ทีมแพทย์จะติดต่อกลับภายใน 30 นาที",
      variant: "default"
    });
  };

  const getTodayIntake = (): DailyIntake => {
    const today = getTodayDate();
    return dailyIntakes[today] || {
      date: today,
      meals: [],
      totalNutrients: {
        sodium: 0,
        potassium: 0,
        protein: 0,
        phosphorus: 0,
        fluid: 0,
        calories: 0
      },
      warnings: [],
      ckdStage
    };
  };

  const getWeeklyData = () => {
    const dates = [];
    const today = new Date();
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    return dates.map(date => 
      dailyIntakes[date] || {
        date,
        meals: [],
        totalNutrients: { sodium: 0, potassium: 0, protein: 0, phosphorus: 0, fluid: 0, calories: 0 },
        warnings: [],
        ckdStage
      }
    );
  };

  return {
    currentView,
    setCurrentView,
    ckdStage,
    setCkdStage,
    todayIntake: getTodayIntake(),
    weeklyData: getWeeklyData(),
    addMeal,
    notifyMedicalTeam
  };
}