import { Web3Provider } from './provider';
import { Web3Error } from './errors';
import type { NetworkInfo } from './types';

export class Web3Service {
  private static instance: Web3Service;
  private provider: Web3Provider;

  private constructor() {
    this.provider = new Web3Provider();
  }

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async connect(): Promise<{ address: string; chainId: number }> {
    try {
      await this.provider.initialize();
      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();
      const network = await this.provider.getNetwork();

      this.setupEventListeners();
      
      return {
        address,
        chainId: network.chainId
      };
    } catch (error) {
      if (error instanceof Web3Error) {
        throw error;
      }
      throw Web3Error.UnknownError();
    }
  }

  private setupEventListeners(): void {
    this.provider.onAccountsChanged((accounts: string[]) => {
      if (accounts.length === 0) {
        this.disconnect();
      }
    });

    this.provider.onChainChanged(() => {
      // Reload the page on chain change as recommended by MetaMask
      window.location.reload();
    });
  }

  async disconnect(): Promise<void> {
    this.provider.cleanup();
  }

  isConnected(): boolean {
    return this.provider !== null;
  }
}