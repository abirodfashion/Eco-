export type UserRole = 'ADMIN' | 'ENTREPRENEUR' | 'CUSTOMER';

export interface User {
  id: string;
  fullName: string;
  mobile: string;
  whatsApp: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  nidFront?: string;
  nidBack?: string;
  address?: string;
  whatToBuy?: string;
  milkQuantity?: number;
  previousBalance?: number;
  advanceDeposit?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  entrepreneurId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  productId: string;
  productName: string;
  price: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface AppState {
  users: User[];
  products: Product[];
  orders: Order[];
  transactions: Transaction[];
  currentUser: User | null;
}
