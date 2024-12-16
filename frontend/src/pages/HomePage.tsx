import React from 'react';
import { Shield, Upload, CheckCircle } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy-Preserving KYC Solution
        </h1>
        <p className="text-lg text-gray-600">
          Secure, compliant, and privacy-focused identity verification
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your data is encrypted and protected using blockchain technology'
          },
          {
            icon: Upload,
            title: 'Easy Upload',
            description: 'Simple document upload process with instant verification'
          },
          {
            icon: CheckCircle,
            title: 'Quick Verification',
            description: 'Get verified quickly while maintaining compliance'
          }
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
            >
              <Icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
          Ready to get verified?
        </h2>
        <p className="text-indigo-700 mb-6">
          Start your verification process now with our secure KYC solution
        </p>
        <a
          href="/upload"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Start Verification
          <Upload className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}