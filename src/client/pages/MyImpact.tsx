import React from "react";
import Profile from "../components/Profile";

const MyImpact: React.FC = () => {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        My Community Impact
      </h2>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Helps</p>
          <p className="text-3xl font-bold mt-2">34</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Hours Earned</p>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Community Rank</p>
          <p className="text-3xl font-bold mt-2">#5</p>
        </div>

      </div>
      <Profile />
    </div>
  );
};

export default MyImpact;