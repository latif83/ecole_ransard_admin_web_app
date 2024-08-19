"use client"
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LogOut from "@/components/logout";

export default function TeacherDashboard() {

  const [loading, setLoading] = useState(false)

  const [sections, setSections] = useState([])

  const router = useRouter()

  const [userIdentity, setUserIdentity] = useState("")

  useEffect(() => {

    if (!localStorage.getItem("identity")) {
      toast.error("Please login to access this page!")
      router.replace('/')
      return
    }

    setUserIdentity(localStorage.getItem("userIdentity"))

    const getAssignedCourses = async () => {
      setLoading(true)
      try {

        const teacherId = localStorage.getItem("identity")

        const response = await fetch(`/api/teachers/${teacherId}/assigned/classSections`)

        const responseData = await response.json()

        if (!response.ok) {
          toast.error(responseData.message)
          return
        }

        setSections(responseData)

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }


    }

    getAssignedCourses()

  }, [])

  const [dropMenu, setDropMenu] = useState(false)

  const [logout, setLogout] = useState(false);

  return (
    <div>

      {logout && <LogOut setLogOut={setLogout} />}

      <div className="sm:px-10 px-2 py-5 bg-gray-600">

        <div className="flex relative justify-between">
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
              <span className="text-white font-bold">
                ECOLE RONSARD
              </span>
            </div>

          </div>

          <div>
            <button onClick={() => setDropMenu(prev => !prev)} className="inline-flex w-full justify-center text-white gap-x-1.5 rounded-t-md px-3 py-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              {userIdentity}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="-mr-1 h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

          </div>
          {dropMenu && <div className="absolute z-50 flex justify-end -bottom-12 mt-2 p-2 w-full left-0">
            <div className="bg-white w-[200px] border rounded-md p-3">
              <button onClick={() => setLogout(true)} className="flex items-center justify-center w-full block gap-2 text-red-600">
                <FontAwesomeIcon icon={faSignOut} />
                <span>Log Out</span>
              </button>
            </div>
          </div>}



        </div>


        <div className="grid grid-cols-2 gap-2 items-center mt-8 text-gray-100">

          <div>
            <h1 className="text-sm font-bold">
              Welcome to the,
            </h1>
            <p className="text-2xl font-bold">
              Teacher's Dashboard
            </p>

          </div>

          <form class="w-full mx-auto">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Assigned Classes..." required />
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
          </form>
        </div>


      </div>

      <div className="sm:px-10 px-2 py-5">

        <h1 className="text-xl font-bold">
          Assigned Classes
        </h1>
        <p className="text-sm p-0 m-0">
          Click on any of the assigned classes to manage!
        </p>



        {loading ? <div className="mt-3 flex flex-col justify-center items-center gap-2">
          <FontAwesomeIcon spin icon={faSpinner} width={30} height={30} />
          <p>Loading data...</p>
        </div> : sections.length < 1 ? <div className="mt-3 flex flex-col justify-center items-center gap-2">
          <p>No Classes Assigned!</p>
        </div> : <div className="grid grid-cols-4 gap-4 mt-3">


          {sections.map((session) => (<div className="border shadow-md p-2 rounded-lg">
            <p>{session.className} ({session.classSectionName})</p>

            <div className="flex justify-end">
              <Link onClick={()=>localStorage.setItem("ClassSection",`${session.className} (${session.classSectionName})`)} href={`/teacher/dashboard/${session.classSessionId}`} className="p-1.5 rounded bg-gray-500 text-gray-100 hover:bg-gray-600 mt-2 flex items-center gap-1.5">
                <span>Manage</span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>

              </Link>
            </div>
          </div>))}

        </div>}

      </div>
    </div>
  );
}
