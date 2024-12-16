export interface Web3AuthState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export interface AuthGuardProps {
  children: React.ReactNode;
}