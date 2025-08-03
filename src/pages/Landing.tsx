import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Heart, Trophy, Users, MessageCircle, Calendar, Star, Shield, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="text-blue-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-blue-800">NephroNext</h1>
          </div>
          <Link to='/app'>
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-3">
            ทดลองใช้งาน
          </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              ดูแลสุขภาพไตผู้สูงอายุ<br />
              <span className="text-blue-600">ด้วยเทคโนโลยี AI</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              แอปพลิเคชันมือถือที่ช่วยวิเคราะห์โภชนาการจากภาพถ่ายอาหาร 
              และให้คำแนะนำเฉพาะบุคคลแบบ real-time เพื่อชะลอโรคไตเรื้อรัง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <Link to="/app">
                  <Camera className="mr-2 w-5 h-5" />
                  ผู้ป่วย - ทดลองใช้งาน
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link to="/doctor/login">
                  แพทย์ - เข้าสู่ระบบ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                ปัญหาที่ผู้ป่วยไตเรื้อรังเผชิญ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-gray-700 text-lg">ไม่ทราบว่าอาหารที่กินเหมาะสมหรือไม่</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-gray-700 text-lg">ค่าใช้จ่ายในการฟอกไตสูงมาก</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-gray-700 text-lg">ขาดแรงจูงใจในการดูแลตนเอง</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                  <p className="text-gray-700 text-lg">ไม่มีเครือข่ายสนับสนุนที่เข้าใจ</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-600 mb-6">
                NephroNext คือคำตอบ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700 text-lg">วิเคราะห์อาหารด้วย AI แม่นยำ</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700 text-lg">ชะลอโรคไต ลดค่าใช้จ่าย</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Trophy className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700 text-lg">เกมจูงใจด้วยตัวละคร Nephry</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-green-500 mt-1" />
                  <p className="text-gray-700 text-lg">ชุมชนแลกเปลี่ยนประสบการณ์</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ฟีเจอร์หลักที่ช่วยดูแลคุณ
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">วิเคราะห์อาหารด้วย AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  ถ่ายภาพอาหารแล้วรับคำแนะนำทันที ว่าเหมาะสมกับสภาพไตหรือไม่
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">บันทึกมื้ออาหาร</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  ติดตามการกินแต่ละมื้อ เพื่อดูพัฒนาการและรับคำแนะนำที่ดีขึ้น
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-xl">เกมสะสมแต้ม</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  เลี้ยงตัวละคร Nephry และรับแต้มจากการดูแลตนเองที่ดี
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">ชุมชนผู้ป่วย</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  แลกเปลี่ยนประสบการณ์กับเพื่อนๆ ที่เข้าใจและช่วยเหลือกัน
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-yellow-200">
              <CardHeader>
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl text-yellow-700">Meal Plan เฉพาะตัว</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  <span className="text-yellow-600 font-semibold">Premium:</span> แผนอาหารที่ออกแบบเฉพาะสำหรับคุณ
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-yellow-200">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl text-yellow-700">ปรึกษาผู้เชี่ยวชาญ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  <span className="text-yellow-600 font-semibold">Premium:</span> พูดคุยกับนักโภชนาการและแพทย์
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            เหมาะสำหรับใครบ้าง
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-xl">ผู้ป่วยไตเรื้อรัง</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  ทุกระยะของโรค ทั้งที่ยังแข็งแรง อยู่บ้าน หรือนอนติดเตียง
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl">ผู้ดูแลและครอบครัว</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  ช่วยดูแลคนที่รักได้อย่างมั่นใจ ด้วยข้อมูลที่ถูกต้อง
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl">แพทย์และนักโภชนาการ</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  เครื่องมือช่วยในการดูแลผู้ป่วยและให้คำแนะนำ
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ประโยชน์ที่คุณจะได้รับ
          </h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">ชะลอการเสื่อมของไต</h4>
                  <p className="text-gray-600">การกินอาหารที่เหมาะสมช่วยให้ไตทำงานได้นานขึ้น</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">ลดค่าใช้จ่ายการรักษา</h4>
                  <p className="text-gray-600">เลื่อนการฟอกไตออกไป ประหยัดค่ารักษาหลักแสน</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">คุณภาพชีวิตที่ดีขึ้น</h4>
                  <p className="text-gray-600">มีพลังงาน อารมณ์ดี และทำกิจกรรมได้มากขึ้น</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-lg">
              <h4 className="text-2xl font-bold mb-4">สถิติที่น่าสนใจ</h4>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold">80%</div>
                  <div className="text-blue-100">ลดการเข้าโรงพยาบาล</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">3-5 ปี</div>
                  <div className="text-blue-100">เลื่อนการฟอกไตได้</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">500,000+</div>
                  <div className="text-blue-100">บาท ประหยัดค่ารักษา</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            เริ่มต้นดูแลสุขภาพไตวันนี้
          </h3>
          <p className="text-xl mb-8 opacity-90">
            ลองใช้ NephroNext ฟรี และสัมผัสประสบการณ์การดูแลสุขภาพแบบใหม่
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to='/app'>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              ทดลองใช้งานฟรี
            </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
              ติดต่อสอบถาม
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            * ไม่ต้องผูกมัดแพ็กเกจ ทดลองใช้ได้ทันที
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="text-blue-400 w-6 h-6" />
                <h4 className="text-xl font-bold">NephroNext</h4>
              </div>
              <p className="text-gray-300">
                แพลตฟอร์มดูแลสุขภาพไตด้วยเทคโนโลยี AI เพื่อคุณภาพชีวิตที่ดีขึ้น
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">ติดต่อเรา</h5>
              <div className="space-y-2 text-gray-300">
                <p>อีเมล: info@nephronext.com</p>
                <p>โทร: 02-xxx-xxxx</p>
                <p>Line: @nephronext</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">พื้นที่ให้บริการ</h5>
              <p className="text-gray-300">
                ทั่วประเทศไทย ทั้งในเขตเมืองและชนบท
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NephroNext. สงวนลิขสิทธิ์ทุกประการ</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
