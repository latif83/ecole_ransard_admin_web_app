import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ActivateAcademicYr = ({ setStartAcademicYr, setFetchData, yearId }) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const activateAcademicYr = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/calendar/year/${yearId}`, {
          method: "POST"
        });

        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.error);
          setLoading(false);
          return;
        }

        toast.success(responseData.message);
        setFetchData(true);
        setStartAcademicYr(false);
      } catch (err) {
        console.log(err);
        toast.error("Request not sent, try again later!");
      }
    };

    if (confirm) {
      activateAcademicYr();
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <div className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center`}>
      <div className="w-full max-w-xl mx-auto bg-gray-50 rounded shadow p-6">
        <div className="flex justify-between mb-5">
          <h1 className="font-semibold">Activate Academic Year</h1>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setStartAcademicYr(false)}
            className="text-lg cursor-pointer p-2 hover:bg-gray-300 rounded"
            color="red"
          />
        </div>

        <div>
          <h3 className="text-xl">
            Are your sure you want to start this academic year?
          </h3>
          <p className="text-red-600 text-sm">This action cannot be undone.</p>
        </div>

        <div className="mt-5 flex justify-end gap-4">
          <button onClick={()=>setStartAcademicYr(false)} className="bg-red-600 hover:bg-red-700 text-gray-50 p-2 rounded">
            Cancel
          </button>

          <button
            onClick={() => setConfirm(true)}
            disabled={loading}
            className="bg-green-600 disabled:bg-green-200 hover:bg-green-700 text-gray-50 p-2 rounded"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />{" "}
                Confirm{" "}
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
