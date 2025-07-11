import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Camera, Calendar, Trophy, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-medical-light">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-primary">NephroNext</span>
        </div>
        <Link to="/app">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            ทดลองใช้งาน
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          ดูแลสุขภาพไต<span className="text-primary">ผู้สูงอายุ</span>
          <br />
          <span className="text-medical">ด้วยเทคโนโลยี AI</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          แอปพลิเคชันมือถือที่ช่วยวิเคราะห์โภชนาการจากภาพถ่ายอาหาร และให้คำแนะนำเฉพาะบุคคลแบบ real-time เพื่อชะลอโรคไตเรื้อรัง
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/app">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Camera className="w-5 h-5 mr-2" />
              ทดลองวิเคราะห์อาหาร
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            ดูข้อมูลเพิ่มเติม
          </Button>
        </div>
      </section>

      {/* Problems Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-danger">ปัญหาที่ผู้ป่วยไตเรื้อรังเผชิญ</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span className="text-lg">ไม่ทราบว่าอาหารที่กินเหมาะสมหรือไม่</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span className="text-lg">ค่าใช้จ่ายในการฟอกไตสูงมาก</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span className="text-lg">ขาดแรงจูงใจในการดูแลตนเอง</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span className="text-lg">ไม่มีเครือข่ายสนับสนุนที่เข้าใจ</span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">NephroNext คือคำตอบ</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-lg">วิเคราะห์อาหารด้วย AI แม่นยำ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-lg">ชะลอโรคไต ลดค่าใช้จ่าย</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-lg">เกมจูงใจด้วยตัวละคร Nephry</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span className="text-lg">ชุมชนแลกเปลี่ยนประสบการณ์</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">ฟีเจอร์หลักที่ช่วยดูแลคุณ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">วิเคราะห์อาหารด้วย AI</h3>
              <p className="text-muted-foreground">
                ถ่ายภาพอาหารแล้วรับคำแนะนำทันที ว่าเหมาะสมกับสภาพไตหรือไม่
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-safe/10 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-safe" />
              </div>
              <h3 className="text-xl font-bold">บันทึกมื้ออาหาร</h3>
              <p className="text-muted-foreground">
                ติดตามการกินแต่ละมื้อ เพื่อดูพัฒนาการและรับคำแนะนำที่ดีขึ้น
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold">เกมสะสมแต้ม</h3>
              <p className="text-muted-foreground">
                เลี้ยงตัวละคร Nephry และรับแต้มจากการดูแลสุขภาพอย่างสม่ำเสมอ
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-medical" />
                <h3 className="text-xl font-bold">ติดตามค่าทางห้องปฏิบัติการ</h3>
              </div>
              <p className="text-muted-foreground">
                บันทึกและติดตามค่า Creatinine, eGFR และค่าอื่นๆ เพื่อมองเห็นแนวโน้มสุขภาพไต
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">ชุมชนผู้ป่วยไต</h3>
              </div>
              <p className="text-muted-foreground">
                แลกเปลี่ยนประสบการณ์ เคล็ดลับการดูแลสุขภาพ และให้กำลังใจซึ่งกันและกัน
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-medical/10 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">พร้อมเริ่มดูแลสุขภาพไตแล้วหรือยัง?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            เริ่มต้นใช้งานฟรี และสัมผัสความแตกต่างในการดูแลสุขภาพไต
          </p>
          <Link to="/app">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              เริ่มใช้งานเลย
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">NephroNext</span>
          </div>
          <p className="text-muted-foreground">
            ดูแลสุขภาพไตด้วยเทคโนโลยี เพื่อชีวิตที่ดีกว่า
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;