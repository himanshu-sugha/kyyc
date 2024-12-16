import { ethers } from 'ethers';

export class Web3Service {
  private static instance: Web3Service;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  private constructor() {}

  static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async initialize(): Promise<void> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  async connect(): Promise<{ address: string; chainId: number }> {
    try {
      if (!this.provider) {
        await this.initialize();
      }

      if (!this.provider) {
        throw new Error('Provider not initialized');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      
      return {
        address,
        chainId: Number(network.chainId)
      };
    } catch (error) {
      console.error('Failed to connect:', error);
      throw new Error('Failed to connect wallet');
    }
  }

  async disconnect(): Promise<void> {
    this.provider = null;
    this.signer = null;
  }

  isConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }
}