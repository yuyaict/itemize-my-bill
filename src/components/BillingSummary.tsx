import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt, Minus, Calculator } from "lucide-react";
import { toast } from "sonner";

interface BillingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface BillingSummaryProps {
  items: BillingItem[];
  onRemoveItem: (index: number) => void;
  patientRight: string;
}

const BillingSummary = ({ items, onRemoveItem, patientRight }: BillingSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount based on patient rights
  const getDiscount = () => {
    switch (patientRight) {
      case "universal":
        return Math.max(0, subtotal - 30); // บัตรทอง จ่าย 30 บาท
      case "civil_servant":
        return subtotal * 0.1; // ข้าราชการ ลด 10%
      case "social_security":
        return subtotal; // ประกันสังคม ไม่เสียค่าใช้จ่าย
      default:
        return 0;
    }
  };

  const discount = getDiscount();
  const total = subtotal - discount;

  const getPatientRightLabel = () => {
    switch (patientRight) {
      case "universal": return "บัตรทอง (30 บาท)";
      case "civil_servant": return "ข้าราชการ";
      case "social_security": return "ประกันสังคม";
      case "private": return "จ่ายเอง";
      case "company": return "บริษัท/ประกันเอกชน";
      default: return "ไม่ระบุ";
    }
  };

  const handleRemoveItem = (index: number) => {
    onRemoveItem(index);
    toast.success("ลบรายการเรียบร้อยแล้ว");
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Receipt className="h-5 w-5" />
          สรุปค่าใช้จ่าย
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>ยังไม่มีรายการค่าใช้จ่าย</p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.quantity} {item.unit}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ฿{item.price.toFixed(2)} × {item.quantity} = ฿{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveItem(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>ยอดรวมก่อนหักสิทธิ:</span>
                <span className="font-medium">฿{subtotal.toFixed(2)}</span>
              </div>
              
              {patientRight && (
                <div className="flex justify-between text-sm">
                  <span>สิทธิ: {getPatientRightLabel()}</span>
                  <span className="text-secondary font-medium">
                    {discount > 0 ? `-฿${discount.toFixed(2)}` : "ฟรี"}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>ยอดชำระ:</span>
                <span className="text-primary">฿{Math.max(0, total).toFixed(2)}</span>
              </div>
              
              {patientRight === "social_security" && (
                <p className="text-sm text-success font-medium text-center mt-2">
                  ประกันสังคมคุ้มครอง - ไม่มีค่าใช้จ่าย
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BillingSummary;