// // signup.tsx
// import React, { useState } from 'react';
// import { useAppContext } from '../AppContext';

// interface SignupProps {
//   onSwitch: () => void; // required prop to switch to login
// }

// const Signup: React.FC<SignupProps> = ({ onSwitch }) => {
//   const { signup } = useAppContext();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await signup(name, email, password);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <form onSubmit={handleSignup} className="flex flex-col gap-2">
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="px-3 py-2 border rounded" />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-3 py-2 border rounded" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-3 py-2 border rounded" />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
//       </form>
//       <button onClick={onSwitch} className="text-green-600 underline text-sm mt-2">
//         Already have an account? Login
//       </button>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useAppContext } from "../AppContext";

interface SignupProps {
  onSwitch: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitch }) => {
  const { signup } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-green-50 rounded-2xl shadow-xl border border-slate-100 p-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center text-green-900 border border-slate-100">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-900"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-900"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-m text-slate-600">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-green-900 font-semibold hover:underline"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Signup;