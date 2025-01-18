import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGroupNameAction } from "../../redux/slices/group/groupsSlice";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

import SuccessMsg from "../SuccessMsg/SuccessMsg";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";

const GroupsForm = ({ group, userId }) => {
  console.log(group);
  console.log(userId);
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    name: "",
    groupId: "",
  });

  useEffect(() => {
    if (group) {
      setGroupData({ name: group.name, groupId: group._id });
    }
  }, [group]);

  const handleGroupNameChange = (e) => {
    // setGroupData(groupData);

    setGroupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGroupNameAction(groupData));
  };

  //get data from store
  const { error, isUpdated } = useSelector((state) => state?.groups);

  useEffect(() => {
    if (isUpdated) {
      dispatch(resetSuccessAction());
    }
  }, [dispatch, isUpdated]);

  return (
    <div>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Group name updated successfully" />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Group Settings</h2>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={groupData?.name}
                  onChange={handleGroupNameChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="text-sm text-gray-500">
                Role: {group?.Admin === userId ? "Admin" : "Member"}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupsForm;
