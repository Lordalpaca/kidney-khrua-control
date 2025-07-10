import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NutritionBar } from "@/components/ui/nutrition-bar";
import { Plus, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { CKD_LIMITS, NUTRIENT_NAMES_TH, NUTRIENT_UNITS } from "@/data/ckdLimits";
import { DailyIntake, CKDStage } from "@/types";

interface DashboardProps {
  dailyIntake: DailyIntake;
  onAddFood: () => void;
  onViewWeekly: () => void;
  onNotifyMedical: () => void;
}

export function Dashboard({ 
  dailyIntake, 
  onAddFood, 
  onViewWeekly, 
  onNotifyMedical 
}: DashboardProps) {
  const limits = CKD_LIMITS[dailyIntake.ckdStage];
  const hasWarnings = dailyIntake.warnings.length > 0;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">แอปควบคุมอาหาร CKD</h1>
          <Badge variant="secondary" className="text-sm">
            CKD ระยะที่ {dailyIntake.ckdStage}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          {formatDate(dailyIntake.date)}
        </p>
      </div>

      {/* Warning Alert */}
      {hasWarnings && (
        <Card className="mb-6 border-warning bg-warning-light">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle className="text-warning text-lg">คำเตือนสำคัญ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {dailyIntake.warnings.map((warning, index) => (
              <p key={index} className="text-sm text-warning font-medium">
                • {warning}
              </p>
            ))}
            <Button 
              onClick={onNotifyMedical}
              variant="outline" 
              size="sm" 
              className="mt-3 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
            >
              <Users className="w-4 h-4 mr-2" />
              แจ้งทีมแพทย์
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button 
          onClick={onAddFood}
          size="lg" 
          className="h-16 text-lg bg-primary hover:bg-primary/90"
        >
          <Plus className="w-6 h-6 mr-2" />
          บันทึกอาหาร
        </Button>
        <Button 
          onClick={onViewWeekly}
          variant="outline" 
          size="lg" 
          className="h-16 text-lg"
        >
          <TrendingUp className="w-6 h-6 mr-2" />
          ดูสถิติรายสัปดาห์
        </Button>
      </div>

      {/* Daily Nutrition Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">สรุปสารอาหารวันนี้</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <NutritionBar
            label={NUTRIENT_NAMES_TH.sodium}
            value={dailyIntake.totalNutrients.sodium}
            max={limits.sodium.max}
            warning={limits.sodium.warning}
            unit={NUTRIENT_UNITS.sodium}
          />
          <NutritionBar
            label={NUTRIENT_NAMES_TH.potassium}
            value={dailyIntake.totalNutrients.potassium}
            max={limits.potassium.max}
            warning={limits.potassium.warning}
            unit={NUTRIENT_UNITS.potassium}
          />
          <NutritionBar
            label={NUTRIENT_NAMES_TH.protein}
            value={dailyIntake.totalNutrients.protein}
            max={limits.protein.max}
            warning={limits.protein.warning}
            unit={NUTRIENT_UNITS.protein}
          />
          <NutritionBar
            label={NUTRIENT_NAMES_TH.phosphorus}
            value={dailyIntake.totalNutrients.phosphorus}
            max={limits.phosphorus.max}
            warning={limits.phosphorus.warning}
            unit={NUTRIENT_UNITS.phosphorus}
          />
          <NutritionBar
            label={NUTRIENT_NAMES_TH.fluid}
            value={dailyIntake.totalNutrients.fluid}
            max={limits.fluid.max}
            warning={limits.fluid.warning}
            unit={NUTRIENT_UNITS.fluid}
          />
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">อาหารที่บันทึกวันนี้</CardTitle>
        </CardHeader>
        <CardContent>
          {dailyIntake.meals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-lg mb-4">ยังไม่มีการบันทึกอาหารวันนี้</p>
              <Button onClick={onAddFood} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                เริ่มบันทึกอาหาร
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {dailyIntake.meals.map((meal) => (
                <div key={meal.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{meal.foodName}</p>
                    <p className="text-sm text-muted-foreground">
                      {meal.servings} หน่วยเสิร์ฟ • {meal.nutrients.calories} แคลอรี่
                    </p>
                    <p className="text-xs text-muted-foreground">
                      โซเดียม {meal.nutrients.sodium}mg • โพแทสเซียม {meal.nutrients.potassium}mg
                    </p>
                  </div>
                  <Badge variant={meal.mealType === 'breakfast' ? 'default' : 'secondary'}>
                    {meal.mealType === 'breakfast' && 'เช้า'}
                    {meal.mealType === 'lunch' && 'กลางวัน'}
                    {meal.mealType === 'dinner' && 'เย็น'}
                    {meal.mealType === 'snack' && 'ว่าง'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}