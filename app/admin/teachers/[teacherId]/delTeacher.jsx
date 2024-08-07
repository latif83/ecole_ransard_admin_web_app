"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./delTeacher.module.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useToaster } from "@/providers/ToasterContext";
import { useRouter } from "next/navigation";

export const DelTeacher = ({ setDelTeacher, teacherId }) => {
  const [loading, setLoading] = useState(false);

  const [confirmDelTeacher, setConfirmDelTeacher] = useState(false);

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const { showToast } = useToaster();

  const router = useRouter()

  useEffect(() => {
    const accessToken = localStorage.getItem("SMSTOKEN");

    const deleteTeacher = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${server}/staff/delete/${teacherId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          showToast("success", responseData.message);
          // setFData(true);
          setLoading(false);
          router.push('/dashboard/teachers/teachers')
          setDelTeacher(false);
        } else {
          const errorData = await response.json();
          showToast("error", errorData.message);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        showToast("error", "Unexpected Error!");
      }
    };

    if (confirmDelTeacher) {
      deleteTeacher();
      setConfirmDelTeacher(false);
    }
  }, [confirmDelTeacher]);

  return (
    <div className={`${styles.container} flex items-center justify-center`}>
      <div className="relative w-full max-w-md  p-4 text-center bg-white rounded-lg shadow sm:p-5">
        <button
          onClick={() => setDelTeacher(false)}
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="deleteModal"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <svg
          className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p className="text-gray-500">
          Are you sure you want to delete this teacher?
        </p>
        <p className="mb-4 text-sm text-red-500">
          Note: This will remove all associated data for this teacher such as
          assigned classes and subjects.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setDelTeacher(false)}
            data-modal-toggle="deleteModal"
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10"
          >
            No, cancel
          </button>
          <button
            onClick={() => setConfirmDelTeacher(true)}
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            {loading ? (
              <>
              <FontAwesomeIcon icon={faSpinner} className="text-lg" spin /> Yes, I'm sure</>
            ) : (
              "Yes, I'm sure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
