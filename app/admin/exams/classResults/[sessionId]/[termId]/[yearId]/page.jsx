"use client"
import { faArrowLeftLong, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export default function ClassResults({params}) {

    const router = useRouter()

    const {sessionId,termId} = params

    const [dataLoading,setDataLoading] = useState(false)
    const [resultsData,setResultsData] = useState([])

    useEffect(()=>{

        const getResultsData = async ()=>{
            try{
                setDataLoading(true)
                const response = await fetch(`/api/exams/assessments/classResults?termId=${termId}&sectionId=${sessionId}`)

                const responseData = await response.json()

                if(!response.ok){
                    toast.error("Error fetching data")
                }

                console.log(responseData)
                setResultsData(responseData)
            }
            catch(e){
                console.log(e)
            } finally{
                setDataLoading(false)
            }
        }

        getResultsData()

    },[])

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

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

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">

                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Subject</th>
                            <th scope="col" className="px-6 py-3">Highest Score</th>
                            <th scope="col" className="px-6 py-3">Lowest Score</th>
                            <th scope="col" className="px-6 py-3">Average Score</th>
                            <th scope="col" className="px-6 py-3">Best Student</th>
                        </tr>
                    </thead>
                    <tbody>


                        {dataLoading ? (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                                </td>
                            </tr>
                        ) : resultsData?.data?.length > 0 ? (
                            resultsData?.data?.map((subject,index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{subject.subjectName}</th>
                                <td className="px-6 py-4">{(subject.highestScore).toFixed(2)}%</td>
                                <td className="px-6 py-4">{(subject.lowestScore).toFixed(2)}%</td>
                                <td className="px-6 py-4">{(subject.averageScore).toFixed(2)}%</td>
                                <td className="px-6 py-4">{subject.bestStudent}</td>
                            </tr>
                            ))
                        ) : (
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
