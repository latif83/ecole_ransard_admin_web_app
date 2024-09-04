"use client";
import { faArrowLeftLong, faBookOpen, faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
// import NewFee from "./newFee";
import { useRouter } from "next/navigation";
// import NewSubject from "./newSubject";

export default function ClassResults() {
    const [feeDetails, setFeeDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gData, setGData] = useState(true);

    const router = useRouter()

    const [yearId, setYearId] = useState()
    const [termId, setTermId] = useState()

    const [loadingAcademicYrs, setLoadingAcademicYrs] = useState(false)
    const [academicYrs, setAcademicYrs] = useState([])

    const [loadingAcademicTerms, setLoadingAcademicTerms] = useState(false)
    const [academicTerms, setAcademicTerms] = useState(false)

    const [loadingClassSections, setLoadingClassSections] = useState(false)
    const [classSections, setClassSections] = useState([])

    useEffect(() => {
        const fetchAcademicYrs = async () => {
            setLoadingAcademicYrs(true);
            try {
                const response = await fetch("/api/calendar/year");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setAcademicYrs(data.academicYears);

                // Find the active academic year
                const activeAcademicYear = data.academicYears.find((year) => year.status === "Active");

                // Check if an active academic year was found and then get the academic terms
                if (activeAcademicYear) {
                    setYearId(activeAcademicYear.id)
                    getAcademicTerms(activeAcademicYear.id);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoadingAcademicYrs(false);
            }
        };

        fetchAcademicYrs()
    }, [])

    useEffect(() => {
        const fetchClassSections = async () => {
            setLoadingClassSections(true);
            try {
                const response = await fetch("/api/classes/sections");
                const data = await response.json();
                if (!response.ok) {
                    toast.error(data.error);
                    return;
                }
                setClassSections(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoadingClassSections(false);
            }
        };

        fetchClassSections()
    }, [])

    const getAcademicTerms = async (yearId) => {
        setLoadingAcademicTerms(true)
        try {
            const response = await fetch(`/api/calendar/year/${yearId}`)

            const responseData = await response.json()

            if (!response.ok) {
                toast.error(responseData.error)
                return
            }

            setAcademicTerms(responseData.academicYear.terms)

            // Find the active academic term
            const activeAcademicTerm = responseData.academicYear.terms.find((term) => term.status === "Active");

            // Check if an active academic term was found
            if (activeAcademicTerm) {
                setTermId(activeAcademicTerm.id)
            }

        }
        catch (err) {
            console.log(err)
        } finally {
            setLoadingAcademicTerms(false)
        }
    }

    const [addFee, setAddFee] = useState(false)

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
                        Class Results
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
                            Class Results
                        </span>
                    </p>
                </div>
            </div>

            <div className="mt-5 grid gap-5 grid-cols-2">
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Academic Year
                    </label>
                    <select
                        id="yearId"
                        name="yearId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={yearId}
                        onChange={(e) => { setYearId(e.target.value); getAcademicTerms(e.target.value) }}
                    >
                        <option value="">Select Year</option>
                        {loadingAcademicYrs ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Academic Years...{" "}
                            </option>
                        ) : academicYrs.length > 0 ? (
                            academicYrs.map((year) => (
                                <option value={year.id}>{year.year}</option>
                            ))
                        ) : (
                            <option>No academic years found.</option>
                        )}
                    </select>
                </div>
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Academic Term
                    </label>
                    <select
                        id="termId"
                        name="termId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={termId}
                        onChange={(e) => setTermId(e.target.value)}
                    >
                        <option value="">Select Term</option>
                        {loadingAcademicTerms ? (
                            <option>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    color="red"
                                    className="text-lg"
                                    spin
                                />{" "}
                                Loading Academic Terms...{" "}
                            </option>
                        ) : academicTerms.length > 0 ? (
                            academicTerms.map((term) => (
                                <option value={term.id}>{term.termName}</option>
                            ))
                        ) : (
                            <option>No terms found.</option>
                        )}
                    </select>
                </div>
            </div>

            <h3 className="text-xs text-red-600 my-3">
                Select a class below to view results
            </h3>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Class
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {loadingClassSections ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : classSections?.length > 0 ? (
                            classSections?.map((section) => (
                                <tr key={section.sectionId} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {section.className} ( {section.sectionName} )
                                    </th>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            onClick={() => {
                                                if (!termId) {
                                                    toast.error("Please select an academic term!")
                                                    return
                                                }

                                                router.push(`/admin/exams/classResults/${section.sectionId}/${termId}/${yearId}`)
                                            }} className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Select
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    No classes found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
