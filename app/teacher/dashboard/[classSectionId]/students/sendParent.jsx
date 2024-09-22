import { useState } from "react";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify"; // Optional, for notifications

export const SendMessage = ({ setSendMessage, parentEmail, parentName }) => {
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {

        try {

            setLoading(true)

            // Example: API call to send the message
            const response = await fetch("/api/mail/sendMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ parentEmail, message, parentName }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                toast.error(responseData.message || "Error sending message");
                return;
            }

            toast.success("Message sent successfully!");
            setSendMessage(false); // Close modal after successful send
        } catch (err) {
            console.log(err);
            toast.error("Failed to send message, please try again.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center py-5 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl grow-0 shrink-0">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Send Message To Parent</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setSendMessage(false)} // Close modal
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 outline-none border"
                            placeholder="Type your message here..."
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-1.5 text-sm disabled:bg-gray-200"
                        >
                            {!loading ? <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                </svg>

                                <span>
                                    Send Message
                                </span>
                            </> : <>
                                <FontAwesomeIcon icon={faSpinner} spin /> <span>Send Message...</span></>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
