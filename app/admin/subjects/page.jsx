"use client";
import { faBookOpen, faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import NewSubject from "./newSubject";
import EditSubject from "./editSubject";

export default function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gData, setGData] = useState(true);

    useEffect(() => {
        const getSubjects = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/subjects");
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setSubjects(responseData.subjects);
                setLoading(false);
            } catch (err) {
                console.log(err);
                toast.error("Error retrieving data, please try again!");
            }
        };

        if (gData) {
            getSubjects();
            setGData(false);
        }
    }, [gData]);

    const [addSubject, setAddSubject] = useState(false)

    const [editSubject,setEditSubject] = useState(false)

    const [subjectData,setSubjectData] = useState(null)

    return (
        <div>

            {editSubject && <EditSubject setEditSubject={setEditSubject} subjectData={subjectData} setGData={setGData} />}

            {addSubject && <NewSubject setAddSubject={setAddSubject} setGData={setGData} />}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBookOpen} width={20} height={20} className="text-lg" />
                <h1>All Subjects</h1>
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
                                placeholder="Search subject"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddSubject(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Subject
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Subject
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={2} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : subjects?.length > 0 ? (
                            subjects?.map((subject) => (
                                <tr key={subject.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {subject.name}
                                    </th>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                        onClick={()=>{
                                            setSubjectData(subject)
                                            setEditSubject(true)
                                        }}
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
                                <td colSpan={2} className="px-6 py-4 text-center">
                                    No subjects found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
