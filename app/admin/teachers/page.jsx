"use client"
import { faChalkboardTeacher, faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewTeacher from "./newTeacher";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Teachers() {

    const [addTeacher, setAddTeacher] = useState(false)

    const [loading, setLoading] = useState(false)

    const [teachers, setTeachers] = useState([])

    const [fetchData, setFetchData] = useState(true)

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true)
            try {
                const response = await fetch("/api/teachers");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setTeachers(data.teachers);

            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Error fetching students, please try again!");
                setLoading(false);
            } finally {
                setLoading(false)
            }
        };

        if (fetchData) {
            fetchTeachers();
            setFetchData(false)
        }
    }, [fetchData]);

    return (
        <div>

            {addTeacher && <NewTeacher setAddTeacher={setAddTeacher} setFetchData={setFetchData} />}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-xl" icon={faChalkboardTeacher} width={25} height={25} />
                <h1>All Teachers</h1>
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
                                placeholder="Search for a teacher..."
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddTeacher(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Teacher
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
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Assigned Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : teachers.length > 0 ? (
                            teachers.map((teacher) => (
                                <tr key={teacher.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {teacher.firstName} {teacher.lastName}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {teacher.email}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {teacher.phone}
                                    </td>
                                    <td className="px-6 py-4 text-center">{teacher.address}</td>
                                    <td className="px-6 py-4 text-center">{teacher.classSections.length}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            // onClick={() => {
                                            //     setStudentData(student);
                                            //     setEditStudent(true);
                                            // }}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            // onClick={() => {
                                            //     setStudentId(student.id);
                                            //     setDeleteStudent(true);
                                            // }}
                                            className="font-medium hover:underline text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}