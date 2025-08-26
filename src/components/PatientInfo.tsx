import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CreditCard } from "lucide-react";

interface PatientInfoProps {
  hn: string;
  setHn: (hn: string) => void;
  patientRight: string;
  setPatientRight: (right: string) => void;
}

const PatientInfo = ({ hn, setHn, patientRight, setPatientRight }: PatientInfoProps) => {
  const patientRights = [
    { value: "universal", label: "บัตรทอง (30 บาท)" },
    { value: "civil_servant", label: "ข้าราชการ" },
    { value: "social_security", label: "ประกันสังคม" },
    { value: "private", label: "จ่ายเอง" },
    { value: "company", label: "บริษัท/ประกันเอกชน" }
  ];

  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <User className="h-5 w-5" />
          ข้อมูลผู้ป่วย
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hn" className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              หมายเลขผู้ป่วย (HN)
            </Label>
            <Input
              id="hn"
              value={hn}
              onChange={(e) => setHn(e.target.value)}
              placeholder="กรอกหมายเลขผู้ป่วย"
              className="h-11 bg-background border-border focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patient-right" className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-secondary" />
              สิทธิการรักษา
            </Label>
            <Select value={patientRight} onValueChange={setPatientRight}>
              <SelectTrigger className="h-11 bg-background border-border focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="เลือกสิทธิการรักษา" />
              </SelectTrigger>
              <SelectContent>
                {patientRights.map((right) => (
                  <SelectItem key={right.value} value={right.value}>
                    {right.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;