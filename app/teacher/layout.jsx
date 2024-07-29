import { Head } from "./head";
import { SideBar } from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-svh overflow-hidden flex">
        <div className="w-[250px] relative bg-gray-800 shrink-0">
            <SideBar />
            <div className="absolute top-0 left-1.5 w-full h-full border-r-2 border-gray-800 z-0">

            </div>
        </div>
        <div className="w-full flex flex-col pl-2">
        <Head />
            <div className="p-3 flex-1 pt-6 overflow-y-auto">
            {children}
            </div>
        </div>
    </div>
  );
}
