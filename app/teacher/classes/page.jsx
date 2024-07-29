"use client";
import { faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewClass from "./NewClass";
import EditClass from "./EditClass";
import DeleteClass from "./DeleteClass";

export default function Classes() {
  const [addClass, setAddClass] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gData, setGData] = useState(true);
  const [editClass, setEditClass] = useState(false);
  const [classData, setClassData] = useState();
  const [delClass, setDelClass] = useState(false);

  const [classId,setClassId] = useState(0)

  useEffect(() => {
    const getClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/classes");
        const responseData = await response.json();
        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }
        setClasses(responseData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Error retrieving data, please try again!");
      }
    };

    if (gData) {
      getClasses();
      setGData(false);
    }
  }, [gData]);

  return (
    <div>
      {addClass && <NewClass setAddClass={setAddClass} setGData={setGData} />}
      {editClass && (
        <EditClass
          setEditClass={setEditClass}
          setGData={setGData}
          classData={classData}
        />
      )}
      {delClass && (
        <DeleteClass
          setDelClass={setDelClass}
          setGData={setGData}
          classId={classId}
        />
      )}

      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
        <h1>Available Classes</h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="p-4 bg-gray-800 flex justify-between">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search classes"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => setAddClass(true)}
              className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              New Class
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                class
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td colSpan={3} className="px-6 py-4 text-center">
                  <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </td>
              </tr>
            ) : classes?.length > 0 ? (
              classes?.map((classData) => (
                <tr key={classData.id} className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                  >
                    {classData.className}
                  </th>
                  <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                    <span
                      onClick={() => {
                        setClassData(classData);
                        setEditClass(true);
                      }}
                      className="font-medium text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => {
                        setClassId(classData.id);
                        setDelClass(true);
                      }}
                      className="font-medium hover:underline text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td colSpan={3} className="px-6 py-4 text-center">
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
