import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SendBill({ setSendBill, studentIds, academicTermId, academicYrId }) {

    const [loading, setLoading] = useState(false)

    const handleSendBill = async () => {
        setLoading(true)
        try {

            const formData = {
                studentIds, academicTermId, academicYrId
            }

            const response = await fetch(`/api/mail/sendbill`, {
                method: "POST",
                body: JSON.stringify(formData),
                "Content-Type": "application/json"
            });
            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.error);
                return;
            }
            toast.success(responseData.message);
            setSendBill(false);
        } catch (err) {
            console.log(err);
            toast.error("Error deleting class, please try again!");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-lg w-full mx-auto rounded-md mt-5 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Send Bill</h2>
                <p>Are you sure you want to send this bill?</p>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={() => setSendBill(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={handleSendBill}
                        className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:bg-lime-300 flex items-center gap-1.5"
                    >
                        {loading ? <>  <FontAwesomeIcon icon={faSpinner} spin width={15} height={15} /> Proceed </> : 'Proceed'}
                    </button>
                </div>
            </div>
        </div>
    );
}
