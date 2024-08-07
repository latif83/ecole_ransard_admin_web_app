import Link from "next/link";

export default function Fees() {
    return (
        <div className="flex flex-col items-center pt-5 h-full">
            <h3 className="text-lg">
                What do you want to do?
            </h3>

            <div className="mt-5 flex gap-6">
                <Link href="/admin/fees/feetypes" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                    Create Fees
                </Link>
                <Link href="/admin/fees/billStudents" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                    Bill Students
                </Link>
                <Link href="/admin/fees/collectFees" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                Collect Fees
                </Link>
                <Link href="/admin/fees/checkFees" className="bg-gray-800 hover:bg-gray-950 text-gray-100 p-2 rounded-md">
                Check Fees
                </Link>
            </div>
        </div>
    )
}