import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { VerificationStatus } from '../types';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    text: 'Pending Verification'
  },
  verified: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    text: 'Verified'
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    text: 'Rejected'
  }
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}>
      <Icon className={`h-4 w-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}
