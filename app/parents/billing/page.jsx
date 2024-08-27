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

  return (
    <div>
      {/* <h3 className="text-lg font-semibold mb-4 text-blue-600">Billing</h3> */}

      {/* Previous Billing Section */}
      <div className="mb-4 flex flex-col gap-2 items-center justify-center border-b pb-2">
        <h4 className="text-xl font-semibold mb-2">Previous Billing</h4>
        <p>
          ${previousBilling.amount.toFixed(2)}
        </p>
      </div>

      {/* Current Billing Section */}
      <div>
        <h4 className="text-xl pb-2 border-b border-dotted text-center font-semibold mb-2">Current Billing</h4>


        {/* Billing Items */}
        <div className="mt-4">
          {/* <h5 className="text-md font-semibold mb-2">Billing Items</h5> */}
          <ul className="list-disc list-inside">
            {currentBilling.items.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 border-t-2 border-green-600 pt-4">
          <span>Total Amount:</span>
            <span>${currentBilling.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
