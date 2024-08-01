import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ActivateAcademicTerm = ({ setStartAcademicTerm, setFetchData, termId }) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const activateAcademicTerm = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/calendar/term/${termId}/activate`, {
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
        setStartAcademicTerm(false);
      } catch (err) {
        console.log(err);
        toast.error("Request not sent, try again later!");
      }
    };

    if (confirm) {
      activateAcademicTerm();
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
            onClick={() => setStartAcademicTerm(false)}
            className="text-lg cursor-pointer p-2 hover:bg-gray-300 rounded"
            color="red"
          />
        </div>

        <div>
          <h3 className="text-xl">
            Are your sure you want to start this academic term?
          </h3>
          <p className="text-red-600 text-sm">This action cannot be undone.</p>
        </div>

        <div className="mt-5 flex justify-end gap-4">
          <button onClick={() => setStartAcademicTerm(false)} className="bg-red-600 hover:bg-red-700 text-gray-50 p-2 rounded">
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
