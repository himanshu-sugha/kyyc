import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { contract, web3 } from '../types/web3Config';

export function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Max file size (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    }
  };

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('File is too large. Please upload a file smaller than 10MB.');
      return false;
    }
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a PDF, JPG, or PNG file.');
      return false;
    }
    return true;
  };

  // Handle form submission (send data to smart contract)
  const handleSubmit = async () => {
    if (selectedFile && firstName && lastName && dob && addressDetails && documentType) {
      setIsSubmitting(true);
      const accounts = await web3.eth.requestAccounts(); // Request MetaMask accounts
      const userAddress = accounts[0];

      try {
        await contract.methods.submitKYC(firstName, lastName, dob, addressDetails, documentType).send({ from: userAddress });
        alert('KYC submitted successfully!');
        resetForm();  // Reset the form after successful submission
      } catch (error) {
        alert('Error submitting KYC');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please fill all fields and upload a document');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setFirstName('');
    setLastName('');
    setDob('');
    setAddressDetails('');
    setDocumentType('');
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept="image/*,.pdf"
        />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Drag and drop your document here, or click to select</p>
          <p className="mt-1 text-xs text-gray-500">Supported formats: PDF, JPG, PNG (max 10MB)</p>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">{selectedFile.name}</span>
          <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-red-500">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* KYC Form */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="First Name"
          className="p-2 w-full border rounded-md"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="p-2 w-full border rounded-md mt-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="p-2 w-full border rounded-md mt-2"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="p-2 w-full border rounded-md mt-2"
          value={addressDetails}
          onChange={(e) => setAddressDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="Document Type"
          className="p-2 w-full border rounded-md mt-2"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className="mt-4 w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit KYC'}
        </button>
      </div>
    </div>
  );
}
