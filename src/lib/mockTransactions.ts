export type TransactionCategory = 'Food' | 'Shopping' | 'Transport' | 'Bills' | 'Entertainment' | 'Healthcare' | 'Education' | 'Other';
export type TransactionType = 'UPI' | 'ATM' | 'CARD';

export interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  type: TransactionType;
  date: Date;
  amount: number;
  isIncoming: boolean;
  status: string;
}

export const categories: TransactionCategory[] = [
  'Food',
  'Shopping',
  'Transport',
  'Bills',
  'Entertainment',
  'Healthcare',
  'Education',
  'Other'
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    category: 'Food',
    type: 'UPI',
    date: new Date(2024, 0, 15, 14, 30),
    amount: 2500,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Salary Credit',
    category: 'Other',
    type: 'UPI',
    date: new Date(2024, 0, 1, 9, 0),
    amount: 50000,
    isIncoming: true,
    status: 'Completed'
  },
  {
    id: '3',
    title: 'Uber Ride',
    category: 'Transport',
    type: 'CARD',
    date: new Date(2024, 0, 14, 18, 45),
    amount: 350,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '4',
    title: 'Movie Tickets',
    category: 'Entertainment',
    type: 'UPI',
    date: new Date(2024, 0, 13, 20, 0),
    amount: 800,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '5',
    title: 'ATM Withdrawal',
    category: 'Other',
    type: 'ATM',
    date: new Date(2024, 0, 12, 16, 20),
    amount: 5000,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '6',
    title: 'Electricity Bill',
    category: 'Bills',
    type: 'UPI',
    date: new Date(2024, 0, 10, 10, 15),
    amount: 1200,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '7',
    title: 'Restaurant Dinner',
    category: 'Food',
    type: 'CARD',
    date: new Date(2024, 0, 11, 19, 30),
    amount: 1800,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '8',
    title: 'Online Shopping',
    category: 'Shopping',
    type: 'UPI',
    date: new Date(2024, 0, 9, 15, 45),
    amount: 3200,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '9',
    title: 'Doctor Consultation',
    category: 'Healthcare',
    type: 'UPI',
    date: new Date(2024, 0, 8, 11, 0),
    amount: 1500,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '10',
    title: 'Freelance Payment',
    category: 'Other',
    type: 'UPI',
    date: new Date(2024, 0, 7, 14, 0),
    amount: 15000,
    isIncoming: true,
    status: 'Completed'
  },
  {
    id: '11',
    title: 'Coffee Shop',
    category: 'Food',
    type: 'UPI',
    date: new Date(2024, 0, 6, 9, 30),
    amount: 250,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '12',
    title: 'Gym Membership',
    category: 'Healthcare',
    type: 'CARD',
    date: new Date(2024, 0, 5, 12, 0),
    amount: 3000,
    isIncoming: false,
    status: 'Completed'
  },
  {
    id: '13',
    title: 'Online Payment',
    category: 'Shopping',
    type: 'UPI',
    date: new Date(2024, 0, 16, 11, 20),
    amount: 1500,
    isIncoming: false,
    status: 'Failed'
  }
];

