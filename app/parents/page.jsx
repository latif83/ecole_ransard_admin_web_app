"use client";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ParentDashboard() {


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
}

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
