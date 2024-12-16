import Web3 from 'web3';

// If MetaMask is available, use its provider; otherwise, use the Sepolia RPC endpoint from Infura/Alchemy
const web3 = new Web3(window.ethereum || 'https://sepolia.infura.io/v3/197fa95d4025486ebbaf700519b71c1a');  // Replace with your Infura/Alchemy endpoint

// Function to set Sepolia network provider in MetaMask
const setSepoliaProvider = async () => {
  if (window.ethereum) {
    try {
      // Get current network ID
      const networkId = await web3.eth.net.getId();

      // Convert networkId to a number
      if (Number(networkId) !== 11155111) { // Sepolia network ID (decimal: 11155111)
        // Switch to Sepolia if not already connected
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID in hexadecimal
        });
      }
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added to MetaMask, add it
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7', // Sepolia chain ID
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'Sepolia Ether',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.infura.io/v3/197fa95d4025486ebbaf700519b71c1a'], // Replace with your Infura URL
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            }],
          });
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
        }
      } else {
        console.error('Error switching to Sepolia network:', error);
      }
    }
  } else {
    console.log('Ethereum provider (MetaMask) not detected');
  }
};


// Contract ABI and Address
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
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "kycCompleted",
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
        "name": "_dob",
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
  }
];

const contractAddress = '0x481C459E33Cc594fCC799C31Cc9630Cae01EE97e'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

export { web3, contract, setSepoliaProvider };
