"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
  const router = useRouter();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "assessment", label: "Assessment" },
    { id: "billing", label: "Billing" },
    { id: "events", label: "Events" },
];

const pathName = usePathname()

const [selectedTab, setSelectedTab] = useState("overview");

const [selectedWard, setSelectedWard] = useState("John Doe");


  return (
    <ParentContext.Provider
    >
         <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 h-svh">
            <div className="bg-white p-6 shadow-xl border rounded-lg h-full">
                {/* Parent Profile and Ward Selection */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <FontAwesomeIcon className="w-16 h-16 rounded-full border border-blue-500 p-0.5" icon={faUserCircle} width={30} height={30} />
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Welcome, John Doe
                            </h2>
                            <p className="text-gray-600">Parent / Guardian of {selectedWard}</p>
                        </div>
                    </div>
                    <select
                        value={selectedWard}
                        onChange={(e) => setSelectedWard(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 bg-white"
                    >
                        <option value="John Doe">John Doe</option>
                        <option value="Jane Doe">Jane Doe</option>
                        <option value="James Doe">James Doe</option>
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

                    <Link
                        href={'/parents/events'}
                        className={`py-2 px-4 focus:outline-none ${pathName === "/parents/events"
                                ? "border-b-4 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        Events
                    </Link>
                </div>

                {/* Tab Content */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    </ParentContext.Provider>
  );
};

export const useParent = () => useContext(ParentContext);
