export class Web3Error extends Error {
  constructor(
    message: string,
    public code?: number
  ) {
    super(message);
    this.name = 'Web3Error';
  }

  static NoProvider(): Web3Error {
    return new Web3Error('No Web3 provider found. Please install MetaMask.', 4001);
  }

  static UserRejected(): Web3Error {
    return new Web3Error('User rejected the connection request.', 4001);
  }

  static NetworkError(): Web3Error {
    return new Web3Error('Failed to connect to the network.', 4002);
  }

  static UnknownError(): Web3Error {
    return new Web3Error('An unknown error occurred.', 5000);
  }
}