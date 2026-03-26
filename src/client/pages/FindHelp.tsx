import React from "react";

const FindHelp: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="col-span-2 space-y-6">

        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-700 text-white p-6 rounded-xl">
          <h3 className="font-semibold text-lg">AI Recommendation</h3>
          <p className="text-sm opacity-80 mt-2">
            Sarah M. is perfect for your grocery needs.
          </p>

          <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg">
            Request Sarah
          </button>
        </div>

        {/* Search */}
        <input
          placeholder="Search by name, skill, or location"
          className="w-full border rounded-lg px-4 py-3"
        />

        {/* Helper Card */}
        <div className="bg-white p-5 rounded-xl border flex justify-between">
          <div>
            <h4 className="font-semibold">Sarah M.</h4>
            <p className="text-sm text-gray-500">⭐ 4.9 • 0.3 mi</p>
          </div>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            Request Help
          </button>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="space-y-6">

        {/* Time Bank */}
        <div className="bg-yellow-50 border rounded-xl p-5">
          <h4 className="font-semibold">Time Bank</h4>
          <p className="text-3xl font-bold mt-2">12 hrs</p>
        </div>

        {/* Community Event */}
        <div className="bg-white border rounded-xl p-5">
          <h4 className="font-semibold">Community Event</h4>
          <p className="text-sm text-gray-500 mt-2">
            Musi River Cleanup Drive
          </p>
        </div>

      </div>
    </div>
  );
};

export default FindHelp;