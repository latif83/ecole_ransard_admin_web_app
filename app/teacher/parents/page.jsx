"use client"
import { faPlusCircle, faSpinner, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import NewParent from "./NewParent";
import EditParent from "./EditParent";
import DeleteParent from "./DeleteParent";

export default function Parents() {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addParent, setAddParent] = useState(false);
    const [editParent, setEditParent] = useState(false);
    const [deleteParent, setDeleteParent] = useState(false);
    const [parentData, setParentData] = useState(null);
    const [parentId, setParentId] = useState(null);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await fetch("/api/parents");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setParents(data.parents);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching parents:", error);
                toast.error("Error fetching parents, please try again!");
                setLoading(false);
            }
        };
        fetchParents();
    }, [addParent, editParent, deleteParent]); // Refetch data when adding, editing, or deleting

    return (
        <div>
            {addParent && <NewParent setAddParent={setAddParent} setGData={setParents} />}
            {editParent && (
                <EditParent
                    setEditParent={setEditParent}
                    setGData={setParents}
                    parentData={parentData}
                />
            )}
            {deleteParent && (
                <DeleteParent
                    setDeleteParent={setDeleteParent}
                    setGData={setParents}
                    parentId={parentId}
                />
            )}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserTie} width={15} height={15} />
                <h1>Parents</h1>
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
                                placeholder="Search parents"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setAddParent(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Parent
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
                                Wards
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : parents.length > 0 ? (
                            parents.map((parent) => (
                                <tr key={parent.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {parent.firstName} {parent.lastName}
                                    </th>
                                    <td className="px-6 py-4 text-center">{parent.students.length}</td>
                                    <td className="px-6 py-4 text-center">{parent.address}</td>
                                    <td className="px-6 py-4 text-center">{parent.email}</td>
                                    <td className="px-6 py-4 text-center">{parent.phone}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            onClick={() => {
                                                setParentData(parent);
                                                setEditParent(true);
                                            }}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            onClick={() => {
                                                setParentId(parent.id);
                                                setDeleteParent(true);
                                            }}
                                            className="font-medium hover:underline text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    No parents found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
