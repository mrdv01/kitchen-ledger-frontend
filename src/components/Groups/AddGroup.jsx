import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../Layout/DashboardLayout";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../redux/slices/globalActions/globalActions";
import { createGroupAction } from "../../redux/slices/group/groupsSlice";

const AddGroup = () => {
  const dispatch = useDispatch();

  const [name, setGroupName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createGroupAction({ name }));
  };

  const { isAdded, error, loading } = useSelector((state) => state?.groups);

  useEffect(() => {
    if (isAdded) {
      setGroupName("");
    }
  }, [isAdded]);

  useEffect(() => {
    if (isAdded) {
      dispatch(resetSuccessAction());
    }
    if (error) {
      dispatch(resetErrAction());
    }
  }, [isAdded, error, dispatch]);

  return (
    <DashboardLayout title="Add Group">
      {error && <ErrorMsg message={error.message} />}
      {isAdded && <SuccessMsg message="Group added Successfully" />}
      {/* Form Container */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleFormSubmit} className="p-4 md:p-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Group Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2.5 text-sm"
                placeholder="Enter group name"
                required
              />
            </div>

            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                Add Group
              </button>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddGroup;
