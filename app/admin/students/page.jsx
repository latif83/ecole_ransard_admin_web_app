"use client"
import { faPlusCircle, faSpinner, faUserTie, faTimes, faUsersBetweenLines, faUsersLine, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NewStudent from "./NewStudent"; // Assume you have a NewStudent component
import EditStudent from "./EditStudent"; // Assume you have an EditStudent component
import DeleteStudent from "./DeleteStudent"; // Assume you have a DeleteStudent component
import Image from "next/image";

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export default function Students() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addStudent, setAddStudent] = useState(false);
    const [editStudent, setEditStudent] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [studentId, setStudentId] = useState(null);

    const [classId, setClassId] = useState("0");
    const [classSectionsId, setClassSectionId] = useState("0");

    const [classLoading, setClassLoading] = useState(false)
    const [classes, setClasses] = useState([])

    const [classSectionsLoading, setClassSectionsLoading] = useState(false)
    const [classSections, setClassSections] = useState([])

    const [fetchData, setFetchData] = useState(false)

    const [searchTerm, setSearchTerm] = useState("");

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

    useEffect(() => {
        const fetchClassSections = async () => {
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

        if (classId) {
            fetchClassSections()
        }

    }, [classId])

    useEffect(() => {
        setFetchData(true)
    }, [classId, classSectionsId])

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setSearchTerm("")
                const response = await fetch(`/api/students?classId=${classId}&classSectionsId=${classSectionsId}`);
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setStudents(data.students);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Error fetching students, please try again!");
                setLoading(false);
            }
        };

        if (fetchData) {
            fetchStudents();
            setFetchData(false)
        }

    }, [fetchData]);

    useEffect(() => {
        // Filter students based on search term
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = students.filter((student) =>
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredStudents(filtered);
    }, [searchTerm, students]);

    // Function to print the students list
    const printList = () => {
        window.print();
    };

    return (
        <div>
            {addStudent && <NewStudent setAddStudent={setAddStudent} setGData={setFetchData} />}
            {editStudent && (
                <EditStudent
                    setEditStudent={setEditStudent}
                    setGData={setFetchData}
                    studentData={studentData}
                />
            )}
            {deleteStudent && (
                <DeleteStudent
                    setDeleteStudent={setDeleteStudent}
                    setGData={setStudents}
                    studentId={studentId}
                />
            )}

            <div className="flex items-center gap-2">
                <FontAwesomeIcon className="text-xl" icon={faUsersLine} width={25} height={25} />
                <h1>Students</h1>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="dept"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Class
                    </label>
                    <select
                        id="class"
                        name="class"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={classId}
                        onChange={(e) => setClassId(e.target.value)}
                    >
                        <option value="">Select Class</option>
                        <option value="0">All Classses</option>
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
                        htmlFor="dept"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Section
                    </label>
                    <select
                        id="class"
                        name="class"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={classSectionsId}
                        onChange={(e) => setClassSectionId(e.target.value)}
                    >
                        <option value="">Select Section</option>
                        <option value="0">All Sections</option>
                        {classSectionsLoading ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Sections...{" "}
                            </option>
                        ) : classSections.length > 0 ? (
                            classSections.map((section) => (
                                <option value={section.id}>{section.sectionName}</option>
                            ))
                        ) : (
                            <option>No sections found.</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <div className="p-4 bg-gray-800 flex justify-between">
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
                                placeholder="Search students"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setAddStudent(true)}
                            className="p-2 rounded-lg bg-gray-50 flex gap-2 items-center hover:bg-gray-200 text-sm"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                            New Student
                        </button>
                        <button
                            onClick={() => printList()}
                            className="p-2 rounded bg-blue-600 text-white flex gap-2 items-center hover:bg-blue-700 text-sm"
                        >
                            <FontAwesomeIcon icon={faPrint} />
                            Print
                        </button>
                    </div>
                </div>
                <div className="printable-area">
                    <div className="mt-12 mb-5 text-center pb-2 border-b-2 border-red-600 print-display">
                        <h1 className="font-bold text-xl">ECOLE RONSARD</h1>
                        <h3 className="text-sm">
                            Students List.
                        </h3>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 print-hide">
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
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center flex items-center gap-2"
                                        >
                                            <Image src={!student?.passportImage ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpoc3AzZDFsZmRta2JyN2RkZDYxbWN4eWVrMWFqdG5yNWtibDVpZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uIJBFZoOaifHf52MER/giphy.gif' : student?.passportImage} className="w-12 h-12 object-cover p-0.5 border border-blue-600 rounded" width={500} height={500} />
                                            <span>
                                                {student.firstName} {student.lastName}
                                            </span>
                                        </th>
                                        <td className="px-6 py-4 text-center">{calculateAge(student.birthDate)}</td>
                                        <td className="px-6 py-4 text-center">{student.class.className} ({student.ClassSections.sectionName})</td>
                                        <td className="px-6 py-4 text-center">{student.address}</td>
                                        <td className="px-6 py-4 print-hide text-center">
                                            <span
                                                onClick={() => {
                                                    setStudentData(student);
                                                    setEditStudent(true);
                                                }}
                                                className="font-medium text-blue-600 hover:underline cursor-pointer mr-2"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                onClick={() => {
                                                    setStudentId(student.id);
                                                    setDeleteStudent(true);
                                                }}
                                                className="font-medium hover:underline text-red-600 hover:underline cursor-pointer"
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
