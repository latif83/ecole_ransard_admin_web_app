import Link from "next/link";

export default function Exams() {
    return (
        <div className="flex flex-col items-center pt-5 h-full">
            <h3 className="text-lg">
                Select an Option.
            </h3>

            <div className="mt-5 flex gap-6">
                <Link href="/admin/exams/settings" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                    Grade Settings
                </Link>
                <Link href="/admin/exams/classResults" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                    Class Results
                </Link>
                <Link href="/admin/exams/studentResults" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                Student Results
                </Link>
            </div>
        </div>
    )
}