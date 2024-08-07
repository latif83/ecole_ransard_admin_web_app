"use client"
import { faArrowLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RecordPayment } from "./recordPayment"

export default function CollectFees({ params }) {

    const { classSectionId } = params

    const router = useRouter()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [fetchData, setFetchData] = useState(true)

    useEffect(() => {
        const fetchBillingData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/fees/students/owing?classSectionId=${classSectionId}`);
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoading(false);
            }
        };

        if (fetchData) {
            fetchBillingData()
            setFetchData(false)
        }

    }, [fetchData])

    const [addPayment, setAddPayment] = useState(false)

    const [selectedStudentId, setSelectedStudentId] = useState()

    return (
        <div>

            {addPayment && <RecordPayment setAddPayment={setAddPayment} setFetchData={setFetchData} studentId={selectedStudentId} />}

            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Collect Fees
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
                            Collect
                        </span>
                    </p>
                </div>
            </div>

            <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">

                <div className="p-4 bg-gray-800 flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-50">
                            {data.className}
                        </h3>
                    </div>
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
                                placeholder="Search Student"
                            />
                        </div>
                    </div>
                </div>

                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Previous Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Current Bill
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount Payable
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
                        ) : data?.data?.length > 0 ? (
                            data?.data?.map((d) => (
                                <tr key={d.student.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {d.student.firstName} {d.student.lastName}
                                    </th>
                                    <td
                                        className="px-6 py-4"
                                    >
                                        {(d.previousOwed).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "GHS",
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td
                                        className="px-6 py-4"
                                    >
                                        {(d.currentBill).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "GHS",
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td
                                        className="px-6 py-4"
                                    >
                                        {(d.totalAmountPayable).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "GHS",
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            onClick={() => {
                                                setSelectedStudentId(d.student.id)
                                                setAddPayment(true)
                                            }} className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Make Payment
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    No students found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}