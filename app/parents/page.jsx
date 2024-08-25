"use client";
import { EventCard } from "@/components/EventCard";
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export default function ParentDashboard() {

  const [summaryLoading, setSummaryLoading] = useState(false)
  const [summary, setSummary] = useState({})

  const events = [
    {
      id: 1,
      date: "2024-06-08T00:00:00.000Z",
      title: "P.T.A Meeting",
      description: "A meeting for all parents and teachers to discuss the school's progress and future plans."
    },
    {
      id: 2,
      date: "2024-07-12T00:00:00.000Z",
      title: "Science Fair",
      description: "An exhibition of science projects by students across all grades, open for parents and students."
    },
    {
      id: 3,
      date: "2024-08-15T00:00:00.000Z",
      title: "Sports Day",
      description: "A fun-filled day with athletic events, games, and competitions between students and classes."
    },
    {
      id: 4,
      date: "2024-09-25T00:00:00.000Z",
      title: "School Cultural Day",
      description: "A celebration of various cultures, featuring performances and presentations from students."
    },
    {
      id: 5,
      date: "2024-10-05T00:00:00.000Z",
      title: "Mid-Term Parent Teacher Conference",
      description: "A one-on-one meeting between parents and teachers to discuss students' mid-term progress."
    }
  ];

  useEffect(() => {
    const getSummaryData = async () => {
      setSummaryLoading(true)
      try {
        const response = await fetch(`/api/parents/${localStorage.getItem("identity")}/summary`)

        const responseData = await response.json()

        if (!response.ok) {
          toast.error(responseData.message)
          return
        }

        setSummary(responseData)
      }
      catch (e) {
        console.log(e)
      } finally {
        setSummaryLoading(false)
      }
    }

    getSummaryData()
  }, [])

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Wards Overview */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h4 className="text-blue-600 font-bold">Number of Wards</h4>
          <p className="text-2xl font-semibold text-gray-800">{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summary.totalWards}</p>
        </div>

        {/* Current Academic Year */}
        <div className="bg-indigo-100 p-4 rounded-lg shadow-md">
          <h4 className="text-indigo-600 font-bold">Current Academic Year</h4>
          <p className="text-2xl font-semibold text-gray-800">{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summary.currentAcademicYear}</p>
        </div>

        {/* Current Academic Term */}
        <div className="bg-purple-100 p-4 rounded-lg shadow-md">
          <h4 className="text-purple-600 font-bold">Current Academic Term</h4>
          <p className="text-2xl font-semibold text-gray-800">{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summary.currentAcademicTerm}</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-blue-600 font-bold mb-4">Upcoming Events</h4>
        {/* Integrate a calendar component here */}
        <div className="">
          <div className="grid grid-cols-4 gap-x-4 gap-y-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
