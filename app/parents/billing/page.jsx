"use client"
import { useParent } from "@/providers/parentProvider";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BillingTab() {
  // Sample billing data for the interface
  const previousBilling = {
    amount: 150.0,
  };

  const currentBilling = {
    amount: 200.0,
    items: [
      { name: 'Tuition Fee', amount: 120.0 },
      { name: 'Library Fee', amount: 30.0 },
      { name: 'Sports Fee', amount: 50.0 },
    ],
  };

  const [billingData, setBillingData] = useState()
  const [billingLoading, setBillingLoading] = useState()

  const { selectedWardId } = useParent()

  useEffect(() => {

    const getBillingData = async () => {
      setBillingLoading(true)
      try {

        const response = await fetch(`/api/parents/${localStorage.getItem("identity")}/${selectedWardId}/billing`)

        const responseData = await response.json()

        if (!response.ok) {
          toast.error(responseData.message)
          return
        }

        setBillingData(responseData)

      }
      catch (e) {
        console.log(e)
      } finally {
        setBillingLoading(false)
      }
    }

    getBillingData()

  }, [selectedWardId])

  return (
    <div>

      {!selectedWardId ? <div className="mt-4 flex justify-center items-center gap-2">
       No Ward Selected </div> : !billingLoading ? <div className="mt-4">
        <h4 className="text-xl pb-2 border-b border-dotted text-center font-semibold mb-2">Current Billing</h4>


        {/* Billing Items */}
        <div className="mt-4">
          {/* <h5 className="text-md font-semibold mb-2">Billing Items</h5> */}
          <ul className="list-disc list-inside">
            {billingData?.currentBilling?.currentFeeDetails.length > 0 ? billingData?.currentBilling?.currentFeeDetails?.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.fee}</span>
                <span>${item.amount.toFixed(2)}</span>
              </li>
            )) : <li className="flex justify-center text-sm text-yellow-600">
            <span>No current billing found.</span>
          </li>}
          </ul>
          <div className="flex justify-between mt-4 border-t-2 border-green-600 pt-4">
            <span>Total Billing:</span>
            <span>${billingData?.currentBilling?.totalBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 border-t border-gray-600 pt-4">
            <span>Amount owed from previous terms:</span>
            <span>${billingData?.previousBalance}</span>
          </div>
          <div className="flex justify-between mt-2 border-t border-gray-600 pt-4">
            <span>Amount payed:</span>
            <span>${billingData?.currentBilling?.totalAmountPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 border-t-2 border-red-600 pt-4">
            <span>Total Amount payable:</span>
            <span>${billingData?.currentBilling?.balanceLeft.toFixed(2)}</span>
          </div>
        </div>
      </div> : <div className="mt-4 flex justify-center items-center gap-2">
        <FontAwesomeIcon icon={faSpinner} width={20} height={20} spin /> Loading... </div>}
    </div>
  );
}
