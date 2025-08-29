import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWallet } from '@/hooks/useWallet';
import { toast } from 'sonner';
import { Tractor, Factory, Truck, Store, Shield, QrCode } from 'lucide-react';
import StacksWalletConnector from '@/components/StacksWalletConnector';
import { addStacksCheckpoint } from '@/utils/stacksIntegration';

const SupplyChain = () => {
  const { address, isConnected, walletType } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states for each role
  const [farmerForm, setFarmerForm] = useState({
    productId: '',
    batchId: '',
    location: '',
    harvestDate: new Date().toISOString().split('T')[0]
  });

  const [processorForm, setProcessorForm] = useState({
    productId: '',
    qualityChecks: '',
    certifications: '',
    processingSteps: ''
  });

  const [transporterForm, setTransporterForm] = useState({
    productId: '',
    temperature: '',
    gpsLocation: '',
    storageConditions: ''
  });

  const [retailerForm, setRetailerForm] = useState({
    productId: '',
    stockDetails: '',
    qrCode: '',
    shelfLocation: ''
  });

  const [regulatorForm, setRegulatorForm] = useState({
    productId: '',
    checkpointId: '',
    verificationNotes: ''
  });

  const handleFarmerSubmit = async () => {
    if (!isConnected || walletType !== 'stacks') {
      toast.error('Please connect your Hiro Wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      await addStacksCheckpoint(
        farmerForm.productId,
        'farm',
        `Harvest - Batch: ${farmerForm.batchId}, Location: ${farmerForm.location}, Date: ${farmerForm.harvestDate}`,
        true // isNewProduct
      );
      
      toast.success('Harvest details recorded on blockchain!');
      setFarmerForm({ productId: '', batchId: '', location: '', harvestDate: new Date().toISOString().split('T')[0] });
    } catch (error) {
      toast.error('Failed to record harvest details');
      console.error('Farmer submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProcessorSubmit = async () => {
    if (!isConnected || walletType !== 'stacks') {
      toast.error('Please connect your Hiro Wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = `Quality: ${processorForm.qualityChecks} | Certs: ${processorForm.certifications} | Steps: ${processorForm.processingSteps}`;
      await addStacksCheckpoint(processorForm.productId, 'processing', data);
      
      toast.success('Processing details recorded on blockchain!');
      setProcessorForm({ productId: '', qualityChecks: '', certifications: '', processingSteps: '' });
    } catch (error) {
      toast.error('Failed to record processing details');
      console.error('Processor submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransporterSubmit = async () => {
    if (!isConnected || walletType !== 'stacks') {
      toast.error('Please connect your Hiro Wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = `Temp: ${transporterForm.temperature}°C | GPS: ${transporterForm.gpsLocation} | Storage: ${transporterForm.storageConditions}`;
      await addStacksCheckpoint(transporterForm.productId, 'transport', data);
      
      toast.success('Transport details recorded on blockchain!');
      setTransporterForm({ productId: '', temperature: '', gpsLocation: '', storageConditions: '' });
    } catch (error) {
      toast.error('Failed to record transport details');
      console.error('Transporter submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetailerSubmit = async () => {
    if (!isConnected || walletType !== 'stacks') {
      toast.error('Please connect your Hiro Wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = `Stock: ${retailerForm.stockDetails} | QR: ${retailerForm.qrCode} | Location: ${retailerForm.shelfLocation}`;
      await addStacksCheckpoint(retailerForm.productId, 'retail', data);
      
      toast.success('Retail details recorded on blockchain!');
      setRetailerForm({ productId: '', stockDetails: '', qrCode: '', shelfLocation: '' });
    } catch (error) {
      toast.error('Failed to record retail details');
      console.error('Retailer submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-4">
              Supply Chain Management
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Track food products from farm to table using blockchain technology
            </p>
            
            {!isConnected && (
              <div className="flex justify-center mb-6">
                <StacksWalletConnector />
              </div>
            )}

            {isConnected && walletType === 'stacks' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">
                    Connected to Stacks Testnet
                  </span>
                  <Badge variant="secondary">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <Tabs defaultValue="farmer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="farmer" className="gap-2">
                <Tractor className="h-4 w-4" />
                Farmer
              </TabsTrigger>
              <TabsTrigger value="processor" className="gap-2">
                <Factory className="h-4 w-4" />
                Processor
              </TabsTrigger>
              <TabsTrigger value="transporter" className="gap-2">
                <Truck className="h-4 w-4" />
                Transporter
              </TabsTrigger>
              <TabsTrigger value="retailer" className="gap-2">
                <Store className="h-4 w-4" />
                Retailer
              </TabsTrigger>
              <TabsTrigger value="regulator" className="gap-2">
                <Shield className="h-4 w-4" />
                Regulator
              </TabsTrigger>
            </TabsList>

            {/* Farmer Tab */}
            <TabsContent value="farmer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tractor className="h-5 w-5" />
                    Record Harvest Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmer-product-id">Product ID</Label>
                      <Input
                        id="farmer-product-id"
                        value={farmerForm.productId}
                        onChange={(e) => setFarmerForm({...farmerForm, productId: e.target.value})}
                        placeholder="PROD-2024-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmer-batch-id">Batch ID</Label>
                      <Input
                        id="farmer-batch-id"
                        value={farmerForm.batchId}
                        onChange={(e) => setFarmerForm({...farmerForm, batchId: e.target.value})}
                        placeholder="BATCH-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmer-location">Farm Location</Label>
                      <Input
                        id="farmer-location"
                        value={farmerForm.location}
                        onChange={(e) => setFarmerForm({...farmerForm, location: e.target.value})}
                        placeholder="California, USA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmer-date">Harvest Date</Label>
                      <Input
                        id="farmer-date"
                        type="date"
                        value={farmerForm.harvestDate}
                        onChange={(e) => setFarmerForm({...farmerForm, harvestDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <Separator />
                  <Button 
                    onClick={handleFarmerSubmit}
                    disabled={!isConnected || walletType !== 'stacks' || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Recording...' : 'Record on Blockchain'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Processor Tab */}
            <TabsContent value="processor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5" />
                    Log Processing Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="processor-product-id">Product ID</Label>
                    <Input
                      id="processor-product-id"
                      value={processorForm.productId}
                      onChange={(e) => setProcessorForm({...processorForm, productId: e.target.value})}
                      placeholder="PROD-2024-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processor-quality">Quality Checks</Label>
                    <Textarea
                      id="processor-quality"
                      value={processorForm.qualityChecks}
                      onChange={(e) => setProcessorForm({...processorForm, qualityChecks: e.target.value})}
                      placeholder="Temperature check: 4°C, pH level: 6.5, Visual inspection: Passed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processor-certs">Certifications</Label>
                    <Input
                      id="processor-certs"
                      value={processorForm.certifications}
                      onChange={(e) => setProcessorForm({...processorForm, certifications: e.target.value})}
                      placeholder="FDA, USDA Organic, ISO 9001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processor-steps">Processing Steps</Label>
                    <Textarea
                      id="processor-steps"
                      value={processorForm.processingSteps}
                      onChange={(e) => setProcessorForm({...processorForm, processingSteps: e.target.value})}
                      placeholder="Washing, Sorting, Packaging, Labeling"
                    />
                  </div>
                  <Separator />
                  <Button 
                    onClick={handleProcessorSubmit}
                    disabled={!isConnected || walletType !== 'stacks' || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Recording...' : 'Record on Blockchain'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transporter Tab */}
            <TabsContent value="transporter">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Upload Transport Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transporter-product-id">Product ID</Label>
                    <Input
                      id="transporter-product-id"
                      value={transporterForm.productId}
                      onChange={(e) => setTransporterForm({...transporterForm, productId: e.target.value})}
                      placeholder="PROD-2024-001"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transporter-temp">Temperature (°C)</Label>
                      <Input
                        id="transporter-temp"
                        value={transporterForm.temperature}
                        onChange={(e) => setTransporterForm({...transporterForm, temperature: e.target.value})}
                        placeholder="4"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transporter-gps">GPS Location</Label>
                      <Input
                        id="transporter-gps"
                        value={transporterForm.gpsLocation}
                        onChange={(e) => setTransporterForm({...transporterForm, gpsLocation: e.target.value})}
                        placeholder="37.7749, -122.4194"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transporter-storage">Storage Conditions</Label>
                    <Textarea
                      id="transporter-storage"
                      value={transporterForm.storageConditions}
                      onChange={(e) => setTransporterForm({...transporterForm, storageConditions: e.target.value})}
                      placeholder="Refrigerated truck, Humidity: 85%, No direct sunlight"
                    />
                  </div>
                  <Separator />
                  <Button 
                    onClick={handleTransporterSubmit}
                    disabled={!isConnected || walletType !== 'stacks' || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Recording...' : 'Record on Blockchain'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Retailer Tab */}
            <TabsContent value="retailer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Update Stock & QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="retailer-product-id">Product ID</Label>
                    <Input
                      id="retailer-product-id"
                      value={retailerForm.productId}
                      onChange={(e) => setRetailerForm({...retailerForm, productId: e.target.value})}
                      placeholder="PROD-2024-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retailer-stock">Stock Details</Label>
                    <Textarea
                      id="retailer-stock"
                      value={retailerForm.stockDetails}
                      onChange={(e) => setRetailerForm({...retailerForm, stockDetails: e.target.value})}
                      placeholder="Quantity: 100 units, Expiry: 2024-12-31, Price: $5.99"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="retailer-qr">QR Code ID</Label>
                      <Input
                        id="retailer-qr"
                        value={retailerForm.qrCode}
                        onChange={(e) => setRetailerForm({...retailerForm, qrCode: e.target.value})}
                        placeholder="QR-PROD-2024-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retailer-shelf">Shelf Location</Label>
                      <Input
                        id="retailer-shelf"
                        value={retailerForm.shelfLocation}
                        onChange={(e) => setRetailerForm({...retailerForm, shelfLocation: e.target.value})}
                        placeholder="Aisle 3, Section B"
                      />
                    </div>
                  </div>
                  <Separator />
                  <Button 
                    onClick={handleRetailerSubmit}
                    disabled={!isConnected || walletType !== 'stacks' || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Recording...' : 'Record on Blockchain'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Regulator Tab */}
            <TabsContent value="regulator">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verify Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="regulator-product-id">Product ID</Label>
                      <Input
                        id="regulator-product-id"
                        value={regulatorForm.productId}
                        onChange={(e) => setRegulatorForm({...regulatorForm, productId: e.target.value})}
                        placeholder="PROD-2024-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regulator-checkpoint">Checkpoint ID</Label>
                      <Input
                        id="regulator-checkpoint"
                        value={regulatorForm.checkpointId}
                        onChange={(e) => setRegulatorForm({...regulatorForm, checkpointId: e.target.value})}
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regulator-notes">Verification Notes</Label>
                    <Textarea
                      id="regulator-notes"
                      value={regulatorForm.verificationNotes}
                      onChange={(e) => setRegulatorForm({...regulatorForm, verificationNotes: e.target.value})}
                      placeholder="All safety standards met. Documentation complete. Approved for distribution."
                    />
                  </div>
                  <Separator />
                  <Button 
                    disabled={!isConnected || walletType !== 'stacks' || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Verifying...' : 'Verify on Blockchain'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;