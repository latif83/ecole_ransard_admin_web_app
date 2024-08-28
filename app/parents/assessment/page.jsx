"use client"

import { useParent } from "@/providers/parentProvider";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Assessment Tab Component
export default function AssessmentTab() {

  const [assessmentsLoading, setAssessmentsLoading] = useState(false)
  const [assessments, setAssessments] = useState([])

  const [academicYrs, setAcademicYrs] = useState([])
  const [academicYrsLoading, setAcademicYrsLoading] = useState(false)

  const [academicTerms, setAcademicTerms] = useState([])
  const [academicTermsLoading, setAcademicTermsLoading] = useState(false)

  const [selectedAcademicYrId, setSelectedAcademicYrId] = useState("")
  const [selectedAcademicTermId, setSelectedAcademicTermId] = useState("")

  const { selectedWardId } = useParent()

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

  useEffect(() => {

    const getAssessments = async () => {
      setAssessmentsLoading(true)
      try {
        const response = await fetch(`/api/parents/${localStorage.getItem("identity")}/${selectedWardId}/assessment?academicTermId=${selectedAcademicTermId}`)

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
  }, [selectedWardId, selectedAcademicTermId])

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

  return (
    <div>
      {!selectedWardId ? <div className="mt-5 flex justify-center flex-col gap-4 items-center">  <span>No Ward Selected</span> </div> : <><div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">Assessment</h3>
        <div className="flex gap-6">
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

        <div className="mt-7">
          <div className="relative overflow-auto">
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
        </div></>}

    </div>
  );
};