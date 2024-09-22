"use client";
import { useState, useRef, useEffect } from "react";
import { useSidebar } from "@/providers/sidebarProvider";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen, faCalendarCheck, faCalendarDays, faCaretDown, faChalkboardTeacher, faCircleDollarToSlot, faClipboard, faFile, faGaugeHigh, faSchool, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const AdminSidebar = () => {
    const pathname = usePathname();
    const { openSidebar } = useSidebar();

    const containerRef = useRef(null);

    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const scrollDown = () => {
        const container = containerRef.current;
        container.scrollTop += 100; // Scroll down by 100px
    };

    const scrollUp = () => {
        const container = containerRef.current;
        container.scrollTop -= 100; // Scroll up by 100px
    };

    // Function to check if the user is at the top or bottom of the scroll container
    const handleScroll = () => {
        const container = containerRef.current;
        const { scrollTop, scrollHeight, clientHeight } = container;

        // Check if the user is at the top
        setIsAtTop(scrollTop === 0);

        // Check if the user is at the bottom
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    };

    // Attach the scroll event listener
    useEffect(() => {
        const container = containerRef.current;
        container.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`bg-black w-[250px] shrink-0 relative flex flex-col h-full ${openSidebar && 'hidden'}`}>
            <div className="flex gap-1 shrink-0 mt-2 text-gray-100 items-center pl-6 font-bold p-2">
                <Image
                    className="w-10 h-10 p-0.5 border rounded-full border-blue-600"
                    src="/logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                />
                <h3>ECOLE RONSARD</h3>
            </div>

            <div ref={containerRef} className="mt-10 pl-6 pr-3 flex-1 no-scrollbar overflow-auto">
                <p className="text-xs font-bold text-gray-300">MENU</p>
                <div className="mt-5 flex flex-col gap-3">

                    <Link href={'/admin'} className={`text-gray-50 hover:font-bold ${pathname == "/admin" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faGaugeHigh} width={20} height={20} />
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    <Link href={'/admin/students'} className={`text-gray-50 hover:font-bold ${pathname == "/admin/students" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faUsersLine} width={20} height={20} />
                            <span>Students</span>
                        </div>
                    </Link>

                    <Link href={'/admin/teachers'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/teachers") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faChalkboardTeacher} width={20} height={20} />
                            <span>Teachers</span>
                        </div>
                    </Link>

                    <Link href={'/admin/parents'} className={`text-gray-50 hover:font-bold ${pathname == "/admin/parents" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faUsersBetweenLines} width={20} height={20} />
                            <span>Parents</span>
                        </div>
                    </Link>

                    <Link href={'/admin/classes'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/classes") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faSchool} width={20} height={20} />
                            <span>Classes</span>
                        </div>
                    </Link>

                    <Link href={'/admin/subjects'} className={`text-gray-50 hover:font-bold ${pathname == "/admin/subjects" && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faBookOpen} width={20} height={20} />
                            <span>Subjects</span>
                        </div>
                    </Link>

                    <Link href={'/admin/fees'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/fees") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faCircleDollarToSlot} width={20} height={20} />
                            <span>Fees</span>
                        </div>
                    </Link>

                    <Link href={'/admin/exams'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/exams") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faFile} width={20} height={20} />
                            <span>Examinations</span>
                        </div>
                    </Link>

                    <Link href={'/admin/attendance'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/attendance") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faClipboard} width={20} height={20} />
                            <span>Attendance</span>
                        </div>
                    </Link>

                    <Link href={'/admin/calendar'} className={`text-gray-50 hover:font-bold ${pathname.includes("/admin/calendar") && 'bg-gray-600'} rounded p-2 text-sm flex justify-between`}>
                        <div className="flex items-center justify-between gap-1.5">
                            <FontAwesomeIcon icon={faCalendarDays} width={20} height={20} />
                            <span>Academic Calendar</span>
                        </div>
                    </Link>

                </div>
            </div>

            <div className="absolute bottom-4 -right-3 flex flex-col gap-2">
                {!isAtTop && (
                    <button
                        type="button"
                        onClick={scrollUp}
                        className="py-2 px-2 rounded-full bg-black border-2 border-[#f2f2f2] hover:bg-gray-800 flex items-center justify-center text-white"
                    >
                        <FontAwesomeIcon className="text-lg" icon={faCaretUp} width={20} height={20} />
                    </button>
                )}


                <button
                    type="button"
                    onClick={scrollDown}
                    className="py-2 px-2 rounded-full bg-black border-2 border-[#f2f2f2] hover:bg-gray-800 flex items-center justify-center text-white"
                >
                    <FontAwesomeIcon className="text-lg" icon={faCaretDown} width={20} height={20} />
                </button>

            </div>
        </div>
    );
};
