import React from 'react';
import { useAuthStore } from '../../store/auth';  // Assuming you are using a store for authentication
import { Wallet } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { setSepoliaProvider } from '../../types/web3Config';  // Import Sepolia network setup

export function ConnectWallet() {
  const { isConnected, connect, disconnect, address } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await setSepoliaProvider();  // Ensure connection to Sepolia network
      await connect();             // Proceed with connection to wallet
      toast.success('Wallet connected to Sepolia testnet successfully');
    } catch (error) {
      toast.error('Failed to connect wallet. Please make sure MetaMask is installed and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  return (
    <button
      onClick={isConnected ? handleDisconnect : handleConnect}
      disabled={isLoading}
      className={`flex items-center px-4 py-2 rounded-md ${
        isConnected 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-indigo-600 hover:bg-indigo-700'
      } text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Wallet className="h-4 w-4 mr-2" />
      {isLoading ? (
        'Connecting...'
      ) : isConnected ? (
        `${address?.slice(0, 6)}...${address?.slice(-4)}`
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
}
