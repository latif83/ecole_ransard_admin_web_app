"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function AttendanceTab() {
  const [date, setDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const studentId = "clzqrws5s000110uuk06fnznp"; // Replace with the actual student ID
        const response = await fetch(`/api/attendance/${studentId}`); // Adjust the API endpoint accordingly
        if (!response.ok) {
          // Error
          return
        }
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

  const getTileContent = ({ date }) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    const attendance = attendanceData.find(record => record.clockIn.split("T")[0] === formattedDate);

    if (attendance) {
      if (attendance.status === "present") {
        return <div className="bg-gray-200 inline-flex ml-1 rounded-full w-8 h-8 text-lg -mt-2 items-center justify-center"><FontAwesomeIcon icon={faCheck} color="green" /></div>;
      } else if (attendance.status === "absent") {
        return <div className="bg-gray-200 inline-flex ml-1 rounded-full w-8 h-8 text-lg -mt-2 items-center justify-center"><FontAwesomeIcon icon={faTimes} color="red" /></div>;
      }
    }
    return <div className="inline-flex ml-1 rounded-lg w-8 h-8 text-lg -mt-2 items-center justify-center"><FontAwesomeIcon icon={faExclamation} color="gray" /></div>;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Attendance</h3>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">
          <Calendar
            tileContent={getTileContent}
            value={date}
            onChange={setDate}
          />
        </div>
      </div>
    </div>
  );
}
