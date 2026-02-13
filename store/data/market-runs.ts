export type MarketRunStatus = "Closed" | "Open";

export type MarketRunRow = {
  id: string;
  date: string;
  description: string;
  items: number;
  members: number;
  status: MarketRunStatus;
  totalAmount: string;
  actions: string;
};

export const MARKET_RUN_ROWS: MarketRunRow[] = [
  {
    id: "run-001",
    date: "21 Jan 2025",
    description: "Fruits",
    items: 23,
    members: 3,
    status: "Closed",
    totalAmount: "NGN 123,992.00",
    actions: "View",
  },
  {
    id: "run-002",
    date: "17 Jan 2025",
    description: "Grains",
    items: 21,
    members: 3,
    status: "Closed",
    totalAmount: "NGN 12,000.00",
    actions: "View",
  },
  {
    id: "run-003",
    date: "03 Jan 2025",
    description: "Drink",
    items: 12,
    members: 5,
    status: "Closed",
    totalAmount: "NGN 45,000.00",
    actions: "View",
  },
  {
    id: "run-004",
    date: "03 Jan 2025",
    description: "Drink",
    items: 12,
    members: 2,
    status: "Closed",
    totalAmount: "NGN 90,000.00",
    actions: "View",
  },
  {
    id: "run-005",
    date: "03 Jan 2025",
    description: "Drink",
    items: 12,
    members: 6,
    status: "Closed",
    totalAmount: "NGN 67,000.00",
    actions: "View",
  },
  {
    id: "run-006",
    date: "03 Jan 2025",
    description: "Drink",
    items: 12,
    members: 6,
    status: "Closed",
    totalAmount: "NGN 78,000.00",
    actions: "View",
  },
  {
    id: "run-007",
    date: "29 Dec 2024",
    description: "Cooking Oil",
    items: 16,
    members: 4,
    status: "Closed",
    totalAmount: "NGN 53,400.00",
    actions: "View",
  },
  {
    id: "run-008",
    date: "20 Dec 2024",
    description: "Rice",
    items: 19,
    members: 7,
    status: "Closed",
    totalAmount: "NGN 144,000.00",
    actions: "View",
  },
  {
    id: "run-009",
    date: "15 Dec 2024",
    description: "Beverages",
    items: 11,
    members: 2,
    status: "Closed",
    totalAmount: "NGN 25,500.00",
    actions: "View",
  },
  {
    id: "run-010",
    date: "09 Dec 2024",
    description: "Cleaning Supplies",
    items: 14,
    members: 5,
    status: "Closed",
    totalAmount: "NGN 39,900.00",
    actions: "View",
  },
  {
    id: "run-011",
    date: "03 Dec 2024",
    description: "Protein Bundle",
    items: 18,
    members: 8,
    status: "Open",
    totalAmount: "NGN 98,000.00",
    actions: "View",
  },
  {
    id: "run-012",
    date: "28 Nov 2024",
    description: "Root Crops",
    items: 10,
    members: 4,
    status: "Closed",
    totalAmount: "NGN 31,700.00",
    actions: "View",
  },
];
