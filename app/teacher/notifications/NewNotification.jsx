import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const NewNotification = ({ setNewNotification, setFetchData }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(""); // State for date field
    const [sendTo, setSendTo] = useState("all"); // State for sendTo option: all, student, class
    const [students, setStudents] = useState([]); // State for students fetched from backend
    const [classes, setClasses] = useState([]); // State for classes fetched from backend
    const [selectedClass, setSelectedClass] = useState(""); // State for selected class
    const [selectedStudent, setSelectedStudent] = useState(""); // State for selected student

    // Fetch classes from backend on component mount
    useEffect(() => {
        fetchClasses();
    }, []);

    const [classesLoading, setClassesLoading] = useState(false)
    const [studentsLoading, setStudentsLoading] = useState(false)

    const fetchClasses = async () => {
        setClassesLoading(true)
        try {
            // Replace with your actual API endpoint to fetch classes
            const response = await fetch("/api/classes");

            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            setClasses(responseData);
        } catch (error) {
            console.error("Error fetching classes:", error);
            // Handle error (e.g., show error message)
            toast.error("Failed to fetch classes. Please try again later.");
        } finally {
            setClassesLoading(false)
        }
    };

    // Fetch students for selected class
    const fetchStudents = async (classId) => {
        setStudentsLoading(true)
        try {
            // Replace with your actual API endpoint to fetch students by classId
            const response = await fetch(`/api/students/classes/${classId}`);

            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            setStudents(responseData.students);
        } catch (error) {
            console.error(`Error fetching students for class ${classId}:`, error);
            // Handle error (e.g., show error message)
            toast.error("Failed to fetch students. Please try again later.");
        } finally {
            setStudentsLoading(false)
        }
    };

    const [sendData, setSendData] = useState(false)

    const handleSubmit = async () => {
        setSendData(true)
    };

    useEffect(() => {
        const submitNotification = async () => {
            setLoading(true);

            // Construct the notification data
            const notificationData = {
                title,
                content,
                date,
                sendTo,
                studentId: sendTo === "student" ? selectedStudent : null,
                classId: sendTo === "class" ? selectedClass : null,
            };

            try {
                // Perform API call to submit the notification
                // Replace with your actual API endpoint and method
                const response = await fetch("/api/notification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(notificationData),
                });

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                // Reset form state
                setTitle("");
                setContent("");
                setDate(""); // Reset date field
                setSendTo("all");
                setSelectedClass("");
                setSelectedStudent("");

                toast.success(responseData.message)
                setFetchData(true)
                setNewNotification(false)

            } catch (error) {
                console.error("Error creating notification:", error);

                toast.error("Error creating notification. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (sendData) {
            submitNotification()
            setSendData(false)
        }

    }, [sendData])

    const handleSendToChange = (e) => {
        setSendTo(e.target.value);
        // Reset selectedClass and selectedStudent when sendTo option changes
        setSelectedClass("");
        setSelectedStudent("");
    };

    useEffect(() => {
        sendTo == "student" && fetchStudents(selectedClass)
    }, [selectedClass])

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-2xl mx-auto p-6 mt-5 h-auto shrink-0 grow-0 rounded-md shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">New Notification</h2>
                    <FontAwesomeIcon
                        icon={faTimes}
                        width={15}
                        height={15}
                        className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer"
                        color="red"
                        onClick={() => {
                            setNewNotification(false)
                        }}
                    />
                </div>
                <form action={handleSubmit}>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="title"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Title
                        </label>
                    </div>
                    <div className="relative z-0 w-full group mb-5">
                        <textarea
                            name="content"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            rows="2"
                            required
                        />
                        <label
                            htmlFor="content"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Content
                        </label>
                    </div>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="datetime-local"
                            name="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Date
                        </label>
                    </div>
                    <div className="mb-5">
                        <div className="flex items-center mb-5">
                            <input
                                type="radio"
                                id="sendToAll"
                                name="sendTo"
                                value="all"
                                checked={sendTo === "all"}
                                onChange={handleSendToChange}
                                className="mr-2"
                            />
                            <label htmlFor="sendToAll" className="text-sm text-gray-600">
                                Send to all students
                            </label>
                        </div>
                        <div className="mb-5">
                            <div className="flex items-center ">
                                <input
                                    type="radio"
                                    id="sendToStudent"
                                    name="sendTo"
                                    value="student"
                                    checked={sendTo === "student"}
                                    onChange={handleSendToChange}
                                    className="mr-2"
                                />
                                <label htmlFor="sendToStudent" className="text-sm text-gray-600">
                                    Send to single student
                                </label>
                            </div>
                            {sendTo === "student" && (
                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
                                    <div className="relative z-0 w-full group">
                                        <select
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-gray-300 border rounded-md"
                                        >
                                            <option value="">Select Class</option>
                                            {classesLoading ? (
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
                                    <div className="relative z-0 w-full group">
                                        <select
                                            value={selectedStudent}
                                            onChange={(e) => setSelectedStudent(e.target.value)}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-gray-300 border rounded-md"
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
                                                    <option key={student.id} value={student.id}>
                                                        {student.firstName} {student.lastName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>No Students found.</option>
                                            )}
                                        </select>
                                    </div></div>
                            )}
                        </div>
                        <div className="mb-8">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="sendToClass"
                                    name="sendTo"
                                    value="class"
                                    checked={sendTo === "class"}
                                    onChange={handleSendToChange}
                                    className="mr-2"
                                />
                                <label htmlFor="sendToClass" className="text-sm text-gray-600">
                                    Send to whole class
                                </label>
                            </div>
                            {sendTo === "class" && (
                                <div className="relative z-0 w-full group mt-2">
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Class</option>
                                        {classesLoading ? (
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
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 disabled:bg-blue-200 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Submit
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
