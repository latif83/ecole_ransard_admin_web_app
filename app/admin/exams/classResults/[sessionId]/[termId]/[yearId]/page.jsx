"use client"
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React from 'react';

// Dummy Data
const classResults = [
    {
        subjectName: 'Mathematics',
        highestScore: 95,
        lowestScore: 65,
        averageScore: 80,
        totalStudents: 25,
        bestStudent: 'John Doe', // Best scoring student
    },
    {
        subjectName: 'English',
        highestScore: 88,
        lowestScore: 60,
        averageScore: 75,
        totalStudents: 25,
        bestStudent: 'Jane Smith',
    },
    {
        subjectName: 'Science',
        highestScore: 92,
        lowestScore: 70,
        averageScore: 78,
        totalStudents: 25,
        bestStudent: 'Michael Johnson',
    },
    {
        subjectName: 'History',
        highestScore: 85,
        lowestScore: 55,
        averageScore: 70,
        totalStudents: 25,
        bestStudent: 'Emily Brown',
    },
];

export default function ClassResults() {

    const router = useRouter()

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
                            <th scope="col" className="px-6 py-3">Best Scoring Student</th>
                        </tr>
                    </thead>
                    <tbody>

                        {classResults.map((subject, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">{subject.subjectName}</th>
                                <td className="px-6 py-4">{subject.highestScore}%</td>
                                <td className="px-6 py-4">{subject.lowestScore}%</td>
                                <td className="px-6 py-4">{subject.averageScore}%</td>
                                <td className="px-6 py-4">{subject.bestStudent}</td>
                            </tr>
                        ))}


                        {/* {loadingClassSections ? (
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
                        )} */}
                    </tbody>
                </table>
            </div>

        </div>
    );
};
