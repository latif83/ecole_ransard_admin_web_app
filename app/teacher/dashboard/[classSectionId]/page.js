import { faArrowLeftLong, faBook, faCalendar, faMessage, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function TeacherDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow-md flex justify-between items-center gap-2 rounded-md p-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Number of Students</h2>
          <p className="text-gray-600 text-xl">25</p>
          </div>
          <FontAwesomeIcon icon={faUsers} size="2x" className="text-gray-600" />
          
        </div>
        <div className="bg-white shadow-md flex justify-between items-center gap-2 rounded-md p-4">
        <div>
          <h2 className="text-lg font-bold mb-2">Assigned Subjects</h2>
          <p className="text-gray-600 text-xl">5</p>
          </div>
          <FontAwesomeIcon icon={faBook} size="2x" className="text-gray-600" />
          
        </div>
      </div>
    </div>
  );
}