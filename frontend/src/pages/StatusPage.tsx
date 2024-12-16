import React from 'react';
import { StatusBadge } from '../components/StatusBadge';
import type { VerificationData } from '../types';

const mockVerificationData: VerificationData = {
  status: 'pending',
  timestamp: new Date().toISOString(),
  message: 'Your documents are being reviewed by our team.'
};

export function StatusPage() {
  const [verificationData, setVerificationData] = React.useState<VerificationData>(mockVerificationData);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Verification Status
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <StatusBadge status={verificationData.status} />
          <span className="text-sm text-gray-500">
            Last updated: {new Date(verificationData.timestamp).toLocaleString()}
          </span>
        </div>

        {verificationData.message && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">{verificationData.message}</p>
          </div>
        )}

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Verification Timeline
          </h2>
          
          
        </div>
      </div>
    </div>
  );
}