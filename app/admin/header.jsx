"use client"
import { useSidebar } from "@/providers/sidebarProvider"
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const AdminHeader = ({ adminUser,setLogOut }) => {

    const {openSidebar,setOpenSidebar} = useSidebar()

    return (
        <div className="bg-black flex shrink-0 justify-between items-center text-white p-3 py-4">
            <div>
                <button onClick={()=>setOpenSidebar(!openSidebar)} type="button">
                    <FontAwesomeIcon icon={faBars} width={20} height={20} />
                </button>
            </div>

            <div className="text-white text-sm flex relative gap-1.5 items-center">
                <FontAwesomeIcon className="text-3xl" icon={faUserCircle} width={30} height={30} />
                <div>
                    <h3>
                        {adminUser}
                    </h3>
                    <p className="text-xs">
                        Administrator
                    </p>
                </div>

                <div className="absolute -bottom-8 right-0">
                    <button type="button" onClick={() => setLogOut(true)} className="text-red-600 flex p-2 bg-gray-100 hover:bg-red-600 hover:text-white transition duration-500 border border-red-600 rounded-lg justify-center items-center gap-2 w-full group text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                            />
                        </svg>

                        <span className="opacity-0 hidden group-hover:inline-block group-hover:opacity-100 transition duration-500">
                            Log Out
                        </span>
                    </button>

                </div>
            </div>
        </div>
    )
}