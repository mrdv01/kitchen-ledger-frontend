import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/slices/users/usersSlice";
import { updateGroupNameAction } from "../../redux/slices/group/groupsSlice";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import GroupsForm from "./GroupsForm";
import DashboardLayout from "../Layout/DashboardLayout";

const Setting = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state) => state?.users);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <DashboardLayout title="SETTINGS">
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">
            Manage your profile and group settings
          </p>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "password"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Password Settings
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "groups"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Group Settings
              </button>
            </div>

            <div className="p-6">
              {activeTab === "profile" && <ProfileForm user={user} />}
              {activeTab === "password" && <PasswordForm />}
              {activeTab === "groups" && user?.groups.length > 0
                ? user?.groups?.map((group) => {
                    return (
                      <GroupsForm
                        key={group?._id}
                        group={group}
                        userId={user?._id}
                      />
                    );
                  })
                : "Please Add Group"}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Setting;
