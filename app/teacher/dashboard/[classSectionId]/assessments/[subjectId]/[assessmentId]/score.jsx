"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ScoreStudent = ({ setScoreStudent, data, setGetData }) => {

  const [loading, setLoading] = useState(false)

  const [sendData, setSendData] = useState(false)

  const handleSubmit = () => {
    setSendData(true)
  }

  const [formData, setFormData] = useState({
    score: "",
    studentId: data.studentId,
  })

  useEffect(() => {

    const sendAssessmentData = async () => {
      setLoading(true)
      try {

        const response = await fetch(`/api/exams/assessments/grade/${data.classSectionId}/${data.assessmentId}
`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })

        const responseData = await response.json()

        if (!response.ok) {
          // Error
          toast.error(responseData.message)
          return
        }

        toast.success(responseData.message)
        setGetData(true)
        setScoreStudent(false)

      }
      catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    if (sendData) {
      sendAssessmentData()
      setSendData(false)
    }

  }, [sendData])

  return (
    <div className={`${styles.container} sm:pt-10`}>
      <div className="w-full max-w-xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between mb-3">
          <h1 className="font-semibold">Score Student</h1>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setScoreStudent(false)}
            className="text-lg cursor-pointer p-1.5 rounded-md hover:bg-gray-200"
            color="red"
          />
        </div>
        <form action={handleSubmit}>
          <div className="relative z-0 w-full mb-5 mt-3 group">
            <input
              type="text"
              name="score"
              id="score"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.score}
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    score: e.target.value,
                  };
                });
              }}
            />
            <label
              for="score"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Score
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 disabled:bg-blue-100 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading && "disabled"
              }`}
          >
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-lg mr-2"
                />
                {" Submit"}
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}