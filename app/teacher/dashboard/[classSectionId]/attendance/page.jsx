"use client"
import { faCheckCircle, faExclamation, faExclamationCircle, faSpinner, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Attendance({ params }) {

    const { classSectionId } = params

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(students?.map(student => student.studentId));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {

        const today = new Date()

        const getStudents = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/attendance?date=${today}`)
                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.error)
                    return
                }

                // console.log(responseData)

                setStudents(responseData)
            }
            catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        getStudents()

    }, [])

    return (
        <div>
            <h1 className="text-2xl">
                Students
            </h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <div className="p-4 bg-gray-800">
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
                </div>
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <input
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    id={`checkbox-all`}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                />
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-center" colSpan={4}>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        spin
                                        className="text-lg"
                                        color="red"
                                    />
                                </td>
                            </tr>
                        ) : students.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            checked={selectedStudents.includes(student.studentId)}
                                            onChange={() => handleSelectStudent(student.studentId)}
                                            id={`checkbox-${student.studentId}`}
                                            type="checkbox"
                                            value={student.studentId}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                        />
                                    </td>
                                    <th className="px-6 py-4">{student.studentName}</th>
                                    <td className="px-6 py-4"> {student.status == "present" ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : student.status == "absent" ? <FontAwesomeIcon icon={faXmarkCircle} color="red" /> : <FontAwesomeIcon icon={faExclamationCircle} color="gray" />} </td>

                                    <td className="px-6 py-4"> <p>{new Date(student.clockIn).toDateString()}</p> <span>@</span> <p>{new Date(student.clockIn).toLocaleTimeString()}</p> </td>

                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4" colSpan={4}>
                                    No Students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}