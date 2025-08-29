import { 
  openContractCall,
  AppConfig,
  UserSession
} from '@stacks/connect';
import {
  uintCV,
  stringAsciiCV,
  AnchorMode,
  PostConditionMode
} from '@stacks/transactions';
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

// Contract details (update these with your deployed contract)
const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Replace with your contract address
const CONTRACT_NAME = 'supply-chain';

export const addStacksCheckpoint = async (
  productId: string,
  stage: string,
  data: string,
  isNewProduct = false
): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  const userData = userSession.loadUserData();
  
  try {
    const functionName = isNewProduct ? 'create-product' : 'add-checkpoint';
    let functionArgs;

    if (isNewProduct) {
      // For new products (farmer's initial record)
      const batchId = data.split('Batch: ')[1]?.split(',')[0] || 'DEFAULT';
      const location = data.split('Location: ')[1]?.split(',')[0] || 'Unknown';
      const harvestDate = Math.floor(Date.now() / 1000); // Unix timestamp
      
      functionArgs = [
        stringAsciiCV(productId),
        stringAsciiCV(batchId),
        uintCV(harvestDate),
        stringAsciiCV(location)
      ];
    } else {
      // For adding checkpoints
      functionArgs = [
        stringAsciiCV(productId),
        stringAsciiCV(stage),
        stringAsciiCV(data)
      ];
    }

    // Use openContractCall for better UX
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName,
      functionArgs,
      onFinish: (data) => {
        console.log('Transaction ID:', data.txId);
        return data.txId;
      },
      onCancel: () => {
        throw new Error('Transaction cancelled');
      },
    });

    return 'Transaction initiated';
  } catch (error) {
    console.error('Error adding checkpoint to Stacks:', error);
    throw error;
  }
};

export const verifyStacksCheckpoint = async (
  productId: string,
  checkpointId: number
): Promise<string> => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  try {
    await openContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'verify-checkpoint',
      functionArgs: [
        stringAsciiCV(productId),
        uintCV(checkpointId)
      ],
      onFinish: (data) => {
        console.log('Verification Transaction ID:', data.txId);
        return data.txId;
      },
      onCancel: () => {
        throw new Error('Verification cancelled');
      },
    });

    return 'Verification initiated';
  } catch (error) {
    console.error('Error verifying checkpoint:', error);
    throw error;
  }
};

export const getProductFromStacks = async (productId: string) => {
  try {
    // This would require a read-only function call to the contract
    // For now, we'll return a mock response
    console.log('Getting product from Stacks:', productId);
    return {
      productId,
      farmer: 'SP...',
      currentStage: 'retail',
      checkpoints: []
    };
  } catch (error) {
    console.error('Error getting product from Stacks:', error);
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