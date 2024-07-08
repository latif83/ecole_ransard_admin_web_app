import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewClass({ setAddClass, setGData }) {
    const [loading,setLoading] = useState(false)
    const [className, setClassName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: className }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.error);
                return;
            }
            toast.success(responseData.message);
            setAddClass(false);
            setGData(true);
        } catch (err) {
            console.log(err);
            toast.error("Error adding class, please try again!");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white w-full max-w-xl mx-auto p-6 mt-5 h-auto shrink-0 grow-0 rounded-t-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold">Add New Class</h2>
                    <FontAwesomeIcon onClick={() => setAddClass(false)} icon={faXmark} width={15} height={15} className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer" color="red" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 disabled:bg-blue-200 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {loading ? (
                            <>
                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Add
                                Class{" "}
                            </>
                        ) : (
                            "Add Class"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
