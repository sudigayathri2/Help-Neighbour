
// import React, { useEffect, useState } from 'react';
// import { useAppContext } from '../AppContext';
// import type { User } from '../../shared/types';
// import TaskCard from './TaskCard';

// interface ProfileProps {
//   userId?: string | null;
//   onBack?: () => void;
// }

// const Profile: React.FC<ProfileProps> = ({ userId, onBack }) => {
//   const { currentUser, tasks, toggleAvailability, availableHelpers, isMockMode } = useAppContext();
//   const [targetUser, setTargetUser] = useState<User | null>(null);
//   const [isFetching, setIsFetching] = useState(false);

//   const isSelf = !userId || userId === currentUser?.id;

//   useEffect(() => {
//     if (isSelf) {
//       setTargetUser(currentUser);
//       return;
//     }

//     const helper = availableHelpers.find(h => h.id === userId);
//     if (helper) {
//       setTargetUser(helper);
//     } else if (!isMockMode) {
//       // Fetch from API if not found in available list (e.g. they went offline)
//       setIsFetching(true);
//       fetch(`/api/users?id=${userId}`, {
//         headers: { 'x-user-id': currentUser?.id || '' }
//       })
//         .then(res => {
//           if (!res.ok) throw new Error('Failed to fetch user');
//           return res.json();
//         })
//         .then(data => {
//           if (data.user) setTargetUser(data.user);
//         })
//         .catch(console.error)
//         .finally(() => setIsFetching(false));
//     }
//   }, [userId, isSelf, currentUser, availableHelpers, isMockMode]); //c

//   if (isFetching) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 gap-4">
//         <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-slate-500 font-bold">Fetching neighbor profile...</p>
//       </div>
//     );
//   }

//   if (!targetUser) return (
//     <div className="text-center py-20">
//       <p className="text-slate-500 font-bold">Neighbor not found.</p>
//       <button onClick={onBack} className="mt-4 text-indigo-600 font-bold underline">Go Back</button>
//     </div>
//   );

//   const userTasks = tasks.filter(t => t.requesterId === targetUser.id || t.helperId === targetUser.id);
//   //const openRequests = userTasks.filter(t => t.requesterId === targetUser.id && (t.status === 'pending' || t.status === 'accepted'));
//   const activeTasks = userTasks.filter(t =>
//     ['pending', 'accepted', 'in_progress'].includes(t.status)
//   );
//   // History includes finalized (paid), rejected (failed), and disputed tasks
//   const taskHistory = userTasks.filter(t => ['finalized', 'rejected', 'disputed', 'done'].includes(t.status));



//   return (
//     <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
//       {/* Header with Back Button */}
//       {!isSelf && (
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group mb-2"
//         >
//           <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to neighborhood
//         </button>
//       )}

//       <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>

//         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
//           <div className="relative group">
//             <img
//               src={targetUser.avatar}
//               alt={targetUser.name}
//               className="w-28 h-28 rounded-full border-4 border-white shadow-2xl transition-transform"
//             />
//             <div className={`absolute bottom-2 right-2 w-7 h-7 rounded-full border-4 border-white shadow-lg ${targetUser.isAvailable ? 'bg-green-500' : 'bg-slate-300'}`} />
//           </div>

//           <div className="text-center md:text-left flex-1">
//             <div className="flex flex-col md:flex-row md:items-center gap-2">
//               <h2 className="text-3xl font-black text-slate-900 tracking-tight">{targetUser.name}</h2>
//               {!isSelf && targetUser.isAvailable && (
//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">
//                   Ready to help
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
//               <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-sm font-bold">
//                 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
//                 {targetUser.rating}
//               </span>
//               <span className="text-slate-300 text-lg hidden sm:inline">•</span>
//               <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded-lg text-sm font-bold">
//                 {targetUser.totalHelps} Neighbors Helped
//               </span>
//             </div>
//             <p className="mt-3 text-slate-500 text-sm max-w-md italic">"{targetUser.statusMessage || "Building a better neighborhood, one task at a time."}"</p>
//           </div>

//           {isSelf && (
//             <div className="flex flex-col gap-3 w-full md:w-auto">
//               <button
//                 onClick={toggleAvailability}
//                 className={`px-8 py-3 rounded-2xl font-black transition-all border-2 text-sm uppercase tracking-widest ${currentUser?.isAvailable
//                   ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100'
//                   : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
//                   }`}
//               >
//                 {currentUser?.isAvailable ? 'Go Offline' : 'Accept Tasks'}
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
//           {isSelf && (
//             <div className="bg-slate-50 p-5  border border-slate-900 hover:scale-[1.02] transition-transform">
//               <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Wallet</span>
//               <div className="text-2xl font-black text-indigo-600">${(targetUser.walletBalance ?? 0).toFixed(2)}</div>
//             </div>
//           )}
//           {/* <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:scale-[1.02] transition-transform">
//             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Impact</span>
//             <div className="text-2xl font-black text-emerald-600">
//               {targetUser.totalHelps > 20 ? 'S+' : targetUser.totalHelps > 10 ? 'A+' : 'B'}
//             </div>
//           </div> */}
//           <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:scale-[1.02] transition-transform">
//             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Status</span>
//             <div className="text-2xl font-black text-amber-600">
//               {targetUser.totalHelps > 15 ? 'Pro' : 'Active'}
//             </div>
//           </div>
//           <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:scale-[1.02] transition-transform">
//             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">Badges</span>
//             <div className="text-2xl font-black text-slate-900">
//               {targetUser.totalHelps > 30 ? '5' : targetUser.totalHelps > 10 ? '3' : '1'}
//             </div>
//           </div>


//           <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:scale-[1.02] transition-transform">
//             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest block mb-1">My Coupons</span>
//             <div className="text-xs font-black text-slate-900">
//               {currentUser?.coupons && currentUser.coupons.length > 0 ? (
//                 <div className="coupon-list">
//                   {currentUser.coupons.map(coupon => (
//                     <div key={coupon.id} className="coupon-card">
//                       <h3>{coupon.provider}</h3>
//                       <p>Value: ${coupon.value}</p>
//                       <p>Code: {coupon.code}</p>
//                       <p>
//                         Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No coupons collected yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>


//       <div className="grid md:grid-cols-2 gap-8">
//         <section className="space-y-6">
//           <div className="flex items-center justify-between px-2">
//             <h3 className="text-xl font-black text-slate-900 tracking-tight">
//               {isSelf ? 'Your Requests' : `${targetUser.name}'s Requests`}
//             </h3>
//             <span className="text-xs font-bold text-slate-400 uppercase">{activeTasks.length} Active</span>
//           </div>
//           <div className="space-y-4">
//             {activeTasks.length > 0 ? (
//               activeTasks.map(t => <TaskCard key={t.id} task={t} />)
//             ) : (
//               <div className="bg-slate-50/50 rounded-3xl p-8 border border-dashed border-slate-200 text-center">
//                 <p className="text-slate-400 text-sm font-medium">No active help requests.</p>
//               </div>
//             )}
//           </div>
//         </section>

//         <section className="space-y-6">
//           <div className="flex items-center justify-between px-2">
//             <h3 className="text-xl font-black text-slate-900 tracking-tight">Task History</h3>
//             <span className="text-xs font-bold text-slate-400 uppercase">{taskHistory.length} Record(s)</span>
//           </div>
//           <div className="space-y-4">
//             {taskHistory.length > 0 ? (
//               taskHistory.slice(0, 5).map(t => <TaskCard key={t.id} task={t} />)
//             ) : (
//               <div className="bg-slate-50/50 rounded-3xl p-8 border border-dashed border-slate-200 text-center">
//                 <p className="text-slate-400 text-sm font-medium">No task history found.</p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>



//     </div>
//   );
// };

// export default Profile;/



import React, { useEffect, useState } from 'react';
import { useAppContext } from '../AppContext';
import type { User } from '../../shared/types';
import TaskCard from './TaskCard';
//import { Activity, Calendar, MapPin, MessageCircle, Star, Users } from 'lucide-react';
import {
  Star,
  Users,
  MapPin,
  Calendar,
  Activity,
  MessageCircle,
  ShieldCheck,
  Mail,
  Phone
} from "lucide-react";
interface ProfileProps {
  userId?: string | null;
  onBack?: () => void;
}
import { Pencil } from "lucide-react";


const Profile: React.FC<ProfileProps> = ({ userId, onBack }) => {
  const { currentUser, tasks, toggleAvailability, availableHelpers, isMockMode, updateProfile } = useAppContext();
  const [targetUser, setTargetUser] = useState<User | null>(null);

  const [editingAbout, setEditingAbout] = useState(false);
  const [editingSpecialties, setEditingSpecialties] = useState(false);

  const [aboutText, setAboutText] = useState("");
  const [specialties, setSpecialties] = useState<User["specialties"]>([]);
  const [newSpecialty, setNewSpecialty] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  const isSelf = !userId || userId === currentUser?.id;


  const saveProfileChanges = async () => {
    await updateProfile(aboutText, specialties);

    setEditingAbout(false);
    setEditingSpecialties(false);
  };

  const addSpecialty = () => {
    if (!newSpecialty.trim()) return;

    setSpecialties([
      ...(specialties || []),
      {
        name: newSpecialty.trim(),
        tasksCompleted: 0,
      }
    ]);

    setNewSpecialty("");
  };

  const removeSpecialty = (index: number) => {
    const updated = [...(specialties || [])];
    updated.splice(index, 1);
    setSpecialties(updated);
  };



  useEffect(() => {
    if (targetUser) {
      setAboutText(targetUser.description || "");
      setSpecialties(targetUser.specialties || []);
    }
  }, [targetUser]);


  useEffect(() => {
    if (isSelf) {
      setTargetUser(currentUser);
      return;
    }

    const helper = availableHelpers.find(h => h.id === userId);
    if (helper) {
      setTargetUser(helper);
    } else if (!isMockMode) {
      setIsFetching(true);

      fetch(`/api/users?id=${userId}`, {
        headers: { 'x-user-id': currentUser?.id || '' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setTargetUser(data.user);
        })
        .catch(console.error)
        .finally(() => setIsFetching(false));
    }
  }, [userId, isSelf, currentUser, availableHelpers, isMockMode]);

  if (isFetching) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-slate-500 font-bold">Fetching neighbor profile...</p>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 font-bold">Neighbor not found.</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 font-bold underline">
          Go Back
        </button>
      </div>
    );
  }

  const userTasks = tasks.filter(
    t => t.requesterId === targetUser.id || t.helperId === targetUser.id
  );

  const activeTasks = userTasks.filter(t =>
    ['pending', 'accepted', 'in_progress'].includes(t.status)
  );

  const taskHistory = userTasks.filter(t =>
    ['finalized', 'rejected', 'disputed', 'done'].includes(t.status)
  );

  return (
    <div className="space-y-8">

      {!isSelf && (
        <button
          onClick={onBack}
          className="text-sm text-indigo-600 font-semibold"
        >
          ← Back to neighborhood
        </button>
      )}



      {/* PROFILE GRID */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border rounded-2xl p-6 shadow-sm">

            {/* Top Row */}
            <div className="flex items-start justify-between">

              {/* LEFT: Avatar */}
              <div className="flex gap-6">
                <div className="relative">
                  <img
                    src={targetUser.avatar}
                    alt={targetUser.name}
                    className="w-24 h-24 rounded-full"
                  />

                  {/* Online indicator */}
                  {targetUser.isAvailable && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* CENTER: User Info */}
                <div>

                  {/* Name + Badge */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-slate-800">
                      {targetUser.name}
                    </h2>

                    {targetUser.isAvailable && (
                      <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                        Ready to Help
                      </span>
                    )}
                  </div>

                  {/* Status message */}
                  <p className="text-slate-500 italic mt-1">
                    "{targetUser.statusMessage || "New neighbor here!"}"
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-700 mt-4">

                    <span className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500" />
                      <span className="font-semibold">{targetUser.rating || 5.0}</span>
                      <span className="text-slate-500">
                        (47 reviews)
                      </span>
                    </span>

                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      <span className="font-semibold">
                        {targetUser.totalHelps || 61}
                      </span>
                      neighbors helped
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span className="font-semibold">
                        {targetUser.distance || "0.5"}
                      </span>
                      mi away
                    </span>

                  </div>

                  {/* Member + Active */}
                  <div className="flex gap-6 text-sm text-slate-600 mt-3">

                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Member since Jan 2026
                    </span>

                    {targetUser.isAvailable && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <Activity size={16} />
                        Active now
                      </span>
                    )}

                  </div>

                  {/* Buttons */}
                  {!isSelf && (
                    <div className="flex gap-4 mt-5">

                      <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-800">
                        <MessageCircle size={16} />
                        Request Help
                      </button>

                      <button className="flex items-center gap-2 border px-6 py-3 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <MessageCircle size={16} />
                        Send Message
                      </button>

                    </div>
                  )}

                </div>
              </div>

              {/* Right Heart Icon */}
              <button className="text-slate-400 hover:text-red-500">
                ♡
              </button>

            </div>


            {/* Verification Row */}
            <div className="mt-6 border rounded-xl bg-slate-50 p-4 flex flex-wrap gap-8">

              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={18} />
                <div>
                  <p className="text-sm font-medium">ID Verified</p>
                  <p className="text-xs text-green-600">Verified</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Background Check</p>
                  <p className="text-xs text-green-600">Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-green-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Email Verified</p>
                  <p className="text-xs text-green-600">Verified</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="text-green-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Phone Verified</p>
                  <p className="text-xs text-green-600">Verified</p>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          {/* <section className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-slate-600">
              Hi! I'm {targetUser.name}. I enjoy helping neighbors with daily errands,
              grocery shopping, pet care and deliveries.
            </p>

            <p className="text-xs text-slate-500 mt-3">
              Languages: {targetUser.languages?.join(', ') || 'English'}
            </p>
          </section> */}
          {/* ABOUT */}
          <section className="bg-white border rounded-2xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">About</h3>

              {isSelf && (
                <button
                  onClick={() => {
                    setAboutText(targetUser?.description || "");
                    setEditingAbout(!editingAbout);
                  }}
                  className="text-slate-500 hover:text-indigo-600"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>

            {/* Editable textarea */}
            {editingAbout ? (
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Tell people how you help your community..."
              />
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed">
                {targetUser?.description || "No description added yet."}
              </p>
            )}

            {/* Languages */}
            <p className="text-xs text-slate-500 mt-3">
              Languages: {targetUser?.languages?.join(", ") || "English"}
            </p>

            {/* Save Button */}
            {editingAbout && (
              <div className="mt-3">
                <button
                  onClick={saveProfileChanges}
                  className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            )}

          </section>

          {/* SPECIALTIES */}
          {/* SPECIALTIES */}
          <section className="bg-white border rounded-2xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Specialties & Expertise</h3>

              {isSelf && (
                <button
                  onClick={() => setEditingSpecialties(!editingSpecialties)}
                  className="text-slate-500 hover:text-indigo-600"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>

            {/* Specialties Tags */}
            <div className="flex flex-wrap gap-2">

              {specialties && specialties.length > 0 ? (
                specialties.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {s.name}

                    {editingSpecialties && (
                      <button
                        onClick={() => removeSpecialty(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No specialties listed.
                </p>
              )}

            </div>

            {/* Add Specialty */}
            {editingSpecialties && (
              <div className="mt-4 flex gap-2">
                <input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty (e.g. Grocery Delivery)"
                  className="border rounded-lg px-3 py-1 text-sm flex-1"
                />

                <button
                  onClick={addSpecialty}
                  className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            )}

            {/* Save */}
            {editingSpecialties && (
              <button
                onClick={saveProfileChanges}
                className="mt-4 bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Save Changes
              </button>
            )}

          </section>

          {/* REVIEWS */}
          <section className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Reviews</h3>

            {targetUser.reviews?.length ? (
              targetUser.reviews.map((r, i) => (
                <div key={i} className="border-b py-3 text-sm">
                  ⭐ {r.rating} — {r.comment}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No reviews yet.</p>
            )}
          </section>

          {/* ACTIVE TASKS (UNCHANGED) */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">
              Active Tasks ({activeTasks.length})
            </h3>

            {activeTasks.length ? (
              activeTasks.map(t => (
                <TaskCard key={t.id} task={t} />
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No active tasks.
              </p>
            )}
          </section>

          {/* TASK HISTORY (UNCHANGED) */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold">
              Task History ({taskHistory.length})
            </h3>

            {taskHistory.length ? (
              taskHistory.slice(0, 5).map(t => (
                <TaskCard key={t.id} task={t} />
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No history found.
              </p>
            )}
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">

          {/* QUICK STATS */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Quick Stats</h3>

            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Profile Views</span>
                <span>{targetUser.profileViews || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Tasks this month</span>
                <span>{targetUser.stats?.tasksThisMonth || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Earnings</span>
                <span>${targetUser.stats?.totalEarnings || 0}</span>
              </div>

              <div className="flex justify-between">
                <span>Time Credits</span>
                <span>{targetUser.stats?.timeCredits || 0}</span>
              </div>
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Availability</h3>

            <p className="text-sm">
              Weekdays: {targetUser.availability?.weekdays || "6 PM - 10 PM"}
            </p>

            <p className="text-sm">
              Weekends: {targetUser.availability?.weekends || "9 AM - 8 PM"}
            </p>

            <p className="text-xs text-green-600 mt-2">
              Usually responds in {targetUser.responseTime || 15} min
            </p>
          </div>

          {/* BADGES */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Badges & Achievements</h3>

            <div className="flex flex-wrap gap-2 text-xs">

              {(targetUser.badges || []).map((b, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded"
                >
                  {b}
                </span>
              ))}

              {!targetUser.badges?.length && (
                <p className="text-slate-500">No badges yet</p>
              )}

            </div>
          </div>

          {/* COMMUNITY IMPACT */}
          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Community Impact</h3>

            <div className="text-sm space-y-2">

              <div className="flex justify-between">
                <span>Time saved</span>
                <span>{targetUser.impact?.hoursSaved || 0} hrs</span>
              </div>

              <div className="flex justify-between">
                <span>CO₂ prevented</span>
                <span>{targetUser.impact?.co2Prevented || 0} lbs</span>
              </div>

              <div className="flex justify-between">
                <span>Trips reduced</span>
                <span>{targetUser.impact?.tripsReduced || 0}</span>
              </div>

            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default Profile;
