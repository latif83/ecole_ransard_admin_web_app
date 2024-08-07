"use client"
import { faArrowLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SelectClass() {

    const router = useRouter()

    const [loadingClassSections, setLoadingClassSections] = useState(false)
    const [classSections, setClassSections] = useState([])

    useEffect(() => {
        const fetchClassSections = async () => {
            setLoadingClassSections(true);
            try {
                const response = await fetch("/api/classes/sections");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setClassSections(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoadingClassSections(false);
            }
        };

        fetchClassSections()
    }, [])

    return (
        <div>

            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Check Fees
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
                            Check
                        </span>
                    </p>
                </div>
            </div>

            <h3 className="text-xs text-red-600 my-3">
                Select a class below to check fees
            </h3>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {loadingClassSections ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : classSections?.length > 0 ? (
                            classSections?.map((section) => (
                                <tr key={section.sectionId} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {section.className} ( {section.sectionName} )
                                    </th>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            onClick={() => {

                                                router.push(`/admin/fees/checkFees/${section.sectionId}`)
                                            }} className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Select
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    No classes found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}