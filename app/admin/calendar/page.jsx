"use client"
import { faPlusCircle, faSpinner, faUserTie, faTimes, faUsersBetweenLines, faUsersLine, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewAcademicYr from "./newAcademicYr";
import Link from "next/link";

export default function AcademicYears() {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([])

    const [fetchData,setFetchData] = useState(true)

    useEffect(() => {
        const fetchAcademicYrs = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/calendar/year");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setData(data.academicYears);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoading(false);
            }
        };

        if(fetchData){
            fetchAcademicYrs();
            setFetchData(false)
        }

    }, [fetchData]);

    const [addAcademicYr,setAddAcademicYr] = useState(false)

    return (
        <div>

            {addAcademicYr && <NewAcademicYr setAddAcademicYr={setAddAcademicYr} setFetchData={setFetchData} />}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-xl" icon={faCalendarDays} width={25} height={25} />
                <h1>Academic Years</h1>
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
                                placeholder="Search academic year"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddAcademicYr(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Academic Year
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Year
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
                        ) : data.length > 0 ? (
                            data.map((year) => (
                                <tr key={year.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {year.year}
                                    </th>
                                    <td className="px-6 py-4 text-center">{new Date(year.startDate).toDateString()}</td>
                                    <td className="px-6 py-4 text-center">{new Date(year.endDate).toDateString()}</td>
                                    <td className="px-6 py-4 text-center">{year.status}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <Link
                                        href={`/admin/calendar/${year.id}`}
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
                                    No academic years found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
