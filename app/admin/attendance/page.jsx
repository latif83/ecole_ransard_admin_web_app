"use client"
import { faCheckCircle, faExclamation, faExclamationCircle, faSpinner, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Attendance() {

    const [ classSectionId,setClassSectionId ] = useState("")

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    const [gData, setGData] = useState(true)

    const [dateFilter, setDateFilter] = useState(new Date().toISOString().split("T")[0])

    useEffect(() => {

        const getStudents = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/attendance?date=${dateFilter}&classSectionId=${classSectionId}`)
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

        if (gData) {
            getStudents()
            setGData(false)
        }

    }, [gData])

    const [classSectionsLoading, setClassSectionsLoading] = useState(false)
    const [classSections, setClassSections] = useState([])

    useEffect(() => {
        const fetchClassSections = async () => {
            try {
                setClassSectionsLoading(true);
                const response = await fetch(`/api/classes/sections`);
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setClassSections(responseData);
            } catch (err) {
                console.log(err);
                toast.error("Error retrieving data, please try again!");
            } finally {
                setClassSectionsLoading(false)
            }
        }

            fetchClassSections()

    }, [])

    return (
        <div>
            <h1 className="text-2xl">
                Attendance
            </h1>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <div className="p-4 bg-gray-800 flex justify-between">
                    <div>
                        <label htmlFor="date-select" className="sr-only">
                            Select Date
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
                                        d="M4 10h12m-6 6V4"
                                    />
                                </svg>
                            </div>
                            <input
                                type="date"
                                id="date-select"
                                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                value={dateFilter}
                                onChange={(e) => { setDateFilter(e.target.value); setGData(true); }}
                            />
                        </div>
                    </div>
                    <div className="relative z-0 group">
                            {/* <label
                                htmlFor="dept"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Class Section
                            </label> */}
                            <select
                                id="class"
                                name="class"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-80 focus:border-blue-500 block p-2.5"
                                required
                                value={classSectionId}
                                onChange={(e) => {setClassSectionId(e.target.value); setGData(true)}}
                            >
                                <option value="">All Classes</option>
                                {classSectionsLoading ? (
                                    <option>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            color="red"
                                            className="text-lg"
                                            spin
                                        />{" "}
                                        Loading Sections...{" "}
                                    </option>
                                ) : classSections.length > 0 ? (
                                    classSections.map((section) => (
                                        <option value={section.sectionId}>{section.className} ({section.sectionName})</option>
                                    ))
                                ) : (
                                    <option>No classes found.</option>
                                )}
                            </select>
                        </div>
                  
                </div>
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>

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
                                <td className="px-6 py-4 text-center" colSpan={3}>
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
                                    <th className="px-6 py-4">{student.studentName}</th>
                                    <td className="px-6 py-4"> {student.status == "present" ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : student.status == "absent" ? <FontAwesomeIcon icon={faXmarkCircle} color="red" /> : <FontAwesomeIcon icon={faExclamationCircle} color="gray" />} </td>

                                    <td className="px-6 py-4"> {student.clockIn ? <><p>{new Date(student.clockIn).toDateString()}</p> <span>@</span> <p>{new Date(student.clockIn).toLocaleTimeString()}</p></> : 'N/A'} </td>

                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4" colSpan={3}>
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