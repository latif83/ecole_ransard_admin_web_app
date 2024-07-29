export default function Overview() {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Number of Students */}
          <div className="rounded-lg bg-red-500 p-4 shadow-md">
            <h2 className="text-lg font-semibold text-white">Total Students</h2>
            <p className="mt-2 text-2xl font-bold text-white">120</p>
          </div>
          
          {/* Total Number of Parents */}
          <div className="rounded-lg bg-green-500 p-4 shadow-md">
            <h2 className="text-lg font-semibold text-white">Total Parents</h2>
            <p className="mt-2 text-2xl font-bold text-white">80</p>
          </div>
          
          {/* Total Number of Classes */}
          <div className="rounded-lg bg-blue-500 p-4 shadow-md">
            <h2 className="text-lg font-semibold text-white">Total Classes</h2>
            <p className="mt-2 text-2xl font-bold text-white">10</p>
          </div>
          
        
        
        </div>

        {/* Attendance Summary */}
        <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 border-b-2">Attendance Summary</h2>
            <p className="mt-2 text-2xl font-bold text-gray-700">95% Attendance Today</p>
          </div>

          {/* Upcoming Events */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 border-b-2">Upcoming Events</h2>
            <ul className="mt-2 text-gray-700">
              <li>- Parent-Teacher Meeting on July 20th</li>
              <li>- School Sports Day on August 10th</li>
              <li>- Science Fair on September 5th</li>
            </ul>
          </div>
      </div>
    );
  }
  