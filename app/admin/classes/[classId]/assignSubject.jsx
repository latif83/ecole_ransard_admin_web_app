import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const AssignSubject = ({ classId, setAssignSubject, setFetchData }) => {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        classId,
        subjectId: ""
    })


    const [subjectsLoading, setSubjectsLoading] = useState(false)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        const fetchSubjects = async () => {
            setSubjectsLoading(true)
            try {
                const response = await fetch("/api/subjects");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setSubjects(data.subjects);

            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Error fetching students, please try again!");
                setSubjectsLoading(false);
            } finally {
                setSubjectsLoading(false)
            }
        };

        fetchSubjects()

    }, [])


    const [sendData, setSendData] = useState(false)
    const handleSubmit = () => {
        setSendData(true)
    }

    useEffect(() => {
        const createSection = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/subjects/assign`, {
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
                setAssignSubject(false)

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
                    <h2 className="font-bold">Assign Subject</h2>
                    <FontAwesomeIcon
                        onClick={() => setAssignSubject(false)}
                        icon={faTimes}
                        width={15}
                        height={15}
                        className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer"
                        color="red"
                    />
                </div>
                <form action={handleSubmit}>

                    <div className="relative z-0 w-full group mb-5">
                        <label
                            htmlFor="teacherId"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Select Subject
                        </label>
                        <select
                            id="teacherId"
                            name="teacherId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            value={formData.subjectId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, subjectId: e.target.value }))}
                        >
                            <option value="">Select Subject</option>
                            {subjectsLoading ? (
                                <option>
                                    {" "}
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        color="red"
                                        className="text-lg"
                                        spin
                                    />{" "}
                                    Loading Subjects...{" "}
                                </option>
                            ) : subjects.length > 0 ? (
                                subjects.map((subject) => (
                                    <option value={subject.id}>{subject.name}</option>
                                ))
                            ) : (
                                <option>No subjects found.</option>
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
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}