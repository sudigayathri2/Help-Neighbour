
import React from "react";
import { Target } from "lucide-react";

const Community: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          Neighborhood Circles
        </h1>
        <p className="text-sm text-gray-500">
          Connect with specialized community groups
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Pet Owners */}
          <div className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition">

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-blue-400 rounded-lg text-white">
                🐶
              </div>

              <div>
                <h3 className="font-medium">
                  Pet Owners Circle
                </h3>

                <p className="text-sm text-gray-600">
                  Share tips, arrange playdates, and help each other with pet care
                </p>

                <div className="text-sm text-gray-500 mt-2">
                  32 members · 5 active today
                </div>
              </div>
            </div>

            <button className="border px-4 py-1 rounded-md text-sm hover:bg-gray-100">
              Join
            </button>
          </div>

          {/* New Parents */}
          <div className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition">

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-green-100 rounded-lg">
                👶
              </div>

              <div>
                <h3 className="font-medium">
                  New Parents Support
                </h3>

                <p className="text-sm text-gray-600">
                  Support network for new and expecting parents
                </p>

                <div className="text-sm text-gray-500 mt-2">
                  23 members
                </div>
              </div>
            </div>

            <button className="border px-4 py-1 rounded-md text-sm hover:bg-gray-100">
              Join
            </button>
          </div>

          {/* Senior Care */}
          <div className="bg-white border rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition">

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-purple-100 rounded-lg">
                ❤️
              </div>

              <div>
                <h3 className="font-medium">
                  Senior Care Network
                </h3>

                <p className="text-sm text-gray-600">
                  Dedicated support for elderly neighbors and caregivers
                </p>

                <div className="text-sm text-purple-600 mt-2">
                  Priority Support · 18 members
                </div>
              </div>
            </div>

            <button className="border px-4 py-1 rounded-md text-sm hover:bg-gray-100">
              Join
            </button>
          </div>

          {/* Wellness Challenge */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-green-600 text-white rounded-lg">
                  <Target size={18} />
                </div>

                <div>
                  <h3 className="font-medium">
                    March Wellness Challenge
                  </h3>
                  <p className="text-sm text-gray-600">
                    Help 50 neighbors this month as a community
                  </p>
                </div>
              </div>

              <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full w-fit">
                8 days left
              </span>

            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Community Progress</span>
                <span>34 / 50 helps</span>
              </div>

              <div className="w-full h-2 bg-green-200 rounded">
                <div className="w-2/3 h-2 bg-black rounded"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
              <span className="text-sm text-gray-600">
                127 neighbors participating
              </span>

              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                Join Challenge
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Neighborhood Health */}
          <div className="bg-white border rounded-xl p-5">

            <h3 className="font-medium mb-4">
              Neighborhood Health
            </h3>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between text-sm">
                  <span>Activity Level</span>
                  <span className="text-green-600">Excellent</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                  <div className="w-4/5 h-2 bg-black rounded"></div>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  234 helps this month
                </p>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Response Time</span>
                  <span>18 min avg</span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                  <div className="w-3/4 h-2 bg-black rounded"></div>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Better than 85% of areas
                </p>
              </div>

            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white border rounded-xl p-5">

            <h3 className="font-medium mb-4">
              Top Contributors
            </h3>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span>1. Sarah M.</span>
                <span className="text-gray-500">23 helps</span>
              </div>

              <div className="flex justify-between">
                <span>2. James K.</span>
                <span className="text-gray-500">19 helps</span>
              </div>

              <div className="flex justify-between">
                <span>3. Maria L.</span>
                <span className="text-gray-500">16 helps</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Community;

