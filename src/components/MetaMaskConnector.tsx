import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Wallet, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetaMaskConnectorProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  className?: string;
}

const MetaMaskConnector: React.FC<MetaMaskConnectorProps> = ({
  onConnect,
  onDisconnect,
  className = ''
}) => {
  const [account, setAccount] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkWalletConnection();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onConnect?.(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount('');
      onDisconnect?.();
    } else {
      setAccount(accounts[0]);
      onConnect?.(accounts[0]);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask and try again.');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        onConnect?.(accounts[0]);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        setError('Please connect to MetaMask.');
      } else {
        setError('Failed to connect to MetaMask. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    onDisconnect?.();
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (account) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center space-x-3 ${className}`}
      >
        <div className="flex items-center space-x-2 bg-secondary/10 rounded-lg px-3 py-2">
          <Wallet className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">
            {formatAddress(account)}
          </span>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Disconnect
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={connectWallet}
        disabled={isConnecting}
        className="wallet-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wallet className="h-5 w-5" />
        <span>
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </span>
      </motion.button>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2"
        >
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};

export default MetaMaskConnector;