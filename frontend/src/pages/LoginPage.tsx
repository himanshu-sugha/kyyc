import React from 'react';
import { Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { ConnectWallet } from '../components/auth/ConnectWallet';
import { useAuthStore } from '../store/auth';

export function LoginPage() {
  const { isConnected } = useAuthStore();

  if (isConnected) {
    return <Navigate to="/upload" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Connect Your Wallet
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            To access the KYC verification system, please connect your Web3 wallet
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <ConnectWallet />
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Why connect wallet?
              </span>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <ul className="list-disc pl-5 space-y-2">
              <li>Secure authentication using blockchain technology</li>
              <li>Complete control over your identity data</li>
              <li>Transparent verification process</li>
              <li>No centralized storage of sensitive information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}