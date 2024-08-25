// Assessment Tab Component
export default function AssessmentTab() {

  const assessments = [
    {
      "subject": "Mathematics",
      "marks": 85,
      "grade": "A",
      "remarks": "Excellent"
    },
    {
      "subject": "English",
      "marks": 78,
      "grade": "B",
      "remarks": "Good"
    },
    {
      "subject": "Science",
      "marks": 90,
      "grade": "A+",
      "remarks": "Outstanding"
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-4 text-blue-600">Assessment</h3>
        <div className="flex gap-6">
          <div className="text-sm flex flex-col">
            <label className="text-sm font-medium hidden">
              Academic Year
            </label>
            <select
              // value={selectedWardId}
              // onChange={(e) => setSelectedWardId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select Academic Year</option>
              {/* {wardsLoading ? (
                                <option value="">Loading Wards...</option>
                            ) : wards.length > 0 ? (
                                wards.map((ward) => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.firstName} {ward.lastName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Wards Found</option>
                            )} */}
            </select>
          </div>
          <div className="text-sm flex flex-col">
            <label className="text-sm font-medium hidden">
              Academic Term
            </label>
            <select
              // value={selectedWardId}
              // onChange={(e) => setSelectedWardId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="">Select Academic Term</option>
              {/* {wardsLoading ? (
                                <option value="">Loading Wards...</option>
                            ) : wards.length > 0 ? (
                                wards.map((ward) => (
                                    <option key={ward.id} value={ward.id}>
                                        {ward.firstName} {ward.lastName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No Wards Found</option>
                            )} */}
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
              {assessments.length > 0 ? (
                assessments.map((assessment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{assessment.subject}</td>
                    <td className="py-2 px-4">{assessment.marks}</td>
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
      </div>

    </div>
  );
};