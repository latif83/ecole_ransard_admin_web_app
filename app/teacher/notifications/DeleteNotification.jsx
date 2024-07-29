import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteNotification({ setDelNotification, setFetchData, notificationId }) {

    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(false)
        try {
            const response = await fetch(`/api/notification/${notificationId}`, {
                method: "DELETE",
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.error);
                return;
            }
            toast.success(responseData.message);
            setDelNotification(false);
            setFetchData(true);
        } catch (err) {
            console.log(err);
            toast.error("Error deleting class, please try again!");
        } finally {
            setLoading(true)
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-xl mx-auto rounded-md mt-5 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Delete Notification</h2>
                <p>Are you sure you want to remove this notification?</p>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={() => setDelNotification(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 flex items-center gap-1.5"
                    >
                        {loading ? <>  <FontAwesomeIcon icon={faSpinner} spin width={15} height={15} /> Delete </> : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}
