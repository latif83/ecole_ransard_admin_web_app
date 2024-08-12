"use client"
import Link from "next/link";
import { NewAssessment } from "./NewAssessment";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { EditAssessment } from "./editAssessment";
// import { DelAssessment } from "./delAssessment";

export default function ({ params }) {

    const [addAssessment, setAddAssessment] = useState(false)
    const [editAssessment, setEditAssessment] = useState(false)
    const [assessmentData, setAssessmentData] = useState({})

    const [delAssessment, setDelAssessment] = useState(false)
    const [selectedAssessmentId, setSelectedAssessmentId] = useState(0)

    const router = useRouter()

    const { classSectionId, subjectId } = params

    const [teacherId, setTeacherId] = useState(0)

    const [academicTermId, setAcademicTermId] = useState(0)
    const [academicYearId, setAcademicYearId] = useState(0)

    const [getData, setGetData] = useState(true)
    const [assessmentsLoading, setAssessmentsLoading] = useState(false)
    const [assessments, setAssessments] = useState([])

    const [subject, setSubject] = useState("")

    useEffect(() => {

        const getAssessments = async () => {
            setAssessmentsLoading(true)
            try {
                const response = await fetch(`/api/exams/assessments?classSectionId=${classSectionId}&subjectId=${subjectId}
`)
                const responseData = await response.json()
                if (!response.ok) {
                    // Error
                    toast.error("error", responseData.message)
                    return
                }

                setAssessments(responseData.assessments)
                setSubject(responseData.subject.name)

            }
            catch (err) {
                console.log(err)
            } finally {
                setAssessmentsLoading(false)
            }
        }

        if (getData) {
            getAssessments()
            setGetData(false)
        }

    }, [getData])

    return (
        <div className="relative">

            {addAssessment && <NewAssessment setAddAssessment={setAddAssessment} subjectId={subjectId} classSessionId={classSectionId} setGetData={setGetData} />}

            {/* 
            {editAssessment && <EditAssessment setEditAssessment={setEditAssessment} assessmentData={assessmentData} setGetData={setGetData} />}

            {delAssessment && <DelAssessment setDelAssessment={setDelAssessment} assessmentId={selectedAssessmentId} setGData={setGetData} />} */}

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex mt-3 items-center gap-1">
                        <button onClick={() => router.back()} className="bg-red-200 text-gray-700 hover:bg-red-700 hover:text-gray-100 p-2 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </button>

                        <h1 className="text-lg font-semibold">
                            {subject}
                        </h1>
                    </div>
                    <p>
                        Select / Create a new assessment to score students!
                    </p>
                </div>
                <div className="flex justify-end">

                    <button type="button" onClick={() => setAddAssessment(true)} className="bg-blue-600 hover:bg-blue-800 flex items-center p-4 rounded text-gray-100 gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <span>
                            New Assessment
                        </span>
                    </button>

                </div>
            </div>

            <div className="mt-8">



                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Assessment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Marks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Weight
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {assessmentsLoading ? (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center" colSpan={5}>
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spin
                                            className="text-lg"
                                            color="red"
                                        />
                                    </td>
                                </tr>
                            ) : assessments.length > 0 ? (
                                assessments.map((assesment) => (
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <th className="px-6 py-4">{assesment.name}</th>
                                        <td className="px-6 py-4"> {assesment.description ? assesment.description : 'N/A'} </td>
                                        <td className="px-6 py-4"> {assesment.marks} </td>
                                        <td className="px-6 py-4"> {assesment.weight}% </td>
                                        <td className="px-6 py-4 flex gap-4 items-center">
                                            <Link
                                                href={`/teacher/dashboard/${classSectionId}/assessments/${subjectId}/${assesment.id}`}
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Score Students
                                            </Link>

                                            <div className="flex gap-2">
                                                <svg onClick={() => {
                                                    setAssessmentData(assesment);
                                                    setEditAssessment(true);
                                                }}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer bg-blue-600 hover:bg-blue-400 text-white p-1 rounded-md">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>

                                                <svg
                                                    onClick={() => {
                                                        setSelectedAssessmentId(assesment.id);
                                                        setDelAssessment(true);
                                                    }}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer bg-red-600 hover:bg-red-400 text-white p-1 rounded-md">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>


                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4" colSpan={5}>
                                        No Assessments found
                                    </td>
                                </tr>
                            )}
                            {assessments.length > 0 && <tr className="bg-red-600 text-white border-b">
                                <th colSpan={3} className="px-6 py-4 text-center">Total Weight</th>
                                <td className="px-6 py-4"> {assessments.reduce((sum, assessment) => {
                                    return sum + Number(assessment.weight);
                                }, 0)}% </td>
                                <td className="text-center">-</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}