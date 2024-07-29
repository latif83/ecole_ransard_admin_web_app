"use client"
import { faBookOpen, faCalendarCheck, faCalendarDays, faCaretDown, faChalkboardTeacher, faCircleDollarToSlot, faClipboard, faFile, faGaugeHigh, faSchool, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminSidebar = () => {

    const pathname = usePathname();

    return (
        <div className="bg-black w-[250px] shrink-0 relative flex flex-col h-full">
            <div className="flex gap-1 shrink-0 mt-2 text-gray-100 items-center pl-6 font-bold p-2">
                <Image
                    className="w-10 h-10 p-0.5 border rounded-full border-blue-600"
                    src="/logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                />
                <h3>
                    ECOLE RONSARD
                </h3>
            </div>

            <div className="mt-10 pl-6 pr-3 flex-1 no-scrollbar overflow-auto">
                <p className="text-xs font-bold text-gray-300">
                    MENU
                </p>

                <div className="mt-5 flex flex-col gap-3">
                    <Link href={'/admin'} className={`text-gray-50 hover:font-bold ${pathname=="/admin" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faGaugeHigh} width={20} height={20} />
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    <Link href={'/admin/students'} className={`text-gray-50 hover:font-bold ${pathname=="/admin/students" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faUsersLine} width={20} height={20} />
                            <span>Students</span>
                        </div>
                    </Link>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faChalkboardTeacher} width={20} height={20} />
                            <span>Teachers</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faUsersBetweenLines} width={20} height={20} />
                            <span>Parents</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faSchool} width={20} height={20} />
                            <span>Classes</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faBookOpen} width={20} height={20} />
                            <span>Subjects</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faFile} width={20} height={20} />
                            <span>Examinations</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faClipboard} width={20} height={20} />
                            <span>Attendance</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faCircleDollarToSlot} width={20} height={20} />
                            <span>Fees</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faCalendarDays} width={20} height={20} />
                            <span>Events</span>
                        </div>
                    </div>

                    <div className="text-gray-50 p-2 rounded-l text-sm flex justify-between">
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faCalendarCheck} width={20} height={20} />
                            <span>Academic Calendar</span>
                        </div>
                    </div>

                </div>
            </div>

            <button className="py-2 px-2 rounded-full bg-blue-500 border-2 border-[#f2f2f2] hover:bg-blue-700 absolute bottom-4 -right-3 flex items-center justify-center text-white">
                <FontAwesomeIcon className="text-xl" icon={faCaretDown} width={20} height={20} />
            </button>

        </div>
    )
}