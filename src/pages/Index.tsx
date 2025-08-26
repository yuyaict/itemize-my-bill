import { useState } from "react";
import PatientInfo from "@/components/PatientInfo";
import ItemSelector from "@/components/ItemSelector";
import BillingSummary from "@/components/BillingSummary";
import { Activity } from "lucide-react";

interface BillingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

const Index = () => {
  const [hn, setHn] = useState("");
  const [patientRight, setPatientRight] = useState("");
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);

  const handleAddItem = (item: BillingItem) => {
    setBillingItems(prev => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    setBillingItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">ระบบเก็บเงินค่ารักษาพยาบาล</h1>
              <p className="opacity-90">Medical Billing System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Patient Information */}
          <PatientInfo 
            hn={hn}
            setHn={setHn}
            patientRight={patientRight}
            setPatientRight={setPatientRight}
          />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Item Selector */}
            <ItemSelector onAddItem={handleAddItem} />
            
            {/* Billing Summary */}
            <BillingSummary 
              items={billingItems}
              onRemoveItem={handleRemoveItem}
              patientRight={patientRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
