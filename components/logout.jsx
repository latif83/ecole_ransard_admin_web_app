import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LogOut({ setLogOut }) {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const logOut = () => {
        setLoading(true)

        setTimeout(() => {
            localStorage.removeItem("userIdentity")
            localStorage.removeItem("identity")
            router.replace("/")
            toast.success("Logout Successful!")
        }, 2000);
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-xl mx-auto rounded-md mt-5 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Logout</h2>
                <p>Are you sure you want to logout?</p>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={() => setLogOut(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        onClick={logOut}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 flex items-center gap-1.5"
                    >
                        {loading ? <>  <FontAwesomeIcon icon={faSpinner} spin width={15} height={15} /> Logging Out... </> : 'Logout'}
                    </button>
                </div>
            </div>
        </div>
    );
}
