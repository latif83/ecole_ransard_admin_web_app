import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewAcademicYr({ setAddAcademicYr, setFetchData }) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        year: "",
        startDate: "",
        endDate: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state when form is submitted
        try {
            const response = await fetch("/api/calendar/year", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.error)
                return
            }
            toast.success(responseData.message);
            setAddAcademicYr(false); // Close the modal or form after successful submission
            setFetchData(true); // Trigger data fetching after adding a new class
        } catch (err) {
            console.error("Error adding class:", err);
            toast.error("Error adding class, please try again!");
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-xl mx-auto p-6 mt-5 h-auto shrink-0 grow-0 rounded-md shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Add New Academic Year</h2>
                    <FontAwesomeIcon
                        onClick={() => setAddAcademicYr(false)}
                        icon={faTimes}
                        width={15}
                        height={15}
                        className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer"
                        color="red"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="year"
                            id="year"
                            value={formData.year}
                            onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        />
                        <label
                            htmlFor="year"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Academic Year (e.g 2024 / 2025)
                        </label>
                    </div>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={formData.startDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="startDate"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Start Date
                        </label>
                    </div>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={formData.endDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="endDate"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            End Date
                        </label>
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
    );
}
