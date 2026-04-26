export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  verified: boolean;
  image: string;
  socialProof: string;
  type: string;
  landlordId?: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
