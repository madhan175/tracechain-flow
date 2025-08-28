import { useState, useEffect, useCallback } from 'react';
import { connectMetaMask, getEthereumProvider, getEthereumBalance } from '@/utils/blockchain';
import { AppConfig, UserSession } from '@stacks/connect';
import { toast } from 'sonner';

export type WalletType = 'metamask' | 'stacks' | null;

interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  walletType: WalletType;
}

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: null,
    isConnected: false,
    isConnecting: false,
    walletType: null,
  });

  // Check for existing connections on mount
  useEffect(() => {
    checkExistingConnections();
  }, []);

  const checkExistingConnections = useCallback(async () => {
    // Check MetaMask
    const ethereumProvider = getEthereumProvider();
    if (ethereumProvider) {
      try {
        const accounts = await ethereumProvider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const balance = await getEthereumBalance(accounts[0]);
          setWalletState({
            address: accounts[0],
            balance,
            isConnected: true,
            isConnecting: false,
            walletType: 'metamask',
          });
          return;
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    }

    // Check Stacks
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setWalletState({
        address: userData.profile.stxAddress.mainnet,
        balance: null, // TODO: Fetch STX balance
        isConnected: true,
        isConnecting: false,
        walletType: 'stacks',
      });
    }
  }, []);

  const connectMetaMaskWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    
    try {
      const accounts = await connectMetaMask();
      const balance = await getEthereumBalance(accounts[0]);
      
      setWalletState({
        address: accounts[0],
        balance,
        isConnected: true,
        isConnecting: false,
        walletType: 'metamask',
      });
      
      toast.success('MetaMask connected successfully!');
      return accounts[0];
    } catch (error) {
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      toast.error('Failed to connect MetaMask');
      throw error;
    }
  }, []);

  const connectStacksWallet = useCallback(() => {
    // This will be handled by the StacksWalletConnector component
    // We just update the state when notified
    return new Promise((resolve, reject) => {
      // The actual connection is handled by @stacks/connect
      resolve(null);
    });
  }, []);

  const disconnect = useCallback(() => {
    if (walletState.walletType === 'stacks') {
      userSession.signUserOut('/');
    }
    
    setWalletState({
      address: null,
      balance: null,
      isConnected: false,
      isConnecting: false,
      walletType: null,
    });
    
    toast.info('Wallet disconnected');
  }, [walletState.walletType]);

  const updateStacksConnection = useCallback((userData: any) => {
    setWalletState({
      address: userData.profile.stxAddress.mainnet,
      balance: null,
      isConnected: true,
      isConnecting: false,
      walletType: 'stacks',
    });
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!walletState.address || !walletState.isConnected) return;

    try {
      if (walletState.walletType === 'metamask') {
        const balance = await getEthereumBalance(walletState.address);
        setWalletState(prev => ({ ...prev, balance }));
      }
      // TODO: Add STX balance refresh
    } catch (error) {
      console.error('Failed to refresh balance:', error);
    }
  }, [walletState.address, walletState.isConnected, walletState.walletType]);

  return {
    ...walletState,
    connectMetaMask: connectMetaMaskWallet,
    connectStacks: connectStacksWallet,
    disconnect,
    updateStacksConnection,
    refreshBalance,
  };
};