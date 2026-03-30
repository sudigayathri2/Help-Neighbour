
// // import React, { useState } from 'react';
// // import type { Task } from '../../shared/types';
// // import { useAppContext } from '../AppContext';
// // import { PLATFORM_FEE_PERCENT } from '../../shared/constants';

// // interface TaskCardProps {
// //   task: Task;
// // }

// // const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
// //   const { currentUser, acceptTask, completeTask, finalizeTask, disputeTask , refreshData} = useAppContext();
// //   const [showCode, setShowCode] = useState(false);
// //   const [proofInput, setProofInput] = useState('');
// //   const [isFinishing, setIsFinishing] = useState(false);

// //   const isMine = task.requesterId === currentUser?.id;
// //   const isHelper = task.helperId === currentUser?.id;
// //   const isAvailableToHelp = task.status === 'pending' && currentUser?.isAvailable && !isMine;
// //   const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);

// //   const getStatusColor = () => {
// //     switch (task.status) {
// //       case 'accepted': return 'text-amber-600 bg-amber-50 border-amber-100';
// //       case 'done': return 'text-indigo-600 bg-indigo-50 border-indigo-100';
// //       case 'finalized': return 'text-green-600 bg-green-50 border-green-100';
// //       case 'rejected': return 'text-rose-600 bg-rose-50 border-rose-100';
// //       case 'disputed': return 'text-orange-600 bg-orange-50 border-orange-100';
// //       default: return 'text-slate-500 bg-slate-50 border-slate-100';
// //     }
// //   };

// //   const handleFinish = () => {
// //   if (!proofInput.trim()) {
// //     alert("Please provide a short note as proof of work.");
// //     return;
// //   }

// //   console.log("=== COMPLETE TASK CLICKED ===");
// //   console.log("Task ID:", task.id);
// //   console.log("Marked done by (helper):", currentUser?.id);
// //   console.log("Requester:", task.requesterId);
// //   console.log("Helper:", task.helperId);

// //   completeTask(task.id, proofInput);
// //   setIsFinishing(false);
// // };


// //   return (
// //     <div className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all group ${task.status === 'finalized' ? 'border-green-100 bg-green-50/10' : ''} ${task.status === 'rejected' ? 'border-rose-200 bg-rose-50/20' : ''} ${task.status === 'disputed' ? 'border-orange-200 ring-2 ring-orange-100' : ''}`}>
// //       <div className="flex justify-between items-start mb-4">
// //         <div className="flex items-center gap-3">
// //           <img src={task.requesterAvatar} alt="" className="w-10 h-10 rounded-full bg-slate-100" />
// //           <div>
// //             <h3 className="font-semibold text-slate-900 leading-tight">{task.requesterName}</h3>

// //             <p className="text-xs text-slate-500 flex items-center gap-1">
// //               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //               </svg>
// //               {task.status === 'pending' || task.status === 'accepted' ? 'Active Task' : 'History'}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="flex flex-col items-end gap-1">
// //           <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor()}`}>
// //             {task.status === 'disputed' ? 'In Mediation' : task.status === 'done' ? 'Confirming' : task.status}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mb-4">
// //         <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
// //           {task.category}
// //         </span>
// //         <h4 className="text-lg font-bold text-slate-800 mt-1">{task.title}</h4>
// //         <p className="text-slate-600 text-sm mt-1 leading-relaxed">{task.description}</p>
// //       </div>

// //       {/* Proof of Work Display */}
// //       {task.proofOfWork && (
// //         <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
// //           <span className="text-[10px] font-black uppercase text-slate-400 block mb-1 tracking-widest">Proof of Work Provided:</span>
// //           <p className="text-sm italic text-slate-700 leading-snug">"{task.proofOfWork}"</p>
// //         </div>
// //       )}

// //       {/* Dispute Reason Display */}
// //       {task.disputeReason && (
// //         <div className="mb-4 p-3 bg-rose-50 rounded-xl border border-rose-100">
// //           <span className="text-[10px] font-black uppercase text-rose-400 block mb-1 tracking-widest">Issue Reported:</span>
// //           <p className="text-sm italic text-rose-700 leading-snug">"{task.disputeReason}"</p>
// //         </div>
// //       )}

// //       {/* Mediation Banner */}
// //       {task.status === 'disputed' && (
// //         <div className="mb-4 p-4 bg-orange-600 rounded-xl text-white animate-pulse">
// //           <div className="flex items-center gap-3">
// //             <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //             </svg>
// //             <div>
// //               <p className="font-black uppercase text-[10px] tracking-widest mb-0.5">Community Review In Progress</p>
// //               <p className="text-xs opacity-90 leading-tight">Proof of work is being verified against neighborhood standards.</p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ACTIONS */}
// //       <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
// //         <div className="flex items-center justify-between">
// //           <div className="flex flex-col">
// //             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reward</span>
// //             <span className="text-xl font-extrabold text-slate-900">${task.reward.toFixed(2)}</span>
// //           </div>

// //           <div className="flex gap-2">
// //             {isAvailableToHelp && (
// //               <button onClick={() => acceptTask(task.id)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
// //                 I can help!
// //               </button>
// //             )}

// //             {task.status === 'accepted' && isHelper && !isFinishing && (
// //               <button onClick={() => setIsFinishing(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100">
// //                 Finish Work
// //               </button>
// //             )}

// //             {task.status === 'done' && isMine && (
// //               <button onClick={() => finalizeTask(task.id)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-100">
// //                 Verify & Pay
// //               </button>
// //             )}

// //             {task.status === 'rejected' && isHelper && (
// //               <button onClick={() => disputeTask(task.id, 'Work was completed as described.')} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-100">
// //                 Escalate Dispute
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Proof Input Expandable */}
// //         {isFinishing && (
// //           <div className="bg-slate-50 p-4 rounded-xl space-y-3 animate-in slide-in-from-top-2">
// //             <label className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">What did you do?</label>
// //             <textarea
// //               placeholder="Describe what you did (e.g. Walked Cooper for 35 mins around the park)..."
// //               className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //               rows={2}
// //               value={proofInput}
// //               onChange={(e) => setProofInput(e.target.value)}
// //             />
// //             <div className="flex gap-2">
// //               <button onClick={() => {
// //   console.log("=== FINALIZE CLICKED ===");
// //   console.log("Task ID:", task.id);
// //   console.log("Finalized by (requester):", currentUser?.id);
// //   console.log("Requester:", task.requesterId);
// //   console.log("Helper:", task.helperId);
// //   finalizeTask(task.id);
// // }} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold">Submit Proof</button>
// //               <button onClick={() => setIsFinishing(false)} className="px-4 py-2 text-slate-400 text-sm font-bold">Cancel</button>
// //             </div>
// //           </div>
// //         )}

// //         {task.status === 'done' && isHelper && (
// //           <span className="text-indigo-500 text-xs font-bold italic bg-indigo-50 px-3 py-2 rounded-lg text-center">
// //             Your neighbor is checking the work...
// //           </span>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskCard;

// import React, { useState } from 'react';
// import type { Task } from '../../shared/types';
// import { useAppContext } from '../AppContext';
// //import { PLATFORM_FEE_PERCENT } from '../../shared/constants';

// interface TaskCardProps {
//   task: Task;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
//   const {
//     currentUser,
//     acceptTask,
//     completeTask,
//     finalizeTask,
//     rejectTask,
//     disputeTask
//   } = useAppContext();

//   const [proofInput, setProofInput] = useState('');
//   const [isFinishing, setIsFinishing] = useState(false);

//   const isMine = task.requesterId === currentUser?.id;
//   const isHelper = task.helperId === currentUser?.id;
//   const isAvailableToHelp =
//     task.status === 'pending' && currentUser?.isAvailable && !isMine;

//   // const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);

//   const getStatusColor = () => {
//     switch (task.status) {
//       case 'accepted':
//         return 'text-amber-600 bg-amber-50 border-amber-100';
//       case 'done':
//         return 'text-indigo-600 bg-indigo-50 border-indigo-100';
//       case 'finalized':
//         return 'text-green-600 bg-green-50 border-green-100';
//       case 'rejected':
//         return 'text-rose-600 bg-rose-50 border-rose-100';
//       case 'disputed':
//         return 'text-orange-600 bg-orange-50 border-orange-100';
//       default:
//         return 'text-slate-500 bg-slate-50 border-slate-100';
//     }
//   };

//   const handleFinish = () => {
//     if (!proofInput.trim()) {
//       alert('Please provide a short note as proof of work.');
//       return;
//     }

//     completeTask(task.id, proofInput); // ✅ correct function
//     setProofInput('');
//     setIsFinishing(false);
//   };

//   return (
//     <div
//       className={`bg-white rounded-xl p-5 border border-slate-900 shadow-sm transition-all group
//       ${task.status === 'finalized' ? 'border-green-100 bg-green-50/10' : ''}
//       ${task.status === 'rejected' ? 'border-rose-200 bg-rose-50/20' : ''}
//       ${task.status === 'disputed' ? 'border-orange-200 ring-2 ring-orange-100' : ''}`}
//     >
//       <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
//           {task.category}
//         </span>
//       <p className="text-xs text-slate-500">
//         {task.status === 'pending' || task.status === 'accepted'
//           ? 'Active Task'
//           : ''}
//       </p>
//       {/* HEADER */}

//       <div className="flex justify-between items-start mb-5 bg-black/5 p-3 rounded-lg">

//         <div className="flex flex-col-2 gap-4">

//           {/* Requester */}
//           <div className="flex items-center gap-3">
//             <img
//               src={task.requesterAvatar}
//               alt={task.requesterName}
//               className="w-8 h-8 rounded-full bg-slate-100"
//             />
//             <div>
//               <p className="text-[10px] uppercase tracking-widest text-indigo-800 font-bold">
//                 Requested by
//               </p>
//               <h3 className="font-semibold text-slate-900">
//                 {task.requesterName}
//               </h3>
//             </div>
//           </div>

//           {/* Helper */}
//           {task.helperId && (
//             <div className="flex items-center gap-3 border-indigo-100">
//               <img
//                 src={task.helperAvatar || 'https://via.placeholder.com/40'}
//                 alt={task.helperName || 'Helper'}
//                 className="w-8 h-8 rounded-full bg-slate-100"
//               />
//               <div>
//                 <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
//                   Accepted by
//                 </p>
//                 <p className="font-medium text-slate-800">
//                   {task.helperName || 'Assigned Helper'}
//                 </p>
//               </div>
//             </div>
//           )}


//         </div>

//         <div
//           className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor()}`}
//         >
//           {task.status === 'disputed'
//             ? 'In Mediation'
//             : task.status === 'done'
//               ? 'Confirming'
//               : task.status}
//         </div>
//       </div>

//       {/* DETAILS */}
//       <div className="mb-4">

//         <h4 className="text-lg font-bold text-slate-800 mt-1">
//           {task.title}
//         </h4>
//         <p className="text-slate-600 text-sm mt-1">
//           {task.description}
//         </p>
//       </div>

//       {/* Proof */}
//       {task.proofOfWork && (
//         <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
//           <span className="text-[10px] font-black uppercase text-slate-400 block mb-1 tracking-widest">
//             Proof of Work Provided
//           </span>
//           <p className="text-sm italic text-slate-700">
//             "{task.proofOfWork}"
//           </p>
//         </div>
//       )}

//       {/* Dispute */}
//       {task.disputeReason && (
//         <div className="mb-4 p-3 bg-rose-50 rounded-xl border border-rose-100">
//           <span className="text-[10px] font-black uppercase text-rose-400 block mb-1 tracking-widest">
//             Issue Reported
//           </span>
//           <p className="text-sm italic text-rose-700">
//             "{task.disputeReason}"
//           </p>
//         </div>
//       )}

//       {/* ACTIONS */}
//       <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
//         <div className="flex items-center justify-between">
//           <div>
//             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//               Reward
//             </span>
//             <div className="text-xl font-extrabold text-slate-900">
//               ${task.reward.toFixed(2)}
//             </div>
//           </div>

//           <div className="flex gap-2">
//             {isAvailableToHelp && (
//               <button
//                 onClick={() => acceptTask(task.id)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold"
//               >
//                 I can help
//               </button>
//             )}

//             {task.status === 'accepted' && isHelper && !isFinishing && (
//               <button
//                 onClick={() => setIsFinishing(true)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold"
//               >
//                 Finish Work
//               </button>
//             )}

//             {task.status === 'done' && isMine && (
//               // <button
//               //   onClick={() => finalizeTask(task.id)}
//               //   className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold"
//               // >
//               //   Verify & Pay
//               // </button>
//               <>
//                 <button
//                   onClick={() => finalizeTask(task.id)}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   {task.paymentType === 'cash'
//                     ? 'Verify & Pay'
//                     : 'Reveal Coupon'}
//                 </button>



//                 <button onClick={() => rejectTask(task.id)}>
//                   Reject
//                 </button>
//               </>


//             )}







//             {task.status === 'rejected' && isHelper && (
//               <button
//                 onClick={() =>
//                   disputeTask(task.id, 'Work was completed as described.')
//                 }
//                 className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl text-sm font-bold"
//               >
//                 Escalate Dispute
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Proof Input */}
//         {isFinishing && (
//           <div className="bg-slate-50 p-4 rounded-xl space-y-3">
//             <label className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">
//               What did you do?
//             </label>
//             <textarea
//               className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm"
//               rows={2}
//               value={proofInput}
//               onChange={(e) => setProofInput(e.target.value)}
//             />
//             <div className="flex gap-2">
//               <button
//                 onClick={handleFinish}
//                 className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold"
//               >
//                 Submit Proof
//               </button>
//               <button
//                 onClick={() => setIsFinishing(false)}
//                 className="px-4 py-2 text-slate-400 text-sm font-bold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {task.status === 'done' && isHelper && (
//           <span className="text-indigo-500 text-xs font-bold italic bg-indigo-50 px-3 py-2 rounded-lg text-center">
//             Your neighbor is checking the work...
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskCard;


import React, { useState } from "react";
import type { Task } from "../../shared/types";
import { useAppContext } from "../AppContext";
import { CheckCircle, Circle, Clock, MapPin, Calendar, UserX, MessageCircle, Phone } from "lucide-react";
interface TaskCardProps {
  task: Task;
}
import { ChevronUp, ChevronDown } from "lucide-react";
import { PLATFORM_FEE_PERCENT } from "../../shared/constants";
import { ChatModal } from "./Chat/ChatModel";

const formatDate = (ts?: number) => {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleString();
};

const formatDuration = (start?: number, end?: number) => {
  if (!start || !end) return "—";
  const diff = end - start;
  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hrs}h ${mins}m`;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    currentUser,
    acceptTask,
    completeTask,
    finalizeTask,
    rejectTask,
    disputeTask
  } = useAppContext();

  const [proofInput, setProofInput] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const isMine = task.requesterId === currentUser?.id;
  const isHelper = task.helperId === currentUser?.id;
  const canAccept =
    task.status === "pending" && currentUser?.isAvailable && !isMine;

  // function openNavigation(lat: number, lng: number) {
  //   const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  //   window.open(url, "_blank");
  // }
  const [chatOpen, setChatOpen] = useState(false);
  const getStatusColor = () => {
    switch (task.status) {
      case "accepted":
        return "bg-amber-50 text-amber-600";
      case "done":
        return "bg-blue-50 text-blue-600";
      case "finalized":
        return "bg-green-50 text-green-600";
      case "rejected":
        return "bg-red-50 text-red-600";
      case "disputed":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };
  const netReward = task.reward * (1 - PLATFORM_FEE_PERCENT);

  const handleFinish = () => {
    if (!proofInput.trim()) {
      alert("Please provide proof.");
      return;
    }

    completeTask(task.id, proofInput);
    setProofInput("");
    setIsFinishing(false);
  };

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm">

      {/* CATEGORY + STATUS */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor()}`}
        >
          {task.status === "done" ? "CONFIRMING" : task.status.toUpperCase()}
        </span>

        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
          {task.category || "GENERAL"}
        </span>


      </div>

      {/* REQUESTER + HELPER */}

      <div className="flex justify-between bg-slate-50 border rounded-lg p-4 mb-5">

        <div className="flex items-center gap-3">
          <img
            src={task.requesterAvatar || "https://i.pravatar.cc/40"}
            className="w-10 h-10 rounded-full"
          />

          <div>
            <p className="text-xs text-indigo-500">REQUESTED BY</p>
            <p className="font-medium">
              {task.requesterName || "Unknown User"}
            </p>
          </div>
        </div>

        {task.helperName ? (
          <div className="flex items-center gap-3">
            <img
              src={task.helperAvatar || "https://i.pravatar.cc/40"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-xs text-indigo-500">HELPER</p>
              <p className="font-medium">{task.helperName}</p>
            </div>

            <div className="flex gap-2">
              <button className="h-8 w-8  px-2 bg-gray-200 rounded">
                <button
                  onClick={() => setChatOpen(true)}
                  className="h-8 w-8 px-2 bg-indigo-100 hover:bg-indigo-200 rounded transition-colors"
                  title={`Chat with ${task.helperName}`}
                >
                  <MessageCircle size={16} className="text-indigo-600" />
                </button>
              </button>

              <button className="h-8 w-8 px-2 bg-gray-200 rounded">
                <Phone size={16} />
              </button>
            </div>
          </div>

        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-dashed border-slate-300 flex items-center justify-center">
              <UserX className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-800 uppercase tracking-wide">Helper</p>
              <p className="text-sm font-medium text-slate-800">Awaiting Assignment</p>
            </div>
          </div>
        )}

      </div>

      {/* TITLE */}

      <h3 className="text-lg font-semibold mb-1">
        {task.title}
      </h3>

      <p className="text-sm text-slate-600 mb-5">
        {task.description}
      </p>



      {/* DETAILS */}

      <div className="grid grid-cols-4 gap-6 text-sm mb-4">

        <div className="flex items-start gap-2">
          <MapPin size={16} className="text-slate-500 mt-1" />
          <div className="space-y-2">
            <p className="text-slate-500 text-xs">Location</p>
            <p className="text-sm text-gray-600">{task.location?.address || "remote virtual"}</p>
          </div>
        </div>


        <div className="flex items-start gap-2">
          <Calendar size={14} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-500 text-xs">Requested</p>
            <p>{formatDate(task.pendingAt)}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock size={14} className="text-slate-500 mt-1" />
          <div>
            <p className="text-slate-500 text-xs">Duration</p>
            <p>{formatDuration(task.acceptedAt, task.doneAt)}</p>
          </div>
        </div>

        <div>
          <p className="text-slate-500 text-xs">Reward</p>
          <p className="text-green-600 font-semibold">
            ${netReward.toFixed(2)}
          </p>
          <p className="text-slate-500 text-xs">Payment type</p>
          <p className="text-xs text-slate-400">
            {task.paymentType}
          </p>
        </div>

      </div>

      {/* ACCEPT BUTTON */}

      {canAccept && (
        <button
          onClick={() => acceptTask(task.id)}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
        >
          Accept Task
        </button>
      )}

      {/* SHOW MORE */}

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          {showDetails ? (
            <>
              <ChevronUp size={14} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show More Details
            </>
          )}
        </button>
      </div>

      {/* DETAILS SECTION */}

      {showDetails && (
        <>
          {/* TIMELINE */}

          {/* <div className="border-t pt-5 mt-4">

            <h4 className="font-semibold mb-4">Timeline</h4>

            <div className="space-y-4 text-sm">

              <div>
                <p>Task Requested</p>
                <p className="text-xs text-slate-500">
                  {formatDate(task.pendingAt)}
                </p>
              </div>

              {task.acceptedAt && (
                <div>
                  <p>Task Accepted</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(task.acceptedAt)}
                  </p>
                </div>
              )}

              {task.doneAt && (
                <div>
                  <p>Task Completed</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(task.doneAt)}
                  </p>
                </div>
              )}

              {task.finalizedAt && (
                <div>
                  <p className="text-green-600 font-medium">
                    Verified & Paid
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(task.finalizedAt)}
                  </p>
                </div>
              )}

              {task.rejectedAt && (
                <div>
                  <p className="text-red-600 font-medium">
                    Task Rejected
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(task.rejectedAt)}
                  </p>
                </div>
              )}

              {task.disputedAt && (
                <div>
                  <p className="text-orange-600 font-medium">
                    Dispute Raised
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(task.disputedAt)}
                  </p>
                </div>
              )}

            </div>

          </div> */}


          {/* TIMELINE STEPPER */}
          <div className="border-t pt-5 mt-4">

            <h4 className="font-semibold mb-4">Progress</h4>

            <div className="space-y-6">

              {/* Task reqested */}
              <div className="flex items-start gap-3">

                {task.pendingAt ? (
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                ) : (
                  <Circle size={20} className="text-gray-300 mt-1" />
                )}

                <div>
                  <p className="font-medium">Task Requested</p>
                  <p className="text-xs text-gray-500">
                    {task.pendingAt ? formatDate(task.pendingAt) : "Pending"}
                  </p>
                </div>

              </div>

              {/* Task Accepted */}
              <div className="flex items-start gap-3">

                {task.acceptedAt ? (
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                ) : (
                  <Circle size={20} className="text-gray-300 mt-1" />
                )}

                <div>
                  <p className="font-medium">Task Accepted</p>
                  <p className="text-xs text-gray-500">
                    {task.acceptedAt ? formatDate(task.acceptedAt) : "Pending"}
                  </p>
                </div>

              </div>


              {/* Work in Progress */}
              <div className="flex items-start gap-3">

                {task.doneAt ? (
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                ) : task.acceptedAt ? (
                  <Clock size={20} className="text-blue-500 mt-1" />
                ) : (
                  <Circle size={20} className="text-gray-300 mt-1" />
                )}

                <div>
                  <p className="font-medium">Work in Progress</p>
                  <p className="text-xs text-gray-500">
                    {task.doneAt
                      ? formatDate(task.doneAt)
                      : task.acceptedAt
                        ? "Currently in progress"
                        : "Upcoming"}
                  </p>
                </div>

              </div>


              {/* Completed */}
              <div className="flex items-start gap-3">

                {task.finalizedAt ? (
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                ) : (
                  <Circle size={20} className="text-gray-300 mt-1" />
                )}

                <div>
                  <p className="font-medium">Completed</p>
                  <p className="text-xs text-gray-500">
                    {task.finalizedAt
                      ? formatDate(task.finalizedAt)
                      : "Waiting for confirmation"}
                  </p>
                </div>

              </div>

              <div>
                {task.proofOfWork && (
                  <div className="mb-4 p-3 bg-slate-200 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-slate-900 block mb-1 tracking-widest">Proof of Work Provided:</span>
                    <p className="text-sm italic text-slate-950 leading-snug">"{task.proofOfWork}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* <div className="mt-6 border rounded-lg p-4 bg-gray-50 flex justify-between"> */}
          {
            task.status === "accepted" && isMine && (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <p className="text-sm font-medium">
                      Live Location
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {task.helperName} is at Whole Foods Market
                  </p>

                  <button className="mt-2 border px-3 py-1 text-sm rounded">
                    View on Map
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">ETA</p>
                  <p className="font-semibold">25 min</p>
                </div>
              </>
            )
          }
          {/* </div> */}



          {/* ACTIONS */}

          <div className="flex justify-end gap-2 mt-6">

            {task.status === "done" && isMine && (
              <>
                <button
                  onClick={() => rejectTask(task.id)}
                  className="border px-4 py-2 rounded-lg text-sm"
                >
                  Reject
                </button>

                <button
                  onClick={() => finalizeTask(task.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >

                  {task.paymentType === 'cash'
                    ? 'Verify & Pay'
                    : 'Reveal Coupon'}
                </button>
              </>
            )}

            {task.status === "rejected" && isHelper && (
              <button
                onClick={() =>
                  disputeTask(task.id, "Work completed correctly.")
                }
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Escalate Dispute
              </button>
            )}

          </div>

          {/* HELPER SUBMIT PROOF */}

          {
            task.status === "accepted" && isHelper && !isFinishing && (
              <button
                onClick={() => setIsFinishing(true)}
                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Finish Work
              </button>
            )
          }

          {
            isFinishing && (
              <div className="mt-4 bg-slate-50 p-4 rounded-lg">

                <textarea
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  rows={3}
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Describe the work completed..."
                />

                <div className="flex gap-2 mt-2">

                  <button
                    onClick={handleFinish}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                  >
                    Submit Proof
                  </button>

                  <button
                    onClick={() => setIsFinishing(false)}
                    className="text-slate-500"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )
          }

        </>
      )}
      {chatOpen && task.helperId && (
        <ChatModal
          taskId={task.id}
          taskTitle={task.title}
          receiverId={isMine ? task.helperId : task.requesterId}
          receiverName={isMine ? (task.helperName ?? "Helper") : (task.requesterName ?? "Requester")}
          receiverAvatar={isMine ? task.helperAvatar : task.requesterAvatar}
          currentUserId={currentUser!.id}
          currentUserName={currentUser!.name}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div >
  );
};

export default TaskCard;