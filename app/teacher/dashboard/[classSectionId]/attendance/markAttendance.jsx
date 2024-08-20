import { useState } from "react";
import { toast } from "react-toastify";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarkAttendance({ setMarkAttendance, setGData, selectedStudents,status,classSectionId }) {
  const [loading, setLoading] = useState(false);

  const handleMarkAttendance = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/attendance`, {
        method: "POST",
        "Content-Type" : "application/json",
        body : JSON.stringify({ studentIds:selectedStudents, classSectionId, status })
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.message);
        setLoading(false);
        return;
      }
      toast.success(responseData.message);
      setMarkAttendance(false);
      setGData(true);
    } catch (err) {
      console.log(err);
      toast.error("Error deleting parent, please try again!");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mark Attendance</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setMarkAttendance(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <p className="mb-4">Are you sure you want to mark attendance for the selected students?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-lime-700 text-white rounded-lg hover:bg-lime-600 mr-2"
            onClick={handleMarkAttendance}
            disabled={loading}
          >
            {loading ? <> <FontAwesomeIcon icon={faSpinner} spin /> Confirm </> : "Confirm"}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => setMarkAttendance(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
