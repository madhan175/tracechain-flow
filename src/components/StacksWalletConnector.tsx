import React, { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Wallet, LogOut, Zap } from 'lucide-react';

interface StacksWalletConnectorProps {
  onConnect?: (userData: any) => void;
  onDisconnect?: () => void;
  className?: string;
}

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const StacksWalletConnector: React.FC<StacksWalletConnectorProps> = ({
  onConnect,
  onDisconnect,
  className = ''
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        onConnect?.(userData);
        toast.success('Connected to Hiro Wallet successfully!');
      });
    } else if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setUserData(userData);
      onConnect?.(userData);
    }
  }, [onConnect]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      showConnect({
        appDetails: {
          name: 'Blockchain Food Supply Chain',
          icon: window.location.origin + '/favicon.ico',
        },
        redirectTo: '/',
        onFinish: () => {
          setIsConnecting(false);
          window.location.reload();
        },
        onCancel: () => {
          setIsConnecting(false);
          toast.error('Connection cancelled');
        },
      });
    } catch (error) {
      setIsConnecting(false);
      toast.error('Failed to connect to Hiro Wallet');
      console.error('Stacks wallet connection error:', error);
    }
  };

  const disconnectWallet = () => {
    userSession.signUserOut('/');
    setUserData(null);
    onDisconnect?.();
    toast.info('Disconnected from Hiro Wallet');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (userData) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg border">
          <Zap className="h-4 w-4 text-orange-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {formatAddress(userData.profile.stxAddress.mainnet)}
            </span>
            <Badge variant="secondary" className="text-xs">
              Stacks
            </Badge>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      className={`gap-2 ${className}`}
      variant="outline"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Hiro Wallet'}
    </Button>
  );
};

export default StacksWalletConnector;