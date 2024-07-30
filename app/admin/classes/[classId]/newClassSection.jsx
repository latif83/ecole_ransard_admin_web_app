import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const NewClassSection = ({ classId, setCreateSection, setFetchData }) => {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        sectionName: "",
        classId,
        teacherId: ""
    })


    const [teachersLoading, setTeachersLoading] = useState(false)
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        const fetchTeachers = async () => {
            setTeachersLoading(true)
            try {
                const response = await fetch("/api/teachers");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setTeachers(data.teachers);

            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Error fetching students, please try again!");
                setTeachersLoading(false);
            } finally {
                setTeachersLoading(false)
            }
        };

        fetchTeachers()

    }, [])


    const [sendData, setSendData] = useState(false)
    const handleSubmit = () => {
        setSendData(true)
    }

    useEffect(() => {
        const createSection = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/classes/sections`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.error)
                    return
                }

                setFetchData(true)
                toast.success(responseData.message)
                setCreateSection(false)

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        if (sendData) {
            createSection()
            setSendData()
        }

    }, [sendData])

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-xl mx-auto p-6 mt-5 h-auto shrink-0 grow-0 rounded-md shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Add New Section</h2>
                    <FontAwesomeIcon
                        onClick={() => setCreateSection(false)}
                        icon={faTimes}
                        width={15}
                        height={15}
                        className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer"
                        color="red"
                    />
                </div>
                <form action={handleSubmit}>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="sectionName"
                            id="sectionName"
                            value={formData.sectionName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, sectionName: e.target.value }))}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="sectionName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Section Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full group mb-5">
                        <label
                            htmlFor="teacherId"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Head Teacher
                        </label>
                        <select
                            id="teacherId"
                            name="teacherId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            value={formData.teacherId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, teacherId: e.target.value }))}
                        >
                            <option value="">Select Teacher</option>
                            {teachersLoading ? (
                                <option>
                                    {" "}
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        color="red"
                                        className="text-lg"
                                        spin
                                    />{" "}
                                    Loading Teachers...{" "}
                                </option>
                            ) : teachers.length > 0 ? (
                                teachers.map((teacher) => (
                                    <option value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
                                ))
                            ) : (
                                <option>No teachers found.</option>
                            )}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 disabled:bg-blue-200 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Adding...
                            </>
                        ) : (
                            "Add Section"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}