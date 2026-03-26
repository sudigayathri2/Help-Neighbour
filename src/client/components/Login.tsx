// // login.tsx
// import React, { useState } from 'react';
// import { useAppContext } from '../AppContext';

// interface LoginProps {
//   onSwitch: () => void; // required prop to switch to signup
// }

// const Login: React.FC<LoginProps> = ({ onSwitch }) => {
//   const { login } = useAppContext();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <form onSubmit={handleLogin} className="flex flex-col gap-2">
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-3 py-2 border rounded" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-3 py-2 border rounded" />
//         <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">Login</button>
//       </form>
//       <button onClick={onSwitch} className="text-indigo-600 underline text-sm mt-2">
//         Don't have an account? Sign Up
//       </button>
//     </div>
//   );
// };

// export default Login;



//###################  working one
// import React, { useState } from "react";
// import { useAppContext } from "../AppContext";

// export default function Login({ onSwitch }: { onSwitch: () => void }) {
//   const { login } = useAppContext();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 ">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">

//         <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />



//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <label className="flex items-center gap-1 mt-2 text-xs text-slate-800 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={(e) => setShowPassword(e.target.checked)}
//               className="h-3 w-3"
//             />
//             Show Password
//           </label>



//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-slate-600">
//           Don’t have an account?{" "}
//           <button
//             onClick={onSwitch}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Sign up
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../AppContext";

export default function Login({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAppContext();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Added refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // ✅ Auto focus email on load
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await login(email, password);
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-v-screen flex items-center justify-center px-6 ">
      <div className="w-full max-w-md bg-purple-50 rounded-2xl shadow-xl border border-slate-300 p-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center text-purple-950 text-shadow-xl">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            ref={emailRef}   
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                passwordRef.current?.focus(); 
              }
            }}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />

          <input
            ref={passwordRef}   /* ✅ Added */
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />

          <label className="flex items-center gap-1 mt-2 text-xs text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="h-3 w-3"
            />
            Show Password
          </label>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition shadow-xl"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-800 ">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </div>

      </div>
    </div>
  );
}