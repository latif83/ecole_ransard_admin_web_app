"use client"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ({params}) {

    const [assignedSubjects, setAssignedSubjects] = useState([])
    const [loading, setLoading] = useState(false)

    const {classSectionId} = params

    useEffect(() => {

        const getSubjects = async () => {
            setLoading(true)
            try {

                const teacherId = localStorage.getItem('identity')

                const response = await fetch(`/api/teachers/${teacherId}/assigned/subject?teacherId=${teacherId}&classSectionId=${classSectionId}`)

                const responseData = await response.json()

                if (!response.ok) {
                    // Error
                    toast.error("error", responseData.message)
                    return
                }

                setAssignedSubjects(responseData)

            }
            catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        getSubjects()
    }, [])

    return (
        <div>
            <h1 className="font-semibold text-lg">Assigned Subjects</h1>
            <p>
                Please select a subject to access it's assessment
            </p>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">


                {loading ? <div className="md:col-span-2 lg:col-span-3 col-span-1 flex flex-col gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={faSpinner} spin /> <p> Loading Subjects... </p> </div>
                    : assignedSubjects.length > 0 ? assignedSubjects.map((subject) => (<div className="p-2 rounded-md border shadow">
                        <h3>
                            {subject.subjectName}
                        </h3>
                        <Link href={`/teacher/dashboard/${classSectionId}/assessments/${subject.subjectId}`} className="w-full block bg-gray-600 hover:bg-gray-800 text-gray-100 p-1.5 rounded-md text-sm mt-1 flex gap-1.5 items-center justify-center">
                            <span>Select</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </Link>
                    </div>)) : <div className="md:col-span-2 lg:col-span-3 col-span-1 flex flex-col gap-2 justify-center items-center">
                        <p className="text-sm text-red-400"> No Subjects Assigned. </p> <p className="text-sm text-black"> Please contact admin if theres any issue. </p> </div>}

            </div>

        </div>
    )
}