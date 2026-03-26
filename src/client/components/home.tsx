// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useEffect } from 'react';
// import { motion } from 'motion/react';
// import './home.css'
// import Login from './Login';
// import Signup from './signup';

// import {
//     Heart,
//     MapPin,
//     ShieldCheck,
//     Clock,
//     Users,
//     HandHelping,
//     MessageCircle,
//     ChevronRight,
//     Layout,
//     Activity,
//     Lock,
//     Globe,
//     CheckCircle2,
//     ArrowRight
// } from 'lucide-react';



// // --- Components ---
// interface GlobalNavProps {
//     onLogin: () => void;
//     onSignup: () => void;
// }

// const GlobalNav: React.FC<GlobalNavProps> = ({ onLogin, onSignup }) => {
//     return (
//         <header className="sticky top-0 z-50 bg-white border-b border-border h-16 flex items-center">
//             <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
//                 <div className="flex items-center gap-8">
//                     <div className="flex items-center gap-2 cursor-pointer">
//                         <div className="w-8 h-8 bg-primary rounded-[3px] flex items-center justify-center text-white">
//                             <Heart size={18} fill="currentColor" />
//                         </div>
//                         <span className="font-bold text-xl tracking-tight text-text-main">
//                             HelpNeighbor
//                         </span>
//                     </div>

//                     <nav className="hidden md:flex items-center gap-6">
//                         <a href="#solutions" className="text-sm font-medium text-text-subtle hover:text-primary transition-colors">
//                             Solutions
//                         </a>
//                         <a href="#features" className="text-sm font-medium text-text-subtle hover:text-primary transition-colors">
//                             Features
//                         </a>
//                         <a href="#trust" className="text-sm font-medium text-text-subtle hover:text-primary transition-colors">
//                             Trust & Safety
//                         </a>
//                     </nav>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <button
//                         className="btn-primary px-6 py-2 btn-subtle text-sm hover:text-white transition duration-300 hover:bg-green-600"
//                         onClick={onLogin}
//                     >
//                         Login
//                     </button>

//                     <button
//                         className="btn-primary px-6 py-2 text-sm border border-black"
//                         onClick={onSignup}
//                     >
//                         Sign Up
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };

// const Hero = () => {
//     return (
//         <section className="pt-20 pb-24 bg-white overflow-hidden">
//             <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
//                         Help neighbors, <br />
//                         <span className="text-primary">earn rewards.</span>
//                     </h1>
//                     <p className="text-xl text-text-subtle mb-10 max-w-xl leading-relaxed">
//                         The marketplace for community support. Post tasks with rewards, or pick up local requests to help your neighbors. Now expanding to collective social welfare and environmental action.
//                     </p>
//                     <div className="flex flex-wrap gap-4">
//                         <button className="btn-primary h-12 px-8 text-lg  border border-black">
//                             Try the demo
//                         </button>
//                         <button className="bg-green-600  h-12 px-8 text-lg border border-border">
//                             Browse tasks
//                         </button>
//                     </div>
//                     <div className="mt-10 flex items-center gap-6 text-sm text-text-subtle">
//                         <div className="flex items-center gap-2">
//                             <CheckCircle2 size={16} className="text-success" />
//                             <span>Transparent rewards</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <CheckCircle2 size={16} className="text-success" />
//                             <span>Verified community</span>
//                         </div>
//                     </div>
//                 </motion.div>

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="relative"
//                 >
//                     {/* Simulated Product UI */}
//                     <div className="bg-bg-subtle rounded-[3px] border border-border shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
//                         <div className="h-10 bg-white border-b border-border flex items-center px-4 gap-2">
//                             <div className="w-3 h-3 rounded-full bg-error/20"></div>
//                             <div className="w-3 h-3 rounded-full bg-warning/20"></div>
//                             <div className="w-3 h-3 rounded-full bg-success/20"></div>
//                             <div className="ml-4 h-5 w-48 bg-bg-subtle rounded-[2px]"></div>
//                         </div>
//                         <div className="flex-1 flex">
//                             <div className="w-16 bg-bg-inverse flex flex-col items-center py-4 gap-4">
//                                 <div className="w-8 h-8 bg-primary rounded-[3px]"></div>
//                                 <div className="w-8 h-8 bg-white/10 rounded-[3px]"></div>
//                                 <div className="w-8 h-8 bg-white/10 rounded-[3px]"></div>
//                             </div>
//                             <div className="flex-1 p-6">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <div className="h-6 w-32 bg-text-main/10 rounded-[2px]"></div>
//                                     <div className="h-8 w-24 bg-primary rounded-[3px]"></div>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {[1, 2, 3, 4].map(i => (
//                                         <div key={i} className="bg-white border border-border p-4 rounded-[3px]">
//                                             <div className="h-3 w-3/4 bg-text-main/10 rounded-[2px] mb-2"></div>
//                                             <div className="h-2 w-1/2 bg-text-main/5 rounded-[2px]"></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mt-6 h-32 bg-white border border-border rounded-[3px] relative overflow-hidden">
//                                     <div className="absolute inset-0 bg-blue-50/50"></div>
//                                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//                                         <MapPin className="text-primary animate-bounce" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// const TrustSection = () => {
//     return (
//         <section id="trust" className="py-12 border-y border-border bg-bg-subtle">
//             <div className="max-w-7xl mx-auto px-6">
//                 <p className="text-center text-xs font-bold uppercase tracking-widest text-text-subtle mb-8">
//                     Trusted by community leaders worldwide
//                 </p>
//                 <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
//                     <div className="flex items-center gap-2 font-bold text-xl"><Globe size={24} /> METRO COUNCIL</div>
//                     <div className="flex items-center gap-2 font-bold text-xl"><Users size={24} /> NEIGHBORHOOD WATCH</div>
//                     <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck size={24} /> SAFE COMMUNITIES</div>
//                     <div className="flex items-center gap-2 font-bold text-xl"><Activity size={24} /> RED CROSS LOCAL</div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const Solutions = () => {
//     const solutions = [
//         {
//             icon: <Users className="text-primary" />,
//             title: "One-to-One Support",
//             desc: "Connect with individuals for specific skills—from tech troubleshooting to academic assistance. Whether they're next door or across town, expertise is just a request away.",
//             image: "https://picsum.photos/seed/mentor/600/400"
//         },
//         {
//             icon: <Globe className="text-success" />,
//             title: "Collective Action",
//             desc: "Join forces for social welfare. Coordinate with volunteering groups for community cleanups, environmental restoration, and large-scale social impact events.",
//             image: "https://picsum.photos/seed/cleanup/600/400"
//         },
//         {
//             icon: <ShieldCheck className="text-warning" />,
//             title: "Proximity Networks",
//             desc: "Hyper-local trust for gated communities and apartment complexes. A secure space where verified neighbors help each other with daily tasks in a high-trust environment.",
//             image: "https://picsum.photos/seed/neighborhood/600/400"
//         }
//     ];

//     return (
//         <section id="solutions" className="py-24 bg-white">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="max-w-3xl mb-16">
//                     <h2 className="text-4xl font-bold mb-4 text-text-main">Tailored support for every community need</h2>
//                     <p className="text-xl text-text-subtle">HelpNeighbor adapts to how you want to help—from individual skill-sharing to collective social movements.</p>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-8">
//                     {solutions.map((s, i) => (
//                         <div key={i} className="flex flex-col bg-white border border-border rounded-[3px] overflow-hidden hover:shadow-xl transition-all group">
//                             <div className="h-48 overflow-hidden">
//                                 <img
//                                     src={s.image}
//                                     alt={s.title}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                     referrerPolicy="no-referrer"
//                                 />
//                             </div>
//                             <div className="p-8 flex-1 flex flex-col">
//                                 <div className="mb-4 p-2 bg-bg-subtle w-fit rounded-[3px]">{s.icon}</div>
//                                 <h3 className="text-xl font-bold mb-3">{s.title}</h3>
//                                 <p className="text-text-subtle leading-relaxed mb-6 text-sm">{s.desc}</p>
//                                 <div className="mt-auto">
//                                     <a href="#" className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
//                                         Explore {s.title.toLowerCase()} <ArrowRight size={14} />
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// const Features = () => {
//     return (
//         <section id="features" className="py-24 bg-bg-subtle">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid lg:grid-cols-2 gap-20 items-center">
//                     <div className="order-2 lg:order-1">
//                         <div className="space-y-12">
//                             <div>
//                                 <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
//                                     <MapPin className="text-primary" /> Geo-spatial Intelligence
//                                 </h3>
//                                 <p className="text-text-subtle leading-relaxed">
//                                     Our platform uses advanced mapping to connect needs with the closest available help, minimizing response times and maximizing local impact.
//                                 </p>
//                             </div>
//                             <div>
//                                 <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
//                                     <Lock className="text-primary" /> Privacy by Design
//                                 </h3>
//                                 <p className="text-text-subtle leading-relaxed">
//                                     Private data is encrypted and only shared with verified parties when necessary. We follow strict GDPR and local privacy standards.
//                                 </p>
//                             </div>
//                             <div>
//                                 <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
//                                     <Clock className="text-primary" /> Micro-Volunteering
//                                 </h3>
//                                 <p className="text-text-subtle leading-relaxed">
//                                     Enable neighbors to help in small increments. Whether it's 5 minutes or 5 hours, every contribution is tracked and valued.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="order-1 lg:order-2">
//                         <div className="bg-white p-8 rounded-[3px] border border-border shadow-sm">
//                             <h4 className="text-xs font-bold uppercase tracking-widest text-text-subtle mb-6">Coordination Workflow</h4>
//                             <div className="space-y-4">
//                                 <div className="flex items-start gap-4 p-4 bg-primary-subtle rounded-[3px] border-l-4 border-primary">
//                                     <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
//                                     <div>
//                                         <p className="font-bold text-sm">Post with Reward</p>
//                                         <p className="text-xs text-text-subtle">Neighbor posts task: "Fix fence" with $20 reward</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4 p-4 bg-white border border-border rounded-[3px]">
//                                     <div className="w-6 h-6 rounded-full bg-border text-text-subtle flex items-center justify-center text-xs font-bold">2</div>
//                                     <div>
//                                         <p className="font-bold text-sm">Helper Picks Task</p>
//                                         <p className="text-xs text-text-subtle">Available neighbor accepts task and coordinates</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4 p-4 bg-white border border-border rounded-[3px]">
//                                     <div className="w-6 h-6 rounded-full bg-border text-text-subtle flex items-center justify-center text-xs font-bold">3</div>
//                                     <div>
//                                         <p className="font-bold text-sm">Collective Action</p>
//                                         <p className="text-xs text-text-subtle">Groups join for "Park Cleanup" social event</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const CTA = () => {
//     return (
//         <section className="py-24 bg-bg-inverse text-white text-center">
//             <div className="max-w-3xl mx-auto px-6">
//                 <h2 className="text-4xl font-bold mb-6 text-white">Start building a more resilient community today.</h2>
//                 <p className="text-xl text-white/70 mb-10">Join over 5,000 communities using HelpNeighbor to coordinate local support.</p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <button className="btn-primary h-12 px-10 text-lg">Get started for free</button>
//                     <button className="px-10 py-3 rounded-[3px] font-medium border border-white/20 hover:bg-white/10 transition-colors">Contact sales</button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const Footer = () => {
//     return (
//         <footer className="py-16 bg-white border-t border-border">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid md:grid-cols-4 gap-12 mb-16">
//                     <div className="col-span-1">
//                         <div className="flex items-center gap-2 mb-6">
//                             <div className="w-6 h-6 bg-primary rounded-[2px] flex items-center justify-center text-white">
//                                 <Heart size={14} fill="currentColor" />
//                             </div>
//                             <span className="font-bold text-lg tracking-tight">HelpNeighbor</span>
//                         </div>
//                         <p className="text-sm text-text-subtle leading-relaxed">
//                             The infrastructure for community resilience and local coordination.
//                         </p>
//                     </div>
//                     <div>
//                         <h5 className="font-bold text-xs uppercase tracking-widest text-text-subtle mb-6">Product</h5>
//                         <ul className="space-y-3 text-sm text-text-main">
//                             <li><a href="#" className="hover:underline">Features</a></li>
//                             <li><a href="#" className="hover:underline">Security</a></li>
//                             <li><a href="#" className="hover:underline">Mobile App</a></li>
//                             <li><a href="#" className="hover:underline">Pricing</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h5 className="font-bold text-xs uppercase tracking-widest text-text-subtle mb-6">Resources</h5>
//                         <ul className="space-y-3 text-sm text-text-main">
//                             <li><a href="#" className="hover:underline">Documentation</a></li>
//                             <li><a href="#" className="hover:underline">Community Forum</a></li>
//                             <li><a href="#" className="hover:underline">Case Studies</a></li>
//                             <li><a href="#" className="hover:underline">Help Center</a></li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h5 className="font-bold text-xs uppercase tracking-widest text-text-subtle mb-6">Company</h5>
//                         <ul className="space-y-3 text-sm text-text-main">
//                             <li><a href="#" className="hover:underline">About Us</a></li>
//                             <li><a href="#" className="hover:underline">Careers</a></li>
//                             <li><a href="#" className="hover:underline">Privacy Policy</a></li>
//                             <li><a href="#" className="hover:underline">Terms of Service</a></li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-subtle">
//                     <p>© 2026 HelpNeighbor. Built for communities.</p>
//                     <div className="flex gap-6">
//                         <a href="#" className="hover:text-text-main transition-colors">Twitter</a>
//                         <a href="#" className="hover:text-text-main transition-colors">LinkedIn</a>
//                         <a href="#" className="hover:text-text-main transition-colors">GitHub</a>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// const CollectiveImpact = () => {
//     return (
//         <section className="py-24 bg-white">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="grid lg:grid-cols-2 gap-16 items-center">
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-3xl font-bold mb-6">Beyond individual tasks: Collective Social Welfare</h2>
//                         <p className="text-lg text-text-subtle mb-8 leading-relaxed">
//                             We're expanding HelpNeighbor to support organized volunteering groups. Soon, you'll be able to coordinate large-scale social welfare events and environmental initiatives collectively.
//                         </p>
//                         <ul className="space-y-4">
//                             <li className="flex items-start gap-3">
//                                 <CheckCircle2 className="text-success mt-1" size={18} />
//                                 <div>
//                                     <p className="font-bold">Group Event Coordination</p>
//                                     <p className="text-sm text-text-subtle">Organize neighborhood cleanups, food drives, and local restoration projects.</p>
//                                 </div>
//                             </li>
//                             <li className="flex items-start gap-3">
//                                 <CheckCircle2 className="text-success mt-1" size={18} />
//                                 <div>
//                                     <p className="font-bold">Social Welfare Partnerships</p>
//                                     <p className="text-sm text-text-subtle">Direct integration with local NGOs to channel volunteer energy where it's needed most.</p>
//                                 </div>
//                             </li>
//                             <li className="flex items-start gap-3">
//                                 <CheckCircle2 className="text-success mt-1" size={18} />
//                                 <div>
//                                     <p className="font-bold">Environmental Stewardship</p>
//                                     <p className="text-sm text-text-subtle">Join collective efforts to improve local nature trails, parks, and green spaces.</p>
//                                 </div>
//                             </li>
//                         </ul>
//                     </motion.div>
//                     <div className="relative">
//                         <div className="aspect-video rounded-[3px] overflow-hidden border border-border shadow-lg">
//                             <img
//                                 src="https://picsum.photos/seed/volunteering/800/450"
//                                 alt="Collective volunteering"
//                                 className="w-full h-full object-cover"
//                                 referrerPolicy="no-referrer"
//                             />
//                         </div>
//                         <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-[3px] shadow-xl max-w-xs">
//                             <p className="text-sm font-bold mb-2">Future Roadmap</p>
//                             <p className="text-xs opacity-80">"Our goal is to turn every street into a self-sustaining ecosystem of mutual aid and collective care."</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// interface LandingPageProps {
//     onLogin: () => void;
//     onSignup: () => void;
// }

// export default function LandingPage({
//     onLogin,
//     onSignup,
// }: LandingPageProps) {
//     return (
//         <div className="min-h-screen selection:bg-primary-subtle selection:text-primary">
//             <GlobalNav onLogin={onLogin} onSignup={onSignup} />

//             <main>
//                 <Hero />
//                 <TrustSection />
//                 <Solutions />
//                 <Features />
//                 <CollectiveImpact />
//                 <CTA />
//             </main>

//             <Footer />
//         </div>
//     );
// }
