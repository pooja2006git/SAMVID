export type TransactionType = 'UPI' | 'ATM' | 'CARD';
export type TransactionCategory = 'Food' | 'Groceries' | 'School Fees' | 'Electricity' | 'Travel' | 'Others';

export interface Transaction {
  id: string;
  title: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  date: Date;
  status: 'Success' | 'Failed' | 'Pending';
  isIncoming: boolean;
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Store',
    category: 'Groceries',
    type: 'UPI',
    amount: 1250,
    date: new Date(2026, 0, 3, 14, 30),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '2',
    title: 'UPI to Rahul',
    category: 'Others',
    type: 'UPI',
    amount: 500,
    date: new Date(2026, 0, 3, 10, 15),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '3',
    title: 'ATM Withdrawal',
    category: 'Others',
    type: 'ATM',
    amount: 2000,
    date: new Date(2026, 0, 2, 16, 45),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '4',
    title: 'School Fees Payment',
    category: 'School Fees',
    type: 'UPI',
    amount: 15000,
    date: new Date(2026, 0, 2, 9, 0),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '5',
    title: 'Electricity Bill',
    category: 'Electricity',
    type: 'UPI',
    amount: 2500,
    date: new Date(2026, 0, 1, 11, 20),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '6',
    title: 'Salary Deposit',
    category: 'Others',
    type: 'UPI',
    amount: 50000,
    date: new Date(2025, 11, 31, 8, 0),
    status: 'Success',
    isIncoming: true,
  },
  {
    id: '7',
    title: 'Restaurant - Pizza Place',
    category: 'Food',
    type: 'CARD',
    amount: 450,
    date: new Date(2025, 11, 30, 19, 30),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '8',
    title: 'Travel - Uber',
    category: 'Travel',
    type: 'CARD',
    amount: 280,
    date: new Date(2025, 11, 30, 17, 45),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '9',
    title: 'Freelance Payment',
    category: 'Others',
    type: 'UPI',
    amount: 5000,
    date: new Date(2025, 11, 29, 14, 0),
    status: 'Success',
    isIncoming: true,
  },
  {
    id: '10',
    title: 'Grocery Market',
    category: 'Groceries',
    type: 'UPI',
    amount: 1800,
    date: new Date(2025, 11, 28, 15, 20),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '11',
    title: 'ATM Withdrawal',
    category: 'Others',
    type: 'ATM',
    amount: 3000,
    date: new Date(2025, 11, 27, 10, 0),
    status: 'Success',
    isIncoming: false,
  },
  {
    id: '12',
    title: 'Coffee Shop',
    category: 'Food',
    type: 'CARD',
    amount: 150,
    date: new Date(2025, 11, 26, 9, 30),
    status: 'Success',
    isIncoming: false,
  },
];

export const categories: TransactionCategory[] = [
  'Food',
  'Groceries',
  'School Fees',
  'Electricity',
  'Travel',
  'Others',
];
