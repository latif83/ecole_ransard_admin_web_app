"use client"
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ({ params }) {

    const router = useRouter()

    const { classSectionId, subjectId } = params

    const [students, setStudents] = useState([])
    const [subject, setSubject] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getGrades = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/exams/assessments/grade/${classSectionId}/subject/${subjectId}`)
                const responseData = await response.json()
                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setStudents(responseData.students)
                setSubject(responseData.subject)
            }
            catch (e) {
                console.log(e)
                toast.error("Unexpected Error!")
            } finally {
                setLoading(false)
            }
        }


        getGrades()

    }, [])

    return (
        <div>

            <div className="flex gap-2">
                <button onClick={() => router.back()} className="p-2 rounded bg-red-200 hover:bg-red-700 hover:text-white text-gray-800">
                    <FontAwesomeIcon icon={faArrowLeft} width={15} height={15} />
                </button>
                <div>
                    <p className="text-sm">
                        View Grades
                    </p>
                    <p className="text-xs">
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : subject}
                    </p>
                </div>
            </div>

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
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>Marks</p>
                                <p className="text-red-500">
                                    [ 100% ]
                                </p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Grade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remarks
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
                                <tr key={student.studentId} className="bg-white border-b hover:bg-gray-50">
                                    <th className="px-6 py-4">{student.studentName}</th>
                                    <td className="px-6 py-4"> {(student.totalScore).toFixed(2)}% </td>
                                    <td className="px-6 py-4"> {student.grade} </td>
                                    <td className="px-6 py-4"> {student.remarks} </td>
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