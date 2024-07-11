"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Head } from "./head";

export const SideBar = () => {

    const pathname = usePathname();

    return (
        <div className="relative z-50">

            <div className="my-5 logo text-[#f2f2f2] flex justify-center items-center gap-1 flex-col">
                <Image src={'/logo.png'} width={80} height={80} className="p-0.2 border-2 border-[#f2f2f2] rounded-full" />
                <h1 className="font-bold text-[#f2f2f2]" style={{ letterSpacing: '.2em' }}>ECOLE RONSARD</h1>
            </div>

            <div className="flex flex-col ml-9 gap-4 justify-center items-center mt-8">
                <Link href={'/dashboard'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                    </svg>

                    Overview
                </Link>
                <Link href={'/dashboard/classes'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard/classes' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>


                    Classes
                </Link>
                <Link href={'/dashboard/parents'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard/parents' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    Parents
                </Link>
                <Link href={'/dashboard/students'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard/students' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>

                    Students
                </Link>
                <Link href={'/dashboard/attendance'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard/attendance' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>

                    Attendance
                </Link>
                <Link href={'/dashboard/notifications'} className={`w-full text-center p-1.5 rounded-l flex items-center pl-4 gap-1.5 ${pathname == '/dashboard/notifications' ? 'bg-[#f2f2f2] text-gray-800' : 'text-[#f2f2f2] hover:font-bold hover:text-red-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>

                    Notifications
                </Link>

            </div>

        </div>
    )
}