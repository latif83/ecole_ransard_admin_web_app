"use client"
import { faArrowLeftLong, faPrint, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Results({ params }) {

    const { studentId } = params

    const router = useRouter()

    const [selectedAcademicYrId, setSelectedAcademicYrId] = useState("")
    const [academicYrsLoading, setAcademicYrsLoading] = useState(false)

    const [academicYrs, setAcademicYrs] = useState([])

    const [selectedAcademicTermId, setSelectedAcademicTermId] = useState("")
    const [academicTermsLoading, setAcademicTermsLoading] = useState(false)

    const [academicTerms, setAcademicTerms] = useState([])

    useEffect(() => {

        const getAcademicYrs = async () => {
            setAcademicYrsLoading(true)
            try {
                const response = await fetch(`/api/calendar/year`)
                const responseData = await response.json()

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setAcademicYrs(responseData.academicYears)

                const checkActiveAcademicYr = responseData.academicYears.find((year) => year.status == "Active")

                if (checkActiveAcademicYr) {
                    // console.log(checkActiveAcademicYr)
                    setSelectedAcademicYrId(checkActiveAcademicYr.id)
                }

                // console.log(responseData)

            }
            catch (e) {
                console.log(e)
            } finally {
                setAcademicYrsLoading(false)
            }
        }

        getAcademicYrs()

    }, [])

    const getAcademicTerms = async () => {
        setAcademicTermsLoading(true)
        try {
            const response = await fetch(`/api/calendar/year/${selectedAcademicYrId}`)
            const responseData = await response.json()

            if (!response.ok) {
                toast.error(responseData.message)
                return
            }

            setAcademicTerms(responseData.academicYear.terms)

            const checkActiveAcademicTerm = responseData.academicYear.terms.find((term) => term.status == "Active")

            if (checkActiveAcademicTerm) {
                // console.log(checkActiveAcademicTerm)
                setSelectedAcademicTermId(checkActiveAcademicTerm.id)
            }

            // console.log(responseData)

        }
        catch (e) {
            console.log(e)
        } finally {
            setAcademicTermsLoading(false)
        }
    }

    useEffect(() => {
        selectedAcademicYrId && getAcademicTerms()
    }, [selectedAcademicYrId])

    const [assessmentsLoading, setAssessmentsLoading] = useState(false)
    const [assessments, setAssessments] = useState([])

    useEffect(() => {

        const getAssessments = async () => {
            setAssessmentsLoading(true)
            try {
                const response = await fetch(`/api/admin/assessments?studentId=${studentId}&academicTermId=${selectedAcademicTermId}`)

                const responseData = await response.json()

                // console.log(responseData)

                if (!response.ok) {
                    toast.error(responseData.message)
                    return
                }

                setAssessments(responseData)

            }
            catch (e) {
                console.log(e)
            }
            finally {
                setAssessmentsLoading(false)
            }
        }

        getAssessments()
    }, [selectedAcademicTermId])

    // Function to print the student results
    const printList = () => {
        window.print();
    };

    return (
        <div>

            <div className="flex justify-between items-center mt-5">
                <div className="flex gap-2 items-center">
                    <div>
                        <button onClick={() => router.back()} className="bg-red-200 p-2 rounded hover:bg-red-600 hover:text-white text-gray-700">
                            <FontAwesomeIcon icon={faArrowLeftLong} width={20} height={20} />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">
                            Student Results
                        </h1>
                        <p className="flex gap-1.5 text-sm">
                            <span>
                                Home
                            </span>
                            <span>
                                {'>'}
                            </span>
                            <span>
                                Exams
                            </span>
                            <span>
                                {'>'}
                            </span>
                            <span className="text-blue-600">
                                Student Results
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-sm flex flex-col">
                        <label className="text-sm font-medium hidden">
                            Academic Year
                        </label>
                        <select
                            value={selectedAcademicYrId}
                            onChange={(e) => setSelectedAcademicYrId(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 bg-white"
                        >
                            <option value="">Select Academic Year</option>
                            {academicYrsLoading ? (
                                <option value="">Loading Academic Years...</option>
                            ) : academicYrs.length > 0 ? (
                                academicYrs.map((academicYr) => (
                                    <option key={academicYr.id} value={academicYr.id}>
                                        {academicYr.year}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Academic Year Found</option>
                            )}
                        </select>
                    </div>
                    <div className="text-sm flex flex-col">
                        <label className="text-sm font-medium hidden">
                            Academic Term
                        </label>
                        <select
                            value={selectedAcademicTermId}
                            onChange={(e) => setSelectedAcademicTermId(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 bg-white"
                        >
                            <option value="">Select Academic Term</option>
                            {academicTermsLoading ? (
                                <option value="">Loading Academic Terms...</option>
                            ) : academicTerms.length > 0 ? (
                                academicTerms.map((academicTerm) => (
                                    <option key={academicTerm.id} value={academicTerm.id}>
                                        {academicTerm.termName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Academic Terms Found</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <div className="relative printable-area overflow-auto">
                <div className="mt-12 mb-5 text-center pb-2 border-b-2 border-red-600 print-display">
                        <h1 className="font-bold text-xl">ECOLE RONSARD</h1>
                        <h3 className="text-sm">
                            Student Results.
                        </h3>
                    </div>
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4">Subject</th>
                                <th className="py-3 px-4">Marks</th>
                                <th className="py-3 px-4">Grade</th>
                                <th className="py-3 px-4">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessmentsLoading ? (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td colSpan={4} className="px-6 py-4 text-center">
                                        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                    </td>
                                </tr>
                            ) : assessments.length > 0 ? (
                                assessments.map((assessment, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="py-2 px-4">{assessment.subject}</td>
                                        <td className="py-2 px-4">{(assessment.marks).toFixed(2)}%</td>
                                        <td className="py-2 px-4">{assessment.grade}</td>
                                        <td className="py-2 px-4">{assessment.remarks || "N/A"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">
                                        No assessments available for the selected term.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <button type="button" onClick={printList} className="bg-lime-700 text-white flex items-center justify-center gap-2 px-8 py-3 rounded">
                        <FontAwesomeIcon icon={faPrint} />
                        <span>
                            Print Results
                        </span>
                    </button>
                </div>
            </div>

        </div>
    )
}