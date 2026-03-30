
// import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// import type{ User, Task, Notification, AppState, PaymentType, CouponDetails } from '../shared/types';
// import { MOCK_TASKS, MOCK_HELPERS, INITIAL_USER, PLATFORM_FEE_PERCENT } from '../shared/constants';

// interface AppContextType extends AppState {
//   isMockMode: boolean;
//   dbStatus: 'checking' | 'connected' | 'error';
//   toggleAvailability: () => void;
//   createTask: (title: string, description: string, reward: number, category: string, paymentType: PaymentType, couponDetails?: CouponDetails) => Promise<void>;
//   acceptTask: (taskId: string) => Promise<void>;
//   completeTask: (taskId: string, proof: string) => Promise<void>;
//   finalizeTask: (taskId: string) => Promise<void>;
//   disputeTask: (taskId: string, reason: string) => Promise<void>;
//   clearNotification: (id: string) => Promise<void>;
//   refreshData: () => Promise<void>;
//   demoLogin: () => Promise<void>;
//   enterMockMode: () => void;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);
// const AUTH_KEY = 'helpneighbor_auth_id';

// const safeJson = async (res: Response) => {
//   if (res.status === 404) return { error: 'API not found.' };
//   const text = await res.text();
//   try { return text ? JSON.parse(text) : {}; }
//   catch (e) { return { error: 'Invalid response format.' }; }
// };

// export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [availableHelpers, setAvailableHelpers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMockMode, setIsMockMode] = useState(false);
//   const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

//   const simulationProcessed = useRef<Set<string>>(new Set());

//   const enterMockMode = useCallback(() => {
//     setIsMockMode(true);
//     setCurrentUser({ ...INITIAL_USER });
//     setTasks([...MOCK_TASKS]);
//     setAvailableHelpers([...MOCK_HELPERS]);
//     setIsLoading(false);
//     setDbStatus('connected');
//   }, []);

//   const refreshData = useCallback(async () => {
//     const userId = localStorage.getItem(AUTH_KEY);
//     if (isMockMode) { setIsLoading(false); return; }
//     if (!userId) { await demoLogin(); return; }
//     try {
//       const headers = { 'x-user-id': userId };
//       const [userRes, tasksRes, notesRes] = await Promise.all([
//         fetch('/api/users', { headers }),
//         fetch('/api/tasks', { headers }),
//         fetch('/api/notifications', { headers })
//       ]);
//       if (userRes.ok) {
//         const userData = await safeJson(userRes);
//         setCurrentUser(userData.currentUser);
//         setAvailableHelpers(userData.availableHelpers || []);
//         setDbStatus('connected');
//       } else { await demoLogin(); return; }
//       if (tasksRes.ok) setTasks(await safeJson(tasksRes));
//       if (notesRes.ok) setNotifications(await safeJson(notesRes));
//     } catch (err: any) { setDbStatus('error'); } finally { setIsLoading(false); }
//   }, [isMockMode]);

//   const demoLogin = useCallback(async () => {
//     try {
//       const res = await fetch('/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'demo' })
//       });
//       const data = await safeJson(res);
//       localStorage.setItem(AUTH_KEY, data.id);
//       setIsMockMode(false);
//       await refreshData();
//     } catch (e: any) { enterMockMode(); }
//   }, [refreshData, enterMockMode]);

//   const addLocalNotification = useCallback((message: string, type: 'info' | 'success' | 'alert' | 'match') => {
//     const newNote: Notification = { id: `n-local-${Date.now()}`, message, type, timestamp: Date.now(), read: false };
//     setNotifications(prev => [newNote, ...prev]);
//   }, []);

//   useEffect(() => {
//     if (!currentUser || isLoading) return;

//     tasks.forEach(task => {
//       const stateKey = `${task.id}-${task.status}`;
//       if (simulationProcessed.current.has(stateKey)) return;

//       // 1. NEIGHBOR ACCEPTS YOUR REQUEST
//       if (task.requesterId === currentUser.id && task.status === 'pending') {
//         simulationProcessed.current.add(stateKey);
//         setTimeout(async () => {
//           if (isMockMode) {
//             setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'accepted', helperId: MOCK_HELPERS[0].id } : t));
//             addLocalNotification(`${MOCK_HELPERS[0].name} accepted your request: "${task.title}"`, 'match');
//           } else {
//             const res = await fetch('/api/tasks', {
//               method: 'PATCH',
//               headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//               body: JSON.stringify({ taskId: task.id, action: 'accept', helperId: MOCK_HELPERS[0].id })
//             });
//             if (res.ok) await refreshData();
//           }
//         }, 3000);
//       }

//       // 2. NEIGHBOR COMPLETES YOUR REQUEST
//       if (task.requesterId === currentUser.id && task.status === 'accepted' && task.helperId !== currentUser.id) {
//         simulationProcessed.current.add(stateKey);
//         setTimeout(async () => {
//           if (isMockMode) {
//             setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done', proofOfWork: 'Work completed according to request details.' } : t));
//             addLocalNotification(`Neighbor finished "${task.title}". Proof: "Work completed according to request details."`, 'match');
//           } else {
//             const res = await fetch('/api/tasks', {
//               method: 'PATCH',
//               headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//               body: JSON.stringify({ taskId: task.id, action: 'complete', proof: 'Work completed.' })
//             });
//             if (res.ok) await refreshData();
//           }
//         }, 8000);
//       }

//       // 3. NEIGHBOR PAYS YOU (Helper perspective)
//       if (task.helperId === currentUser.id && task.status === 'done' && task.requesterId !== currentUser.id) {
//         simulationProcessed.current.add(stateKey);

//         // DEMO SPECIAL SCENARIO: Reject task t-2
//         const isRejectionScenario = task.id === 't-2';

//         setTimeout(async () => {
//           if (isMockMode) {
//             if (isRejectionScenario) {
//               setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'rejected' } : t));
//               addLocalNotification(`Verification failed for "${task.title}". Requester claims incomplete work.`, 'alert');
//             } else {
//               const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
//               if (task.paymentType === 'cash') {
//                 setCurrentUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance + netReward, totalHelps: prev.totalHelps + 1 } : null);
//               } else {
//                  setCurrentUser(prev => prev ? { ...prev, totalHelps: prev.totalHelps + 1 } : null);
//               }
//               setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'finalized' } : t));
//               addLocalNotification(`Neighbor confirmed "${task.title}". Payment received!`, 'success');
//             }
//           } else {
//             const res = await fetch('/api/tasks', {
//               method: 'PATCH',
//               headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//               body: JSON.stringify({ taskId: task.id, action: isRejectionScenario ? 'reject' : 'finalize' })
//             });
//             if (res.ok) await refreshData();
//           }
//         }, 5000);
//       }

//       // 4. AUTOMATED COMMUNITY MEDIATION (Simulation for Disputes)
//       if (task.status === 'disputed') {
//         simulationProcessed.current.add(stateKey);
//         setTimeout(async () => {
//           if (isMockMode) {
//             const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
//             // Mediation Verdict: Favoring Helper if proof is present
//             const verdict = task.proofOfWork ? 'RESOLVED_IN_FAVOR_OF_HELPER' : 'RESOLVED_IN_FAVOR_OF_REQUESTER';

//             if (verdict === 'RESOLVED_IN_FAVOR_OF_HELPER') {
//               if (task.helperId === currentUser.id) {
//                  setCurrentUser(prev => prev ? { 
//                     ...prev, 
//                     walletBalance: task.paymentType === 'cash' ? prev.walletBalance + netReward : prev.walletBalance,
//                     totalHelps: prev.totalHelps + 1 
//                   } : null);
//               }
//               setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'finalized' } : t));
//               addLocalNotification(`Dispute Resolved: Community verified proof for "${task.title}". Reward released.`, 'success');
//             } else {
//               setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'rejected' } : t));
//               addLocalNotification(`Dispute Resolved: Insufficient proof for "${task.title}". Task marked as incomplete.`, 'alert');
//             }
//           }
//         }, 6000);
//       }
//     });
//   }, [tasks, currentUser, isMockMode, refreshData, isLoading, addLocalNotification]);

//   const toggleAvailability = async () => {
//     if (!currentUser) return;
//     const newState = !currentUser.isAvailable;
//     if (!isMockMode) {
//       await fetch('/api/users', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ isAvailable: newState })
//       });
//       await refreshData();
//     } else { setCurrentUser({ ...currentUser, isAvailable: newState }); }
//   };

//   const createTask = async (title: string, description: string, reward: number, category: string, paymentType: PaymentType, couponDetails?: CouponDetails) => {
//     if (!currentUser) return;
//     const newTask: Task = { id: `t-${Date.now()}`, requesterId: currentUser.id, requesterName: currentUser.name, requesterAvatar: currentUser.avatar, title, description, reward, paymentType, couponDetails, category, status: 'pending', createdAt: Date.now() };
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id }, body: JSON.stringify(newTask) });
//       if (res.ok) await refreshData();
//     } else {
//       setTasks([newTask, ...tasks]);
//       addLocalNotification(`Request "${title}" is live!`, 'info');
//     }
//   };

//   const acceptTask = async (taskId: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id }, body: JSON.stringify({ taskId, action: 'accept', helperId: currentUser.id }) });
//       if (res.ok) await refreshData();
//     } else { setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'accepted', helperId: currentUser.id } : t)); }
//   };

//   const completeTask = async (taskId: string, proof: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id }, body: JSON.stringify({ taskId, action: 'complete', proof }) });
//       if (res.ok) await refreshData();
//     } else { setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'done', proofOfWork: proof } : t)); }
//   };

//   const finalizeTask = async (taskId: string) => {
//     if (!currentUser) return;
//     const task = tasks.find(t => t.id === taskId);
//     if (!task) return;
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id }, body: JSON.stringify({ taskId, action: 'finalize' }) });
//       await refreshData();
//     } else {
//       if (task.paymentType === 'cash' && currentUser.walletBalance < task.reward) {
//         alert("Insufficient balance.");
//         return;
//       }
//       if (task.paymentType === 'cash') {
//         setCurrentUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance - task.reward } : null);
//       }
//       setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'finalized' } : t));
//       addLocalNotification(`Payment released for "${task.title}".`, 'success');
//     }
//   };

//   const disputeTask = async (taskId: string, reason: string) => {
//     if (!currentUser) return;
//     if (isMockMode) {
//       setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'disputed', disputeReason: reason } : t));
//       addLocalNotification(`Dispute raised for "${tasks.find(t => t.id === taskId)?.title}". Community review started.`, 'alert');
//     }
//   };

//   const clearNotification = async (id: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) { await fetch(`/api/notifications?id=${id}`, { method: 'DELETE', headers: { 'x-user-id': currentUser.id } }); }
//     setNotifications(prev => prev.filter(n => n.id !== id));
//   };

//   const login = async (email: string, password: string) => {
//     const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', email, password }) });
//     const data = await safeJson(res);
//     localStorage.setItem(AUTH_KEY, data.id);
//     await refreshData();
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'signup', name, email, password }) });
//     const data = await safeJson(res);
//     localStorage.setItem(AUTH_KEY, data.id);
//     await refreshData();
//   };

//   // 🔥 INITIAL APP LOAD
//   useEffect(() => {
//         refreshData();
//       }, [refreshData]);

//   return (
//     <AppContext.Provider value={{
//       currentUser, tasks, notifications, availableHelpers, isLoading, isMockMode, dbStatus,
//       toggleAvailability, createTask, acceptTask, completeTask, finalizeTask, disputeTask, clearNotification,
//       refreshData, demoLogin, enterMockMode, login, signup
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) throw new Error('useAppContext must be used within an AppProvider');
//   return context;
// };



//############-----------------------



// import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
// import type { User, Task, Notification, AppState, PaymentType, CouponDetails } from '../shared/types';
// import { MOCK_TASKS, MOCK_HELPERS, INITIAL_USER, PLATFORM_FEE_PERCENT } from '../shared/constants';

// interface AppContextType extends AppState {
//   isMockMode: boolean;
//   dbStatus: 'checking' | 'connected' | 'error';
//   toggleAvailability: () => void;
//   createTask: (
//     title: string,
//     description: string,
//     reward: number,
//     category: string,
//     paymentType: PaymentType,
//     couponDetails?: CouponDetails
//   ) => Promise<void>;
//   acceptTask: (taskId: string) => Promise<void>;
//   completeTask: (taskId: string, proof: string) => Promise<void>;
//   finalizeTask: (taskId: string) => Promise<void>;
//   disputeTask: (taskId: string, reason: string) => Promise<void>;
//   clearNotification: (id: string) => Promise<void>;
//   refreshData: () => Promise<void>;
//   demoLogin: () => Promise<void>;
//   enterMockMode: () => void;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);
// const AUTH_KEY = 'helpneighbor_auth_id';

// const safeJson = async (res: Response) => {
//   if (res.status === 404) return { error: 'API not found.' };
//   const text = await res.text();
//   try {
//     return text ? JSON.parse(text) : {};
//   } catch {
//     return { error: 'Invalid response format.' };
//   }
// };

// export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [availableHelpers, setAvailableHelpers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMockMode, setIsMockMode] = useState(false);
//   const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');

//   const simulationProcessed = useRef<Set<string>>(new Set());

//   /** --- LOCAL NOTIFICATIONS --- **/
//   const addLocalNotification = useCallback(
//     (message: string, type: 'info' | 'success' | 'alert' | 'match') => {
//       const newNote: Notification = {
//         id: `n-local-${Date.now()}`,
//         message,
//         type,
//         timestamp: Date.now(),
//         read: false,
//       };
//       setNotifications((prev) => [newNote, ...prev]);
//     },
//     []
//   );

//   /** --- ENTER MOCK MODE --- **/
//   const enterMockMode = useCallback(() => {
//     setIsMockMode(true);
//     setCurrentUser({ ...INITIAL_USER });
//     setTasks([...MOCK_TASKS]);
//     setAvailableHelpers([...MOCK_HELPERS]);
//     setIsLoading(false);
//     setDbStatus('connected');
//   }, []);

//   /** --- REFRESH DATA --- **/
//   const refreshData = useCallback(async () => {
//     const userId = localStorage.getItem(AUTH_KEY);

//     if (isMockMode) {
//       setIsLoading(false);
//       return;
//     }

//     if (!userId) {
//       setCurrentUser(null);
//       setTasks([]);
//       setNotifications([]);
//       setDbStatus('checking');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const headers = { 'x-user-id': userId };
//       const [userRes, tasksRes, notesRes] = await Promise.all([
//         fetch('/api/users', { headers }),
//         fetch('/api/tasks', { headers }),
//         fetch('/api/notifications', { headers }),
//       ]);

//       if (userRes.ok) {
//         const userData = await safeJson(userRes);
//         setCurrentUser(userData.currentUser);
//         setAvailableHelpers(userData.availableHelpers || []);
//         setDbStatus('connected');
//       } else {
//         setDbStatus('error');
//       }

//       if (tasksRes.ok) setTasks(await safeJson(tasksRes));
//       if (notesRes.ok) setNotifications(await safeJson(notesRes));
//     } catch {
//       setDbStatus('error');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [isMockMode]);

//   /** --- DEMO LOGIN --- **/
//   const demoLogin = useCallback(async () => {
//     try {
//       const res = await fetch('/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ action: 'demo' }),
//       });
//       const data = await safeJson(res);
//       localStorage.setItem(AUTH_KEY, data.id);
//       setIsMockMode(false);
//       await refreshData();
//     } catch {
//       enterMockMode();
//     }
//   }, [refreshData, enterMockMode]);

//   /** --- REAL LOGIN / SIGNUP --- **/
//   const login = async (email: string, password: string) => {
//     const res = await fetch('/api/auth', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ action: 'login', email, password }),
//     });
//     const data = await safeJson(res);
//     if (data.id) localStorage.setItem(AUTH_KEY, data.id);
//     await refreshData();
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     const res = await fetch('/api/auth', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ action: 'signup', name, email, password }),
//     });
//     const data = await safeJson(res);
//     if (data.id) localStorage.setItem(AUTH_KEY, data.id);
//     await refreshData();
//   };

//   /** --- TASK OPERATIONS --- **/
//   const toggleAvailability = async () => {
//     if (!currentUser) return;
//     const newState = !currentUser.isAvailable;
//     if (!isMockMode) {
//       await fetch('/api/users', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ isAvailable: newState }),
//       });
//       await refreshData();
//     } else {
//       setCurrentUser({ ...currentUser, isAvailable: newState });
//     }
//   };

//   const createTask = async (
//     title: string,
//     description: string,
//     reward: number,
//     category: string,
//     paymentType: PaymentType,
//     couponDetails?: CouponDetails
//   ) => {
//     if (!currentUser) return;
//     const newTask: Task = {
//       id: `t-${Date.now()}`,
//       requesterId: currentUser.id,
//       requesterName: currentUser.name,
//       requesterAvatar: currentUser.avatar,
//       title,
//       description,
//       reward,
//       paymentType,
//       couponDetails,
//       category,
//       status: 'pending',
//       createdAt: Date.now(),
//     };

//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify(newTask),
//       });
//       if (res.ok) await refreshData();
//     } else {
//       setTasks((prev) => [newTask, ...prev]);
//       addLocalNotification(`Request "${title}" is live!`, 'info');
//     }
//   };

//   const acceptTask = async (taskId: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ taskId, action: 'accept', helperId: currentUser.id }),
//       });
//       if (res.ok) await refreshData();
//     } else {
//       setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: 'accepted', helperId: currentUser.id } : t)));
//     }
//   };

//   const completeTask = async (taskId: string, proof: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       const res = await fetch('/api/tasks', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ taskId, action: 'complete', proof }),
//       });
//       if (res.ok) await refreshData();
//     } else {
//       setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: 'done', proofOfWork: proof } : t)));
//     }
//   };

//   const finalizeTask = async (taskId: string) => {
//     if (!currentUser) return;
//     const task = tasks.find((t) => t.id === taskId);
//     if (!task) return;

//     if (!isMockMode) {
//       await fetch('/api/tasks', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ taskId, action: 'finalize' }),
//       });
//       await refreshData();
//     } else {
//       if (task.paymentType === 'cash' && currentUser.walletBalance < task.reward) {
//         alert('Insufficient balance.');
//         return;
//       }
//       if (task.paymentType === 'cash') {
//         setCurrentUser((prev) => (prev ? { ...prev, walletBalance: prev.walletBalance - task.reward } : null));
//       }
//       setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: 'finalized' } : t)));
//       addLocalNotification(`Payment released for "${task.title}".`, 'success');
//     }
//   };

//   const disputeTask = async (taskId: string, reason: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       await fetch('/api/tasks', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
//         body: JSON.stringify({ taskId, action: 'dispute', reason }),
//       });
//       await refreshData();
//     } else {
//       setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: 'disputed', disputeReason: reason } : t)));
//       addLocalNotification(
//         `Dispute raised for "${tasks.find((t) => t.id === taskId)?.title}". Community review started.`,
//         'alert'
//       );
//     }
//   };

//   const clearNotification = async (id: string) => {
//     if (!currentUser) return;
//     if (!isMockMode) {
//       await fetch(`/api/notifications?id=${id}`, {
//         method: 'DELETE',
//         headers: { 'x-user-id': currentUser.id },
//       });
//     }
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   /** --- SIMULATION EFFECT (demo/mock mode) --- **/
//   useEffect(() => {
//     if (!currentUser || isLoading) return;

//     tasks.forEach((task) => {
//       const stateKey = `${task.id}-${task.status}`;
//       if (simulationProcessed.current.has(stateKey)) return;
//       simulationProcessed.current.add(stateKey);

//       // --- Simulate Accept, Complete, Finalize, Dispute for mock mode ---
//       if (isMockMode) {
//         // Accept
//         if (task.requesterId === currentUser.id && task.status === 'pending') {
//           setTimeout(() => {
//             setTasks((prev) =>
//               prev.map((t) => (t.id === task.id ? { ...t, status: 'accepted', helperId: MOCK_HELPERS[0].id } : t))
//             );
//             addLocalNotification(`${MOCK_HELPERS[0].name} accepted your request: "${task.title}"`, 'match');
//           }, 3000);
//         }

//         // Complete
//         if (task.requesterId === currentUser.id && task.status === 'accepted' && task.helperId !== currentUser.id) {
//           setTimeout(() => {
//             setTasks((prev) =>
//               prev.map((t) =>
//                 t.id === task.id ? { ...t, status: 'done', proofOfWork: 'Work completed according to request details.' } : t
//               )
//             );
//             addLocalNotification(
//               `Neighbor finished "${task.title}". Proof: "Work completed according to request details."`,
//               'match'
//             );
//           }, 8000);
//         }

//         // Finalize / Payment
//         if (task.helperId === currentUser.id && task.status === 'done' && task.requesterId !== currentUser.id) {
//           setTimeout(() => {
//             const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
//             if (task.paymentType === 'cash') {
//               setCurrentUser((prev) =>
//                 prev ? { ...prev, walletBalance: prev.walletBalance + netReward, totalHelps: prev.totalHelps + 1 } : null
//               );
//             } else {
//               setCurrentUser((prev) => (prev ? { ...prev, totalHelps: prev.totalHelps + 1 } : null));
//             }
//             setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: 'finalized' } : t)));
//             addLocalNotification(`Neighbor confirmed "${task.title}". Payment received!`, 'success');
//           }, 5000);
//         }

//         // Dispute
//         if (task.status === 'disputed') {
//           setTimeout(() => {
//             const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
//             const verdict = task.proofOfWork ? 'RESOLVED_IN_FAVOR_OF_HELPER' : 'RESOLVED_IN_FAVOR_OF_REQUESTER';
//             if (verdict === 'RESOLVED_IN_FAVOR_OF_HELPER') {
//               if (task.helperId === currentUser.id) {
//                 setCurrentUser((prev) =>
//                   prev
//                     ? {
//                         ...prev,
//                         walletBalance: task.paymentType === 'cash' ? prev.walletBalance + netReward : prev.walletBalance,
//                         totalHelps: prev.totalHelps + 1,
//                       }
//                     : null
//                 );
//               }
//               setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: 'finalized' } : t)));
//               addLocalNotification(
//                 `Dispute Resolved: Community verified proof for "${task.title}". Reward released.`,
//                 'success'
//               );
//             } else {
//               setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: 'rejected' } : t)));
//               addLocalNotification(
//                 `Dispute Resolved: Insufficient proof for "${task.title}". Task marked as incomplete.`,
//                 'alert'
//               );
//             }
//           }, 6000);
//         }
//       }
//     });
//   }, [tasks, currentUser, isMockMode, isLoading, addLocalNotification]);

//   /** --- INITIAL LOAD --- **/
//   useEffect(() => {
//     refreshData();
//   }, [refreshData]);

//   return (
//     <AppContext.Provider
//       value={{
//         currentUser,
//         tasks,
//         notifications,
//         availableHelpers,
//         isLoading,
//         isMockMode,
//         dbStatus,
//         toggleAvailability,
//         createTask,
//         acceptTask,
//         completeTask,
//         finalizeTask,
//         disputeTask,
//         clearNotification,
//         refreshData,
//         demoLogin,
//         enterMockMode,
//         login,
//         signup,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) throw new Error('useAppContext must be used within an AppProvider');
//   return context;
// };

////////////******************************************* */


import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { User, Task, Notification, AppState, PaymentType, CouponDetails } from '../shared/types';
import { MOCK_TASKS, MOCK_HELPERS, INITIAL_USER, PLATFORM_FEE_PERCENT } from '../shared/constants';
type TabType = "find" | "tasks" | "community" | "impact";//s1
import { connectSocket, disconnectSocket } from "./components/Chat/socket";
interface AppContextType extends AppState {
  activeTab: TabType; //s1
  setActiveTab: (tab: TabType) => void; //s1


  viewingUserId: string | null;//today
  setViewingUserId: (id: string | null) => void;  //today
  isMockMode: boolean;
  toggleAvailability: () => Promise<void>;
  createTask: (
    title: string,
    description: string,
    reward: number,
    category: string,
    paymentType: PaymentType,
    couponDetails?: CouponDetails
  ) => Promise<void>;
  acceptTask: (taskId: string) => Promise<void>;
  completeTask: (taskId: string, proof: string) => Promise<void>;
  finalizeTask: (taskId: string) => Promise<void>;
  rejectTask: (taskId: string) => Promise<void>;
  disputeTask: (taskId: string, reason: string) => Promise<void>;
  clearNotification: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
  updateProfile: (
    description: string,
    specialties: User["specialties"]
  ) => Promise<void>;
  demoLogin: () => Promise<void>;
  enterMockMode: () => void;
  loadingHelpers: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const AUTH_KEY = 'helpneighbor_auth_id';

const safeJson = async (res: Response) => {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { error: 'Invalid response format' };
  }
};

// simple local notification helper
const addLocalNotification = (message: string, type: 'info' | 'success' | 'alert') => {
  console.log(`[${type.toUpperCase()}] ${message}`);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [availableHelpers, setAvailableHelpers] = useState<User[]>([]);
  const [isMockMode, setIsMockMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingHelpers, setLoadingHelpers] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("find");  //s1
  const [viewingUserId, setViewingUserId] = useState<string | null>(null); //today


  const simulationProcessed = useRef<Set<string>>(new Set());

  /** --- MOCK / DEMO USERS --- */
  const enterMockMode = useCallback(() => {
    setIsMockMode(true);
    setCurrentUser({ ...INITIAL_USER });
     // Alex Rivera mock
    connectSocket(INITIAL_USER.id, INITIAL_USER.name);
    setTasks([...MOCK_TASKS]);
    setAvailableHelpers([...MOCK_HELPERS]);
  }, []);

  const demoLogin = useCallback(async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'demo' }),
      });
      const data = await safeJson(res);
      localStorage.setItem(AUTH_KEY, data.id);
      connectSocket(data.id, data.name);
      setIsMockMode(false);
      setCurrentUser(data);
    } catch {
      // fallback to local mock if DB fails
      enterMockMode();
    }
  }, [enterMockMode]);

  /** --- AUTH --- */
  // const login = async (email: string, password: string) => {
  //   const res = await fetch('/api/auth', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ action: 'login', email, password }),
  //   });
  //   const data = await safeJson(res);
  //   if (data.id) localStorage.setItem(AUTH_KEY, data.id);
  //   setCurrentUser(data);
  //   setIsMockMode(false);
  // };
  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });

    const data = await safeJson(res);

    // ✅ If backend sends error OR no id → throw error
    if (!res.ok || !data?.id) {
      throw new Error(data?.error || "Invalid email or password");
    }

    localStorage.setItem(AUTH_KEY, data.id);
    connectSocket(data.id, data.name);
    setCurrentUser(data);
    setIsMockMode(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'signup', name, email, password }),
    });
    const data = await safeJson(res);
    if (data.id) localStorage.setItem(AUTH_KEY, data.id);
    connectSocket(data.id, data.name);
    setCurrentUser(data);
    setIsMockMode(false);
  };



  /** --- DATA REFRESH --- */
  //   const refreshData = async () => {
  //   if (!currentUser) return;
  //   try {
  //     const res = await fetch('/api/users', {
  //       headers: { 'x-user-id': currentUser.id },
  //     });

  //     const data = await res.json();

  //     setAvailableHelpers(data.availableHelpers || []);
  //   } catch (err) {
  //     console.error('Refresh failed:', err);
  //   }
  // };
  const [loading, setLoading] = useState(false);

  // const refreshData = async () => {
  //   if (!currentUser) return;

  //   setLoading(true);
  //   try {
  //     const res = await fetch('/api/users', {
  //       headers: { 'x-user-id': currentUser.id },
  //     });

  //     const data = await res.json();
  //     setAvailableHelpers(data.availableHelpers || []);
  //   } catch (err) {
  //     console.error('Refresh failed:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //---
  //   const refreshData = async () => {
  //   if (!currentUser) return;

  //   setLoadingHelpers(true);

  //   try {
  //     const res = await fetch('/api/users?available=true', {
  //       headers: { 'x-user-id': currentUser.id },
  //     });

  //     const data = await res.json();
  //     setAvailableHelpers(data.availableHelpers || []);
  //   } catch (err) {
  //     console.error('Refresh failed:', err);
  //   } finally {
  //     setLoadingHelpers(false);
  //   }
  // };
  // const refreshData = async () => {
  //   if (!currentUser) return;

  //   setLoadingHelpers(true);

  //   try {
  //     // ✅ 1. Fetch available helpers (existing logic)
  //     const helpersRes = await fetch('/api/users?available=true', {
  //       headers: { 'x-user-id': currentUser.id },
  //     });

  //     const helpersData = await helpersRes.json();
  //     setAvailableHelpers(helpersData.availableHelpers || []);

  //     // ✅ 2. Fetch tasks (NEW PART — THIS FIXES YOUR ISSUE)
  //     const tasksRes = await fetch('/api/tasks', {
  //       headers: { 'x-user-id': currentUser.id },
  //     });

  //     const tasksData = await tasksRes.json();
  //     setTasks(tasksData || []);

  //   } catch (err) {
  //     console.error('Refresh failed:', err);
  //   } finally {
  //     setLoadingHelpers(false);
  //   }   //working one 
  // };

  const refreshData = async () => {
    if (!currentUser) return;

    setLoadingHelpers(true);

    try {
      // ✅ 1. Refresh ONLY helpers
      const helpersRes = await fetch('/api/users?available=true', {
        headers: { 'x-user-id': currentUser.id },
      });

      if (helpersRes.ok) {
        const helpersData = await helpersRes.json();
        setAvailableHelpers(helpersData.availableHelpers || []);
      }


      const tasksRes = await fetch('/api/tasks', {
        headers: { 'x-user-id': currentUser.id },
      });

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();

        // Only update if it's a valid non-empty array
        if (Array.isArray(tasksData)) {
          setTasks(tasksData);
        }
      }

      //---newly added to update user data after accepting task, completing task, updating profile etc. This ensures that any changes to the user's profile (like totalHelps, walletBalance, etc.) are reflected immediately without needing a full page refresh.
      // const userRes = await fetch('/api/auth', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     action: 'getUser',
      //     id: currentUser.id,
      //   }),
      // });

      // if (userRes.ok) {
      //   const updatedUser = await userRes.json();
      //   setCurrentUser(updatedUser);
      // }
      // //----

    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setLoadingHelpers(false);
    }
  };



  /** --- TASK / AVAILABILITY OPERATIONS --- */
  const toggleAvailability = async () => {
    if (!currentUser) return;

    const newState = !currentUser.isAvailable;
    setCurrentUser({
      ...currentUser,
      isAvailable: newState,
    });
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id,
        },
        body: JSON.stringify({ isAvailable: newState }),
      });

      refreshData();  //chnage 2
    } catch (err) {
      console.error('Toggle failed:', err);
      setCurrentUser({
        ...currentUser,
        isAvailable: !newState,
      });
    }
  };

  const updateProfile = async (description: string, specialties: User["specialties"]) => {
    if (!currentUser) return;

    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id,
        },
        body: JSON.stringify({
          description,
          specialties
        }),
      });

      if (!res.ok) throw new Error('Profile update failed');

      const updatedUser = await res.json();

      // ✅ Update context user everywhere
      setCurrentUser(updatedUser);

      // Optional: refresh helpers list
      refreshData();

    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };




  const createTask = async (
    title: string,
    description: string,
    reward: number,
    category: string,
    paymentType: PaymentType,
    couponDetails?: CouponDetails
  ) => {
    if (!currentUser) return;
    if (!location) {
      alert("Location not available");
      return;
    }



    const newTask: Task = {
      id: `t-${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      title,
      description,
      reward,
      paymentType,
      couponDetails,
      category,
      status: 'pending',
      createdAt: Date.now(),
      pendingAt: Date.now(),
      location: {
        lat: 0,
        lng: 0,
      },
    };

    if (!isMockMode) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
        body: JSON.stringify(newTask),
      });
      if (res.ok) await refreshData();
    } else {
      setTasks((prev) => [newTask, ...prev]);
      addLocalNotification(`Request "${title}" is live!`, 'info');
    }
  };

  const acceptTask = async (taskId: string) => {
    if (!currentUser) return;
    if (!isMockMode) {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
        body: JSON.stringify({
          taskId,
          action: 'accept',
          helperId: currentUser.id,
          helperName: currentUser.name,
          helperAvatar: currentUser.avatar,
          acceptedAt: Date.now(),
        }),
      });
      if (res.ok) await refreshData();
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'accepted', helperId: currentUser.id } : t))
      );
    }
  };

  const completeTask = async (taskId: string, proof: string) => {
    if (!currentUser) return;
    if (!isMockMode) {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
        body: JSON.stringify({
          taskId,
          action: 'complete',
          proof,
          completedAt: Date.now(),
        }),
      });
      if (res.ok) await refreshData();
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'done', proofOfWork: proof } : t))
      );
    }
  };

  //   const finalizeTask = async (taskId: string) => {
  //   if (!currentUser) return;

  //   if (!isMockMode) {
  //     const res = await fetch('/api/tasks', {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-user-id': currentUser.id
  //       },
  //       body: JSON.stringify({ taskId, action: 'finalize' }),
  //     });

  //     if (res.ok) {
  //       // 🔥 Refresh everything including wallet
  //       await refreshData();

  //       const userRes = await fetch('/api/auth', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ action: 'getUser', id: currentUser.id })
  //       });

  //       if (userRes.ok) {
  //         const updatedUser = await userRes.json();
  //         setCurrentUser(updatedUser);
  //       }
  //     }
  //   }
  // };

  const finalizeTask = async (taskId: string) => {   ///current one...imp
    if (!currentUser) return;

    if (!isMockMode) {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify({ taskId, action: 'finalize', finalizedAt: Date.now() }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Payment failed');
        return;
      }

      const data = await res.json();
      const { task: updatedTask, requester, helper } = data;
      setTasks(prev =>
        prev.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );
      // if (requester && requester.id === currentUser.id) {
      //   setCurrentUser(requester);
      // }
      // if (helper && helper.id === currentUser.id) {
      //   setCurrentUser(helper);
      // }
      const updatedUser =
        requester?.id === currentUser.id
          ? requester
          : helper?.id === currentUser.id
            ? helper
            : null;

      if (updatedUser) {
        setCurrentUser(prev => ({
          ...prev,
          ...updatedUser
        }));
      }
      

    }
  };

  







  const rejectTask = async (taskId: string) => {
    if (!currentUser) return;

    if (!isMockMode) {
      const res = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser.id
        },
        body: JSON.stringify({
          taskId,
          action: 'reject',
          rejectedAt: Date.now()
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to reject task');
        return;
      }

      const data = await res.json();
      const updatedTask = data.task;

      // Update task locally
      setTasks(prev =>
        prev.map(t =>
          t.id === updatedTask.id ? updatedTask : t
        )
      );
    } else {
      // mock mode fallback
      setTasks(prev =>
        prev.map(t =>
          t.id === taskId ? { ...t, status: 'rejected', rejectedAt: Date.now() } : t
        )
      );
    }
  };


  const disputeTask = async (taskId: string, reason: string) => {
    if (!currentUser) return;
    if (!isMockMode) {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
        body: JSON.stringify({ taskId, action: 'dispute', reason }),
      });
      await refreshData();
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'disputed', disputeReason: reason, disputedAt: Date.now() } : t))
      );
      addLocalNotification(
        `Dispute raised for "${tasks.find((t) => t.id === taskId)?.title}". Community review started.`,
        'alert'
      );
    }
  };

  const clearNotification = async (id: string) => {
    if (!currentUser) return;
    if (!isMockMode) {
      await fetch(`/api/notifications?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': currentUser.id },
      });
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addLocalNotification = useCallback((message: string, type: 'info' | 'success' | 'alert' | 'match') => {
    const newNote: Notification = { id: `n-local-${Date.now()}`, message, type, timestamp: Date.now(), read: false };
    setNotifications(prev => [newNote, ...prev]);
  }, []);

  useEffect(() => {


    if (!isMockMode) return;   // 🔥 STOP SIMULATION IN REAL MODE
    if (!currentUser || isLoading) return;


    tasks.forEach(task => {
      const stateKey = `${task.id}-${task.status}`;
      if (simulationProcessed.current.has(stateKey)) return;

      // 1. NEIGHBOR ACCEPTS YOUR REQUEST
      if (task.requesterId === currentUser.id && task.status === 'pending') {
        simulationProcessed.current.add(stateKey);
        setTimeout(async () => {
          if (isMockMode) {
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'accepted', helperId: MOCK_HELPERS[0].id } : t));
            addLocalNotification(`${MOCK_HELPERS[0].name} accepted your request: "${task.title}"`, 'match');
          } else {
            const res = await fetch('/api/tasks', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
              body: JSON.stringify({ taskId: task.id, action: 'accept', helperId: MOCK_HELPERS[0].id })
            });
            if (res.ok) await refreshData();
          }
        }, 3000);
      }

      // 2. NEIGHBOR COMPLETES YOUR REQUEST
      if (task.requesterId === currentUser.id && task.status === 'accepted' && task.helperId !== currentUser.id) {
        simulationProcessed.current.add(stateKey);
        setTimeout(async () => {
          if (isMockMode) {
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done', proofOfWork: 'Work completed according to request details.' } : t));
            addLocalNotification(`Neighbor finished "${task.title}". Proof: "Work completed according to request details."`, 'match');
          } else {
            const res = await fetch('/api/tasks', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
              body: JSON.stringify({ taskId: task.id, action: 'complete', proof: 'Work completed.' })
            });
            if (res.ok) await refreshData();
          }
        }, 8000);
      }

      // 3. NEIGHBOR PAYS YOU (Helper perspective)
      if (task.helperId === currentUser.id && task.status === 'done' && task.requesterId !== currentUser.id) {
        simulationProcessed.current.add(stateKey);

        // DEMO SPECIAL SCENARIO: Reject task t-2
        const isRejectionScenario = task.id === 't-2';

        setTimeout(async () => {
          if (isMockMode) {
            if (isRejectionScenario) {
              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'rejected' } : t));
              addLocalNotification(`Verification failed for "${task.title}". Requester claims incomplete work.`, 'alert');
            } else {
              const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
              if (task.paymentType === 'cash') {
                setCurrentUser(prev => prev ? { ...prev, walletBalance: prev.walletBalance + netReward, totalHelps: prev.totalHelps + 1 } : null);
              } else {
                setCurrentUser(prev => prev ? { ...prev, totalHelps: prev.totalHelps + 1 } : null);
              }
              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'finalized' } : t));
              addLocalNotification(`Neighbor confirmed "${task.title}". Payment received!`, 'success');
            }
          } else {
            const res = await fetch('/api/tasks', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', 'x-user-id': currentUser.id },
              body: JSON.stringify({ taskId: task.id, action: isRejectionScenario ? 'reject' : 'finalize', rejectedAt: Date.now() })
            });
            if (res.ok) await refreshData();
          }
        }, 2000);
      }

      // 4. AUTOMATED COMMUNITY MEDIATION (Simulation for Disputes)
      if (task.status === 'disputed') {
        simulationProcessed.current.add(stateKey);
        setTimeout(async () => {
          if (isMockMode) {
            const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);
            // Mediation Verdict: Favoring Helper if proof is present
            const verdict = task.proofOfWork ? 'RESOLVED_IN_FAVOR_OF_HELPER' : 'RESOLVED_IN_FAVOR_OF_REQUESTER';

            if (verdict === 'RESOLVED_IN_FAVOR_OF_HELPER') {
              if (task.helperId === currentUser.id) {
                setCurrentUser(prev => prev ? {
                  ...prev,
                  walletBalance: task.paymentType === 'cash' ? prev.walletBalance + netReward : prev.walletBalance,
                  totalHelps: prev.totalHelps + 1
                } : null);
              }
              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'finalized' } : t));
              addLocalNotification(`Dispute Resolved: Community verified proof for "${task.title}". Reward released.`, 'success');
            } else {
              setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'rejected' } : t));
              addLocalNotification(`Dispute Resolved: Insufficient proof for "${task.title}". Task marked as incomplete.`, 'alert');
            }
          }
        }, 6000);
      }
    });
  }, [tasks, currentUser, isMockMode, refreshData, isLoading, addLocalNotification]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        tasks,
        notifications,
        availableHelpers,
        isLoading,
        isMockMode,
        toggleAvailability,
        createTask,
        acceptTask,
        completeTask,
        finalizeTask,
        rejectTask,
        disputeTask,
        clearNotification,
        refreshData,
        demoLogin,
        updateProfile,
        enterMockMode,
        loadingHelpers,
        login,
        signup,
        activeTab,//s1
        setActiveTab,//s2
        viewingUserId,//today
        setViewingUserId//today
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};