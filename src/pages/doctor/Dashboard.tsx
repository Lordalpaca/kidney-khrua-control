import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Stethoscope, Users, Search, LogOut, User, Calendar, TrendingUp } from "lucide-react";

// Mock patient data
const mockPatients = [
  {
    id: "1",
    name: "นางสาว สมใจ ใจดี",
    age: 65,
    ckdStage: 3,
    lastVisit: "2024-01-15",
    riskLevel: "medium",
    recentMeals: 12
  },
  {
    id: "2", 
    name: "นาย วิชัย สุขใส",
    age: 58,
    ckdStage: 4,
    lastVisit: "2024-01-20",
    riskLevel: "high",
    recentMeals: 8
  },
  {
    id: "3",
    name: "นางศรี มาลัย",
    age: 72,
    ckdStage: 2,
    lastVisit: "2024-01-18",
    riskLevel: "low",
    recentMeals: 15
  }
];

const DoctorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleLogout = () => {
    navigate("/doctor/login");
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/doctor/patient/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Stethoscope className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">ระบบแพทย์ CKD</h1>
              <p className="text-sm text-muted-foreground">แดชบอร์ดสำหรับแพทย์</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            ออกจากระบบ
          </Button>
        </div>
      </header>

      <div className="container py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ป่วยทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPatients.length}</div>
              <p className="text-xs text-muted-foreground">
                คนที่ดูแลอยู่
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">เสี่ยงสูง</CardTitle>
              <TrendingUp className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {mockPatients.filter(p => p.riskLevel === "high").length}
              </div>
              <p className="text-xs text-muted-foreground">
                ต้องติดตามใกล้ชิด
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">วันนี้</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                อาหารที่บันทึกใหม่
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>รายชื่อผู้ป่วย</CardTitle>
                <CardDescription>
                  ผู้ป่วย CKD ที่อยู่ในการดูแลของคุณ
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อผู้ป่วย..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleViewPatient(patient.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>อายุ {patient.age} ปี</span>
                        <span>•</span>
                        <span>CKD Stage {patient.ckdStage}</span>
                        <span>•</span>
                        <span>พบล่าสุด {patient.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getRiskColor(patient.riskLevel)}>
                      {getRiskText(patient.riskLevel)}
                    </Badge>
                    <div className="text-right text-sm">
                      <div className="font-medium">{patient.recentMeals}</div>
                      <div className="text-muted-foreground">มื้อที่บันทึก</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;