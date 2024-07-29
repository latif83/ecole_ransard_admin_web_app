import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditClass({ setEditClass, setGData, classData }) {
  const [loading, setLoading] = useState(false);

  const [formData,setFormData] = useState({
    id : "",
    className : "",
  })

  useEffect(()=>{
    setFormData({id : classData.id,
        className : classData.className})
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`/api/classes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.message);
        return;
      }
      toast.success(responseData.message);
      setEditClass(false);
      setGData(true);
    } catch (err) {
      console.log(err);
      toast.error("Error updating class, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white w-full max-w-xl mx-auto p-6 rounded-md shadow-lg mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Edit Class</h2>
          <FontAwesomeIcon
            onClick={() => setEditClass(false)}
            icon={faTimes}
            width={15}
            height={15}
            className="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer"
            color="red"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full group mb-5">
            <input
              type="text"
              name="className"
              id="className"
              value={formData.className}
              onChange={(e) => setFormData((prevData)=>({...prevData,className:e.target.value}))}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="className"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Class Name
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 disabled:bg-blue-200 hover:bg-blue-600 text-white font-medium rounded py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Save Changes
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
