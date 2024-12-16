import { create } from 'zustand';
import type { Web3AuthState } from '../types/auth';
import { Web3Service } from '../services/web3';
import { Web3Error } from '../services/web3/errors';

const web3Service = Web3Service.getInstance();

export const useAuthStore = create<Web3AuthState>((set) => ({
  isConnected: false,
  address: null,
  chainId: null,
  error: null,
  
  connect: async () => {
    try {
      const { address, chainId } = await web3Service.connect();
      
      set({
        isConnected: true,
        address,
        chainId,
        error: null
      });
    } catch (error) {
      const web3Error = error instanceof Web3Error ? error : Web3Error.UnknownError();
      set({
        isConnected: false,
        address: null,
        chainId: null,
        error: web3Error
      });
      throw web3Error;
    }
  },

  disconnect: () => {
    web3Service.disconnect();
    set({
      isConnected: false,
      address: null,
      chainId: null,
      error: null
    });
  },
}));