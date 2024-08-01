"use client"
import { faArrowLeftLong, faCirclePlus, faEdit, faSpinner, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewTerm from "./newTerm";
import Link from "next/link";
import EditAcademicYr from "./editAcademicYr";
import { EndAcademicYr } from "./endAcademicYr";

export default function AcademicTermPage({ params }) {

    const { yearId } = params

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const [fetchData, setFetchData] = useState(true)

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/calendar/year/${yearId}`)

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.error)
                    return
                }

                setData(responseData.academicYear)

            }
            catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        if (fetchData) {
            getData()
            setFetchData(false)
        }

    }, [fetchData])

    const [addAcademicTerm, setAddAcademicTerm] = useState(false)

    const [editAcademicYr, setEditAcademicYr] = useState(false)

    const [endAcademicYr, setEndAcademicYr] = useState(false)

    return (
        <div>

            {addAcademicTerm && <NewTerm setAddAcademicTerm={setAddAcademicTerm} academicYearId={yearId} setFetchData={setFetchData} />}

            {editAcademicYr && <EditAcademicYr setEditAcademicYr={setEditAcademicYr} data={data} setFetchData={setFetchData} />}

            {endAcademicYr && <EndAcademicYr setEndAcademicYr={setEndAcademicYr} setFetchData={setFetchData} yearId={yearId} />}

            <div className="flex items-center gap-1.5">
                <button onClick={() => router.back()} className="bg-red-200 text-gray-800 hover:bg-red-600 hover:text-white rounded-md p-2">
                    <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} className="text-lg" />
                </button>
                <span className="text-sm">
                    {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : data.year}
                </span>
            </div>

            <div className="grid grid-cols-3 mt-3">
                <div>
                    <h3 className="text-xs text-red-600">
                        Start Date:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : new Date().toDateString(data.startDate)}
                    </p>
                </div>

                <div>
                    <h3 className="text-xs text-red-600">
                        End Date:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : new Date().toDateString(data.endDate)}
                    </p>
                </div>

                <div>
                    <h3 className="text-xs text-red-600">
                        Status:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : data.status}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
                {(data.status == "Active" || "Pending") && <button onClick={() => setEditAcademicYr(true)} className="p-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-800 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEdit} width={15} height={15} />
                    <span>
                        Edit
                    </span>
                </button>}
                {data.status == "Active" && <button onClick={()=>setEndAcademicYr(true)} className="p-2 rounded-md bg-red-600 text-sm text-white hover:bg-red-800 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStop} width={15} height={15} />
                    <span>
                        End Academic Year
                    </span>
                </button>}
            </div>

            <div className="mt-5">

                <div className="flex items-center justify-between pb-1 border-b">
                    <h1 className="text-sm">
                        Academic Terms
                    </h1>

                    <button onClick={() => setAddAcademicTerm(true)} className="bg-lime-600 text-sm hover:bg-lime-800 text-white rounded-md p-2 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faCirclePlus} width={20} height={20} />
                        <span>
                            New Term
                        </span>
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Term
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Start
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
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
                        ) : data?.terms?.length > 0 ? (
                            data?.terms?.map((term) => (
                                <tr key={term.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {term.termName}
                                    </th>
                                    <td className="px-6 py-4 text-center">{new Date().toDateString(term.startDate)}</td>
                                    <td className="px-6 py-4 text-center">{new Date().toDateString(term.endDate)}</td>
                                    <td className="px-6 py-4 text-center">{term.status}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <Link
                                            href={`/admin/calendar/${yearId}/${term.id}`}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Manage
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    No terms found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </div>
    )
}