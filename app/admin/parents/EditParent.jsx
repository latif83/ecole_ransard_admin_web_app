import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faPlusCircle, faSave, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditParent({ setEditParent, setGData, parentData }) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        id: parentData.id,
        firstName: parentData.firstName,
        lastName: parentData.lastName,
        email: parentData.email,
        phone: parentData.phone,
        address: parentData.address,
        students: parentData.students.length > 0 ? parentData.students : [{ classId: "", studentId: "" }],
    });

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const [classLoading, setClassLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);
    const [students, setStudents] = useState([]);

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
                toast.error("Error retrieving classes, please try again!");
            }
        };
        getClasses();
    }, []);

    const handleClassChange = async (classId) => {
        if (!classId) {
            setStudents([]);
            return;
        }

        try {
            setStudentLoading(true);
            const response = await fetch(`/api/students/classes/${classId}`);
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message);
                return;
            }
            setStudents(responseData.students);
            setStudentLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Error retrieving students, please try again!");
        }
    };

    const handleAddStudent = () => {
        setFormData((prevData) => ({
            ...prevData,
            students: [...prevData.students, { classId: "", studentId: "" }],
        }));
    };

    const handleRemoveStudent = (index) => {
        setFormData((prevData) => {
            const updatedStudents = [...prevData.students];
            updatedStudents.splice(index, 1);
            return { ...prevData, students: updatedStudents };
        });
    };

    const handleStudentChange = (index, event) => {
        const { name, value } = event.target;
        setFormData((prevData) => {
            const updatedStudents = [...prevData.students];
            updatedStudents[index][name] = value;
            return { ...prevData, students: updatedStudents };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/parents`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message);
                setLoading(false);
                return;
            }
            toast.success(responseData.message);
            setEditParent(false);
            setGData(true); // Trigger a data refresh
        } catch (err) {
            console.log(err);
            toast.error("Error updating parent, please try again!");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white w-full max-w-3xl mx-auto mt-5 p-6 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Parent</h2>
                    <button
                        className="text-red-500 hover:bg-gray-300 p-1.5 rounded-md"
                        onClick={() => setEditParent(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} width={15} height={15} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                        <div className="relative z-0 w-full group mb-5">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData((prevData) => ({ ...prevData, firstName: e.target.value }))}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="firstName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                First Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-5">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData((prevData) => ({ ...prevData, lastName: e.target.value }))}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="lastName"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Last Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-5">
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData((prevData) => ({ ...prevData, phone: e.target.value }))}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Phone
                            </label>
                        </div>
                        <div className="relative z-0 w-full group mb-5">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData((prevData) => ({ ...prevData, address: e.target.value }))}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="address"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Address
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className="border-b-2 pb-1.5 flex justify-between items-center">
                            <h3 className="font-semibold">Wards</h3>
                            <button
                                type="button"
                                onClick={handleAddStudent}
                                className="p-2 rounded-lg bg-gray-700 text-gray-50 flex gap-2 items-center hover:bg-gray-800 text-sm"
                            >
                                <FontAwesomeIcon icon={faPlusCircle} />
                                New Student
                            </button>
                        </div>

                        {formData.students.map((student, index) => (
                            <>
                                <div key={index} className="grid mt-4 sm:grid-cols-2 grid-cols-1 gap-x-4">
                                    <div className="relative z-0 w-full group mb-5">
                                        <label
                                            htmlFor={`class-${index}`}
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Class
                                        </label>
                                        <select
                                            id={`class-${index}`}
                                            name={`classId`}
                                            value={student.classId}
                                            onChange={(e) => {
                                                handleStudentChange(index, e);
                                                handleClassChange(e.target.value);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            {classLoading ? (
                                                <option disabled>Loading Classes...</option>
                                            ) : classes.length > 0 ? (
                                                classes.map((clas) => (
                                                    <option key={clas.id} value={clas.id}>
                                                        {clas.className}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No classes found.</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="relative z-0 w-full group mb-5">
                                        <label
                                            htmlFor={`student-${index}`}
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Student
                                        </label>
                                        <select
                                            id={`student-${index}`}
                                            name={`studentId`}
                                            value={student.studentId}
                                            onChange={(e) => handleStudentChange(index, e)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                                        >
                                            <option value="">Select Student</option>
                                            {studentLoading ? (
                                                <option disabled>Loading Students...</option>
                                            ) : students.length > 0 ? (
                                                students.map((student) => (
                                                    <option key={student.id} value={student.id}>
                                                        {student.firstName} {student.lastName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No students found.</option>
                                            )}
                                        </select>
                                    </div>


                                </div>
                                {index > 0 && (
                                    <div className="flex sm:col-span-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveStudent(index)}
                                            className="bg-red-600 text-xs text-gray-50 hover:bg-red-300 p-1.5 rounded-md"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 disabled:bg-blue-300 text-white rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} spin /> Save Changes
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
