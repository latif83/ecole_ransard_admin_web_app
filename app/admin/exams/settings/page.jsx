"use client"
import { faArrowLeftLong, faCirclePlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { NewGrade } from "./newGrade";
import { useEffect, useState } from "react";

export default function GradeSettings() {

    const router = useRouter()

    const [gradeSettings, setGradeSettings] = useState()
    const [fetchData, setFetchData] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const getGradeSettings = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/exams/settings`)
                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setGradeSettings(responseData)

            } catch (e) {
                console.log(e)
                toast.error("Unexpected Error!")
            }
            finally {
                setLoading(false)
            }
        }

        if(fetchData){
            getGradeSettings()
            setFetchData(false)
        }

    }, [fetchData])

    const [createGrade, setCreateGrade] = useState(false)

    return (
        <div>

            {createGrade && <NewGrade setCreateGrade={setCreateGrade} setFetchData={setFetchData} />}

            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Grade Settings
                    </h1>
                    <p className="flex gap-1.5 text-sm">
                        <span>
                            Home
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span>
                            Fees
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span className="text-blue-600">
                            Grade Settings
                        </span>
                    </p>
                </div>
            </div>

            <div className="relative overflow-x-auto mt-7 shadow-md sm:rounded-lg">
                <div className="p-4 bg-gray-800 flex justify-end items-center">
                    <div>
                        <button onClick={() => setCreateGrade(true)} className="flex items-center text-sm gap-1.2 bg-gray-50 hover:bg-gray-200 rounded p-2">
                            <FontAwesomeIcon icon={faCirclePlus} width={20} height={20} />
                            <span>
                                New Grade
                            </span>
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Grade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Comments
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
            <tr className="bg-white border-b hover:bg-gray-50">
                <td colSpan={5} className="px-6 py-4 text-center">
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </td>
            </tr>
        ) : gradeSettings?.length > 0 ? (
            gradeSettings?.map((setting) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                            >
                                {setting.minScore}
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                            >
                                {setting.maxScore}
                            </th>
                            <td
                                className="px-6 py-4 text-center"
                            >
                                {setting.grade}
                            </td>
                            <td
                                className="px-6 py-4 text-center"
                            >
                                {setting.comment}
                            </td>
                            <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                <span className="font-medium text-blue-600 hover:underline cursor-pointer"
                                >
                                    Edit
                                </span>
                                <span className="font-medium text-red-600 hover:underline cursor-pointer"
                                >
                                    Delete
                                </span>
                            </td>
                        </tr>
            ))
        ) : (
            <tr className="bg-white border-b hover:bg-gray-50">
                <td colSpan={5} className="px-6 py-4 text-center">
                    No settings found
                </td>
            </tr>
        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}