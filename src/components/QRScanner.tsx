import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, CameraOff, Scan, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface QRScannerProps {
  onScan?: (data: any) => void;
  onError?: (error: string) => void;
}

const QRScannerComponent: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleScan = (result: any) => {
    if (result) {
      try {
        // Try to parse as JSON first
        const parsedData = JSON.parse(data);
        setScannedData(parsedData);
        setIsScanning(false);
        onScan?.(parsedData);
        toast.success('QR Code scanned successfully!');
      } catch {
        // If not JSON, treat as plain text
        const textData = { raw: data, timestamp: new Date().toISOString() };
        setScannedData(textData);
        setIsScanning(false);
        onScan?.(textData);
        toast.success('QR Code scanned successfully!');
      }
    }
  };

  const handleError = (err: any) => {
    const errorMessage = err?.message || "Failed to scan QR code";
    setError(errorMessage);
    onError?.(errorMessage);
    toast.error(errorMessage);
  };

  const startScanning = () => {
    setError("");
    setScannedData(null);
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning && (
          <Button onClick={startScanning} className="w-full gap-2">
            <Camera className="h-4 w-4" />
            Start Scanning
          </Button>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div className="relative">
              <QrScanner
                delay={300}
                style={{ width: "100%" }}
                onError={handleError}
                onScan={handleScan}
              />
              {/* Overlay corners */}
              <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={stopScanning}
              className="w-full gap-2"
            >
              <CameraOff className="h-4 w-4" />
              Stop Scanning
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {scannedData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Scanned Data:</h4>

            {scannedData.id ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Product ID:</Badge>
                  <span className="text-sm">{scannedData.id}</span>
                </div>
                {scannedData.name && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Name:</Badge>
                    <span className="text-sm">{scannedData.name}</span>
                  </div>
                )}
                {scannedData.trackingUrl && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Track:</Badge>
                    <a
                      href={scannedData.trackingUrl}
                      className="text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-muted rounded-md">
                <code className="text-sm break-all">
                  {scannedData.raw || JSON.stringify(scannedData, null, 2)}
                </code>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRScannerComponent;
