
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../AppContext';
import { polishTaskDescription } from '../services/geminiService';
import { PLATFORM_FEE_PERCENT } from '../../shared/constants';
import type { PaymentType, CouponDetails } from '../../shared/types';




// export const CATEGORIES = [
//   { name: "All Categories", icon: Grid },
//   { name: "Pet Care", icon: Dog },
//   { name: "Handyman", icon: Wrench },
//   { name: "Packing", icon: Package },
//   { name: "Delivery", icon: Truck },
//   { name: "Heavy Lifting", icon: Dumbbell },
//   { name: "House Chores", icon: Sparkles },
//   { name: "Tech Support", icon: Laptop },
//   { name: "Other", icon: Grid }
// ];

const CATEGORIES = ['Pet Care', 'Handyman ', 'House Chores', 'Packing','Tech Support', 'Delivery', 'Heavy Lifting', 'Other'];
const COUPON_PROVIDERS = ['Amazon', 'Swiggy', 'Zepto', 'Other'] as const;

const CreateTaskModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createTask, currentUser } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isPolishing, setIsPolishing] = useState(false);
  
  const [paymentType, setPaymentType] = useState<PaymentType>('cash');
  const [couponProvider, setCouponProvider] = useState<typeof COUPON_PROVIDERS[number]>('Amazon');
  const [couponCode, setCouponCode] = useState('');
  const [couponExpiry, setCouponExpiry] = useState('');

  const rewardValue = parseFloat(reward) || 0;

  // Real-time balance validation
  const isInsufficientBalance = useMemo(() => {
    if (paymentType !== 'cash') return false;
    return rewardValue > (currentUser?.walletBalance || 0);
  }, [paymentType, rewardValue, currentUser?.walletBalance]);

  const handlePolish = async () => {
    if (!title || !description) return;
    setIsPolishing(true);
    const result = await polishTaskDescription(title, description);
    if (result) {
      setTitle(result.polishedTitle);
      setDescription(result.polishedDescription);
      if (CATEGORIES.includes(result.suggestedCategory)) {
        setCategory(result.suggestedCategory);
      }
    }
    setIsPolishing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInsufficientBalance) return;

    const amount = parseFloat(reward);
    if (title && description && !isNaN(amount)) {
      let couponDetails: CouponDetails | undefined;
      if (paymentType === 'coupon') {
        couponDetails = {
          provider: couponProvider,
          code: couponCode,
          expiry: couponExpiry,
          worth: amount
        };
      }
      createTask(title, description, amount, category, paymentType, couponDetails);
      onClose();
    }
  };

  const netPayout = rewardValue * (1 - PLATFORM_FEE_PERCENT);
  const servicefee = rewardValue * PLATFORM_FEE_PERCENT;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">
        <div className="px-2 py-2  border border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold  text-slate-900">Request Help</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-300 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-3 space-y-3 max-h-[80vh]  max-w-md mx-auto overflow-y-auto scrollbar-hide">
          {/* Payment Type Selection */}
          <div>
            <label className="block text-sm font-bold text-black-700 mb-2 mt-0  tracking-wider">How will you reward?</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-800 rounded-full">
              <button
                type="button"
                onClick={() => setPaymentType('cash')}
                className={`py-2 px-4 rounded-full text-m font-bold transition-all flex items-center justify-center gap-2 ${paymentType === 'cash' ? 'bg-green-100 shadow-sm text-zinc-600' : 'text-slate-400'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13v-3M7 10v3" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M3 19h18M3 5v14M21 5v14" />
                </svg>
                Cash
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('coupon')}
                className={`py-2 px-4 rounded-full text-m font-bold transition-all flex items-center justify-center gap-2 ${paymentType === 'coupon' ? 'bg-red-100 shadow-sm text-zinc-600' : 'text-slate-500'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Digital Coupon
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold   text-black-700 mb-1 uppercase tracking-wider">What do you need help with?</label>
            <input
              type="text"
              autoFocus
              placeholder="e.g., Carry groceries, Fix faucet"
              className="w-full bg-gray-100 px-4 py-3 rounded-xl border border-slate-200 
  text-slate-900 font-medium 
  placeholder:text-gray-500
  focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-slate-800 mb-1 uppercase tracking-wider">
              Details
            </label>

            <textarea
              placeholder="Describe the task and any special requirements..."
              rows={3}
              className="w-full bg-gray-100 px-4 py-3 rounded-xl border border-slate-200
    text-slate-900 font-medium
    placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent
    transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={handlePolish}
              disabled={isPolishing || !title || !description}
              className="absolute bottom-3 right-3 flex items-center gap-2
  bg-white text-black
  hover:bg-gray-200 hover:border-black-700
  border border-zinc-100
  px-3 py-1.5 rounded-lg
  text-xs font-bold
  transition-all shadow-md
  cursor-pointer
  "
            >
              {isPolishing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 text-white" fill="blue" viewBox="0 0 24 24" stroke="black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              AI Polish
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black-700 mb-1 uppercase tracking-wider">Category</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-zinc-950 transition-all bg-white text-slate-900 font-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1 uppercase tracking-wider">
                {paymentType === 'cash' ? 'Reward ($)' : 'Coupon Worth ($)'}
              </label>

              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={`w-full px-4 py-3 rounded-xl bg-gray-200 border focus:outline-none focus:ring-1 transition-all text-gray-900 font-medium
    ${isInsufficientBalance ? 'border-rose-200 focus:ring-rose-300' : 'border-gray-800 focus:ring-zinc-500'}`}
                value={reward}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setReward(value);
                  }
                }}
                required
              />

              {isInsufficientBalance && (
                <p className="text-xs text-rose-500 font-bold mt-1 ml-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Insufficient Balance (${currentUser?.walletBalance.toFixed(2)})
                </p>
              )}
            </div>
          </div>

          {/* Coupon Specific Fields */}
          {paymentType === 'coupon' && (
            <div className="p-4 bg-gray-800 rounded-2xl   space-y-3 border border-zinc-100 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center text-white gap-2 mb-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="text-xs  text-white uppercase tracking-widest">Coupon Verification</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs  text-zinc-200 uppercase">Provider</label>
                  <select
                    className="w-full bg-gray-500 border border-zinc-200 rounded-lg p-2 text-sm font-bold text-zinc-900 focus:outline-none"
                    value={couponProvider}
                    onChange={(e) => setCouponProvider(e.target.value as any)}
                  >
                    {COUPON_PROVIDERS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs  text-zinc-200 uppercase">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-500 border border-zinc-100 rounded-lg p-2 text-sm font-bold text-zinc-900 focus:outline-none"
                    value={couponExpiry}
                    onChange={(e) => setCouponExpiry(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs  text-zinc-200 uppercase">Coupon Code</label>
                <input
                  type="text"
                  placeholder=" enter code  xxxx-xxxx-xxxx-xxxx"
                  className="w-full bg-gray-500 border border-zinc-300 rounded-lg p-2 text-sm font-bold text-zinc-900 focus:outline-none placeholder:text-gray-700 "
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-zinc-100  italic">Note: Code will be shared with the helper only after confirmation.</p>
            </div>
          )}

          {paymentType === 'cash' && (
            <div className="p-2 bg-emerald-100 rounded-lg border-t border-gray-900   border-l border-gray-900 border-r-4 border-gray-900   border-b-4 border-gray-900">
              <div className=" flex justify-between items-center rounded-lg ">
                <span className="text-m text-gray-900 font-bold">Service Fee (5%): </span>
                <span className="text-m  font-bold text-green-900"> ${servicefee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center rounded-lg ">
                <span className="text-m text-black-200 font-medium">Helper earns:  </span>
                <span className="text-m font-bold text-green-900"> ${netPayout.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isInsufficientBalance || (paymentType === 'coupon' && (!couponCode || !couponExpiry)) || !title || !description || !reward}
            className={`w-full cursor-pointer font-bold py-4 rounded-xl transition-all shadow-lg bg-gray-400 text-gray-950 ${isInsufficientBalance ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-zinc-600 hover:bg-gray-400 hover:text-gary-600 hover:shadow-gray-200  hover:border-b-2 hover:border-gray-900 hover:border-r-2 hover:border-gray-900      border-b-4 border-gray-900    border-r-4 border-gray-900'}`}
          >
            {isInsufficientBalance ? 'Insufficient Wallet Balance' : 'Post Help Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
