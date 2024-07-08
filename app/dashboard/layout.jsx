import { SideBar } from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-svh overflow-hidden flex gap-1">
        <div className="w-[250px] bg-gray-800 shrink-0">
            <SideBar />
        </div>
        <div className="w-full">
            {children}
        </div>
    </div>
  );
}
