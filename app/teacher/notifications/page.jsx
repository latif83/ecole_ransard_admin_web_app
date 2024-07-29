"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NewNotification } from "./NewNotification";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditNotification } from "./EditNotification";
import DeleteNotification from "./DeleteNotification";

export default function Notifications() {

  const [notifications, setNotifications] = useState([])
  const [notification,setNotification] = useState({})
  const [notificationId,setNotificationId] = useState()
  const [loading, setLoading] = useState(false)

  const [fetchData,setFetchData] = useState(true)

  const getRecipient = (notification) => {
    if (notification.sendToAll) {
      return "All Students";
    } else if (notification.studentId) {
      // Assuming we fetch student name using studentId
      return `${notification.student.firstName} ${notification.student.lastName}`;
    } else if (notification.classId) {
      // Assuming we fetch class name using classId
      return `${notification.class.className}`;
    }
    return "Unknown";
  };

  const [newNotification, setNewNotification] = useState(false)
  const [editNotification,setEditNotification] = useState(false)
  const [delNotification,setDelNotification] = useState(false)

  useEffect(() => {

    const getNotifications = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/notification`)
        const responseData = await response.json()

        if (!response.ok) {
          toast.error(responseData.message)
          return
        }

        setNotifications(responseData.notifications)

      }
      catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if(fetchData){
    getNotifications()
    setFetchData(false)
    }

  }, [fetchData])

  return (
    <div>
      {newNotification && <NewNotification setNewNotification={setNewNotification} setFetchData={setFetchData} />}
      {editNotification && <EditNotification setEditNotification={setEditNotification} setFetchData={setFetchData} notification={notification} />}
      {delNotification && <DeleteNotification setDelNotification={setDelNotification} setFetchData={setFetchData} notificationId={notificationId} />}
      <h1>Notifications</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="p-4 flex justify-between">
          <div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search notifications"
              />
            </div>
          </div>
          <div className="">
            <button
              onClick={() => setNewNotification(true)}
              className="p-2 rounded-lg bg-gray-800 text-white flex gap-2 items-center hover:bg-gray-600 text-sm"
            >
              <FontAwesomeIcon className="shrink-0" icon={faPlusCircle} width={15} height={15} />
              <span className="shrink-0">New Notification</span>
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Event / Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr className="bg-white border-b hover:bg-gray-50">
              <td colSpan={5} className="px-6 py-4 text-center">
                <FontAwesomeIcon icon={faSpinner} spin /> Loading...
              </td>
            </tr> : notifications.length > 0 ? notifications.map((notification, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  <p>{notification.dateTime ? <><p>{new Date(notification.dateTime).toDateString()}</p><p>@</p><p>{new Date(notification.dateTime).toLocaleTimeString()} </p></> : "N/A"}</p>

                </th>
                <td className="px-6 py-4 font-medium">{notification.title}</td>
                <td className="px-6 py-4">{notification.content}</td>
                <td className="px-6 py-4">{getRecipient(notification)}</td>
                <td className="px-6 py-4">
                  <span className="mr-2 cursor-pointer text-blue-600 hover:underline">
                    Resend
                  </span>
                  <span onClick={()=>{
                    setNotification(notification)
                    setEditNotification(true)
                  }} className="mr-2 cursor-pointer text-blue-600 hover:underline">
                    Edit
                  </span>
                  <span onClick={()=>{
                    setNotificationId(notification.id)
                    setDelNotification(true)
                  }} className="cursor-pointer text-red-600 hover:underline">
                    Delete
                  </span>
                </td>
              </tr>
            )) : <tr className="bg-white border-b hover:bg-gray-50">
              <td colSpan={5} className="px-6 py-4 text-center">
                No data found
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
