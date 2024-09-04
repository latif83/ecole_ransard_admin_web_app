import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

export const ViewWards = ({ setViewWards, students }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 pt-5">
            <div className="bg-white w-full max-w-3xl mx-auto p-6 rounded-t-md shadow-lg h-full overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Wards</h2>
                    <button
                        className="text-red-500 hover:bg-gray-300 p-1.5 rounded-md"
                        onClick={() => setViewWards(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} width={15} height={15} />
                    </button>
                </div>

                <div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Ward
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Age
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Class
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                                        >
                                            {student.firstName} {student.lastName}
                                        </th>
                                        <td className="px-6 py-4 text-center">{calculateAge(student.birthDate)} years</td>
                                        <td className="px-6 py-4 text-center">{student.class.className} ( {student.ClassSections.sectionName} )</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td colSpan={3} className="px-6 py-4 text-center">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}