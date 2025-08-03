import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Calendar, TestTube, ImageIcon, TrendingUp, MessageSquare } from "lucide-react";

// Mock patient data
const mockPatientData = {
  "1": {
    name: "นางสาว สมใจ ใจดี",
    age: 65,
    ckdStage: 3,
    lastVisit: "2024-01-15",
    riskLevel: "medium",
    phone: "081-234-5678"
  }
};

// Mock food records
const mockFoodRecords = [
  {
    id: "1",
    date: "2024-01-22",
    time: "07:30",
    foodName: "ข้าวต้มหมู",
    imageUrl: "/placeholder.svg",
    nutrition: {
      calories: 320,
      protein: 18,
      sodium: 850,
      potassium: 420,
      phosphorus: 180
    }
  },
  {
    id: "2", 
    date: "2024-01-22",
    time: "12:00",
    foodName: "ผัดกะเพราไก่",
    imageUrl: "/placeholder.svg",
    nutrition: {
      calories: 450,
      protein: 25,
      sodium: 1200,
      potassium: 380,
      phosphorus: 220
    }
  }
];

// Mock lab results
const mockLabResults = {
  creatinine: { value: 2.1, normal: "0.6-1.2", unit: "mg/dL" },
  bun: { value: 45, normal: "7-20", unit: "mg/dL" },
  potassium: { value: 4.8, normal: "3.5-5.0", unit: "mEq/L" },
  phosphorus: { value: 5.2, normal: "2.5-4.5", unit: "mg/dL" }
};

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [doctorNote, setDoctorNote] = useState("");
  const [newLabValues, setNewLabValues] = useState({
    creatinine: "",
    bun: "",
    potassium: "",
    phosphorus: ""
  });

  const patient = mockPatientData[patientId as keyof typeof mockPatientData];

  if (!patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลผู้ป่วย</h2>
          <Button onClick={() => navigate("/doctor/dashboard")}>
            กลับหน้าแดชบอร์ด
          </Button>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "default";
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case "high": return "เสี่ยงสูง";
      case "medium": return "เสี่ยงปานกลาง";
      case "low": return "เสี่ยงต่ำ";
      default: return "ไม่ทราบ";
    }
  };

  const getLabResultColor = (value: number, normal: string) => {
    const [min, max] = normal.split("-").map(n => parseFloat(n));
    if (value < min || value > max) return "text-destructive";
    return "text-foreground";
  };

  const handleSaveNote = () => {
    // TODO: Save doctor note
    console.log("Saving note:", doctorNote);
  };

  const handleUpdateLabResults = () => {
    // TODO: Update lab results
    console.log("Updating lab results:", newLabValues);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/doctor/dashboard")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{patient.name}</h1>
              <p className="text-sm text-muted-foreground">
                อายุ {patient.age} ปี • CKD Stage {patient.ckdStage}
              </p>
            </div>
          </div>
          <Badge variant={getRiskColor(patient.riskLevel)} className="ml-auto">
            {getRiskText(patient.riskLevel)}
          </Badge>
        </div>
      </header>

      <div className="container py-6">
        <Tabs defaultValue="food-records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="food-records" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              บันทึกอาหาร
            </TabsTrigger>
            <TabsTrigger value="lab-results" className="gap-2">
              <TestTube className="h-4 w-4" />
              ผลเลือด
            </TabsTrigger>
            <TabsTrigger value="nutrition-trends" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              แนวโน้ม
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              คำแนะนำ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="food-records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>บันทึกอาหารล่าสุด</CardTitle>
                <CardDescription>
                  รูปภาพและข้อมูลโภชนาการของอาหารที่ผู้ป่วยบันทึก
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFoodRecords.map((record) => (
                    <div key={record.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={record.imageUrl}
                        alt={record.foodName}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{record.foodName}</h3>
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {record.date} {record.time}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">แคลอรี่:</span>
                            <div className="font-medium">{record.nutrition.calories} kcal</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">โปรตีน:</span>
                            <div className="font-medium">{record.nutrition.protein} g</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">โซเดียม:</span>
                            <div className="font-medium text-destructive">{record.nutrition.sodium} mg</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">โพแทสเซียม:</span>
                            <div className="font-medium">{record.nutrition.potassium} mg</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ฟอสฟอรัส:</span>
                            <div className="font-medium text-destructive">{record.nutrition.phosphorus} mg</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lab-results" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>ผลเลือดล่าสุด</CardTitle>
                  <CardDescription>ค่าที่ตรวจล่าสุด เมื่อ {patient.lastVisit}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(mockLabResults).map(([key, result]) => (
                    <div key={key} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium capitalize">{key}</span>
                        <div className="text-sm text-muted-foreground">
                          ปกติ: {result.normal} {result.unit}
                        </div>
                      </div>
                      <div className={`text-right ${getLabResultColor(result.value, result.normal)}`}>
                        <div className="font-bold">{result.value}</div>
                        <div className="text-sm">{result.unit}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>อัพเดทผลเลือด</CardTitle>
                  <CardDescription>กรอกผลเลือดใหม่</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(mockLabResults).map((key) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key} className="capitalize">{key}</Label>
                      <Input
                        id={key}
                        type="number"
                        step="0.1"
                        placeholder={`${mockLabResults[key as keyof typeof mockLabResults].value}`}
                        value={newLabValues[key as keyof typeof newLabValues]}
                        onChange={(e) => setNewLabValues(prev => ({
                          ...prev,
                          [key]: e.target.value
                        }))}
                      />
                    </div>
                  ))}
                  <Button onClick={handleUpdateLabResults} className="w-full">
                    บันทึกผลเลือด
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition-trends">
            <Card>
              <CardHeader>
                <CardTitle>แนวโน้มโภชนาการ</CardTitle>
                <CardDescription>
                  กราฟแสดงแนวโน้มการรับประทานสารอาหารรายวัน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>กราฟแนวโน้มจะแสดงที่นี่</p>
                    <p className="text-sm">จะพัฒนาต่อเมื่อมีข้อมูลจากฐานข้อมูล</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>คำแนะนำสำหรับผู้ป่วย</CardTitle>
                <CardDescription>
                  เขียนคำแนะนำที่ผู้ป่วยจะเห็นในแอปของตัวเอง
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-note">คำแนะนำใหม่</Label>
                  <Textarea
                    id="doctor-note"
                    placeholder="เช่น ควรลดการบริโภคอาหารที่มีโซเดียมสูง..."
                    value={doctorNote}
                    onChange={(e) => setDoctorNote(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleSaveNote}>
                  ส่งคำแนะนำให้ผู้ป่วย
                </Button>

                {/* Previous notes */}
                <div className="space-y-3 mt-6">
                  <h4 className="font-medium">คำแนะนำก่อนหน้า</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">ควรลดการรับประทานอาหารที่มีโพแทสเซียมสูง เช่น กล้วย องุ่น</p>
                      <p className="text-xs text-muted-foreground mt-1">15 ม.ค. 2024</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">ผลเลือดดีขึ้น ให้คงระดับการรับประทานอาหารในปัจจุบัน</p>
                      <p className="text-xs text-muted-foreground mt-1">10 ม.ค. 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDetail;