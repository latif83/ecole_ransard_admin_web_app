import { faCirclePlus, faSpinner, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const BillStudent = ({ setBillStudent, studentIds, academicTermId, setFetchData }) => {

    const [loading, setLoading] = useState(false)

    const [loadingBills, setLoadingBills] = useState(false)
    const [billingData, setBillingData] = useState([])

    const [formData, setFormData] = useState({
        studentIds,
        academicTermId,
        feeDetails: [
            { feeTypeId: "", amount: "" }
        ]
    })

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const feeDetails = [...formData.feeDetails];
        feeDetails[index][name] = value;
        setFormData({ ...formData, feeDetails });
    };

    const handleAddSection = () => {
        setFormData({
            ...formData,
            feeDetails: [...formData.feeDetails, { feeTypeId: "", amount: "" }],
        });
    };

    const handleRemoveSection = (index) => {
        if (formData.feeDetails.length > 1) {
            const feeDetails = [...formData.feeDetails];
            feeDetails.splice(index, 1);
            setFormData({ ...formData, feeDetails });
        }
    };

    const [accessToken, setAccessToken] = useState("")

    useEffect(() => {
        const accessToken = localStorage.getItem("SMSTOKEN")
        setAccessToken(accessToken)
        const getBillings = async () => {
            setLoadingBills(true)
            try {
                const response = await fetch(`/api/fees/feetype`)
                const responseData = await response.json()
                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setBillingData(responseData.feeTypes)
            }
            catch (e) {
                console.log(e)
            } finally {
                setLoadingBills(false)
            }
        }

        getBillings()

    }, [])

    const [sendData, setSendData] = useState(false)

    const handleSubmit = () => {
        setSendData(true)
    }

    useEffect(() => {

        const BillStudents = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/fees/students/bill`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
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
                setBillStudent(false)

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        if (sendData) {
            BillStudents()
            setSendData(false)
        }

    }, [sendData])

    return (
        <div className="fixed h-svh w-full inset-0 bg-gray-800 bg-opacity-75 z-999999">
            <div className="bg-white sm:mt-8 mt-5 w-full max-w-xl mx-auto sm:p-5 p-3 sm:rounded-md shadow-lg w-full max-w-md">
                <div className="flex justify-between mb-3">
                    <h1 className="font-semibold">Bill Student</h1>
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => setBillStudent(false)}
                        className="text-lg cursor-pointer p-1.5 rounded-md hover:bg-gray-200"
                        color="red"
                    />
                </div>

                <form action={handleSubmit}>

                    {formData.feeDetails.map((fee, index) => (
                        <div key={index} className="mb-5">
                            <div className="grid md:grid-cols-2 gap-4">

                                <div className="relative z-0 w-full group">
                                    <select
                                        id="bill"
                                        name="feeTypeId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={fee.feeTypeId}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    >
                                        <option value="">Select Bill</option>
                                        {loadingBills ? (
                                            <option>
                                                {" "}
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    color="red"
                                                    className="text-lg"
                                                    spin
                                                />{" "}
                                                Loading Bills...{" "}
                                            </option>
                                        ) : billingData.length > 0 ? (
                                            billingData.map((bill) => (
                                                <option value={bill.id}>
                                                    {bill.title}
                                                </option>
                                            ))
                                        ) : (
                                            <option>No bills found.</option>
                                        )}
                                    </select>
                                </div>

                                <div className="relative z-0 w-full group">
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        value={fee.amount}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    <label
                                        for="amount"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Amount
                                    </label>
                                </div>

                            </div>

                            <div className="">
                                <button type="button" onClick={() => handleRemoveSection(index)} className="text-red-600 text-xs flex items-center hover:border-b border-red-600">
                                    <span>
                                        Remove
                                    </span>
                                </button>
                            </div>

                        </div>
                    ))}

                    <div className="flex justify-end mb-5">
                        <button type="button" onClick={handleAddSection} className="bg-black text-white p-2 text-xs flex items-center gap-2 rounded">
                            <FontAwesomeIcon icon={faCirclePlus} width={15} height={15} />
                            <span>
                                New Bill
                            </span>
                        </button>
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