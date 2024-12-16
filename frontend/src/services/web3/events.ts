import type { AccountsChangedCallback, ChainChangedCallback, DisconnectCallback } from './types';

export class Web3EventManager {
  private accountsChangedCallbacks: Set<AccountsChangedCallback> = new Set();
  private chainChangedCallbacks: Set<ChainChangedCallback> = new Set();
  private disconnectCallbacks: Set<DisconnectCallback> = new Set();

  constructor(private provider: any) {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.provider.on('accountsChanged', (accounts: string[]) => {
      this.accountsChangedCallbacks.forEach(callback => callback(accounts));
    });

    this.provider.on('chainChanged', (chainId: string) => {
      this.chainChangedCallbacks.forEach(callback => callback(chainId));
    });

    this.provider.on('disconnect', (error: { code: number; message: string }) => {
      this.disconnectCallbacks.forEach(callback => callback(error));
    });
  }

  public onAccountsChanged(callback: AccountsChangedCallback): void {
    this.accountsChangedCallbacks.add(callback);
  }

  public onChainChanged(callback: ChainChangedCallback): void {
    this.chainChangedCallbacks.add(callback);
  }

  public onDisconnect(callback: DisconnectCallback): void {
    this.disconnectCallbacks.add(callback);
  }

  public removeAllListeners(): void {
    this.accountsChangedCallbacks.clear();
    this.chainChangedCallbacks.clear();
    this.disconnectCallbacks.clear();
  }
}