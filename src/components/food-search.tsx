import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Search, Plus, AlertTriangle } from "lucide-react";
import { FOOD_DATABASE, FOOD_CATEGORIES, MEAL_TYPES } from "@/data/foodDatabase";
import { CKD_LIMITS, NUTRIENT_NAMES_TH, NUTRIENT_UNITS } from "@/data/ckdLimits";
import { Food, MealEntry, CKDStage, NutrientValues } from "@/types";

interface FoodSearchProps {
  ckdStage: CKDStage;
  onBack: () => void;
  onAddMeal: (meal: Omit<MealEntry, 'id' | 'timestamp'>) => void;
}

export function FoodSearch({ ckdStage, onBack, onAddMeal }: FoodSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [servings, setServings] = useState('1');
  const [mealType, setMealType] = useState<keyof typeof MEAL_TYPES>('breakfast');
  const [showCustomFood, setShowCustomFood] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: '',
    serving: '',
    sodium: '',
    potassium: '',
    protein: '',
    phosphorus: '',
    fluid: '',
    calories: ''
  });

  const limits = CKD_LIMITS[ckdStage];

  const filteredFoods = useMemo(() => {
    return FOOD_DATABASE.filter(food => {
      const matchesSearch = food.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (food.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesCategory = selectedCategory === 'ทั้งหมด' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const calculateNutrients = (food: Food, servingAmount: number): NutrientValues => {
    return {
      sodium: Math.round(food.nutrients.sodium * servingAmount),
      potassium: Math.round(food.nutrients.potassium * servingAmount),
      protein: Number((food.nutrients.protein * servingAmount).toFixed(1)),
      phosphorus: Math.round(food.nutrients.phosphorus * servingAmount),
      fluid: Math.round(food.nutrients.fluid * servingAmount),
      calories: Math.round(food.nutrients.calories * servingAmount)
    };
  };

  const getWarnings = (nutrients: NutrientValues): string[] => {
    const warnings: string[] = [];
    
    if (nutrients.sodium >= limits.sodium.warning) {
      warnings.push(`โซเดียมสูง (${nutrients.sodium} mg)`);
    }
    if (nutrients.potassium >= limits.potassium.warning) {
      warnings.push(`โพแทสเซียมสูง (${nutrients.potassium} mg)`);
    }
    if (nutrients.protein >= limits.protein.warning) {
      warnings.push(`โปรตีนสูง (${nutrients.protein} g)`);
    }
    if (nutrients.phosphorus >= limits.phosphorus.warning) {
      warnings.push(`ฟอสฟอรัสสูง (${nutrients.phosphorus} mg)`);
    }
    
    return warnings;
  };

  const handleAddFood = () => {
    if (!selectedFood) return;
    
    const servingAmount = parseFloat(servings);
    if (isNaN(servingAmount) || servingAmount <= 0) return;

    const nutrients = calculateNutrients(selectedFood, servingAmount);
    
    const mealEntry: Omit<MealEntry, 'id' | 'timestamp'> = {
      foodId: selectedFood.id,
      foodName: selectedFood.nameTh,
      servings: servingAmount,
      nutrients,
      mealType,
      customFood: false
    };

    onAddMeal(mealEntry);
  };

  const handleAddCustomFood = () => {
    if (!customFood.name.trim()) return;

    const nutrients: NutrientValues = {
      sodium: parseFloat(customFood.sodium) || 0,
      potassium: parseFloat(customFood.potassium) || 0,
      protein: parseFloat(customFood.protein) || 0,
      phosphorus: parseFloat(customFood.phosphorus) || 0,
      fluid: parseFloat(customFood.fluid) || 0,
      calories: parseFloat(customFood.calories) || 0
    };

    const mealEntry: Omit<MealEntry, 'id' | 'timestamp'> = {
      foodId: 'custom-' + Date.now(),
      foodName: customFood.name,
      servings: 1,
      nutrients,
      mealType,
      customFood: true
    };

    onAddMeal(mealEntry);
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับ
        </Button>
        <h1 className="text-2xl font-bold text-foreground">เพิ่มอาหาร</h1>
      </div>

      {/* Meal Type Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>เลือกมื้ออาหาร</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(MEAL_TYPES).map(([key, label]) => (
              <Button
                key={key}
                variant={mealType === key ? "default" : "outline"}
                onClick={() => setMealType(key as keyof typeof MEAL_TYPES)}
                className="text-sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ค้นหาอาหาร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {FOOD_CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Food Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Food List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>เลือกอาหาร</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCustomFood(!showCustomFood)}
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มอาหารใหม่
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {showCustomFood ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-name">ชื่ออาหาร</Label>
                  <Input
                    id="custom-name"
                    value={customFood.name}
                    onChange={(e) => setCustomFood({...customFood, name: e.target.value})}
                    placeholder="ชื่ออาหารที่ต้องการเพิ่ม"
                  />
                </div>
                <div>
                  <Label htmlFor="custom-serving">หน่วยเสิร์ฟ</Label>
                  <Input
                    id="custom-serving"
                    value={customFood.serving}
                    onChange={(e) => setCustomFood({...customFood, serving: e.target.value})}
                    placeholder="เช่น 1 ถ้วย, 1 ชิ้น"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="custom-sodium">โซเดียม (mg)</Label>
                    <Input
                      id="custom-sodium"
                      type="number"
                      value={customFood.sodium}
                      onChange={(e) => setCustomFood({...customFood, sodium: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-potassium">โพแทสเซียม (mg)</Label>
                    <Input
                      id="custom-potassium"
                      type="number"
                      value={customFood.potassium}
                      onChange={(e) => setCustomFood({...customFood, potassium: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-protein">โปรตีน (g)</Label>
                    <Input
                      id="custom-protein"
                      type="number"
                      value={customFood.protein}
                      onChange={(e) => setCustomFood({...customFood, protein: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-phosphorus">ฟอสฟอรัส (mg)</Label>
                    <Input
                      id="custom-phosphorus"
                      type="number"
                      value={customFood.phosphorus}
                      onChange={(e) => setCustomFood({...customFood, phosphorus: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-fluid">น้ำ (ml)</Label>
                    <Input
                      id="custom-fluid"
                      type="number"
                      value={customFood.fluid}
                      onChange={(e) => setCustomFood({...customFood, fluid: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="custom-calories">แคลอรี่ (kcal)</Label>
                    <Input
                      id="custom-calories"
                      type="number"
                      value={customFood.calories}
                      onChange={(e) => setCustomFood({...customFood, calories: e.target.value})}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleAddCustomFood}
                  disabled={!customFood.name.trim()}
                  className="w-full"
                >
                  เพิ่มอาหารใหม่
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedFood?.id === food.id
                        ? 'border-primary bg-primary-light'
                        : 'border-border hover:bg-accent'
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="font-medium">{food.nameTh}</div>
                    <div className="text-sm text-muted-foreground">{food.serving}</div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {food.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {food.nutrients.calories} kcal
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Food Details */}
        {selectedFood && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedFood.nameTh}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="servings">จำนวนหน่วยเสิร์ฟ</Label>
                <Input
                  id="servings"
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  min="0.1"
                  step="0.1"
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  1 หน่วยเสิร์ฟ = {selectedFood.serving}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">ค่าสารอาหาร (รวม)</h4>
                {(() => {
                  const servingAmount = parseFloat(servings) || 0;
                  const nutrients = calculateNutrients(selectedFood, servingAmount);
                  const warnings = getWarnings(nutrients);
                  
                  return (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>โซเดียม: {nutrients.sodium} mg</div>
                        <div>โพแทสเซียม: {nutrients.potassium} mg</div>
                        <div>โปรตีน: {nutrients.protein} g</div>
                        <div>ฟอสฟอรัส: {nutrients.phosphorus} mg</div>
                        <div>น้ำ: {nutrients.fluid} ml</div>
                        <div>แคลอรี่: {nutrients.calories} kcal</div>
                      </div>
                      
                      {warnings.length > 0 && (
                        <div className="p-3 bg-warning-light border border-warning rounded-lg">
                          <div className="flex items-center gap-2 text-warning">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="font-medium">คำเตือน</span>
                          </div>
                          <ul className="text-sm text-warning mt-1">
                            {warnings.map((warning, index) => (
                              <li key={index}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <Button 
                onClick={handleAddFood}
                disabled={!selectedFood || parseFloat(servings) <= 0}
                className="w-full"
                size="lg"
              >
                เพิ่มอาหารนี้
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}