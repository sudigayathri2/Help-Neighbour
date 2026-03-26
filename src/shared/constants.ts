
import type { User, Task } from './types.js';

export const PLATFORM_FEE_PERCENT = 0.05;

export const HELPERS = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 4.9,
    reviews: 47,
    distance: "0.3 mi",
    tags: ["Groceries", "Pet Care", "Delivery"],
    responseTime: "15 min",
    responseRate: "98%",
    price: "$10-15",
    active: true,
    match: 95,
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    id: 2,
    name: "James K.",
    rating: 5,
    reviews: 23,
    distance: "0.8 mi",
    tags: ["Handyman", "Moving", "Assembly"],
    responseTime: "30 min",
    responseRate: "95%",
    price: "$15-25",
    active: false,
    lastActive: "2 hours ago",
    avatar: "https://i.pravatar.cc/100?img=2"
  },
  {
    id: 3,
    name: "Maria L.",
    rating: 4.8,
    reviews: 34,
    distance: "1.2 mi",
    tags: ["Groceries", "Cooking", "Errands"],
    responseTime: "20 min",
    responseRate: "92%",
    price: "$10-20",
    active: true,
    match: 92,
    avatar: "https://i.pravatar.cc/100?img=3"
  }
];


export const INITIAL_USER: User = {
  id: 'u-1',
  name: 'Alex Rivera',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  isAvailable: false,
  walletBalance: 125.50,
  rating: 4.9,
  totalHelps: 14,
  statusMessage: "Always happy to help with tech or lifting!"
};

export const MOCK_HELPERS: User[] = [
  {
    id: 'u-h1',
    name: 'Jamie Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
    isAvailable: true,
    walletBalance: 0,
    rating: 5.0,
    totalHelps: 42,
    statusMessage: "Available for pet sitting & gardening"
  },
  {
    id: 'u-h2',
    name: 'Jordan Lee',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    isAvailable: true,
    walletBalance: 0,
    rating: 4.7,
    totalHelps: 8,
    statusMessage: "Can help with heavy lifting this weekend"
  },
  {
    id: 'u-h3',
    name: 'Sam Wilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    isAvailable: false,
    walletBalance: 0,
    rating: 4.8,
    totalHelps: 15,
    statusMessage: "Tech support expert"
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't-1',
    requesterId: 'u-2',
    requesterName: 'Sarah Jenkins',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    title: 'Need help moving a couch',
    description: 'Just need one person to help me lift a 2-seater couch to the 2nd floor. It\'s not too heavy but bulky!',
    reward: 25.00,
    paymentType: 'cash',
    status: 'pending',
    createdAt: Date.now() - 3600000,
    category: 'Heavy Lifting',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "123 Oak Street, Downtown"
    },
    pendingAt: Date.now() - 3600000
  },
  {
    id: 't-2',
    requesterId: 'u-3',
    requesterName: 'Mike Chen',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    title: 'Walk my dog for 30 mins',
    description: 'My golden retriever Cooper needs a quick walk around the block while I finish some calls.',
    reward: 15.00,
    paymentType: 'cash',
    status: 'pending',
    createdAt: Date.now() - 7200000,
    category: 'Pet Care',
    location: {
      lat: 40.7138,
      lng: -74.0050,
      address: "456 Pine Street, Downtown"
    },
    pendingAt: Date.now() - 7200000
  },
  {
    id: 't-failed-1',
    requesterId: 'u-2',
    requesterName: 'Sarah Jenkins',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    title: 'Fix leaky kitchen faucet',
    description: 'Tap is dripping constantly. Need someone to replace the washer.',
    reward: 20.00,
    paymentType: 'cash',
    status: 'rejected',
    helperId: 'u-h2', // Jordan Lee
    createdAt: Date.now() - 86400000,
    category: 'House Chores',
    proofOfWork: 'I tried tightening it but it might need a whole new part.',
    disputeReason: 'Work incomplete. Faucet is still leaking just as much.',
    location: {
      lat: 40.7148,
      lng: -74.0040,
      address: "789 Maple Street, Downtown"
     },
     pendingAt: Date.now() - 86400000
  },
  {
    id: 't-failed-2',
    requesterId: 'u-1', // Alex (Self)
    requesterName: 'Alex Rivera',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    title: 'Grocery Run - Urgent',
    description: 'Need 5 items from the store. List: Bread, Milk, Eggs, Butter, Flour.',
    reward: 10.00,
    paymentType: 'cash',
    status: 'disputed',
    helperId: 'u-h1', // Jamie Smith
    createdAt: Date.now() - 172800000,
    category: 'Shopping',
    proofOfWork: 'Bought 3 of the 5 items because the others were out of stock.',
    disputeReason: 'Helper only bought half the list but is asking for full payment.',
    location: {
      lat: 40.7158,
      lng: -74.0030,
      address: "321 Cedar Street, Downtown"
     },
     pendingAt: Date.now() - 172800000
    
  },
  {
    id: 't-success-1',
    requesterId: 'u-h3',
    requesterName: 'Sam Wilson',
    requesterAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    title: 'Setup Home Office Desk',
    description: 'Need a hand assembling a basic wooden desk.',
    reward: 35.00,
    paymentType: 'cash',
    status: 'finalized',
    helperId: 'u-h1', // Jamie Smith
    createdAt: Date.now() - 259200000,
    category: 'House Chores',
    proofOfWork: 'Desk assembled and set up in the corner of the living room.',
    location: {
      lat: 40.7168,
      lng: -74.0020,
      address: "654 Spruce Street, Downtown"
     },
     pendingAt: Date.now() - 259200000,
  }
];
