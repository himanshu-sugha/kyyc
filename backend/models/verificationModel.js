let verificationData = {
  status: 'pending',  // Can be 'pending', 'verified', or 'rejected'
  message: 'Your verification is being processed.',
  timestamp: new Date().toISOString(),
};

// Function to get verification data
export const getVerificationData = () => {
  return new Promise((resolve) => {
    resolve(verificationData);
  });
};

// Function to update verification status
export const updateVerificationData = (status, message) => {
  return new Promise((resolve) => {
    verificationData = {
      status,
      message,
      timestamp: new Date().toISOString(),
    };
    resolve();
  });
};

