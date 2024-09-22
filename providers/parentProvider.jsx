"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";
import LogOut from "@/components/logout";

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
    const router = useRouter();

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "attendance", label: "Attendance" },
        { id: "assessment", label: "Assessment" },
        { id: "billing", label: "Billing" },
        // { id: "events", label: "Events" },
    ];

    const pathName = usePathname()

    const [selectedTab, setSelectedTab] = useState("overview");

    const [selectedWard, setSelectedWard] = useState("");
    const [selectedWardId, setSelectedWardId] = useState("")

    const [parentName, setParentName] = useState("")

    const [wardsLoading, setWardsLoading] = useState(false)
    const [wards, setWards] = useState([])

    useEffect(() => {
        setParentName(localStorage.getItem("userIdentity"))

        const getWards = async () => {
            setWardsLoading(true)
            try {
                const response = await fetch(`/api/parents/${localStorage.getItem("identity")}`)

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setWards(responseData)
            }
            catch (e) {
                console.log(e)
            } finally {
                setWardsLoading(false)
            }
        }

        getWards()

    }, [])

    const [logout, setLogout] = useState(false)

    return (
        <ParentContext.Provider value={{ selectedWardId }}
        >

            {logout && <LogOut setLogOut={setLogout} />}

            <button
                onClick={() => setLogout(true)}
                className="flex items-center justify-center block gap-2 text-red-200 text-sm rounded shrink-0 grow-0 absolute bottom-0 right-3 bottom-3 bg-gray-900 p-2"
            >
                <FontAwesomeIcon icon={faSignOut} />
                <span>Log Out</span>
            </button>
            <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 h-svh">
                <div className="bg-white p-6 shadow-xl border flex flex-col rounded-lg h-full">
                    {/* Parent Profile and Ward Selection */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <FontAwesomeIcon className="w-16 h-16 rounded-full border border-blue-500 p-0.5" icon={faUserCircle} width={30} height={30} />
                            <div className="ml-4 relative">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Welcome, {parentName}
                                </h2>


                                <div className="flex gap-1.5 items-center">
                                    <p className="text-gray-600 shrink-0 grow-0">Parent / Guardian</p>

                                </div>

                            </div>
                        </div>
                        <select
                            value={selectedWardId}
                            onChange={(e) => setSelectedWardId(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 bg-white"
                        >
                            <option value="">Select Ward</option>
                            {wardsLoading ? (
                                <option value="">Loading Wards...</option>
                            ) : wards.length > 0 ? (
                                wards.map((ward) => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.firstName} {ward.lastName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Wards Found</option>
                            )}
                        </select>

                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-300 mb-6">
                        <Link
                            href={'/parents'}
                            className={`py-2 px-4 focus:outline-none ${pathName == "/parents"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            Overview
                        </Link>
                        <Link
                            href={'/parents/attendance'}
                            className={`py-2 px-4 focus:outline-none ${pathName == "/parents/attendance"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            Attendance
                        </Link>

                        <Link
                            href={'/parents/assessment'}
                            className={`py-2 px-4 focus:outline-none ${pathName === "/parents/assessment"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            Assessment
                        </Link>

                        <Link
                            href={'/parents/billing'}
                            className={`py-2 px-4 focus:outline-none ${pathName === "/parents/billing"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            Billing
                        </Link>

                        {/* <Link
                            href={'/parents/events'}
                            className={`py-2 px-4 focus:outline-none ${pathName === "/parents/events"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            Events
                        </Link> */}
                    </div>

                    {/* Tab Content */}
                    <div className="overflow-auto flex-1 px-2">
                        {children}
                    </div>
                </div>
            </div>
        </ParentContext.Provider>
    );
};

export const useParent = () => useContext(ParentContext);
