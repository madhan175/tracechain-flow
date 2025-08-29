import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tractor, Truck, Shield } from 'lucide-react';
import StacksWalletConnector from '@/components/StacksWalletConnector';
import { createBatch, transferBatch, assignRole, isStacksConnected, getStacksAddress } from '@/utils/stacksIntegration';

const SupplyChain = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [farmerForm, setFarmerForm] = useState({
    productName: '',
    batchId: '',
    location: ''
  });

  const [transferForm, setTransferForm] = useState({
    batchId: '',
    recipientAddress: ''
  });

  const [roleForm, setRoleForm] = useState({
    userAddress: '',
    role: 'farmer'
  });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    const connected = isStacksConnected();
    setIsConnected(connected);
    if (connected) {
      setUserAddress(getStacksAddress());
    }
  };

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your Hiro wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      await createBatch(farmerForm.productName);
      toast.success('Batch created successfully!');
      setFarmerForm({ productName: '', batchId: '', location: '' });
    } catch (error) {
      toast.error('Failed to create batch');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your Hiro wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      await transferBatch(parseInt(transferForm.batchId), transferForm.recipientAddress);
      toast.success('Batch transferred successfully!');
      setTransferForm({ batchId: '', recipientAddress: '' });
    } catch (error) {
      toast.error('Failed to transfer batch');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your Hiro wallet first');
      return;
    }

    setIsSubmitting(true);
    try {
      await assignRole(roleForm.userAddress, roleForm.role);
      toast.success('Role assigned successfully!');
      setRoleForm({ userAddress: '', role: 'farmer' });
    } catch (error) {
      toast.error('Failed to assign role');
      console.error(error);
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
              Track your products from farm to table using blockchain technology
            </p>
            
            <div className="flex justify-center mb-6">
              <StacksWalletConnector 
                onConnect={checkConnection}
                onDisconnect={() => {
                  setIsConnected(false);
                  setUserAddress(null);
                }}
              />
            </div>

            {isConnected && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200">
                    Connected to Stacks Testnet
                  </span>
                  <Badge variant="secondary">
                    {userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <Tabs defaultValue="farmer" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="farmer" className="gap-2">
                <Tractor className="h-4 w-4" />
                Create Batch
              </TabsTrigger>
              <TabsTrigger value="transfer" className="gap-2">
                <Truck className="h-4 w-4" />
                Transfer Batch
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2">
                <Shield className="h-4 w-4" />
                Assign Roles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="farmer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tractor className="h-5 w-5" />
                    Create New Batch
                  </CardTitle>
                  <CardDescription>
                    Start a new product batch on the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFarmerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={farmerForm.productName}
                        onChange={(e) => setFarmerForm(prev => ({ ...prev, productName: e.target.value }))}
                        placeholder="e.g., Organic Tomatoes"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="batchId">Batch ID (Optional)</Label>
                      <Input
                        id="batchId"
                        value={farmerForm.batchId}
                        onChange={(e) => setFarmerForm(prev => ({ ...prev, batchId: e.target.value }))}
                        placeholder="e.g., BATCH-2024-001"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Farm Location</Label>
                      <Input
                        id="location"
                        value={farmerForm.location}
                        onChange={(e) => setFarmerForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., California, USA"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={!isConnected || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Batch'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transfer">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Transfer Batch
                  </CardTitle>
                  <CardDescription>
                    Transfer ownership of a batch to another party
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTransferSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="transferBatchId">Batch ID</Label>
                      <Input
                        id="transferBatchId"
                        type="number"
                        value={transferForm.batchId}
                        onChange={(e) => setTransferForm(prev => ({ ...prev, batchId: e.target.value }))}
                        placeholder="e.g., 1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="recipientAddress">Recipient Stacks Address</Label>
                      <Input
                        id="recipientAddress"
                        value={transferForm.recipientAddress}
                        onChange={(e) => setTransferForm(prev => ({ ...prev, recipientAddress: e.target.value }))}
                        placeholder="e.g., SP1234567890ABCDEF..."
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={!isConnected || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Transferring...' : 'Transfer Batch'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Assign User Roles
                  </CardTitle>
                  <CardDescription>
                    Assign roles to users in the supply chain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRoleAssignment} className="space-y-4">
                    <div>
                      <Label htmlFor="roleUserAddress">User Stacks Address</Label>
                      <Input
                        id="roleUserAddress"
                        value={roleForm.userAddress}
                        onChange={(e) => setRoleForm(prev => ({ ...prev, userAddress: e.target.value }))}
                        placeholder="e.g., SP1234567890ABCDEF..."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="userRole">Role</Label>
                      <select
                        id="userRole"
                        value={roleForm.role}
                        onChange={(e) => setRoleForm(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full p-2 border rounded-md bg-background"
                        required
                      >
                        <option value="farmer">Farmer</option>
                        <option value="processor">Processor</option>
                        <option value="transporter">Transporter</option>
                        <option value="retailer">Retailer</option>
                        <option value="regulator">Regulator</option>
                      </select>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={!isConnected || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Assigning...' : 'Assign Role'}
                    </Button>
                  </form>
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