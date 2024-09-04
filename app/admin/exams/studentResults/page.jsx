"use client"
import { faArrowLeftLong, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function StudentResults() {

    const router = useRouter()

    const [classId, setClassId] = useState("")
    const [sectionId, setSectionId] = useState("")

    const [studentId, setStudentId] = useState("")

    const [classes, setClasses] = useState([])

    const [classLoading, setClassLoading] = useState(false)

    const [classSectionsLoading, setClassSectionsLoading] = useState(false)
    const [classSections, setClassSections] = useState([])

    const [studentsLoading, setStudentsLoading] = useState(false)
    const [students, setStudents] = useState([])

    useEffect(() => {
        const getClasses = async () => {
            try {
                setClassLoading(true);
                const response = await fetch("/api/classes");
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setClasses(responseData);
                setClassLoading(false);
            } catch (err) {
                console.log(err);
                toast.error("Error retrieving data, please try again!");
            }
        };

        getClasses()
    }, [])

    const fetchClassSections = async (classId) => {
        try {
            setClassSectionsLoading(true);
            const response = await fetch(`/api/classes/${classId}/sections`);
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message);
                return;
            }
            setClassSections(responseData.classSections);
        } catch (err) {
            console.log(err);
            toast.error("Error retrieving data, please try again!");
        } finally {
            setClassSectionsLoading(false)
        }
    }

    const fetchStudents = async (sectionId) => {
        try {
            setStudentsLoading(true);
            const response = await fetch(`/api/students/classsection/${sectionId}`);
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message);
                return;
            }
            setStudents(responseData.students);

        } catch (err) {
            console.log(err);
            toast.error("Error retrieving students, please try again!");
        } finally {
            setStudentsLoading(false);
        }
    };


    return (
        <div>

            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Student Results
                    </h1>
                    <p className="flex gap-1.5 text-sm">
                        <span>
                            Home
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span>
                            Exams
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span className="text-blue-600">
                            Students Results
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-5 grid gap-5 grid-cols-3">
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Class
                    </label>
                    <select
                        id="classId"
                        name="classId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={classId}
                        onChange={(e) => {
                            setClassId(e.target.value);
                            fetchClassSections(e.target.value)
                        }}
                    >
                        <option value="">Select Class</option>
                        {classLoading ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Classes...{" "}
                            </option>
                        ) : classes.length > 0 ? (
                            classes.map((clas) => (
                                <option value={clas.id}>{clas.className}</option>
                            ))
                        ) : (
                            <option>No classes found.</option>
                        )}
                    </select>
                </div>
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Class Section
                    </label>
                    <select
                        id="sectionId"
                        name="sectionId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={sectionId}
                        onChange={(e) => {
                            setSectionId(e.target.value);
                            fetchStudents(e.target.value)
                        }}
                    >
                        <option value="">Select Class Section</option>
                        {classSectionsLoading ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Class Sections...{" "}
                            </option>
                        ) : classSections?.length > 0 ? (
                            classSections?.map((section) => (
                                <option value={section.id}>{section.sectionName}</option>
                            ))
                        ) : (
                            <option>No sections found.</option>
                        )}
                    </select>
                </div>
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="studentId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Student
                    </label>
                    <select
                        id="studentId"
                        name="studentId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    >
                        <option value="">Select Student</option>
                        {studentsLoading ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Students...{" "}
                            </option>
                        ) : students.length > 0 ? (
                            students.map((student) => (
                                <option value={student.id}>{student.firstName} {student.lastName}</option>
                            ))
                        ) : (
                            <option>No students found.</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-xs text-red-600 my-3">
                    Select a student above to view results
                </h3>

                <button className="bg-blue-600 rounded p-3 text-sm text-white">
                    View Results
                </button>
            </div>

        </div>
    )
}