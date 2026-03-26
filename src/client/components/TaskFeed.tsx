
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import TaskCard from './TaskCard';
import { Search, Zap, Map, Filter, ShoppingCart, Dog, Wrench, Truck, Package, Grid, Laptop, Sparkles, Dumbbell } from "lucide-react";
import CreateTaskModal from './CreateTaskModal';

export const CATEGORIES = [
  { name: "All Categories", icon: Grid },
  { name: "Pet Care", icon: Dog },
  { name: "Handyman", icon: Wrench },
  { name: "Packing", icon: Package },
  { name: "Delivery", icon: Truck },
  { name: "Heavy Lifting", icon: Dumbbell },
  { name: "House Chores", icon: Sparkles },
  { name: "Tech Support", icon: Laptop },
  { name: "Other", icon: Grid }
];


const PRIMARY_CATEGORIES = [
  { name: "All Categories", icon: Grid },
  { name: "Pet Care", icon: Dog },
  { name: "Handyman", icon: Wrench },
  { name: "Packing", icon: Package },
  { name: "Delivery", icon: Truck }
];

const EXTRA_CATEGORIES = [
  { name: "Heavy Lifting", icon: Dumbbell },
  { name: "House Chores", icon: Sparkles },
  { name: "Tech Support", icon: Laptop }
];




// const [showAll, setShowAll] = useState(false);
// const [selectedCategory, setSelectedCategory] = useState("All Categories");




interface TaskFeedProps {
  onUserClick?: (userId: string) => void;
}


const TaskFeed: React.FC<TaskFeedProps> = ({ onUserClick }) => {
  const { tasks, availableHelpers, refreshData, loadingHelpers } = useAppContext();
  //const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");



  useEffect(() => {  ///change 1
    refreshData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 2000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // const filteredTasks = tasks.filter(task =>
  //   selectedCategory === 'All' ? true : task.category === selectedCategory
  // );
  const filteredTasks = tasks.filter(task => {
    const isPending = task.status === 'pending';

    const categoryMatch =
      selectedCategory === 'All Categories'
        ? true
        : task.category === selectedCategory;
    console.log("ALL TASKS:", tasks);
    return isPending && categoryMatch;
  });

  
  return (

    <div className="space-y-8">
      {/* Available Helpers Section */}
      {/* <section>
        <div className="flex items-center justify-between mb-4">
          
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">
              Nearby Helpers Available Now
            </h2>

            <button
              onClick={refreshData}
              disabled={loadingHelpers}   //chnage 2
              className="p-1.5 rounded-full hover:bg-slate-100 active:scale-95 transition"
              title="Refresh"
            >
              {loadingHelpers ? '⏳' : '🔄'}
            </button>
          </div>

          
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {availableHelpers.length} Online
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          {availableHelpers
            .filter(helper => helper.isAvailable)
            .map(helper => (
              <div
                key={helper.id}
                onClick={() => onUserClick?.(helper.id)}
                className="flex-shrink-0 w-[20%] bg-white border border-slate-200 rounded-2xl p-4 
        shadow-sm hover:shadow-md hover:-translate-y-0.5 
        transition-all cursor-pointer"
              >
                
                <div className="relative w-fit mx-auto mb-1">
                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

              
                <h4 className="text-sm font-semibold text-center text-slate-900 truncate">
                  {helper.name}
                </h4>

                
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-600 font-medium">

                  <div className="flex items-center gap-1 text-amber-500">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    {helper.rating}
                  </div>

                  <span className="text-slate-400">•</span>

                  <span>{helper.totalHelps} helps</span>
                </div>
              </div>
            ))}
        </div>
      </section> */}
      <section>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Nearby Helpers
            </h2>

            <button
              onClick={refreshData}
              disabled={loadingHelpers}
              className="p-1.5 rounded-full hover:bg-slate-100 active:scale-95 transition"
            >
              {loadingHelpers ? "⏳" : "🔄"}
            </button>
          </div>

          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {availableHelpers.length} Online
          </span>

        </div>


        {/* Helpers Row */}
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">

          {availableHelpers
            .filter(helper => helper.isAvailable)
            .map(helper => (

              <div
                key={helper.id}
                onClick={() => onUserClick?.(helper.id)}
                className="
            flex-shrink-0
            w-[150px] sm:w-[180px]
            bg-white border border-slate-200 rounded-2xl p-4
            shadow-sm hover:shadow-md hover:-translate-y-1
            transition-all cursor-pointer
          "
              >

                {/* Avatar */}
                <div className="relative flex justify-center mb-3">

                  <img
                    src={helper.avatar}
                    alt={helper.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Online dot */}
                  <span className="absolute bottom-0 right-[38%] w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>

                </div>


                {/* Name */}
                <h4 className="text-sm font-semibold text-center text-slate-900 truncate">
                  {helper.name}
                </h4>


                {/* Stats */}
                <div className="flex justify-center gap-3 mt-3 text-xs text-slate-600">

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    ⭐ {helper.rating}
                  </div>

                  {/* Helps */}
                  <div className="text-slate-500">
                    {helper.totalHelps}
                  </div>

                </div>


                {/* Distance (optional) */}
                {helper.distance && (
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    {helper.distance} away
                  </p>
                )}

              </div>

            ))}

        </div>

      </section>

      {/* Task Categories & Feed */}
      {/* <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Open Requests</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide max-w-[200px] sm:max-w-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        <div className="grid gap-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-800">
              <div className="bg-slate-50  rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg">No worries, we are here to help </h3>
              <p className="text-slate-800 text-m py-2">Be the first to ask for help in {selectedCategory} !</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-indigo-100 items-center gap-2"
              >
                Ask for Help
              </button>

            </div>
          )}
          {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </section> */}



      <section className="space-y-6">

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, skill, or location..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 text-sm"
          />
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3">

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm">
              <Zap className="w-4 h-4 text-slate-500" />
              2 Online
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm">
              <Map className="w-4 h-4 text-slate-500" />
              Map View
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm">
            <Filter className="w-4 h-4 text-slate-500" />
            More Filters
          </button>
        </div>

        {/* Categories ----------------------------------*/}
        <div className="flex flex-wrap gap-2">

          {/* Primary categories */}
          {PRIMARY_CATEGORIES.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${selectedCategory === name
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-gray-200"
                }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}

          {/* Extra categories */}
          {showAll &&
            EXTRA_CATEGORIES.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${selectedCategory === name
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-gray-200 text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}

          {/* More / Less toggle */}
          <span
            onClick={() => setShowAll(prev => !prev)}
            className="flex items-center px-2 text-xs font-semibold text-black-300 cursor-pointer hover:text-slate-900 hover:underline"
          >
            {showAll ? "show Less" : "More"}
          </span>

        </div>

        {/* Task List */}
        <div className="grid gap-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-800">
              <div className="bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg">No worries, we are here to help </h3>
              <p className="text-slate-800 text-m py-2">Be the first to ask for help in {selectedCategory} !</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-indigo-100 items-center gap-2"
              >
                Ask for Help
              </button>
            </div>
          )}

          {isModalOpen && <CreateTaskModal onClose={() => setIsModalOpen(false)} />}
        </div>
      </section>

    </div>
  );
};

export default TaskFeed;
