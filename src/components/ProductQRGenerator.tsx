import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface ProductQRGeneratorProps {
  productId?: string;
  productName?: string;
  onGenerate?: (qrData: string) => void;
}

const ProductQRGenerator: React.FC<ProductQRGeneratorProps> = ({
  productId: initialProductId = '',
  productName: initialProductName = '',
  onGenerate
}) => {
  const [productId, setProductId] = useState(initialProductId);
  const [productName, setProductName] = useState(initialProductName);
  const [qrData, setQrData] = useState('');

  const generateQR = () => {
    if (!productId.trim()) {
      toast.error('Please enter a product ID');
      return;
    }

    const qrInfo = {
      id: productId,
      name: productName || 'Unknown Product',
      timestamp: new Date().toISOString(),
      trackingUrl: `${window.location.origin}/track/${productId}`
    };

    const qrDataString = JSON.stringify(qrInfo);
    setQrData(qrDataString);
    onGenerate?.(qrDataString);
    toast.success('QR Code generated successfully!');
  };

  const copyToClipboard = () => {
    if (qrData) {
      navigator.clipboard.writeText(qrData);
      toast.success('QR data copied to clipboard!');
    }
  };

  const downloadQR = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = 200;
      canvas.height = 200;
      
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = url;
        a.download = `product-${productId}-qr.png`;
        a.click();
        toast.success('QR Code downloaded!');
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Generate Product QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productId">Product ID *</Label>
          <Input
            id="productId"
            placeholder="Enter product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name (Optional)</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <Button onClick={generateQR} className="w-full">
          Generate QR Code
        </Button>

        {qrData && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-center">
              <QRCodeSVG 
                value={qrData}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex-1 text-center">
                Product: {productId}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex-1 gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadQR}
                className="flex-1 gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductQRGenerator;