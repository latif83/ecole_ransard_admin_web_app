import { AdminSidebar } from "@/components/admin/sidebar"
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function RootLayout({ children }) {
    return (
        <div className="flex gap-0.5 h-svh overflow-hidden">

            <AdminSidebar />

            <div className="flex-1 flex flex-col">
                <div className="bg-black flex shrink-0 justify-between items-center text-white p-3 py-4">
                    <div>
                        <FontAwesomeIcon icon={faBars} width={20} height={20} />
                    </div>

                    <div className="text-white text-sm flex gap-1.5 items-center">
                        <FontAwesomeIcon className="text-3xl" icon={faUserCircle} width={30} height={30} />
                        <div>
                            <h3>
                                Abdul-Latif Mohammed
                            </h3>
                            <p className="text-xs">
                                Administrator
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-3 flex-1 overflow-auto">
                    {children}
                </div>

            </div>
        </div>
    )
}