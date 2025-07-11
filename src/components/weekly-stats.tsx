import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { DailyIntake } from "@/types";
import { CKD_LIMITS, NUTRIENT_NAMES_TH, NUTRIENT_UNITS } from "@/data/ckdLimits";

interface WeeklyStatsProps {
  weeklyData: DailyIntake[];
  onBack: () => void;
}

export function WeeklyStats({ weeklyData, onBack }: WeeklyStatsProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAverage = (nutrient: keyof typeof NUTRIENT_NAMES_TH) => {
    const total = weeklyData.reduce((sum, day) => sum + day.totalNutrients[nutrient], 0);
    return Math.round(total / weeklyData.length);
  };

  const getDayStatus = (day: DailyIntake) => {
    if (day.warnings.length === 0) return 'safe';
    const hasMax = day.warnings.some(w => w.includes('เกินขีดจำกัด'));
    return hasMax ? 'danger' : 'warning';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return <Badge className="bg-safe text-safe-foreground">ปลอดภัย</Badge>;
      case 'warning':
        return <Badge className="bg-warning text-warning-foreground">ระวัง</Badge>;
      case 'danger':
        return <Badge className="bg-danger text-danger-foreground">อันตราย</Badge>;
      default:
        return <Badge variant="secondary">ไม่มีข้อมูล</Badge>;
    }
  };

  const limits = CKD_LIMITS[weeklyData[0]?.ckdStage || 3];

  return (
    <div className="min-h-screen bg-background p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับ
        </Button>
        <h1 className="text-2xl font-bold text-foreground">สถิติรายสัปดาห์</h1>
      </div>

      {/* Weekly Average */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            ค่าเฉลี่ยรายสัปดาห์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(NUTRIENT_NAMES_TH).filter(([key]) => key !== 'calories').map(([key, name]) => {
              const avg = calculateAverage(key as keyof typeof NUTRIENT_NAMES_TH);
              const limit = limits[key as keyof typeof limits];
              const isOverLimit = typeof limit === 'object' && avg > limit.warning;
              
              return (
                <div key={key} className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-sm text-muted-foreground">{name}</div>
                  <div className={`text-lg font-bold ${isOverLimit ? 'text-warning' : 'text-foreground'}`}>
                    {avg} {NUTRIENT_UNITS[key as keyof typeof NUTRIENT_UNITS]}
                  </div>
                  {typeof limit === 'object' && (
                    <div className="text-xs text-muted-foreground">
                      / {limit.max} {NUTRIENT_UNITS[key as keyof typeof NUTRIENT_UNITS]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>รายละเอียดรายวัน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((day) => {
              const status = getDayStatus(day);
              const hasData = day.meals.length > 0;
              
              return (
                <div key={day.date} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium min-w-[80px]">
                      {formatDate(day.date)}
                    </div>
                    {getStatusBadge(hasData ? status : 'none')}
                  </div>
                  
                  {hasData ? (
                    <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <div>Na: {day.totalNutrients.sodium}mg</div>
                      <div>K: {day.totalNutrients.potassium}mg</div>
                      <div>P: {day.totalNutrients.protein}g</div>
                      <div>Ph: {day.totalNutrients.phosphorus}mg</div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">ไม่มีข้อมูล</div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Warning Summary */}
      {weeklyData.some(day => day.warnings.length > 0) && (
        <Card className="border-warning bg-warning-light">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              สรุปคำเตือนในสัปดาห์นี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyData.filter(day => day.warnings.length > 0).map((day) => (
                <div key={day.date} className="p-3 bg-background rounded-lg">
                  <div className="font-medium text-sm mb-1">
                    {formatDate(day.date)}
                  </div>
                  <ul className="text-sm text-warning space-y-1">
                    {day.warnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-medical">คำแนะนำ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-safe">✓</span>
              <span>ควรดื่มน้ำเปล่าแทนเครื่องดื่มที่มีโซเดียมสูง</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-safe">✓</span>
              <span>หลีกเลี่ยงอาหารแปรรูปและอาหารกระป่อง</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-safe">✓</span>
              <span>เลือกผักและผลไม้ที่มีโพแทสเซียมต่ำ</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-safe">✓</span>
              <span>ปรึกษาแพทย์หากพบคำเตือนบ่อยครั้ง</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}