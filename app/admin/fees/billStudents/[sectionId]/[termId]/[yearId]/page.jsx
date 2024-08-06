"use client"
import { faArrowLeftLong, faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function BillStudents({ params }) {

    const router = useRouter()

    const { sectionId, termId } = params

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(data?.students?.map(student => student.studentId));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/fees/students?classSectionId=${sectionId}&academicTermId=${termId}`)

                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setData(responseData)
            }
            catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <div className="flex gap-2 items-center">
                <div>
                    <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                    </button>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">
                        Bill Students
                    </h1>
                    <p className="flex gap-1.5 text-sm">
                        <span>
                            Home
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span>
                            Fees
                        </span>
                        <span>
                            {'>'}
                        </span>
                        <span className="text-blue-600">
                            Bill Students
                        </span>
                    </p>
                </div>
            </div>

            {loading ? <div className='flex flex-col mt-10 items-center justify-center gap-2'> <FontAwesomeIcon icon={faSpinner} width={20} height={20} spin /> <p> Loading Students... </p> </div> : <>
                <div className="flex justify-between mt-3">
                    <div>
                        <h3 className='text-xs text-red-600'>Academic Year</h3>
                        <p className='text-sm'>{data.academicYear}</p>
                    </div>

                    <div>
                        <h3 className='text-xs text-red-600'>Term</h3>
                        <p className='text-sm'>{data.academicTerm}</p>
                    </div>

                    <div>
                        <h3 className='text-xs text-red-600'>Class</h3>
                        <p className='text-sm'>{data.class}</p>
                    </div>
                </div>

                <div className='mt-5 mb-2 flex justify-between'>
                    <button onClick={handleSelectAll} className="flex items-center text-white p-2 rounded">
                        <input
                            checked={selectAll}
                            id={`checkbox-all`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                        />
                        <label htmlFor={`checkbox-all`} className="ms-2 text-sm font-medium text-gray-900">
                            {selectAll ? 'Deselect All' : 'Select All'}
                        </label>
                    </button>
                    <button onClick={() => {
                        if (selectedStudents.length < 1) {
                            showToast("error", "Please select at leat one(1) student to bill!")
                            return
                        }
                        // setBillStudent(true)
                    }} className="flex items-center bg-lime-600 hover:bg-lime-800 text-white p-2 px-4 rounded">
                        Bill
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                    {data?.students?.length < 1 ? <div className='mt-5'> <p className='text-center'> No Students found. </p> </div> : data?.students?.map(student => (
                        <div key={student.studentId} className="border shadow-lg rounded p-2">
                            <div className="flex items-center mb-2">
                                <input
                                    checked={selectedStudents.includes(student.studentId)}
                                    onChange={() => handleSelectStudent(student.studentId)}
                                    id={`checkbox-${student.studentId}`}
                                    type="checkbox"
                                    value={student.studentId}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                />
                                <label htmlFor={`checkbox-${student.studentId}`} className="ms-2 text-sm font-medium text-gray-900">Select</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <h3 className="text-sm">{student.firstName} {student.lastName}</h3>
                            </div>
                            {/* {student?.billing?.BillingDetails.length < 1 ? <div className="mt-1"> <p className='text-xs text-red-600'> No Billing found</p> </div> : student?.billing?.BillingDetails.map((item, index) => (
                                <div key={index} className="flex justify-between mt-2 text-xs">
                                    <div>
                                        <h3>{item.name}</h3>
                                    </div>
                                    <div>
                                        <p>
                                            {item.amount.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "GHS",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    ))}
                </div></>}

        </div>
    )
}