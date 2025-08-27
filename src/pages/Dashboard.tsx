import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, QrCode, Truck, Factory, Store, User, CheckCircle, AlertCircle } from 'lucide-react';
import MetaMaskConnector from '@/components/MetaMaskConnector';

const Dashboard: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const mockTrackingData = {
    productId: 'FC-ORG-2024-001',
    productName: 'Organic Tomatoes',
    currentStatus: 'In Transit',
    steps: [
      {
        id: 1,
        icon: User,
        title: 'Farmer',
        location: 'Green Valley Farm, California',
        timestamp: '2024-01-15 08:00 AM',
        status: 'completed',
        details: 'Harvested organic tomatoes, pesticide-free'
      },
      {
        id: 2,
        icon: Factory,
        title: 'Processing',
        location: 'FreshPack Facility, California',
        timestamp: '2024-01-15 02:30 PM',
        status: 'completed',
        details: 'Quality inspection passed, packaged for distribution'
      },
      {
        id: 3,
        icon: Truck,
        title: 'Distribution',
        location: 'En route to RetailMart Hub',
        timestamp: '2024-01-16 09:00 AM',
        status: 'active',
        details: 'Temperature maintained at 2°C during transport'
      },
      {
        id: 4,
        icon: Store,
        title: 'Retail',
        location: 'RetailMart Store #1205',
        timestamp: 'Expected: 2024-01-17 10:00 AM',
        status: 'pending',
        details: 'Awaiting delivery and shelf placement'
      }
    ]
  };

  const handleSearch = () => {
    if (productId.trim()) {
      setSearchResult(mockTrackingData);
    }
  };

  const handleWalletConnect = (address: string) => {
    setIsConnected(true);
  };

  const handleWalletDisconnect = () => {
    setIsConnected(false);
    setSearchResult(null);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Traceability
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Dashboard
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect your wallet and search for any product ID to trace its complete journey through the supply chain
          </p>
        </motion.div>

        {/* Wallet Connection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="blockchain-card max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Connect Your Wallet
            </h3>
            <MetaMaskConnector 
              onConnect={handleWalletConnect}
              onDisconnect={handleWalletDisconnect}
              className="justify-center"
            />
            {!isConnected && (
              <p className="text-sm text-muted-foreground mt-3">
                MetaMask connection required to access blockchain data
              </p>
            )}
          </div>
        </motion.div>

        {/* Search Section */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="blockchain-card max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                Product Traceability Search
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter Product ID or scan QR code..."
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="wallet-button flex items-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                  >
                    <QrCode className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setProductId('FC-ORG-2024-001')}
                  className="text-sm text-primary hover:text-primary/80 underline"
                >
                  Try demo product: FC-ORG-2024-001
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Product Info */}
            <div className="blockchain-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {searchResult.productName}
                  </h3>
                  <p className="text-muted-foreground">ID: {searchResult.productId}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-trust/10 text-trust">
                    {searchResult.currentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Supply Chain Flow */}
            <div className="blockchain-card">
              <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
                Supply Chain Journey
              </h3>
              
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-trust to-primary" />
                
                <div className="space-y-8">
                  {searchResult.steps.map((step: any, index: number) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`relative flex items-start space-x-6 ${
                        step.status === 'active' ? 'animate-pulse' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className={`relative z-10 p-4 rounded-full shadow-lg ${
                        step.status === 'completed' ? 'bg-secondary' :
                        step.status === 'active' ? 'bg-trust' : 'bg-muted'
                      }`}>
                        <step.icon className={`h-6 w-6 ${
                          step.status === 'completed' ? 'text-secondary-foreground' :
                          step.status === 'active' ? 'text-trust-foreground' : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="blockchain-card bg-gradient-to-r from-card to-muted/30">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-semibold text-foreground">
                              {step.title}
                            </h4>
                            {step.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                            ) : step.status === 'active' ? (
                              <AlertCircle className="h-5 w-5 text-trust flex-shrink-0" />
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-muted flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{step.location}</p>
                          <p className="text-sm text-muted-foreground mb-3">{step.timestamp}</p>
                          <p className="text-sm text-foreground">{step.details}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="blockchain-card bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Blockchain Verified
                </h3>
                <p className="text-muted-foreground mb-4">
                  All data points have been cryptographically verified and stored on the blockchain
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-foreground">Block Height</div>
                    <div className="text-muted-foreground">#18,745,392</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Gas Used</div>
                    <div className="text-muted-foreground">21,000</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Confirmations</div>
                    <div className="text-muted-foreground">2,847</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Network</div>
                    <div className="text-muted-foreground">Ethereum</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;