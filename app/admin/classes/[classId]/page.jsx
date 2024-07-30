"use client"
import { faArrowLeftLong, faCirclePlus, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NewClassSection } from "./newClassSection";

export default function ({ params }) {

    const { classId } = params

    const router = useRouter()

    const [fetchData, setFetchData] = useState(true)
    const [dataLoading, setDataLoading] = useState(false)

    const [data, setData] = useState({})

    useEffect(() => {

        const getSummary = async () => {
            setDataLoading(true)
            try {
                const response = await fetch(`/api/classes/${classId}`)
                const responseData = await response.json()
                if (!response.ok) {
                    toast.error(responseData.error)
                    return
                }
                setData(responseData.response)
            }
            catch (err) {
                console.log(err)
            } finally {
                setDataLoading(false)
            }
        }

        if (fetchData) {
            getSummary()
            setFetchData(false)
        }

    }, [fetchData])

    const [createSection, setCreateSection] = useState(false)

    return (
        <div>

            {createSection && <NewClassSection classId={classId} setCreateSection={setCreateSection} setFetchData={setFetchData} />}

            <div className="flex items-center gap-1.5">
                <button onClick={() => router.back()} className="bg-red-200 text-gray-700 p-2 rounded hover:bg-red-600 hover:text-white">
                    <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} className="text-lg" />
                </button>
                <span>
                    {dataLoading ? <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} /> : data.className}
                </span>
            </div>


            <div className="grid grid-cols-3 gap-5 mt-5">
                <div className="rounded-md shadow-md border p-2">
                    <h3>
                        Total Students
                    </h3>
                    <div className="flex mt-1 justify-end">
                        <span className="w-10 h-10 inline-flex justify-center items-center rounded-full bg-black text-white">
                            {dataLoading ? <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} /> : data.numberOfStudents}
                        </span>
                    </div>
                </div>

                <div className="rounded-md shadow-md border p-2">
                    <h3>
                        Class Sections
                    </h3>
                    <div className="flex mt-1 justify-end">
                        <span className="w-10 h-10 inline-flex justify-center items-center rounded-full bg-black text-white">
                            {dataLoading ? <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} /> : data.numberOfClassSections}
                        </span>
                    </div>
                </div>

                <div className="rounded-md shadow-md border p-2">
                    <h3>
                        Assigned Subjects
                    </h3>
                    <div className="flex mt-1 justify-end">
                        <span className="w-10 h-10 inline-flex justify-center items-center rounded-full bg-black text-white">
                            {dataLoading ? <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} /> : data.numberOfSubjects}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-7">
                <div className="flex justify-between items-center pb-2 border-b-2">
                    <h3>
                        Class Sections
                    </h3>
                    <button onClick={() => setCreateSection(true)} className="bg-blue-600 hover:bg-blue-800 p-2 flex items-center gap-1.5 rounded-md text-white">
                        <FontAwesomeIcon icon={faCirclePlus} width={15} height={15} className="text-lg" />
                        <span>
                            New Section
                        </span>
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Section
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No. of Students
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Head Teacher
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {dataLoading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : data.classSections?.length > 0 ? (
                            data.classSections?.map((classData) => (
                                <tr key={classData.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {classData.sectionName}
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {classData.numberOfStudents}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                    {classData.teacher.firstName} {classData.teacher.lastName}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            //   onClick={() => {
                                            //     setClassData(classData);
                                            //     setEditClass(true);
                                            //   }}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>

                                        <span
                                            //   onClick={() => {
                                            //     setClassData(classData);
                                            //     setEditClass(true);
                                            //   }}
                                            className="font-medium text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    No Sections found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-7">
                <div className="flex justify-between items-center pb-2 border-b-2">
                    <h3>
                        Assigned Subjects
                    </h3>
                    <button className="bg-blue-600 hover:bg-blue-800 p-2 flex items-center gap-1.5 rounded-md text-white">
                        <FontAwesomeIcon icon={faCirclePlus} width={15} height={15} className="text-lg" />
                        <span>
                            New Subject
                        </span>
                    </button>
                </div>

                <div className="flex gap-2 mt-3">


                    {
                        dataLoading ? <div className="w-full flex justify-center items-center text-sm gap-1.5">
                            <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} /> Loading...
                        </div> : data.subjects?.length > 0 ? data.subjects?.map((student) => (
                            <div className="bg-blue-100 text-sm rounded-full flex items-center gap-1.5 p-2 shrink-0 border border-blue-600">
                                <span>
                                    English Language
                                </span>
                                <FontAwesomeIcon icon={faXmark} width={20} height={20} className="text-xl cursor-pointer hover:font-bold text-red-600" />
                            </div>
                        )) : <div className="w-full flex justify-center text-sm gap-1.5">
                            No Subjects found
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}