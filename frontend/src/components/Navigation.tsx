import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Upload, CheckCircle, Home } from 'lucide-react';
import { ConnectWallet } from './auth/ConnectWallet';
import { useAuthStore } from '../store/auth';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Upload Documents', href: '/upload', icon: Upload },
  { name: 'Verification Status', href: '/status', icon: CheckCircle },
];

export function Navigation() {
  const location = useLocation();
  const { isConnected } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">SecureKYC</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                // Only show Upload and Status links if connected
                if (!isConnected && (item.href === '/upload' || item.href === '/status')) {
                  return null;
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
}