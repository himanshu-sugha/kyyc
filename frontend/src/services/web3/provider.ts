import { ethers } from 'ethers';
import { Web3Error } from './errors';
import { Web3EventManager } from './events';
import type { NetworkInfo } from './types';

export class Web3Provider {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private eventManager: Web3EventManager | null = null;

  async initialize(): Promise<void> {
    if (typeof window.ethereum === 'undefined') {
      throw Web3Error.NoProvider();
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.eventManager = new Web3EventManager(window.ethereum);
      
      // Setup disconnect handler
      this.eventManager.onDisconnect(() => {
        this.provider = null;
        this.signer = null;
      });
    } catch (error) {
      throw Web3Error.NetworkError();
    }
  }

  async getNetwork(): Promise<NetworkInfo> {
    if (!this.provider) {
      throw Web3Error.NoProvider();
    }

    const network = await this.provider.getNetwork();
    return {
      chainId: Number(network.chainId),
      name: network.name
    };
  }

  async getSigner(): Promise<ethers.JsonRpcSigner> {
    if (!this.provider) {
      throw Web3Error.NoProvider();
    }

    try {
      this.signer = await this.provider.getSigner();
      return this.signer;
    } catch (error) {
      throw Web3Error.UserRejected();
    }
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    this.eventManager?.onAccountsChanged(callback);
  }

  onChainChanged(callback: (chainId: string) => void): void {
    this.eventManager?.onChainChanged(callback);
  }

  cleanup(): void {
    this.eventManager?.removeAllListeners();
    this.provider = null;
    this.signer = null;
    this.eventManager = null;
  }
}