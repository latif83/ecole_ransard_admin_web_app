"use client";
import LogOut from "@/components/logout";
import { faArrowLeftLong, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children, params }) {
  const { classSectionId } = params;

  const pathname = usePathname();

  const router = useRouter();

  const [userIdentity, setUserIdentity] = useState("");

  const [ClassSection,setClassSection] = useState("")

  useEffect(() => {
    setUserIdentity(localStorage.getItem("userIdentity"));
    setClassSection(localStorage.getItem("ClassSection"));
  }, []);

  const [dropMenu, setDropMenu] = useState(false);

  const [logout, setLogout] = useState(false);

  return (
    <div>
      {logout && <LogOut setLogOut={setLogout} />}

      <div className="sm:px-10 px-2 pt-5 bg-gray-600">
        <div className="flex justify-between relative">
          <div className="flex gap-1.5 justify-center items-center">
            <Image
              width={500}
              height={500}
              style={{ width: "50px", height: "50px" }}
              className="object-cover rounded-full"
              src={"/logo.png"}
              alt="Logo"
            />
            <div>
              <span className="text-white font-bold">ECOLE RONSARD</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => setDropMenu((prev) => !prev)}
              className="inline-flex w-full justify-center text-white gap-x-1.5 rounded-t-md px-3 py-2 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              {userIdentity}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-mr-1 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>

          {dropMenu && (
            <div className="absolute flex justify-end -bottom-12 mt-2 p-2 w-full left-0">
              <div className="bg-white w-[200px] rounded-md p-3">
                <button
                  onClick={() => setLogout(true)}
                  className="flex items-center justify-center w-full block gap-2 text-red-600"
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.replace("/teacher")}
              className="p-2 px-3 bg-gray-100 h-full rounded-t-md hover:bg-red-200 text-gray-700"
            >
              <FontAwesomeIcon
                className="text-sm"
                icon={faArrowLeftLong}
                width={20}
                height={20}
              />
            </button>
            <span className="text-gray-100">{ClassSection}</span>
          </div>
          <div className="flex gap-8 items-center font-medium">
            <Link
              href={`/teacher/dashboard/${classSectionId}`}
              className={`p-2 rounded-t-md ${
                pathname == `/teacher/dashboard/${classSectionId}`
                  ? "bg-gray-100 text-gray-700"
                  : "text-white"
              }`}
            >
              Overview
            </Link>
            <Link
              href={`/teacher/dashboard/${classSectionId}/assessments`}
              className={`p-2 rounded-t-md ${
                pathname.includes(
                  `/teacher/dashboard/${classSectionId}/assessments`
                )
                  ? "bg-gray-100 text-gray-700"
                  : "text-white"
              }`}
            >
              Assessments
            </Link>
            <Link
              href={`/teacher/dashboard/${classSectionId}/students`}
              className={`p-2 rounded-t-md ${
                pathname.includes(
                  `/teacher/dashboard/${classSectionId}/students`
                )
                  ? "bg-gray-100 text-gray-700"
                  : "text-white"
              }`}
            >
              Students
            </Link>
            <Link
              href={`/teacher/dashboard/${classSectionId}/grades`}
              className={`p-2 rounded-t-md ${
                pathname.includes(`/teacher/dashboard/${classSectionId}/grades`)
                  ? "bg-gray-100 text-gray-700"
                  : "text-white"
              }`}
            >
              Grades
            </Link>
          </div>
        </div>
      </div>

      <div className="px-10 pt-5">{children}</div>
    </div>
  );
}
