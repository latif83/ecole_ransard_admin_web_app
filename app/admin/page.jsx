"use client"
import { faChalkboardTeacher, faSpinner, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Admin() {

    const [summaryData, setSummaryData] = useState({})
    const [summaryLoading, setSummaryLoading] = useState(false)

    useEffect(() => {
        const getSummaryData = async () => {

            setSummaryLoading(true)

            try {
                const response = await fetch(`/api/summary/admin`)
                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setSummaryData(responseData)

            } catch (e) {
                console.log(e)
            } finally {
                setSummaryLoading(false)
            }
        }

        getSummaryData()
    }, [])

    return (
        <div className="">

            <div>
                <h1 className="text-lg font-semibold">
                    Admin Dashboard
                </h1>
                <p className="flex gap-1.5 text-sm">
                    <span>
                        Home
                    </span>
                    <span>
                        {'>'}
                    </span>
                    <span className="text-blue-600">
                        Admin
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">

                <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Total Students
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faUsersLine} className="text-2xl" width={30} height={30} />
                        <span>
                            {summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.studentCount}
                        </span>
                    </div>

                </div>

                <div className="bg-teal-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Total Teachers
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" width={30} height={30} />
                        <span>
                        {summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.teacherCount}
                        </span>
                    </div>
                </div>

                <div className="bg-green-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Parents
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faUsersBetweenLines} className="text-2xl" width={30} height={30} />
                        <span>
                        {summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.parentCount}
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}