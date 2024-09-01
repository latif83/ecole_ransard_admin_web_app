import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faSpinner, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { uploadStudentImageToCloudinary } from "@/actions/actions";

export default function NewStudent({ setAddStudent, setGData }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [classId, setClassId] = useState("");
    const [classSectionsId, setClassSectionId] = useState("");

    const [loading, setLoading] = useState(false);

    const [classLoading, setClassLoading] = useState(false)
    const [classes, setClasses] = useState([])

    const [classSectionsLoading, setClassSectionsLoading] = useState(false)
    const [classSections, setClassSections] = useState([])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {


            let imageUrl = null

            uploadStudentImageToCloudinary(passportImage)
                .then(async (result) => {
                    console.log("Image uploaded successfully:", result);
                    imageUrl = result.url
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });


            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, birthDate, address, classId, classSectionsId,passportImage : imageUrl }),
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

    const [passportImage, setPassportImage] = useState(null)

    const handlePassportImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPassportImage(reader.result);

                // console.log(reader.result)
                // setCropping(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white w-full max-w-4xl mx-auto p-6 mt-5 rounded-md shadow-lg w-full">
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
                    <div className="flex gap-6">
                        <div className="w-[200px] shrink-0">
                            {passportImage ? <div className="rounded-lg h-[200px] w-[200px] border-2 border-blue-500 text-blue-500 flex items-center justify-center flex-col cursor-pointer overflow-hidden p-0.5">
                                <Image width={500} height={500} src={passportImage} className="h-full w-full object-cover object-top" />

                            </div> : <label htmlFor="passport_pic" style={{ padding: '1.2px' }} className="rounded-lg h-[200px] w-[200px] border-2 border-blue-500 text-blue-500 flex items-center justify-center flex-col cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <p className="text-xs text-center mt-2">
                                    Click to add a passport sized photograph.
                                </p>

                            </label>}
                            <input onChange={handlePassportImage} id="passport_pic" type="file" hidden />
                        </div>
                        <div className="flex-1"> <div className="relative z-0 w-full group mb-5">
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
                                />
                                <label
                                    htmlFor="birthDate"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Address
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
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

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 disabled:bg-blue-300 text-white rounded-lg hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? <> <FontAwesomeIcon icon={faSpinner} spin /> Add Student </> : "Add Student"}
                                </button>
                            </div></div>
                    </div>
                </form>
            </div>
        </div>
    );
}
