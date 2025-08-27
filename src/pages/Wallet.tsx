import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Key, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import MetaMaskConnector from '@/components/MetaMaskConnector';

const WalletPage: React.FC = () => {
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = (address: string) => {
    setConnectedAddress(address);
  };

  const handleDisconnect = () => {
    setConnectedAddress('');
    setIsSignedIn(false);
  };

  const handleSignIn = async () => {
    if (!connectedAddress) return;
    
    setIsLoading(true);
    try {
      // Simulate wallet signature for authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSignedIn(true);
    } catch (error) {
      console.error('Sign-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const walletFeatures = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Your wallet serves as your secure digital identity for accessing blockchain data"
    },
    {
      icon: Key,
      title: "Cryptographic Verification",
      description: "All transactions are verified using your private key without exposing sensitive information"
    },
    {
      icon: CheckCircle,
      title: "Decentralized Access",
      description: "No central authority controls your data - you maintain full ownership and control"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Wallet
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Authentication
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect your MetaMask wallet to securely access blockchain-verified food traceability data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Wallet Connection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="blockchain-card h-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Connect MetaMask
                </h2>
                <p className="text-muted-foreground">
                  Your gateway to the decentralized food traceability network
                </p>
              </div>

              <div className="space-y-6">
                <MetaMaskConnector 
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  className="justify-center"
                />

                {connectedAddress && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-secondary/10 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-secondary" />
                        <span className="font-medium text-secondary">Wallet Connected</span>
                      </div>
                      <p className="text-sm text-muted-foreground break-all">
                        {connectedAddress}
                      </p>
                    </div>

                    {!isSignedIn && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSignIn}
                        disabled={isLoading}
                        className="w-full wallet-button disabled:opacity-50"
                      >
                        {isLoading ? 'Signing In...' : 'Sign In with Wallet'}
                      </motion.button>
                    )}

                    {isSignedIn && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-trust/10 rounded-lg text-center"
                      >
                        <CheckCircle className="h-8 w-8 text-trust mx-auto mb-2" />
                        <h3 className="font-semibold text-trust mb-1">Authentication Successful</h3>
                        <p className="text-sm text-muted-foreground">
                          You can now access all blockchain features
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {!connectedAddress && (
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-accent" />
                      <span className="font-medium text-accent">MetaMask Required</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Don't have MetaMask installed?
                    </p>
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 text-sm"
                    >
                      <span>Download MetaMask</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Why Wallet Authentication?
            </h2>

            {walletFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="blockchain-card"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Network Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="blockchain-card bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <h3 className="font-semibold text-foreground mb-4">Network Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Network</div>
                  <div className="font-medium text-foreground">Ethereum Mainnet</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Chain ID</div>
                  <div className="font-medium text-foreground">1</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Currency</div>
                  <div className="font-medium text-foreground">ETH</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="font-medium text-secondary">Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Next Steps */}
        {isSignedIn && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-12 blockchain-card text-center"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              You're all set! 🎉
            </h3>
            <p className="text-muted-foreground mb-6">
              Your wallet is connected and verified. You can now access all blockchain features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="wallet-button inline-flex items-center justify-center"
              >
                Go to Dashboard
              </motion.a>
              <motion.a
                href="/features"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-secondary/10 text-secondary border-2 border-secondary/20 px-6 py-3 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-300 inline-flex items-center justify-center"
              >
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;