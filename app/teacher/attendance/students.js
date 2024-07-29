"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./newCode.module.css";
import { faSpinner, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StudentsAttendance = ({ setViewAttendance, attendanceCode }) => {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [gData, setGData] = useState(true);

  const [selectedClassId,setSelectedClassId] = useState("")

  useEffect(() => {
    const getStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/attendance/students?attendanceCode=${attendanceCode}&classId=${selectedClassId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.error);
          return;
        }

        setStudents(responseData.students);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Error retrieving data, please try again!");
      }
    };

    getStudents();
  }, [selectedClassId]);

  const [classLoading, setClassLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const getClasses = async () => {
      try {
        setClassLoading(true);
        const response = await fetch("/api/classes");
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }
        setClasses(responseData);
        setClassLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Error retrieving data, please try again!");
      }
    };

    getClasses();
  }, []);

  return (
    <div className={`${styles.container} flex pt-12 justify-center`}>
      <div
        className="w-full max-w-2xl mx-auto bg-gray-50 rounded shadow p-6"
        style={{ flexGrow: 0, height: "max-content" }}
      >
        <div className="flex justify-between">
          <h1 className="font-semibold">Students</h1>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setViewAttendance(false)}
            className="text-lg cursor-pointer p-2 hover:bg-gray-300 rounded"
            color="red"
          />
        </div>

        <div className="relative z-0 w-full group mb-5">
          <label
            htmlFor="dept"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Sort Class
          </label>
          <select
            id="class"
            name="class"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">Select Class</option>
            {classLoading ? (
              <option>
                {" "}
                <FontAwesomeIcon
                  icon={faSpinner}
                  color="red"
                  className="text-lg"
                  spin
                />{" "}
                Loading Classes...{" "}
              </option>
            ) : classes.length > 0 ? (
              classes.map((clas) => (
                <option value={clas.id}>{clas.className}</option>
              ))
            ) : (
              <option>No classes found.</option>
            )}
          </select>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Student
                </th>
                <th scope="col" class="px-6 py-3">
                  Class
                </th>
                <th scope="col" class="px-6 py-3">
                  Time in
                </th>
                <th scope="col" class="px-6 py-3">
                  Time out
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr class="bg-white border-b hover:bg-gray-50">
                  <td colSpan={4} class="px-6 py-4 text-center">
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((data) => (
                  <tr class="bg-white border-b hover:bg-gray-50">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {data.student}
                    </th>
                    <td class="px-6 py-4 text-gray-900">{data.class}</td>
                    <td class="px-6 py-4">
                      {new Date(data.clockIn).toLocaleTimeString()}
                    </td>
                    <td class="px-6 py-4">
                      {new Date(data.clockOut).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr class="bg-white border-b hover:bg-gray-50">
                  <td colSpan={4} class="px-6 py-4 text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
