import { 
  openContractCall,
  AppConfig,
  UserSession
} from '@stacks/connect';
import {
  uintCV,
  stringAsciiCV,
  principalCV,
  AnchorMode,
  PostConditionMode
} from '@stacks/transactions';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

// Contract details
const CONTRACT_ADDRESS = 'STW42W7AEKZ2EFYH834C6DW9272JHT1PHM92FY88';
const CONTRACT_NAME = 'supply-chain';

export const createBatch = async (product: string): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  try {
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'create-batch',
      functionArgs: [stringAsciiCV(product)],
      network: 'testnet',
      onFinish: (data) => {
        console.log('Batch created. Transaction ID:', data.txId);
        return data.txId;
      },
      onCancel: () => {
        throw new Error('Transaction cancelled');
      },
    });

    return 'Batch creation initiated';
  } catch (error) {
    console.error('Error creating batch:', error);
    throw error;
  }
};

export const transferBatch = async (batchId: number, newOwner: string): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  try {
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'transfer-batch',
      functionArgs: [
        uintCV(batchId),
        principalCV(newOwner)
      ],
      network: 'testnet',
      onFinish: (data) => {
        console.log('Batch transferred. Transaction ID:', data.txId);
        return data.txId;
      },
      onCancel: () => {
        throw new Error('Transaction cancelled');
      },
    });

    return 'Batch transfer initiated';
  } catch (error) {
    console.error('Error transferring batch:', error);
    throw error;
  }
};

export const assignRole = async (userAddress: string, role: string): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  try {
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'assign-role',
      functionArgs: [
        principalCV(userAddress),
        stringAsciiCV(role)
      ],
      network: 'testnet',
      onFinish: (data) => {
        console.log('Role assigned. Transaction ID:', data.txId);
        return data.txId;
      },
      onCancel: () => {
        throw new Error('Transaction cancelled');
      },
    });

    return 'Role assignment initiated';
  } catch (error) {
    console.error('Error assigning role:', error);
    throw error;
  }
};

export const getBatchFromStacks = async (batchId: number) => {
  try {
    // This would require a read-only function call to the contract
    // For now, we'll return a mock response
    console.log('Getting batch from Stacks:', batchId);
    return {
      batchId,
      product: 'Organic Tomatoes',
      origin: 'SP...',
      owner: 'SP...',
      createdAt: Date.now()
    };
  } catch (error) {
    console.error('Error getting batch from Stacks:', error);
    throw error;
  }
};

export const getBatchHistory = async (batchId: number) => {
  try {
    // This would require multiple read-only function calls
    console.log('Getting batch history for:', batchId);
    return [
      { owner: 'SP...farmer', blockHeight: 123456 },
      { owner: 'SP...processor', blockHeight: 123460 },
      { owner: 'SP...retailer', blockHeight: 123465 }
    ];
  } catch (error) {
    console.error('Error getting batch history:', error);
    throw error;
  }
};

export const isStacksConnected = (): boolean => {
  return userSession.isUserSignedIn();
};

export const getStacksAddress = (): string | null => {
  if (!userSession.isUserSignedIn()) return null;
  
  const userData = userSession.loadUserData();
  return userData.profile.stxAddress.testnet;
};

export { userSession };