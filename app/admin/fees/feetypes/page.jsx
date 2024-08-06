"use client";
import { faArrowLeftLong, faBookOpen, faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import NewFee from "./newFee";
import { useRouter } from "next/navigation";
// import NewSubject from "./newSubject";

export default function FeeTypes() {
    const [feeDetails, setFeeDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gData, setGData] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const getFeeDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/fees/feetype");
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setFeeDetails(responseData.feeTypes);

            } catch (err) {
                console.log(err);
                toast.error("Error retrieving data, please try again!");
            } finally {
                setLoading(false);
            }
        };

        if (gData) {
            getFeeDetails();
            setGData(false);
        }
    }, [gData]);

    const [addFee, setAddFee] = useState(false)

    return (
        <div>

            {addFee && <NewFee setAddFee={setAddFee} setGData={setGData} />}

            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Fee Types
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
                            Fee Types
                        </span>
                    </p>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <div className="p-4 bg-gray-800 flex justify-between">
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
                                placeholder="Search fees"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddFee(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Fees
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : feeDetails?.length > 0 ? (
                            feeDetails?.map((fee) => (
                                <tr key={fee.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {fee.title}
                                    </th>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 text-center"
                                    >
                                        {fee.description ? fee.description : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="font-medium text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    No fees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
