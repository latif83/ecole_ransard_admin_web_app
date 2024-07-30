"use client"
import { faPlusCircle, faSpinner, faUserTie, faTimes, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewStudent from "./NewStudent"; // Assume you have a NewStudent component
import EditStudent from "./EditStudent"; // Assume you have an EditStudent component
import DeleteStudent from "./DeleteStudent"; // Assume you have a DeleteStudent component

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addStudent, setAddStudent] = useState(false);
    const [editStudent, setEditStudent] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [studentId, setStudentId] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/students");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setStudents(data.students);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Error fetching students, please try again!");
                setLoading(false);
            }
        };
        fetchStudents();
    }, [addStudent, editStudent, deleteStudent]); 

    return (
        <div>
            {addStudent && <NewStudent setAddStudent={setAddStudent} setGData={setStudents} />}
            {editStudent && (
                <EditStudent
                    setEditStudent={setEditStudent}
                    setGData={setStudents}
                    studentData={studentData}
                />
            )}
            {deleteStudent && (
                <DeleteStudent
                    setDeleteStudent={setDeleteStudent}
                    setGData={setStudents}
                    studentId={studentId}
                />
            )}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-xl" icon={faUsersLine} width={25} height={25} />
                <h1>Students</h1>
            </div>

            <div className="mt-5">
                <select className="p-2 rounded text-sm w-full max-w-xl">
                    <option>
                        All Class
                    </option>
                </select>
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
                                placeholder="Search students"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddStudent(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Student
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {student.firstName} {student.lastName}
                                    </th>
                                    <td className="px-6 py-4 text-center">{calculateAge(student.birthDate)}</td>
                                    <td className="px-6 py-4 text-center">{student.class.className}</td>
                                    <td className="px-6 py-4 text-center">{student.address}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            onClick={() => {
                                                setStudentData(student);
                                                setEditStudent(true);
                                            }}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            onClick={() => {
                                                setStudentId(student.id);
                                                setDeleteStudent(true);
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
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
