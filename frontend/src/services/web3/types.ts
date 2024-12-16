export interface Web3Provider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (params: any) => void) => void;
  removeListener: (event: string, callback: (params: any) => void) => void;
}

export interface NetworkInfo {
  chainId: number;
  name: string;
}

export interface Web3Error extends Error {
  code?: number;
}

export type AccountsChangedCallback = (accounts: string[]) => void;
export type ChainChangedCallback = (chainId: string) => void;
export type DisconnectCallback = (error: { code: number; message: string }) => void;