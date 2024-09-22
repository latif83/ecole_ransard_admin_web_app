"use client"
import { AdminSidebar } from "@/components/admin/sidebar"
import LogOut from "@/components/logout"
import SidebarProvider from "@/providers/sidebarProvider"
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { AdminHeader } from "./header"

export default function RootLayout({ children }) {

    const [adminUser, setAdminUser] = useState("")

    const [logOut, setLogOut] = useState(false)

    useEffect(() => {
        setAdminUser(localStorage.getItem("userIdentity"))
    }, [])

    return (
        <SidebarProvider>
            <div className="flex gap-0.5 h-svh overflow-hidden">

                {logOut && <LogOut setLogOut={setLogOut} />}

                <AdminSidebar />

                <div className="flex-1 flex flex-col">
                    <AdminHeader adminUser={adminUser} setLogOut={setLogOut} />

                    <div className="p-3 flex-1 overflow-auto">
                        {children}
                    </div>

                </div>
            </div>
        </SidebarProvider>
    )
}