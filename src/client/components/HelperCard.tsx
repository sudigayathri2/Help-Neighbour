
import React from "react";
import {
  Star,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Zap
} from "lucide-react";

import type { HELPERS } from "../../shared/constants";

export default function HelperCard({ helper }: { helper: typeof HELPERS[number] }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">

      {/* Match Banner */}
      {helper.match && (
        <div className="flex items-center gap-2 text-sm text-orange-500 font-semibold">
          <Zap className="w-4 h-4" />
          {helper.match}% match for your typical requests
        </div>
      )}

      {/* Top Section */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <img
            src={helper.avatar}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-slate-800">
              {helper.name}
            </h3>

            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">

              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-black" />
                {helper.rating}
              </span>

              <span>({helper.reviews} reviews)</span>

              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {helper.distance}
              </span>

            </div>
          </div>
        </div>

        <Heart className="w-5 h-5 text-slate-400 cursor-pointer" />

      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {helper.tags.map(tag => (
          <span
            key={tag}
            className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-500">

        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Responds in {helper.responseTime}
        </span>

        <span>{helper.responseRate} response rate</span>

        <span>{helper.price}</span>

      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">

        {helper.active ? (
          <span className="flex items-center gap-2 text-green-600 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Active now
          </span>
        ) : (
          <span className="text-xs text-slate-400">
            Last active {helper.lastActive}
          </span>
        )}

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <MessageCircle className="w-4 h-4" />
          </button>

          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Request Help
          </button>

        </div>
      </div>

    </div>
  );
}
