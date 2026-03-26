
// import React from 'react';
// import { useAppContext } from '../AppContext';

// interface NavbarProps {
//   onTabChange: (tab: 'feed' | 'profile') => void;
//   activeTab: 'feed' | 'profile' | null;
// }

// const Navbar: React.FC<NavbarProps> = ({ onTabChange, activeTab }) => {
//   const { currentUser, toggleAvailability } = useAppContext();

//   if (!currentUser) return null;

//   return (
//     <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
//       <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('feed')}>
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//             </svg>
//           </div>
//           <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:inline">HelpNeighbor</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
//             <span className="text-sm font-medium text-slate-600 hidden sm:inline">
//               {currentUser.isAvailable ? 'Ready to help' : 'Not available'}
//             </span>
//             <button 
//               onClick={toggleAvailability}
//               className={`w-10 h-5 rounded-full transition-colors relative ${currentUser.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`}
//             >
//               <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${currentUser.isAvailable ? 'left-6' : 'left-1'}`} />
//             </button>
//           </div>

//           <div 
//             onClick={() => onTabChange('profile')}
//             className={`flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full transition-all border ${activeTab === 'profile' ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-slate-50 border-transparent'}`}
//           >
//             <img 
//               src={currentUser.avatar} 
//               alt={currentUser.name} 
//               className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
//             />
//             <div className="flex flex-col items-start leading-none">
//               <span className="text-xs text-slate-900 uppercase font-bold tracking-wider">{currentUser.name} </span>
//               <span className="text-sm font-bold text-slate-800">${currentUser.walletBalance.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useAppContext } from "../AppContext";
import { Wallet } from "lucide-react";

const Navbar: React.FC = () => {
  const { currentUser, toggleAvailability } = useAppContext();
  if (!currentUser) return null;
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:inline">
            HelpNeighbor
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* AVAILABILITY */}
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="text-sm font-medium text-slate-600 hidden sm:inline">
              {currentUser.isAvailable ? "Ready to help" : "Not available"}
            </span>

            <button
              onClick={toggleAvailability}
              className={`w-10 h-5 rounded-full transition-colors relative ${currentUser.isAvailable ? "bg-green-500" : "bg-slate-300"
                }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${currentUser.isAvailable ? "left-6" : "left-1"
                  }`}
              />
            </button>
          </div>

          {/* USER PROFILE */}
          <div className="flex items-center gap-2 cursor-pointer p-1 pr-1 rounded-full hover:bg-slate-50 border border-transparent">
            {/* <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            /> */}

            <div className="flex flex-col items-start leading-none">
              <span className="text-xs text-slate-900 uppercase font-bold tracking-wider">
                {currentUser.name}
              </span>
              {/* <span className="text-sm font-bold text-slate-800">
                <span>${(currentUser?.walletBalance ?? 0).toFixed(2)}</span>
              </span> */}
              <div className="flex items-center text-emerald-900 gap-1">
              <Wallet size={18} />
              <span>${(currentUser?.walletBalance ?? 0).toFixed(2)}</span>
            </div>
            </div>
            
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
