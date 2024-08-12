"use client"
import { faArrowLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ({params}) {

    const {classSectionId,assessmentId} = params

    const [students,setStudents] = useState([])
    const [data,setData] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const getGrades = async()=>{
            setLoading(true)
            try{
                const response = await fetch(`/api/exams/assessments/grade/${classSectionId}/${assessmentId}`)
                const responseData = await response.json()
                if(!response.ok){
                    toast.error(responseData.message)
                    return
                }

                setStudents(responseData.students)
                setData(responseData)
            }
            catch(e){
                console.log(e)
            } finally{
                setLoading(false)
            }
        }

        getGrades()
    },[])

    return (
        <div>

            <div className="flex justify-between items-center">

                <div className="flex gap-2 items-center h-full">
                    <button className="p-3 rounded h-full bg-red-200 text-gray-700 hover:bg-red-800 hover:text-white">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={15} height={15} />
                    </button>
                    <h3 className="text-black font-semibold">
                        Score Students
                    </h3>
                </div>

                <div className="flex gap-10 my-2">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Subject</h2>
                        <p className="text-xs"> {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : data.subject} </p>
                    </div>

                    <div className="text-center">
                        <h2 className="text-xl font-semibold">Assessment</h2>
                        <p className="text-xs">{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : data.assessment}</p>
                    </div>
                </div>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>Score</p>
                                <p className="text-xs text-red-600">[ {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : data.marks} ]</p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>Weight</p>
                                <p className="text-xs text-red-600">[ {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : data.weight}% ]</p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
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
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                    <th className="px-6 py-4">{student.studentName}</th>
                                    <td className="px-6 py-4"> {student.score} </td>
                                    <td className="px-6 py-4"> {student.weight}% </td>
                                    <td className="px-6 py-4 flex gap-4 justify-center items-center">
                                        <span className="font-medium text-blue-600 hover:underline"
                                        >
                                            Score
                                        </span>
                                    </td>
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