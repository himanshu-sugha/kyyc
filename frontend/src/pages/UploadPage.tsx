import React from 'react';
import { FileUpload } from '../components/FileUpload';

export function UploadPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Upload Your Document
        
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Document Upload
        </h2>
        <FileUpload onFileSelect={(file) => console.log('File selected:', file)} />
        
      </div>
    </div>
  );
}
