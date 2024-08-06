"use client"
import { faArrowLeftLong, faCirclePlus, faEdit, faPlay, faSpinner, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import NewEvent from "./newEvent"
import EditTerm from "./editTerm"
import { EndAcademicTerm } from "./endAcademicTerm"
import { ActivateAcademicTerm } from "./activateAcademicTerm"
import EditEvent from "./editEvent"

export default function AcademicEvents({ params }) {

    const { termId } = params

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState([])

    const [selectedEventData,setSelectedEventData] = useState()

    const router = useRouter()

    const [fetchData, setFetchData] = useState(true)

    // Function to get the status based on event date
    const getEventStatus = (eventDate) => {
        const today = new Date();
        const eventDateObj = new Date(eventDate);

        // Normalize dates to only compare the date part (ignoring time)
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const eventDateStart = new Date(eventDateObj.setHours(0, 0, 0, 0));

        // Compare event date with today's date
        if (eventDateStart < todayStart) {
            return 'Past';
        } else if (eventDateStart.getTime() === todayStart.getTime()) {
            return 'Ongoing';
        } else {
            return 'Upcoming';
        }
    };

    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/calendar/term/${termId}`)

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.error)
                    return
                }

                setData(responseData.academicTerm)

            }
            catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        if (fetchData) {
            getData()
            setFetchData(false)
        }

    }, [fetchData])

    const [addEvent, setAddEvent] = useState(false)
    const [editTerm, setEditTerm] = useState(false)

    const [endAcademicTerm, setEndAcademicTerm] = useState(false)

    const [startAcademicTerm,setStartAcademicTerm] = useState(false)

    const [editEvent,setEditEvent] = useState(false)

    return (
        <div>
            {addEvent && <NewEvent setAddEvent={setAddEvent} termId={termId} setFetchData={setFetchData} />}
            {editTerm && <EditTerm setEditTerm={setEditTerm} data={data} setFetchData={setFetchData} />}

            {endAcademicTerm && <EndAcademicTerm setEndAcademicTerm={setEndAcademicTerm} setFetchData={setFetchData} termId={termId} />}

            {startAcademicTerm && <ActivateAcademicTerm setStartAcademicTerm={setStartAcademicTerm} setFetchData={setFetchData} termId={termId} />}

            {editEvent && <EditEvent setEditEvent={setEditEvent} data={selectedEventData} setFetchData={setFetchData} termId={termId} />}

            <div className="flex items-center gap-1.5">
                <button onClick={() => router.back()} className="bg-red-200 text-gray-800 hover:bg-red-600 hover:text-white rounded-md p-2">
                    <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} className="text-lg" />
                </button>
                <span className="text-sm">
                    {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : data.termName}
                </span>
            </div>

            <div className="grid grid-cols-3 mt-3">
                <div>
                    <h3 className="text-xs text-red-600">
                        Start Date:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : new Date(data.startDate).toDateString()}
                    </p>
                </div>

                <div>
                    <h3 className="text-xs text-red-600">
                        End Date:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : new Date(data.endDate).toDateString()}
                    </p>
                </div>

                <div>
                    <h3 className="text-xs text-red-600">
                        Status:
                    </h3>
                    <p className="text-sm">
                        {loading ? <FontAwesomeIcon icon={faSpinner} width={20} height={20} className="text-lg" spin /> : data.status}
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
                {data.status == "Inactive" && <button onClick={() => setEditTerm(true)} className="p-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-800 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faEdit} width={15} height={15} />
                    <span>
                        Edit
                    </span>
                </button>}
                {data.status == "Active" && <button onClick={() => setEndAcademicTerm(true)} className="p-2 rounded-md bg-red-600 text-sm text-white hover:bg-red-800 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faStop} width={15} height={15} />
                    <span>
                        End Academic Term
                    </span>
                </button>}

                {data.status == "Pending" && <button onClick={() => setStartAcademicTerm(true)} className="p-2 rounded-md bg-green-600 text-sm text-white hover:bg-green-800 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faPlay} width={15} height={15} />
                    <span>
                        Activate Academic Term
                    </span>
                </button>}
            </div>

            <div className="mt-5">

                <div className="flex items-center justify-between pb-1 border-b">
                    <h1 className="text-sm">
                        Events
                    </h1>

                    <button
                        onClick={() => setAddEvent(true)}
                        className="bg-lime-600 text-sm hover:bg-lime-800 text-white rounded-md p-2 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faCirclePlus} width={20} height={20} />
                        <span>
                            New Event
                        </span>
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : data?.events?.length > 0 ? (
                            data?.events?.map((event) => (
                                <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {new Date(event.eventDate).toDateString()}
                                    </th>
                                    <td className="px-6 py-4 text-center">{event.title}</td>
                                    <td className="px-6 py-4 text-center">{event.description}</td>
                                    <td className="px-6 py-4 text-center">{getEventStatus(event.eventDate)}</td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-2">
                                        <span
                                        onClick={()=>{setSelectedEventData(event); setEditEvent(true)}}
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="font-medium text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    No events found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

        </div>
    )
}