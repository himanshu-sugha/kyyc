import express from 'express';
import { Web3 } from 'web3';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enable CORS for frontend communication
app.use(cors({
  origin: 'http://localhost:5173',  // Ensure this matches the frontend URL
}));


// Enable JSON parsing for request bodies
app.use(express.json());

// Contract details
const contractAddress = "0x481C459E33Cc594fCC799C31Cc9630Cae01EE97e"; // Replace with your contract address
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "KYCSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "KYCVerified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "checkKYC",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserDetails",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "firstName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lastName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dateOfBirth",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "addressDetails",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "documentType",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "verified",
            "type": "bool"
          }
        ],
        "internalType": "struct KYCContract.UserDetails",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dateOfBirth",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_addressDetails",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_documentType",
        "type": "string"
      }
    ],
    "name": "submitKYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "verifyKYC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Create an instance of the Web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e364009a2c7f452ab98e9c221197a0d7')); // Your RPC URL

// Get contract instance
const getContract = () => {
  return new web3.eth.Contract(contractABI, contractAddress);
};

// Endpoint to submit KYC details to the contract
app.post('/api/submit-kyc', async (req, res) => {
  const { firstName, lastName, dateOfBirth, addressDetails, documentType, userAddress } = req.body;

  if (!firstName || !lastName || !dateOfBirth || !addressDetails || !documentType || !userAddress) {
    return res.status(400).send('All fields are required');
  }

  try {
    const accounts = await web3.eth.getAccounts(); // Get accounts from the provider
    const contract = getContract();
    const tx = await contract.methods.submitKYC(firstName, lastName, dateOfBirth, addressDetails, documentType)
      .send({ from: userAddress }); // Send the transaction from the user address
    res.status(200).send('KYC submitted successfully');
  } catch (error) {
    console.error('Error submitting KYC:', error);
    res.status(500).send('Error submitting KYC');
  }
});

// Endpoint to check KYC status
app.get('/api/check-kyc/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const contract = getContract();
    const kycCompleted = await contract.methods.kycCompleted(address).call();
    res.json({ kycCompleted });
  } catch (error) {
    console.error('Error checking KYC status:', error);
    res.status(500).send('Error checking KYC status');
  }
});

// Endpoint to verify KYC (Admin only)
app.post('/api/verify-kyc/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const accounts = await web3.eth.getAccounts(); // Get accounts from the provider
    const contract = getContract();
    const tx = await contract.methods.verifyKYC(address)
      .send({ from: accounts[0] }); // Send the transaction from the first account (admin)
    res.status(200).send('KYC verified successfully');
  } catch (error) {
    console.error('Error verifying KYC:', error);
    res.status(500).send('Error verifying KYC');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
