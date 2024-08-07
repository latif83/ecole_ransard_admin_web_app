"use client";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./assignClass.module.css";
import { useEffect, useState } from "react";
import { useToaster } from "@/providers/ToasterContext";

export const AssignSubject = ({ setAssignSub, assignedTeacherId,classSection,setFData, classId }) => {
  const [loading, setLoading] = useState(false);
  const [subjectsLoading,setSubjectsLoading] = useState(false)
  const [subjects,setSubjects] = useState([])

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const { showToast } = useToaster();

  // State that stores the selected subject id
  const [subjectId,setSubjectId] = useState(false)

  const [assignSubjectSubmit,setAssignSubjectSubmit] = useState(false)

  const submit = () => {
    setAssignSubjectSubmit(true);
  };

  useEffect(()=>{

    const accessToken = localStorage.getItem("SMSTOKEN");

    const getSubjects = async ()=>{
      try {
        setSubjectsLoading(true);
        const response = await fetch(`${server}/class/get_class/${classId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseData = await response.json();

        // console.log(responseData)

        setSubjectsLoading(false);

        if (!response.ok) {
          showToast("error", responseData.message);
          return;
        }

        setSubjects(responseData.class.classSubjects);
      } catch (err) {
        console.log(err);
        showToast("error", "Unexpected error!");
        setSubjectsLoading(false);
      }
    }

    const assignSubject = async ()=>{
      try {
        setLoading(true);

        let data = {
          assignedTeacherId,
          subjectId,
        };

        const response = await fetch(`${server}/assigning/subject`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          showToast("error", responseData.message);
          setLoading(false);
          return;
        }

        showToast("success", responseData.message);
        setFData(true)
        setAssignSub(false);
      } catch (err) {
        console.log(err);
        showToast("error", "Unexpected error!");
        setLoading(false);
      }
    }

    getSubjects()

    if(assignSubjectSubmit){
      assignSubject()
      setAssignSubjectSubmit(false)
    }

  },[assignSubjectSubmit])

  return (
    <div className={`${styles.container} sm:pt-10`}>
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-black rounded shadow p-6">
        <div className="flex justify-between mb-3">
          <h1 className="font-semibold">Assign subject</h1>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setAssignSub(false)}
            className="text-lg cursor-pointer p-2 hover:bg-gray-100"
            color="red"
          />
        </div>

        <form
          action={submit}
        >
          <div className="mb-3">
            <p className="text-black">{classSection}</p>
          </div>

          <div className="relative z-0 w-full group mb-3">
            <label
              htmlFor="grade"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <select
              id="grade"
              name="grade"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setSubjectId(e.target.value)
              }
              value={subjectId}
              required
            >
              <option value="">Select Subject</option>
              {subjectsLoading ? (
                <option>
                  {" "}
                  <FontAwesomeIcon
                    icon={faSpinner}
                    color="red"
                    className="text-lg"
                    spin
                  />{" "}
                  Loading Subjects...{" "}
                </option>
              ) : subjects?.length > 0 ? (
                subjects.map((subject) => (
                  <option value={subject.id}>
                    {subject.name}
                  </option>
                ))
              ) : (
                <option>No subjects found.</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 disabled:bg-blue-100 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              loading && "disabled"
            }`}
          >
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-lg mr-2"
                />
                {" Assign"}
              </>
            ) : (
              "Assign"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
