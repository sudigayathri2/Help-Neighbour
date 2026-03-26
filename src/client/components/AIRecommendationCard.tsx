import React from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";

const AIRecommendationCard: React.FC = () => {
  return (
    <div className="w-full max-w-3xl rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 p-5 text-white shadow-md">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
          <LightningBoltIcon className="h-4 w-4 text-yellow-400" />
        </div>

        <div className="flex-1">
          {/* Title + Badge */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">AI Recommendation</h3>
            <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-medium text-black">
              Smart Match
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-slate-300">
            Based on your location and past preferences,{" "}
            <span className="font-semibold text-white">Sarah M.</span> is perfect
            for your grocery needs. She’s 0.3 miles away and responds in 15
            minutes.
          </p>

          {/* Button */}
          <button className="mt-4 flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100">
            Request Sarah
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationCard;