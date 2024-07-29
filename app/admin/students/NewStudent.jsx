import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewStudent({ setAddStudent, setGData }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [classId, setClassId] = useState(""); // You might want to populate this with class data
    const [loading, setLoading] = useState(false);

    const [classLoading, setClassLoading] = useState(false)
    const [classes, setClasses] = useState([])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, birthDate, address, classId }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message);
                setLoading(false);
                return;
            }
            toast.success(responseData.message);
            setAddStudent(false);
            setGData(true);
        } catch (err) {
            console.log(err);
            toast.error("Error adding student, please try again!");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white w-full max-w-xl mx-auto p-6 mt-5 rounded-md shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">New Student</h2>
                    <button
                        className="text-red-500 hover:bg-gray-300 p-1.5 rounded-md"
                        onClick={() => setAddStudent(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} width={15} height={15} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="birthDate"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Birth Date
                        </label>
                    </div>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="birthDate"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address
                        </label>
                    </div>

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

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 disabled:bg-blue-300 text-white rounded-lg hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? <> <FontAwesomeIcon icon={faSpinner} spin /> Add Student </> : "Add Student"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
