import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package } from "lucide-react";
import { toast } from "sonner";

// Mock medical items data
const medicalItems = [
  { id: "item001", name: "Paracetamol 500mg", price: 15.50, unit: "เม็ด" },
  { id: "item002", name: "Amoxicillin 250mg", price: 45.00, unit: "แคปซูล" },
  { id: "item003", name: "Blood Test - CBC", price: 350.00, unit: "ครั้ง" },
  { id: "item004", name: "X-Ray Chest", price: 450.00, unit: "ครั้ง" },
  { id: "item005", name: "Doctor Consultation", price: 200.00, unit: "ครั้ง" },
  { id: "item006", name: "IV Drip Normal Saline", price: 120.00, unit: "ถุง" },
  { id: "item007", name: "Bandage 2 inch", price: 25.00, unit: "ผืน" },
  { id: "item008", name: "Syrup Cough Medicine", price: 85.00, unit: "ขวด" }
];

interface ItemSelectorProps {
  onAddItem: (item: { id: string; name: string; price: number; quantity: number; unit: string }) => void;
}

const ItemSelector = ({ onAddItem }: ItemSelectorProps) => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState("1");

  const handleAddItem = () => {
    if (!selectedItemId || !quantity || parseInt(quantity) <= 0) {
      toast.error("กรุณาเลือกรายการและระบุจำนวนที่ถูกต้อง");
      return;
    }

    const selectedItem = medicalItems.find(item => item.id === selectedItemId);
    if (!selectedItem) return;

    onAddItem({
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      quantity: parseInt(quantity),
      unit: selectedItem.unit
    });

    // Reset form
    setSelectedItemId("");
    setQuantity("1");
    
    toast.success("เพิ่มรายการเรียบร้อยแล้ว");
  };

  const selectedItem = medicalItems.find(item => item.id === selectedItemId);

  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Package className="h-5 w-5" />
          เพิ่มรายการค่าใช้จ่าย
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="item-select" className="text-sm font-medium">
              เลือกรายการ
            </Label>
            <Select value={selectedItemId} onValueChange={setSelectedItemId}>
              <SelectTrigger className="h-11 bg-background border-border">
                <SelectValue placeholder="เลือกรายการค่าใช้จ่าย" />
              </SelectTrigger>
              <SelectContent>
                {medicalItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <div className="flex flex-col items-start">
                      <span>{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ฿{item.price.toFixed(2)} / {item.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              จำนวน
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-11 bg-background border-border"
            />
          </div>
        </div>

        {selectedItem && (
          <div className="p-4 bg-muted/50 rounded-lg border">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedItem.name}</p>
                <p className="text-sm text-muted-foreground">
                  ราคาต่อหน่วย: ฿{selectedItem.price.toFixed(2)} / {selectedItem.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-primary">
                  ฿{(selectedItem.price * parseInt(quantity || "0")).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {quantity} {selectedItem.unit}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleAddItem} 
          className="w-full h-11 bg-gradient-primary hover:opacity-90 transition-opacity"
          disabled={!selectedItemId || !quantity}
        >
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มรายการ
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemSelector;