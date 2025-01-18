import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPasswordAction } from "../../redux/slices/users/usersSlice";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";

const PasswordForm = () => {
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { error, isUpdated, loading } = useSelector((state) => state?.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserPasswordAction(passwordData));
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(resetSuccessAction());
    }
  }, [dispatch, isUpdated]);

  return (
    <div>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Password updated successfully" />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
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
              Update Password
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
