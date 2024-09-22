import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SendMessage } from "./sendParent"
import { useState } from "react"

export const ParentDetails = ({ setViewParentDetails, parentInfo }) => {

    const [sendMessage, setSendMessage] = useState(false)

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
            {sendMessage && <SendMessage setSendMessage={setSendMessage} parentEmail={parentInfo.email} parentName={`${parentInfo.firstName} ${parentInfo.lastName}`} />}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Parent Details</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setViewParentDetails(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-medium text-red-500">
                                First Name
                            </p>
                            <p className="">
                                {parentInfo.firstName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-red-500">
                                Last Name
                            </p>
                            <p className="">
                                {parentInfo.lastName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-red-500">
                                Email
                            </p>
                            <p className="">
                                {parentInfo.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-red-500">
                                Phone
                            </p>
                            <p className="">
                                {parentInfo.phone}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-red-500">
                                Address
                            </p>
                            <p className="">
                                {parentInfo.address}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium text-red-500">
                                Occupation
                            </p>
                            <p className="">
                                {parentInfo.occupation}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 flex justify-center">
                        <button type="button" onClick={() => setSendMessage(true)} className="flex items-center justify-center gap-1.5 p-2 rounded bg-black text-white text-sm" >
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>
                                Send Message
                            </span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}