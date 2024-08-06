"use client"
import { faArrowLeftLong, faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { BillStudent } from "./billStudent"

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

    const [fetchData, setFetchData] = useState(true)

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

        if (fetchData) {
            getData()
            setFetchData(false)
        }

    }, [fetchData])

    const [billStudent, setBillStudent] = useState(false)

    return (
        <div>

            {billStudent && <BillStudent setBillStudent={setBillStudent} studentIds={selectedStudents} academicTermId={termId} setFetchData={setFetchData} />}

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
                    <div className="flex gap-2">
                        <button onClick={() => {
                            if (selectedStudents.length < 1) {
                                toast.error("Please select at leat one(1) student to bill!")
                                return
                            }
                            setBillStudent(true)
                        }} className="flex items-center gap-1.5 bg-lime-600 hover:bg-lime-800 text-white p-2 px-4 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>

                            <span>Bill</span>
                        </button>
                        <button
                            // onClick={() => {
                            //     if (selectedStudents.length < 1) {
                            //         toast.error("Please select at leat one(1) student to bill!")
                            //         return
                            //     }
                            //     setBillStudent(true)
                            // }} 
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-800 text-white p-2 px-4 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                            </svg>

                            <span>Send Bill</span>
                        </button>
                    </div>
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
                                <label htmlFor={`checkbox-${student.studentId}`} className="ms-2 text-sm font-medium text-gray-700">Select</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faUserCircle} width={20} height={20} className="text-lg" />
                                <h3 className="font-semibold">{student.firstName} {student.lastName}</h3>
                            </div>
                            {student?.feeDetails.length < 1 ? <div className="mt-1"> <p className='text-xs text-red-600'> No Billing found</p> </div> : student?.feeDetails.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-700 mt-2 text-xs">
                                    <div>
                                        <h3>{item.feeTitle}</h3>
                                    </div>
                                    <div>
                                        <p>
                                            {(item.feeAmount).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "GHS",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div></>}

        </div>
    )
}