import { Dashboard } from "@/components/dashboard";
import { FoodSearch } from "@/components/food-search";
import { WeeklyStats } from "@/components/weekly-stats";
import { useCKDApp } from "@/hooks/useCKDApp";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const {
    currentView,
    setCurrentView,
    ckdStage,
    todayIntake,
    weeklyData,
    addMeal,
    notifyMedicalTeam
  } = useCKDApp();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto">
        {(() => {
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
        })()}
      </div>
    </div>
  );
};

export default Index;
