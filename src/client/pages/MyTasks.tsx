import React from "react";
import {
  MessageCircle,
  Phone,
  CheckCircle,
  Circle,
  MapPin,
  Clock,
} from "lucide-react";

const MyTasks: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Active Tasks</h1>
        <p className="text-sm text-gray-500">
          Track your ongoing requests in real-time
        </p>
      </div>

      {/* Task Card */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <div className="flex justify-between">

          <div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              In Progress
            </span>

            <h2 className="text-lg font-semibold mt-2">
              Grocery Shopping
            </h2>

            <p className="text-sm text-gray-500">
              Sarah M. is helping you
            </p>
          </div>

          <div className="flex gap-2">
            <button className="h-8 w-8  px-2 bg-gray-200 rounded">
              <MessageCircle size={16} />
            </button>

            <button className="h-8 w-8 px-2 bg-gray-200 rounded">
              <Phone size={16} />
            </button>
          </div>

        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Task Progress</span>
            <span>Shopping in progress</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="w-3/4 h-2 bg-black rounded"></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 space-y-4">

          <div className="flex gap-3">
            <CheckCircle size={18} className="text-green-500" />
            <div>
              <p className="text-sm font-medium">Task Accepted</p>
              <p className="text-xs text-gray-500">10 minutes ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle size={18} className="text-green-500" />
            <div>
              <p className="text-sm font-medium">Arrived at Store</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Circle size={18} />
            <div>
              <p className="text-sm font-medium">Shopping...</p>
              <p className="text-xs text-gray-500">
                Currently in progress
              </p>
            </div>
          </div>

          <div className="flex gap-3 opacity-40">
            <Circle size={18} />
            <div>
              <p className="text-sm font-medium">On the way</p>
              <p className="text-xs text-gray-500">
                Upcoming
              </p>
            </div>
          </div>

        </div>

        {/* Location */}
        <div className="mt-6 border rounded-lg p-4 bg-gray-50 flex justify-between">

          <div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <p className="text-sm font-medium">
                Live Location
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Sarah is at Whole Foods Market
            </p>

            <button className="mt-2 border px-3 py-1 text-sm rounded">
              View on Map
            </button>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">ETA</p>
            <p className="font-semibold">25 min</p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6 pt-4 border-t">

          <div>
            <p className="text-xs text-gray-500">
              Payment Method
            </p>
            <p className="text-sm font-medium">
              Wallet • $15.00
            </p>
          </div>

          <button className="text-red-500 border border-red-200 px-3 py-1 rounded text-sm">
            Cancel Request
          </button>

        </div>

      </div>

      {/* Pending Task */}

      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          Pending
        </span>

        <h2 className="text-lg font-semibold mt-2">
          Dog Walking
        </h2>

        <p className="text-sm text-gray-500">
          Waiting for helper to accept
        </p>

        <div className="mt-4 border rounded-lg p-4 bg-gray-50 flex gap-3">
          <Clock size={18} />

          <div>
            <p className="text-sm font-medium">
              3 helpers viewing
            </p>
            <p className="text-xs text-gray-500">
              Usually accepted within 10 minutes
            </p>
          </div>

        </div>

        <div className="flex justify-between mt-6">

          <div>
            <p className="text-xs text-gray-500">
              Scheduled for
            </p>
            <p className="text-sm font-medium">
              Today, 5:00 PM
            </p>
          </div>

          <button className="border px-3 py-1 rounded text-sm">
            Edit Request
          </button>

        </div>

      </div>

    </div>
  );
};

export default MyTasks;