import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteGrade({ setDelGrade, setGData, gradeId }) {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(false)
        try {
            const response = await fetch(`/api/exams/settings`, {
                method: "DELETE",
                body: JSON.stringify({ id: gradeId })
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.error);
                return;
            }
            toast.success(responseData.message);
            setDelGrade(false);
            setGData(true);
        } catch (err) {
            console.log(err);
            toast.error("Error deleting grade, please try again!");
        } finally {
            setLoading(true)
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-xl mx-auto rounded-md mt-5 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Grade Setting</h2>
                <p>Are you sure you want to remove this grade setting?</p>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={() => setDelGrade(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 flex items-center gap-1.5"
                    >
                        {loading ? <>  <FontAwesomeIcon icon={faSpinner} spin width={15} height={15} /> Proceed </> : 'Proceed'}
                    </button>
                </div>
            </div>
        </div>
    );
}
