import { getVerificationData, updateVerificationData } from '../models/verificationModel.js';

export const getVerificationStatus = async (req, res) => {
  try {
    const verificationData = await getVerificationData();
    res.json(verificationData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching verification data' });
  }
};

export const submitVerificationStatus = async (req, res) => {
  try {
    const { status, message } = req.body;

    // Update the verification status in the database
    await updateVerificationData(status, message);

    // Here you could also interact with smart contracts or other external systems for KYC/AML verification.

    res.json({ message: 'Verification status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting verification data' });
  }
};

