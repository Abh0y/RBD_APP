import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [showModel, setShowModel] = useState(false);
  const [profile, setProfile] = useState({});
  const [userId, setUserId] = useState("");

  const userData = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    dob: "",
  });

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_APP_BASE_URL}/userdata/userbyid/${userId}`
      );
      console.log("Fetched user data:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (userData) {
      setUserId(userData._id);
    }
  }, [userData]);

  useEffect(() => {
    const loadProfile = async () => {
      if (userId) {
        const data = await fetchUser();
        setProfile(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phno: data.phno || "",
          dob: data.dob || "",
        });
      }
    };
    loadProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/userdata/editusers/${userId}`,
        formData
      );

      if (res.data.success) {
        toast.success("User Updated!");
        const updatedData = await fetchUser();
        setProfile(updatedData);
        setFormData(updatedData);
        setShowModel(false);
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user!");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className=" bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="mt-5 flex items-center">
          <div className="w-1/3 ml-8">
            <img
              src="/profile-pic.png"
              alt="Profile"
              className="rounded-full w-48 h-48 object-cover border border-black"
            />
          </div>
          <div className="w-2/3 flex flex-col justify-center space-y-2">
            <h1 className="text-4xl font-semibold text-blue-600">
              {profile.name}
            </h1>
            <p className="border-t border-black"></p>

            <div className="text-lg text-gray-600">
              <span className="font-medium">Email:</span>
              <span className="ml-2 text-gray-700">{profile.email}</span>
            </div>

            <div className="text-lg text-gray-600">
              <span className="font-medium">Phone:</span>
              <span className="ml-2 text-gray-700">
                {profile.phno || "Not alloted"}
              </span>
            </div>

            <div className="text-lg text-gray-600">
              <span className="font-medium">Role:</span>
              <span className="ml-2 text-gray-700">{profile.role}</span>
            </div>

            <div className="text-lg text-gray-600">
              <span className="font-medium">Date of Birth:</span>
              <span className="ml-2 text-gray-700">
                {profile.dob || "Not alloted"}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-600 flex gap-2 text-white px-4 py-2 rounded-md transition-all hover:scale-105 "
            onClick={() => {
              setShowModel(true);
            }}
          >
            Edit
            <FaEdit className="mt-1" />
          </button>
        </div>
      </div>

      {showModel && (
        <div className="fixed inset-0 bg-gray-800 z-10 bg-opacity-50 backdrop-blur-md flex flex-col justify-center items-center">
          <div className=" bg-white  rounded-md p-4 shadow-lg max-w-4xl w-full ">
            <div className="justify-center items-center flex">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            </div>
            <div className="bg-white p-4 rounded-lg flex gap-10 ">
              <div className=" ml-8 h-48 flex flex-col items-center gap-2 justify-center">
                <img
                  src="/profile-pic.png"
                  alt="Profile"
                  className="rounded-full w-48 h-48 object-cover border border-black"
                />
                <span className="text-blue-500">Edit Profile Picture</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 w-2/3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phno"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phno"
                    name="phno"
                    value={formData.phno}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600"
                    onClick={() => setShowModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
