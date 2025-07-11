import { cn } from "@/lib/utils";
import { CKDLimits } from "@/types";

interface NutritionBarProps {
  label: string;
  value: number;
  max: number;
  warning: number;
  unit: string;
  className?: string;
}

export function NutritionBar({ 
  label, 
  value, 
  max, 
  warning, 
  unit, 
  className 
}: NutritionBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const warningPercentage = (warning / max) * 100;
  
  const getStatusColor = () => {
    if (value >= max) return 'bg-danger';
    if (value >= warning) return 'bg-warning'; 
    return 'bg-safe';
  };

  const getStatusText = () => {
    if (value >= max) return 'เกินขีดจำกัด';
    if (value >= warning) return 'ใกล้เกินแล้ว';
    return 'ปลอดภัย';
  };

  const getStatusTextColor = () => {
    if (value >= max) return 'text-danger';
    if (value >= warning) return 'text-warning';
    return 'text-safe';
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="text-right">
          <span className="text-sm font-bold">{value} {unit}</span>
          <span className="text-xs text-muted-foreground"> / {max} {unit}</span>
        </div>
      </div>
      
      <div className="relative w-full bg-secondary rounded-full h-3">
        {/* Warning threshold line */}
        <div 
          className="absolute top-0 w-0.5 h-3 bg-warning/50 rounded-full"
          style={{ left: `${warningPercentage}%` }}
        />
        
        {/* Progress bar */}
        <div
          className={cn(
            "h-3 rounded-full transition-all duration-300",
            getStatusColor()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <span className={cn("font-medium", getStatusTextColor())}>
          {getStatusText()}
        </span>
        <span className="text-muted-foreground">
          เหลือ {Math.max(0, max - value)} {unit}
        </span>
      </div>
    </div>
  );
}