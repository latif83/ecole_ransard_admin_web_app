import { faChalkboardTeacher, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {
    return (
        <div className="">

            <div>
                <h1 className="text-lg font-semibold">
                    Admin Dashboard
                </h1>
                <p className="flex gap-1.5 text-sm">
                    <span>
                        Home
                    </span>
                    <span>
                        {'>'}
                    </span>
                    <span className="text-blue-600">
                        Admin
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">

                <div className="bg-blue-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Total Students
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faUsersLine} className="text-2xl" width={30} height={30} />
                        <span>
                            2000
                        </span>
                    </div>

                </div>

                <div className="bg-teal-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Total Teachers
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" width={30} height={30} />
                        <span>
                            500
                        </span>
                    </div>
                </div>

                <div className="bg-green-600 text-white p-4 rounded-md shadow-md">
                    <p>
                        Parents
                    </p>
                    <div className="flex justify-between mt-2">
                        <FontAwesomeIcon icon={faUsersBetweenLines} className="text-2xl" width={30} height={30} />
                        <span>
                            600
                        </span>
                    </div>
                </div>

            </div>

        </div>
    )
}