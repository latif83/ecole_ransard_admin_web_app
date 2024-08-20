"use client";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ParentDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedWard, setSelectedWard] = useState("John Doe");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "assessment", label: "Assessment" },
    { id: "billing", label: "Billing" },
    { id: "events", label: "Events" },
  ];

  return (
    <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 h-svh">
      <div className="bg-white p-6 shadow-xl border rounded-lg h-full">
        {/* Parent Profile and Ward Selection */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FontAwesomeIcon className="w-16 h-16 rounded-full border border-blue-500 p-0.5" icon={faUserCircle} width={30} height={30} />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, John Doe
              </h2>
              <p className="text-gray-600">Parent / Guardian of {selectedWard}</p>
            </div>
          </div>
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="John Doe">John Doe</option>
            <option value="Jane Doe">Jane Doe</option>
            <option value="James Doe">James Doe</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 focus:outline-none ${
                selectedTab === tab.id
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {selectedTab === "overview" && <OverviewTab />}
          {selectedTab === "attendance" && <AttendanceTab />}
          {selectedTab === "assessment" && <AssessmentTab />}
          {selectedTab === "billing" && <BillingTab />}
          {selectedTab === "events" && <EventsTab />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
const OverviewTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Wards Overview */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h4 className="text-blue-600 font-bold">Number of Wards</h4>
          <p className="text-2xl font-semibold text-gray-800">3</p>
        </div>

        {/* Current Academic Year */}
        <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
          <h4 className="text-indigo-600 font-bold">Current Academic Year</h4>
          <p className="text-2xl font-semibold text-gray-800">2024 / 2025</p>
        </div>

        {/* Current Academic Term */}
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h4 className="text-purple-600 font-bold">Current Academic Term</h4>
          <p className="text-2xl font-semibold text-gray-800">Term 2</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-blue-600 font-bold mb-4">Event Calendar</h4>
        {/* Integrate a calendar component here */}
        <div className="text-center">[Event Calendar Placeholder]</div>
      </div>
    </div>
  );
};

// Attendance Tab Component
const AttendanceTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Attendance</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">Attendance Calendar</div>
      </div>
    </div>
  );
};

// Assessment Tab Component
const AssessmentTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Assessment</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">Assessment Overview</div>
      </div>
    </div>
  );
};

// Billing Tab Component
const BillingTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Billing</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">Current Billing Status</div>
      </div>
    </div>
  );
};

// Events Tab Component
const EventsTab = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Events</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">Upcoming Events</div>
      </div>
    </div>
  );
};
