
// import React, { useState, useEffect } from 'react';
// import { AppProvider, useAppContext } from './AppContext';
// import Navbar from './components/Navbar';
// import TaskFeed from './components/TaskFeed';
// import Profile from './components/Profile';
// import CreateTaskModal from './components/CreateTaskModal';
// import NotificationCenter from './components/NotificationCenter';

// const AppContent: React.FC = () => {
//   const { currentUser, isLoading, enterMockMode, refreshData } = useAppContext();
//   const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('feed');
//   const [viewingUserId, setViewingUserId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showTimeoutOptions, setShowTimeoutOptions] = useState(false);

//   useEffect(() => {
//     let timer: any;
//     if (isLoading) {
//       timer = setTimeout(() => setShowTimeoutOptions(true), 5000);
//     } else {
//       setShowTimeoutOptions(false);
//     }
//     return () => clearTimeout(timer);
//   }, [isLoading]);

//   const handleViewUser = (userId: string) => {
//     setViewingUserId(userId);
//     setActiveTab('profile');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleGoToFeed = () => {
//     setViewingUserId(null);
//     setActiveTab('feed');
//   };

//   const handleGoToOwnProfile = () => {
//     setViewingUserId(null);
//     setActiveTab('profile');
//   };

//   if (isLoading || !currentUser) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
//         <div className="flex flex-col items-center gap-6">
//           <div className="relative w-16 h-16 border-4 border-indigo-100 rounded-full">
//             <div className="absolute top-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//           <p className="text-slate-900 font-bold text-lg">Syncing with Neighborhood...</p>
//           {showTimeoutOptions && (
//             <div className="flex flex-col gap-2">
//               <button onClick={() => refreshData()} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold">Retry</button>
//               <button onClick={enterMockMode} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold">Demo Mode</button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
//       <Navbar onTabChange={(tab) => tab === 'feed' ? handleGoToFeed() : handleGoToOwnProfile()} activeTab={viewingUserId ? null : activeTab} />

//       <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
//         {activeTab === 'feed' ? (
//           <div className="space-y-6">
//             <header className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Neighborhood Feed</h1>
//                 <p className="text-slate-500 text-sm">Find neighbors who need a hand</p>
//               </div>
//               <button onClick={() => setIsModalOpen(true)} className="hidden sm:flex bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-indigo-100 items-center gap-2">
//                 Ask for Help
//               </button>
//             </header>
//             <TaskFeed onUserClick={handleViewUser} />
//           </div>
//         ) : (
//           <Profile userId={viewingUserId} onBack={handleGoToFeed} />
//         )}
//       </main>

//       <NotificationCenter />
//       {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}

//       {/* Mobile Right-Hand Bottom Navigation Footer */}
//       <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
//         <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-2 flex items-center justify-between border border-white/10 backdrop-blur-md">
//           <div className="flex items-center gap-1 ml-2">
//             <button 
//               onClick={handleGoToFeed}
//               className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${activeTab === 'feed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
//               </svg>
//               {activeTab === 'feed' && <span className="text-sm font-black uppercase tracking-widest">Feed</span>}
//             </button>
//           </div>

//           <button 
//             onClick={() => setIsModalOpen(true)}
//             className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
//           >
//             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
//             </svg>
//           </button>

//           <div className="flex items-center gap-1 mr-2">
//              <button 
//               onClick={handleGoToOwnProfile}
//               className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${activeTab === 'profile' && !viewingUserId ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
//             >
//               {activeTab === 'profile' && !viewingUserId && <span className="text-sm font-black uppercase tracking-widest">Me</span>}
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => (
//   <AppProvider>
//     <AppContent />
//   </AppProvider>
// );

// export default App;















// App.tsx
// import React, { useState, useEffect } from 'react';
// import { AppProvider, useAppContext } from './AppContext';
// import Navbar from './components/Navbar';
// import TaskFeed from './components/TaskFeed';
// import Profile from './components/Profile';
// import CreateTaskModal from './components/CreateTaskModal';
// import NotificationCenter from './components/NotificationCenter';
// import Login from './components/Login';
// import Signup from './components/signup';

// const AppContent: React.FC = () => {
//   const { currentUser, demoLogin, enterMockMode } = useAppContext();
//   const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('feed');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!currentUser) {
//     // Show authentication / demo buttons
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 p-4">
//         <h1 className="text-3xl font-bold text-slate-900">Welcome to HelpNeighbor</h1>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Login onSwitch={() => {}} />
//           <Signup onSwitch={() => {}} />
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 mt-4">
//           <button
//             onClick={demoLogin}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold"
//           >
//             Demo Login (Demo Neighbor)
//           </button>
//           <button
//             onClick={enterMockMode}
//             className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold"
//           >
//             Try Demo Experience (Alex Rivera)
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col pb-24 md:pb-0 bg-slate-50">
//       <Navbar onTabChange={setActiveTab} activeTab={activeTab} />
//       <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
//         {activeTab === 'feed' ? <TaskFeed /> : <Profile />}
//       </main>
//       <NotificationCenter />
//       {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// };

// const App: React.FC = () => (
//   <AppProvider>
//     <AppContent />
//   </AppProvider>
// );

// export default App;
////-----------------------------//

import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './AppContext';
import Navbar from './components/Navbar';
import TaskFeed from './components/TaskFeed';
import Profile from './components/Profile';
import CreateTaskModal from './components/CreateTaskModal';
import NotificationCenter from './components/NotificationCenter';
import Login from './components/Login';
import Signup from './components/signup';
import { HELPERS } from '../shared/constants';
import TopTabs from './components/TopTabs';
import MyTasks from './pages/MyTasks';
import Community from './pages/Community';
import MyImpact from './pages/MyImpact';
import AIRecommendationCard from './components/AIRecommendationCard';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import HelperCard from './components/HelperCard';

const AppContent: React.FC = () => {
  const {
    currentUser,
    isLoading,
    enterMockMode,
    demoLogin,
    refreshData,
    activeTab//s2
  } = useAppContext();

  //const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('feed');
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(null);

  // Only show timeout options after 2 seconds
  const [showTimeoutOptions, setShowTimeoutOptions] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowTimeoutOptions(true);
      }, 2000);
    } else {
      setShowTimeoutOptions(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  // const handleViewUser = (userId: string) => {
  //   setViewingUserId(userId);
  //   setActiveTab('profile');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };
  const handleViewUser = (userId: string) => {
    setViewingUserId(userId);
  };



  const handleGoToFeed = () => {
    setViewingUserId(null);
    // setActiveTab('feed');//s2
  };

  // const handleGoToOwnProfile = () => {
  //   setViewingUserId(null);
  //   setActiveTab('profile');
  // }; //s2

  // --- Show auth screens if no user ---
  if (!currentUser && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        {authView === 'login' && <Login onSwitch={() => setAuthView('signup')} />}
        {authView === 'signup' && <Signup onSwitch={() => setAuthView('login')} />}
        {!authView && (
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900">Welcome to HelpNeighbor</h1>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-violet-400 text-white px-6 py-2  font-bold"
                onClick={() => setAuthView('login')}
              >
                Login
              </button>
              <button
                className="bg-green-600 text-white px-6 py-2 font-bold"
                onClick={() => setAuthView('signup')}
              >
                Sign Up
              </button>

            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={demoLogin}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xs
             font-bold"
              >
                Demo Login (Demo Neighbor)
              </button>
              <button
                onClick={enterMockMode}
                className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xs font-bold"
              >
                Try Demo Experience (Alex Rivera)
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }

  // if (!currentUser) {
  //   if (authView === 'login') {
  //     return (
  //       <Login onSwitch={() => setAuthView('signup')} />
  //     );
  //   }

  //   if (authView === 'signup') {
  //     return (
  //       <Signup onSwitch={() => setAuthView('login')} />
  //     );
  //   }

  //   return (
  //     <LandingPage
  //       onLogin={() => setAuthView('login')}
  //       onSignup={() => setAuthView('signup')}
  //     />
  //   );
  // }


  ////**************** */





  // --- Loading screen while fetching or logging in ---
  if (isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16 border-4 border-indigo-100 rounded-full">
            <div className="absolute top-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-900 font-bold text-lg">Syncing with Neighborhood...</p>
          {showTimeoutOptions && (
            <div className="flex flex-col gap-2">
              <button
                onClick={refreshData}
                className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold"
              >
                Retry
              </button>
              <button
                onClick={enterMockMode}
                className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold"
              >
                Demo Mode
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Main App content ---
  // return (
  //   <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
  //     <Navbar
  //       onTabChange={(tab) =>
  //         tab === 'feed' ? handleGoToFeed() : handleGoToOwnProfile()
  //       }
  //       activeTab={viewingUserId ? null : activeTab}
  //     />

  //     <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
  //       {activeTab === 'feed' ? (
  //         <div className="space-y-6">
  //           <header className="flex items-center justify-between">
  //             <div>
  //               <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
  //                 Neighborhood Feed
  //               </h1>
  //               <p className="text-slate-500 text-sm">Find neighbors who need a hand</p>
  //             </div>
  //             <button
  //               onClick={() => setIsModalOpen(true)}
  //               className="hidden sm:flex bg-gray-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-indigo-100 items-center gap-2"
  //             >
  //               Ask for Help
  //             </button>
  //           </header>
  //           <TaskFeed onUserClick={handleViewUser} />
  //         </div>
  //       ) : (
  //         <Profile userId={viewingUserId} onBack={handleGoToFeed} />
  //       )}
  //     </main>

  //     <NotificationCenter />
  //     {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}

  //     {/* Mobile Footer */}
  //     <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[60%] max-w-md z-50">
  //       <div className="flex items-center justify-between bg-white shadow-xl border border-slate-200 rounded-2xl px-4 py-2">

  //         {/* Helpers */}
  //         <button
  //           onClick={handleGoToFeed}
  //           className={`flex flex-col items-center text-m font-medium transition ${activeTab === "feed"
  //               ? "text-indigo-600"
  //               : "text-slate-500 hover:text-slate-800"
  //             }`}
  //         >
  //           <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
  //               d="M17 20h5V4H2v16h5m10 0v-4a4 4 0 10-8 0v4m8 0H9" />
  //           </svg>
  //           Helpers
  //         </button>

  //         {/* Ask Help (Primary) */}
  //         <button
  //           onClick={() => setIsModalOpen(true)}
  //           className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg -mt-8 active:scale-95 transition"
  //         >
  //           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
  //               d="M12 4v16m8-8H4" />
  //           </svg>
  //         </button>

  //         {/* Profile */}
  //         <button
  //           onClick={handleGoToOwnProfile}
  //           className={`flex flex-col items-center text-xs font-medium transition ${activeTab === "profile"
  //               ? "text-indigo-600"
  //               : "text-slate-500 hover:text-slate-800"
  //             }`}
  //         >
  //           <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
  //               d="M5.121 17.804A9 9 0 1118.9 6.2M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  //           </svg>
  //           Profile
  //         </button>

  //       </div>
  //     </div>
  //   </div>
  // );

  // --- Main App content ---




  ///************** */ current ---impoortanat



  // return (
  //   <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
  //     <Navbar
  //       onTabChange={(tab) =>
  //         tab === "feed" ? handleGoToFeed() : handleGoToOwnProfile()
  //       }
  //       activeTab={viewingUserId ? null : activeTab}
  //     />


  //     <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
  //       {activeTab === "feed" ? (
  //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  //           {/* LEFT SIDE */}
  //           <div className="lg:col-span-2 space-y-6">

  //             {/* AI Recommendation */}
  //             <div className="bg-gradient-to-r from-indigo-900 to-slate-700 text-white p-6 rounded-2xl flex justify-between items-center">
  //               <div>
  //                 <div className="flex items-center gap-2 mb-2">
  //                   <span className="bg-indigo-500 px-2 py-1 text-xs rounded-lg">
  //                     Smart Match
  //                   </span>
  //                   <h3 className="font-bold text-lg">AI Recommendation</h3>
  //                 </div>

  //                 <p className="text-sm text-indigo-100">
  //                   Based on your location and preferences, Sarah M. is perfect
  //                   for your grocery needs. She's 0.3 miles away and responds in
  //                   15 minutes.
  //                 </p>

  //                 <button className="mt-4 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold">
  //                   Request Sarah →
  //                 </button>
  //               </div>
  //             </div>

  //             {/* SEARCH */}
  //             <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
  //               <input
  //                 type="text"
  //                 placeholder="Search by name, skill, or location..."
  //                 className="w-full outline-none text-sm"
  //               />
  //             </div>

  //             {/* CATEGORY FILTERS */}
  //             <div className="flex flex-wrap gap-2">
  //               {[
  //                 "All Categories",
  //                 "Groceries",
  //                 "Pet Care",
  //                 "Handyman",
  //                 "Moving",
  //                 "Delivery",
  //               ].map((cat, i) => (
  //                 <button
  //                   key={i}
  //                   className={`px-4 py-2 rounded-full text-sm border ${
  //                     cat === "Groceries"
  //                       ? "bg-indigo-600 text-white"
  //                       : "bg-white text-slate-700"
  //                   }`}
  //                 >
  //                   {cat}
  //                 </button>
  //               ))}
  //             </div>

  //             {/* HELPERS LIST */}
  //             <div className="space-y-4">

  //               {/* HELPER CARD */}
  //               <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center">
  //                 <div className="flex gap-4 items-center">

  //                   <img
  //                     src="https://i.pravatar.cc/60?img=12"
  //                     className="w-12 h-12 rounded-full"
  //                   />

  //                   <div>
  //                     <h3 className="font-semibold text-slate-900">
  //                       Sarah M.
  //                     </h3>

  //                     <p className="text-sm text-slate-500">
  //                       ⭐ 4.9 (47 reviews) • 0.3 mi
  //                     </p>

  //                     <div className="flex gap-2 mt-2">
  //                       <span className="text-xs bg-slate-100 px-2 py-1 rounded">
  //                         Groceries
  //                       </span>
  //                       <span className="text-xs bg-slate-100 px-2 py-1 rounded">
  //                         Pet Care
  //                       </span>
  //                       <span className="text-xs bg-slate-100 px-2 py-1 rounded">
  //                         Delivery
  //                       </span>
  //                     </div>

  //                     <p className="text-xs text-green-600 mt-1">
  //                       ● Active now
  //                     </p>
  //                   </div>
  //                 </div>

  //                 <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
  //                   Request Help
  //                 </button>
  //               </div>

  //             </div>

  //             {/* EXISTING TASK FEED */}
  //             <TaskFeed onUserClick={handleViewUser} />

  //           </div>

  //           {/* RIGHT SIDEBAR */}
  //           <div className="space-y-6">

  //             {/* TIME BANK */}
  //             <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
  //               <h3 className="font-semibold text-slate-800 mb-4">
  //                 Time Bank
  //               </h3>

  //               <p className="text-3xl font-bold text-slate-900">
  //                 12 <span className="text-sm font-normal">hours credit</span>
  //               </p>

  //               <p className="text-sm text-slate-500 mt-1">
  //                 Help others to earn more time credits
  //               </p>

  //               <div className="mt-4 text-sm">
  //                 <p className="flex justify-between">
  //                   Earned this month <span className="text-green-600">+8 hrs</span>
  //                 </p>
  //                 <p className="flex justify-between">
  //                   Used this month <span className="text-red-500">-5 hrs</span>
  //                 </p>
  //               </div>

  //               <button className="mt-4 w-full border border-amber-300 rounded-xl py-2 text-sm font-medium">
  //                 View History
  //               </button>
  //             </div>

  //             {/* COMMUNITY EVENT */}
  //             <div className="bg-white border border-slate-200 rounded-2xl p-6">
  //               <h3 className="font-semibold text-slate-900 mb-4">
  //                 Community Event
  //               </h3>

  //               <p className="font-medium text-slate-800">
  //                 Musi River Cleanup Drive
  //               </p>

  //               <p className="text-sm text-slate-500 mt-1">
  //                 Join your neighbors in cleaning the Musi River banks.
  //               </p>

  //               <p className="text-sm mt-3">
  //                 📅 Today, 4:00 PM - 7:00 PM
  //               </p>

  //               <p className="text-sm text-slate-500">
  //                 📍 Musi River Banks
  //               </p>

  //               <button className="mt-4 w-full bg-indigo-900 text-white py-2 rounded-xl">
  //                 Join Event →
  //               </button>
  //             </div>

  //           </div>
  //         </div>
  //       ) : (
  //         <Profile userId={viewingUserId} onBack={handleGoToFeed} />
  //       )}
  //     </main>

  //     <NotificationCenter />
  //     {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
  //   </div>
  // );
  // };

  // const App: React.FC = () => (
  //   <AppProvider>
  //     <AppContent />
  //   </AppProvider>
  // );

  // export default App;



  return (
  <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">

    <Navbar />

    {/* TOP DASHBOARD TABS */}
    <TopTabs />

    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">

      {/* FIND HELP */}
      {activeTab === "find" && (
        <>
          {viewingUserId ? (
            /* PROFILE VIEW */
            <Profile userId={viewingUserId} onBack={handleGoToFeed} />
          ) : (
            /* FIND HELP DASHBOARD */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">

                {/* AI CARD */}
                <div className="p-6">
                  <AIRecommendationCard />
                </div>

                <div className="grid gap-5">
                  {HELPERS.map(helper => (
                    <HelperCard key={helper.id} helper={helper} />
                  ))}
                </div>

                {/* TASK FEED */}
                <TaskFeed onUserClick={handleViewUser} />

              </div>

              {/* RIGHT SIDEBAR */}
              <div className="space-y-6">

                {/* TIME BANK */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 hover:shadow-lg transition hover:border-amber-300">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Time Bank
                  </h3>

                  <p className="text-3xl font-bold text-slate-900">
                    12 <span className="text-sm font-normal">hours credit</span>
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Help others to earn more time credits
                  </p>

                  <button className="mt-4 w-full border border-amber-300 rounded-xl py-2 text-sm font-medium">
                    View History
                  </button>
                </div>

                {/* COMMUNITY EVENT */}
                <div className="bg-gray-100 border border-gray-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:border-gray-500">

                  <div className="flex items-center gap-2 text-gray-700 font-medium mb-4">
                    <Sparkles size={16} />
                    Community Event
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Musi River Cleanup Drive
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    Join your neighbors in cleaning the Musi River banks.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <Calendar size={16} />
                    Today, 4:00 PM - 7:00 PM
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-700 mb-4">
                    <MapPin size={16} className="mt-[2px]" />
                    <div>
                      <div>Musi River Banks</div>
                      <div className="text-gray-500 text-xs">
                        Near Chaderghat Bridge
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex -space-x-2">
                      <img src="https://i.pravatar.cc/32?img=1" className="w-7 h-7 rounded-full border-2 border-white"/>
                      <img src="https://i.pravatar.cc/32?img=2" className="w-7 h-7 rounded-full border-2 border-white"/>
                      <img src="https://i.pravatar.cc/32?img=3" className="w-7 h-7 rounded-full border-2 border-white"/>
                    </div>

                    <span className="text-sm text-gray-600">
                      +32 volunteers
                    </span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-slate-800 transition">
                    Join Event
                    <ArrowRight size={16} />
                  </button>

                </div>
              </div>

            </div>
          )}
        </>
      )}

      {/* MY TASKS */}
      {activeTab === "tasks" && <MyTasks />}

      {/* COMMUNITY */}
      {activeTab === "community" && <Community />}

      {/* IMPACT */}
      {activeTab === "impact" && <MyImpact />}

    </main>

    <NotificationCenter />

    {isModalOpen && (
      <CreateTaskModal onClose={() => setIsModalOpen(false)} />
    )}

  </div>
);}

 const App: React.FC = () => (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );

  export default App;