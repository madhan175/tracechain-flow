// Blockchain utilities for Ethereum and Stacks integration
import { ethers } from 'ethers';
import axios from 'axios';

// Ethereum/MetaMask utilities
export interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

export const getEthereumProvider = (): EthereumProvider | null => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum as EthereumProvider;
  }
  return null;
};

export const connectMetaMask = async (): Promise<string[]> => {
  const provider = getEthereumProvider();
  if (!provider) {
    throw new Error('MetaMask not installed');
  }

  try {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    return accounts;
  } catch (error) {
    throw new Error('Failed to connect to MetaMask');
  }
};

export const getEthereumBalance = async (address: string): Promise<string> => {
  const provider = getEthereumProvider();
  if (!provider) {
    throw new Error('MetaMask not available');
  }

  try {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const balance = await ethersProvider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    throw new Error('Failed to get balance');
  }
};

// Stacks blockchain utilities
export const STACKS_MAINNET_URL = 'https://stacks-node-api.mainnet.stacks.co';
export const STACKS_TESTNET_URL = 'https://stacks-node-api.testnet.stacks.co';

export const getStacksBalance = async (address: string, network: 'mainnet' | 'testnet' = 'mainnet'): Promise<any> => {
  const baseUrl = network === 'mainnet' ? STACKS_MAINNET_URL : STACKS_TESTNET_URL;
  
  try {
    const response = await axios.get(`${baseUrl}/extended/v1/address/${address}/balances`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Stacks balance');
  }
};

export const getStacksTransactions = async (address: string, network: 'mainnet' | 'testnet' = 'mainnet'): Promise<any> => {
  const baseUrl = network === 'mainnet' ? STACKS_MAINNET_URL : STACKS_TESTNET_URL;
  
  try {
    const response = await axios.get(`${baseUrl}/extended/v1/address/${address}/transactions`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Stacks transactions');
  }
};

// Supply Chain specific utilities
export interface SupplyChainProduct {
  id: string;
  name: string;
  origin: string;
  currentLocation: string;
  timestamp: string;
  owner: string;
  blockchain: 'ethereum' | 'stacks';
  transactionHash?: string;
  contractAddress?: string;
}

export const createProductRecord = (
  productData: Omit<SupplyChainProduct, 'timestamp'>,
): SupplyChainProduct => {
  return {
    ...productData,
    timestamp: new Date().toISOString(),
  };
};

export const validateProductQR = (qrData: string): boolean => {
  try {
    const data = JSON.parse(qrData);
    return data.id && data.timestamp && typeof data.id === 'string';
  } catch {
    return false;
  }
};

export const generateTrackingURL = (productId: string): string => {
  return `${window.location.origin}/track/${productId}`;
};

// Mock blockchain interaction functions (replace with actual contract calls)
export const recordProductOnBlockchain = async (
  product: SupplyChainProduct,
  walletAddress: string
): Promise<string> => {
  // This is a mock implementation
  // In a real app, you would call your smart contract here
  console.log('Recording product on blockchain:', product);
  
  // Simulate transaction hash
  const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
  
  // Store in localStorage for demo purposes
  const existingProducts = JSON.parse(localStorage.getItem('blockchain_products') || '[]');
  const productWithTx = { ...product, transactionHash: mockTxHash, owner: walletAddress };
  existingProducts.push(productWithTx);
  localStorage.setItem('blockchain_products', JSON.stringify(existingProducts));
  
  return mockTxHash;
};

export const getProductFromBlockchain = async (productId: string): Promise<SupplyChainProduct | null> => {
  // This is a mock implementation
  const existingProducts = JSON.parse(localStorage.getItem('blockchain_products') || '[]');
  return existingProducts.find((p: SupplyChainProduct) => p.id === productId) || null;
};

export const getAllProductsFromBlockchain = async (): Promise<SupplyChainProduct[]> => {
  // This is a mock implementation
  return JSON.parse(localStorage.getItem('blockchain_products') || '[]');
};