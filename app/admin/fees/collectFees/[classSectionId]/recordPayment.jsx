"use client"
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const RecordPayment = ({ setAddPayment, setFetchData, studentId }) => {
    const [loading, setLoading] = useState(false)

    const [amount, setAmount] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    const [sendData, setSendData] = useState(false)

    const handleSubmit = () => {
        setSendData(true)
    }

    useEffect(() => {

        const makePayments = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/fees/students/payments`, {
                    method: 'POST',
                    body: JSON.stringify({ amount, studentId, paymentMethod }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                toast.success(responseData.message)
                setFetchData(true)
                setAddPayment(false)

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        if (sendData) {
            makePayments()
            setSendData(false)
        }

    }, [sendData])

    return (
        <div className="fixed h-svh w-full inset-0 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white sm:mt-8 mt-5 w-full max-w-xl mx-auto sm:p-5 p-3 sm:rounded-md shadow-lg w-full max-w-md">
                <div className="flex justify-between mb-3">
                    <h1 className="font-semibold">Payment</h1>
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => setAddPayment(false)}
                        className="text-lg cursor-pointer p-1.5 rounded-md hover:bg-gray-200"
                        color="red"
                    />
                </div>

                <form action={handleSubmit}>

                    <div className="relative z-0 w-full group mb-5">
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <label
                            for="amount"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Amount Payed
                        </label>
                    </div>

                    <div className="relative z-0 w-full group mb-5">
                                    <select
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Mobile Money">Mobile Money</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </select>
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