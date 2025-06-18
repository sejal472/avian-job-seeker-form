
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentStepProps {
  data: any;
  updateData: (data: any) => void;
  onPaymentComplete: () => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ data, updateData, onPaymentComplete }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');

  const handleShowQRCode = () => {
    setShowQRCode(true);
    toast.info('Please scan the QR code and complete payment of ₹1,000');
  };

  const handleUTRSubmit = () => {
    if (!utrNumber.trim()) {
      toast.error('Please enter UTR transaction number');
      return;
    }
    
    updateData({ utrNumber, paymentStatus: 'completed' });
    toast.success('Payment details submitted successfully!');
    onPaymentComplete();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Registration Fee Payment</h3>
        
        <Card className="border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Registration Fee: ₹1,000
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-600">
                A registration fee of ₹1,000 is required to complete your Air Bharat career application. 
                This fee covers application processing and background verification.
              </p>
              
              {!showQRCode ? (
                <Button 
                  onClick={handleShowQRCode}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Pay Now via UPI
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <QrCode className="h-32 w-32 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Scan this QR code with any UPI app
                    </p>
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      <p><strong>UPI ID:</strong> airbharat@paytm</p>
                      <p><strong>Amount:</strong> ₹1,000</p>
                      <p><strong>Merchant:</strong> Air Bharat Careers</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="utrNumber">UTR Transaction Number *</Label>
                    <Input
                      id="utrNumber"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="Enter 12-digit UTR number from your payment"
                      maxLength={12}
                    />
                    <p className="text-xs text-gray-500">
                      You can find the UTR number in your UPI payment confirmation message
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleUTRSubmit}
                    disabled={!utrNumber.trim()}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Submit UTR & Complete Registration
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> The registration fee is non-refundable and covers application processing, 
            background verification, and administrative costs. Payment confirmation is required to proceed with your application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
