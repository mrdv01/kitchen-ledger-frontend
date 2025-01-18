import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfileAction,
} from "../../redux/slices/users/usersSlice";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";

import LoadingComponent from "../LoadingComponent/LoadingComponent";

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    username: "",
  });

  const { error, isUpdated, loading } = useSelector((state) => state?.users);

  useEffect(() => {
    if (user && !isUpdated) {
      setProfileData({
        fullname: user?.fullname || "",
        email: user?.email || "",
        username: user?.username || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(fetchUserProfile());
      dispatch(resetSuccessAction());
    }
  }, [dispatch, isUpdated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileAction(profileData));
  };

  return (
    <div>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && (
        <SuccessMsg message="Profile information updated successfully" />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              placeholder="Enter new name"
              type="text"
              name="fullname"
              value={profileData.fullname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              placeholder="Enter new username"
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              placeholder="Enter new email"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
