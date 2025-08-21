export type InventoryItem = {
  component: string;
  bloodGroup: string;
  units: number;
  expiryDate: string;
};

export type RecentAlert = {
  id: string;
  bloodGroup: string;
  component: string;
  donorContact: string;
  status: 'Accepted' | 'No Response' | 'Pending';
  timestamp: string;
};

export type Donor = {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorBloodGroup: string;
  donorLocation: string;
  registrationDate: string;
};
