import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const NewGrade = ({ setCreateGrade,setFetchData }) => {

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        maxScore: "",
        minScore: "",
        grade: "",
        comment: ""
    })

    const [sendData, setSendData] = useState(false)

    const handleSubmit = () => {
        setSendData(true)
    }

    useEffect(() => {

        const createGrade = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/exams/settings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify(formData)
                })
                const responseData = await response.json()
                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                toast.success(responseData.message)
                setFetchData(true)
                setCreateGrade(false)

            }
            catch (e) {
                console.log(e)
                toast.error("Unexpected error!")
            } finally {
                setLoading(false)
            }
        }

        if (sendData) {
            createGrade()
            setSendData(false)
        }

    }, [sendData])

    return (
        <div className="fixed h-svh w-full inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white sm:mt-8 mt-5 w-full max-w-xl mx-auto sm:p-5 p-3 sm:rounded-md shadow-lg w-full max-w-md">
                <div className="flex justify-between mb-3">
                    <h1 className="font-semibold">New Grade</h1>
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => setCreateGrade(false)}
                        className="text-lg cursor-pointer p-1.5 rounded-md hover:bg-gray-200"
                        color="red"
                    />
                </div>

                <form action={handleSubmit}>

                    <div className="mb-7 grid gap-4 grid-cols-2">
                        <div className="relative z-0 w-full group">
                            <input
                                type="number"
                                name="minScore"
                                id="minScore"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.minScore}
                                onChange={(e) => setFormData((prev) => ({ ...prev, minScore: e.target.value }))}
                            />
                            <label
                                for="minScore"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                From
                            </label>
                        </div>

                        <div className="relative z-0 w-full group">
                            <input
                                type="number"
                                name="maxScore"
                                id="maxScore"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.maxScore}
                                onChange={(e) => setFormData((prev) => ({ ...prev, maxScore: e.target.value }))}
                            />
                            <label
                                for="maxScore"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                To
                            </label>
                        </div>
                    </div>

                    <div className="mb-7 grid gap-4 grid-cols-2">
                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="grade"
                                id="grade"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.grade}
                                onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                            />
                            <label
                                for="grade"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Grade
                            </label>
                        </div>

                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="comment"
                                id="comment"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                value={formData.comment}
                                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                            />
                            <label
                                for="comment"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Comments
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 disabled:bg-blue-100 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading && "disabled"
                            }`}
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    className="text-lg mr-2"
                                />
                                {" Submit"}
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