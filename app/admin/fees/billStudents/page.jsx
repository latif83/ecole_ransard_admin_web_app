"use client";
import { faArrowLeftLong, faBookOpen, faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
// import NewFee from "./newFee";
import { useRouter } from "next/navigation";
// import NewSubject from "./newSubject";

export default function BillStudents() {
    const [feeDetails, setFeeDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gData, setGData] = useState(true);

    const router = useRouter()

    const [yearId, setYearId] = useState()

    const [loadingAcademicYrs, setLoadingAcademicYrs] = useState(false)
    const [academicYrs, setAcademicYrs] = useState([])

    const [loadingAcademicTerms, setLoadingAcademicTerms] = useState(false)
    const [academicTerms, setAcademicTerms] = useState(false)

    const [loadingClassSections, setLoadingClassSections] = useState(false)

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
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data, please try again!");

            } finally {
                setLoadingAcademicYrs(false);
            }
        };

        fetchAcademicYrs()
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

        }
        catch (err) {
            console.log(err)
        } finally {
            setLoadingAcademicTerms(false)
        }
    }

    // useEffect(() => {
    //     const getFeeDetails = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch("/api/fees/feetype");
    //             const responseData = await response.json();
    //             if (!response.ok) {
    //                 toast.error(responseData.message);
    //                 return;
    //             }
    //             setFeeDetails(responseData.feeTypes);

    //         } catch (err) {
    //             console.log(err);
    //             toast.error("Error retrieving data, please try again!");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (gData) {
    //         getFeeDetails();
    //         setGData(false);
    //     }
    // }, [gData]);

    const [addFee, setAddFee] = useState(false)

    return (
        <div>

            {/* {addFee && <NewFee setAddFee={setAddFee} setGData={setGData} />} */}

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

            <div className="mt-5 grid gap-5 grid-cols-2">
                <div className="relative z-0 w-full group mb-5">
                    <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Academic Year
                    </label>
                    <select
                        id="teacherId"
                        name="teacherId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={yearId}
                        onChange={(e) => {setYearId(e.target.value); getAcademicTerms(e.target.value)}}
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
                        id="teacherId"
                        name="teacherId"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    // value={formData.teacherId}
                    // onChange={(e) => setFormData((prev) => ({ ...prev, teacherId: e.target.value }))}
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
                Select a class below to bill students
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

                        <tr className="bg-white border-b hover:bg-gray-50">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                            >
                                Primary 1 ( A )
                            </th>
                            <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                <span
                                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                                >
                                    Select
                                </span>
                            </td>
                        </tr>


                        {/* {loading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : feeDetails?.length > 0 ? (
                            feeDetails?.map((fee) => (
                                <tr key={fee.id} className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                    >
                                        {fee.title}
                                    </th>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 text-center"
                                    >
                                        {fee.description ? fee.description : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center gap-1.5">
                                        <span
                                            className="font-medium text-blue-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="font-medium text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={3} className="px-6 py-4 text-center">
                                    No fees found
                                </td>
                            </tr>
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
