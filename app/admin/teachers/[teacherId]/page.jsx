"use client";
import {
  faCirclePlus,
  faEdit,
  faPlusCircle,
  faRotateBack,
  faSpinner,
  faTrash,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { AssignClass } from "./assignClass";
import { useEffect, useState } from "react";
// import { AssignSubject } from "./assignSubject";
// import { EditTeacher } from "./editTeacher";
// import { DelTeacher } from "./delTeacher";
// import { RemoveAssignedSubject } from "./removeAssignedSubject";
// import { RemoveAssignedClass } from "./removeAssignedClass";
import { toast } from "react-toastify";

export default function Teacher({ params }) {
  const teacherId = params.teacherId;

  const [assignClass, setAssignClass] = useState(false);
  const [assignSub, setAssignSub] = useState(false);
  const [editTeacher, setEditTeacher] = useState(false);
  const [delTeacher, setDelTeacher] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fData, setFData] = useState(true);

  // Keep assigned teacher id in a state when the add btn is clicked
  const [assignedTeacherId, setAssignedTeacherId] = useState(0);
  const [subClassSection, setSubClassSection] = useState("");

  const [removeAssignedSubject, setRemoveAssignedSub] = useState(false);
  const [subId, setSubId] = useState(0);

  const [removeAssignedClass, setRemoveAssignedClass] = useState(false);

  const [teacherDetails, setTeacherDetails] = useState({});
  const [teacherDetailsLoading, setTeacherDetailsLoading] = useState(false);
  const [getTeacherDetails, setGetTeacherDetails] = useState(true);

  const [classId,setClassId] = useState(0)

  useEffect(() => {
    const accessToken = localStorage.getItem("SMSTOKEN");

    const getTeacherData = async () => {
      try {
        setTeacherDetailsLoading(true);
        const response = await fetch(
          `/api/teachers/${teacherId}`
        );

        const responseData = await response.json();

        setTeacherDetailsLoading(false);

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        // console.log(responseData.teachers)

        setTeacherDetails(responseData);
      } catch (err) {
        console.log(err);
        toast.error("Unexpected error!");
      }
    };

    if (getTeacherDetails) {
      getTeacherData();
      setGetTeacherDetails(false);
    }

    const gData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/teachers/${teacherId}/assigned`);

        const responseData = await response.json();

        setLoading(false);

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        // console.log(responseData)

        setData(responseData);
      } catch (err) {
        console.log(err);
        toast.error("Unexpected error!");
        setLoading(false);
      }
    };

    if (fData) {
      gData();
      setFData(false);
    }
  }, [fData, getTeacherDetails]);

  return (
    <div>
      {assignClass && (
        <AssignClass
          setAssignClass={setAssignClass}
          teacherId={teacherId}
        //   setFData={setFData}
        />
      )}
      {/* {assignSub && (
        <AssignSubject
          setAssignSub={setAssignSub}
          assignedTeacherId={assignedTeacherId}
          classSection={subClassSection}
          setFData={setFData}
          classId={classId}
        />
      )}
      {editTeacher && (
        <EditTeacher
          setEditTeacher={setEditTeacher}
          teacherDetails={teacherDetails}
          setGetTeacherDetails={setGetTeacherDetails}
        />
      )}
      {delTeacher && (
        <DelTeacher setDelTeacher={setDelTeacher} teacherId={teacherId} />
      )}

      {removeAssignedSubject && (
        <RemoveAssignedSubject
          setRemoveAssignedSub={setRemoveAssignedSub}
          assignedTeacherId={assignedTeacherId}
          subjectId={subId}
          setFData={setFData}
        />
      )}

      {removeAssignedClass && (
        <RemoveAssignedClass
          setRemoveAssignedClass={setRemoveAssignedClass}
          assignedTeacherId={assignedTeacherId}
          setFData={setFData}
        />
      )} */}

      <div className="flex mb-1 justify-end">
        <Link
          href="/dashboard/teachers/teachers"
          className="text-red-700 rounded-lg p-2 hover:bg-red-200 bg-red-100 flex gap-1 items-center text-sm font-semibold"
        >
          <FontAwesomeIcon icon={faRotateBack} width={15} height={15} />
          Back
        </Link>
      </div>

      <div className="grid sm:grid-cols-4 grid-cols-2 gap-2">
        <div>
          <h3 className="font-semibold text-xs text-blue-500">First Name: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : (
              teacherDetails.firstName
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xs text-blue-500">Last Name: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : (
              teacherDetails.lastName
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xs text-blue-500">Email: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : teacherDetails.email ? (
              teacherDetails.email
            ) : (
              "N/A"
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xs text-blue-500">Gender: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : teacherDetails.gender ? (
              teacherDetails.gender
            ) : (
              "N/A"
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xs text-blue-500">Phone: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : teacherDetails.phone ? (
              teacherDetails.phone
            ) : (
              "N/A"
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-xs text-blue-500">Address: </h3>
          <p>
            {teacherDetailsLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                width={15}
                height={15}
                spin
                color="red"
              />
            ) : teacherDetails.address ? (
              teacherDetails.address
            ) : (
              "N/A"
            )}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-1.5 mb-3 mt-1">
        <button
          onClick={() => setEditTeacher(true)}
          className="bg-blue-600 hover:bg-blue-800 text-white rounded-lg p-2 text-sm flex gap-1 items-center"
        >
          <FontAwesomeIcon
            icon={faEdit}
            width={20}
            height={20}
            className="text-sm"
          />
          Edit Info
        </button>
        <button
          onClick={() => setDelTeacher(true)}
          className="bg-red-600 hover:bg-red-800 text-white rounded-lg p-2 text-sm flex gap-1 items-center"
        >
          <FontAwesomeIcon
            icon={faTrash}
            width={20}
            height={20}
            className="text-sm"
          />
          Delete Teacher
        </button>
      </div>

      <div className="border-b border-black rounded-r-lg mt-5 flex justify-between items-center">
        <h1>Assigned Classes & Subjects</h1>

        <button
          onClick={() => setAssignClass(true)}
          className="bg-gray-800 text-gray-100 p-2 rounded-lt text-sm hover:bg-gray-700 flex gap-2 items-center"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-sm"
            width={20}
            height={20}
          />
          <span>Assign Class</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {loading ? (
          <p className="text-red-600">
            {" "}
            <FontAwesomeIcon
              icon={faSpinner}
              width={20}
              height={20}
              className="text-lg"
              spin
            />{" "}
            Loading...{" "}
          </p>
        ) : data?.length > 0 ? (
          data.map((d) => (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="font-semibold p-2 bg-blue-700 text-white flex justify-between items-center">
                <h3>
                  {d.classSectionName}
                </h3>
                <FontAwesomeIcon
                  onClick={() => {
                    setAssignedTeacherId(d.assignedTeacherId); setRemoveAssignedClass(true);
                  }}
                  icon={faTrash}
                  width={15}
                  height={15}
                  className="text-gray-200 hover:text-red-500 cursor-pointer"
                />
              </div>

              <div className="p-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Subjects:</h3>
                  <FontAwesomeIcon
                    onClick={() => {
                      setClassId(d.classId)
                      setAssignSub(true);
                      setAssignedTeacherId(d.assignedTeacherId);
                      setSubClassSection(d.classSection);
                    }}
                    icon={faPlusCircle}
                    width={20}
                    height={20}
                    className="text-lg hover:text-black cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 text-xs mt-2 overflow-x-scroll">
                  {d.subjects.length > 0 ? (
                    d.subjects.map((subject) => (
                      <span className="bg-black text-white p-1.5 rounded-lg flex flex-shrink-0 gap-1 items-center">
                        {subject?.Subject?.name}
                        <FontAwesomeIcon
                          onClick={() => {
                            setSubId(subject?.Subject.id);
                            setAssignedTeacherId(d.assignedTeacherId);
                            setRemoveAssignedSub(true);
                          }}
                          icon={faXmarkCircle}
                          width={20}
                          height={20}
                          className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
                        />
                      </span>
                    ))
                  ) : (
                    <span className="text-sm">No Subjects assigned.</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-600"> No Classes Assigned. </p>
        )}
      </div>
    </div>
  );
}
