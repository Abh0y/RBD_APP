import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [activeSessions, setActiveSessions] = useState(0);

  const userRole = useSelector((state) => state.user.userRole);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_APP_BASE_URL}/userdata/users`
      );

      if (res.data.success) {
        setUserCount(res.data.data.length);
      } else {
        console.log("No data fetched!");
      }
    } catch (error) {
      console.log(error, "Error fetching data!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* User Count */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">
            Number of Users
          </h2>
          <p className="mt-2 text-3xl font-bold text-blue-500">{userCount}</p>
        </div>

        {/* Active Sessions */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">
            Active Sessions
          </h2>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {activeSessions}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Role Assigned</h2>
          <p className="mt-2 text-3xl font-bold text-blue-500">{userRole}</p>
        </div>

        <div>
          <Calendar></Calendar>
        </div>
        {/* Current Date */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-600">Current Date</h2>
          <p className="mt-2 text-3xl font-bold text-blue-500">{currentDate}</p>
          <h2 className="text-lg font-semibold text-gray-600 mt-4">Note</h2>
          <textarea className="border rounded-md w-full h-auto p-2"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
