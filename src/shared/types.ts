
export type TaskStatus = 'pending' | 'accepted' | 'done' | 'finalized' | 'rejected' | 'disputed';
export type PaymentType = 'cash' | 'coupon';

export interface CouponDetails {
  provider: 'Amazon' | 'Swiggy' | 'Zepto' | 'Other';
  code: string;
  expiry: string;
  worth: number;
}
// /src/shared/types.ts
// export interface User {
//   _id?: string;                // MongoDB ObjectId
//   id: string;                   // Unique user ID (e.g., 'u-123456')
//   name: string;
//   email?: string;               // Optional for demo users
//   password?: string;            // Hashed password (never returned to client)
//   avatar: string;
//   isAvailable: boolean;
//   walletBalance: number;
//   rating: number;
//   totalHelps: number;
//   statusMessage?: string;
//   createdAt?: Date; 
//   coupons?: {
//     id: string;
//     taskId: string;
//     provider: string;
//     code: string;
//     value: number;
//     expiryDate: number;
//     fromUserId: string;
//     collectedAt: number;
//   }[];           
// }
export interface User {
  _id?: string;                 // MongoDB ObjectId
  id: string;                   // Unique user ID
  name: string;
  email?: string;
  password?: string;
  description?: string;

  avatar: string;

  isAvailable: boolean;
  walletBalance: number;

  rating: number;
  totalHelps: number;

  statusMessage?: string;
  createdAt?: Date;

  /* ---------- PROFILE DETAILS ---------- */

  profileViews?: number;

  responseTime?: number;        // minutes
  responseRate?: number;        // %
  completionRate?: number;      // %
  onTimeRate?: number;          // %

  distance?: string;            // "0.5 mi away"

  memberSince?: Date;

  availability?: {
    weekdays?: string;
    weekends?: string;
  };

  languages?: string[];

  specialties?: {
    name: string;
    tasksCompleted: number;
    rating?: number;
  }[];

  /* ---------- COMMUNITY IMPACT ---------- */

  impact?: {
    hoursSaved?: number;
    co2Prevented?: number;
    tripsReduced?: number;
  };

  /* ---------- STATS ---------- */

  stats?: {
    tasksThisMonth?: number;
    totalEarnings?: number;
    timeCredits?: number;
  };

  /* ---------- REVIEWS ---------- */

  reviews?: {
    rating: number;
    comment?: string;
    reviewerName?: string;
    createdAt?: Date;
  }[];

  /* ---------- BADGES ---------- */

  badges?: string[];

  /* ---------- VERIFICATION ---------- */

  verified?: {
    id?: boolean;
    background?: boolean;
    email?: boolean;
    phone?: boolean;
  };

  /* ---------- COUPONS ---------- */

  coupons?: {
    id: string;
    taskId: string;
    provider: string;
    code: string;
    value: number;
    expiryDate: number;
    fromUserId: string;
    collectedAt: number;
  }[];
}

export interface Task {
  _id?: string;
  id: string;

  requesterId: string;
  requesterName: string;
  requesterAvatar: string;

  helperName?: string;
  helperAvatar?: string;
  helperId?: string;
  createdAt: number;

  title: string;
  description: string;
  category: string;

  reward: number;
  paymentType: PaymentType;
  couponDetails?: CouponDetails;

  status: TaskStatus;
  
  
  proofOfWork?: string;
  proofImages?: string[]; 

  disputeReason?: string;
  rating?: number;

/* ---------- NEW FIELDS FOR UI ---------- */
  location?: {
  lat: number;
  lng: number;
  address?: string;
};       // "123 Oak Street, Downtown"
  distance?: string;        // "0.8 mi"
  duration?: string;        // "3.5 hrs"

/* ---------- TIMELINE ---------- */
  pendingAt: number;      // when request created
  acceptedAt?: number;    // helper accepted
  doneAt?: number;        // helper submitted proof
  finalizedAt?: number;   // requester verified + paid
  rejectedAt?: number;    // requester rejected
  disputedAt?: number;    // helper escalated
}

export interface Notification {
  _id?: string;
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert' | 'match';
  timestamp: number;
  read: boolean;
}

export interface AppState {
  currentUser: User | null;
  tasks: Task[];
  notifications: Notification[];
  availableHelpers: User[];
  isLoading: boolean;
}

// COMMUNITY TYPES

export interface CommunityCircle {
  _id?: string;
  id: string;

  name: string;
  description: string;

  icon?: string;
  color?: string;

  members: number;
  activeToday?: number;

  tags?: string[];

  createdAt?: number;
}

export interface CommunityMember {
  userId: string;
  circleId: string;

  role: 'member' | 'moderator' | 'admin';

  joinedAt: number;
}

export interface CommunityHealth {
  activityLevel: 'low' | 'medium' | 'high' | 'excellent';

  helpsThisMonth: number;

  avgResponseTime: number;

  percentileRank?: number;
}

export interface Contributor {
  userId: string;

  name: string;

  avatar?: string;

  helpsThisMonth: number;

  rank: number;
}

export interface CommunityChallenge {
  _id?: string;
  id: string;

  title: string;

  description: string;

  goal: number;

  progress: number;

  participants: number;

  daysLeft: number;

  createdAt: number;
}

export interface ChatMessage {
  id: number;
  taskId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface TypingEvent {
  taskId: string;
  senderId: string;
  senderName: string;
  isTyping: boolean;
}