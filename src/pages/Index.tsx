import { Dashboard } from "@/components/dashboard";
import { FoodSearch } from "@/components/food-search";
import { WeeklyStats } from "@/components/weekly-stats";
import { useCKDApp } from "@/hooks/useCKDApp";

const Index = () => {
  const {
    currentView,
    setCurrentView,
    ckdStage,
    todayIntake,
    weeklyData,
    addMeal,
    notifyMedicalTeam
  } = useCKDApp();

  switch (currentView) {
    case 'add-food':
      return (
        <FoodSearch
          ckdStage={ckdStage}
          onBack={() => setCurrentView('dashboard')}
          onAddMeal={addMeal}
        />
      );
    
    case 'weekly-stats':
      return (
        <WeeklyStats
          weeklyData={weeklyData}
          onBack={() => setCurrentView('dashboard')}
        />
      );
    
    default:
      return (
        <Dashboard
          dailyIntake={todayIntake}
          onAddFood={() => setCurrentView('add-food')}
          onViewWeekly={() => setCurrentView('weekly-stats')}
          onNotifyMedical={notifyMedicalTeam}
        />
      );
  }
};

export default Index;
