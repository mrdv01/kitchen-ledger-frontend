import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeMemberAction,
  showMembersAction,
} from "../../redux/slices/group/groupsSlice";
import DashboardLayout from "../Layout/DashboardLayout";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

const ShowMembers = () => {
  const { id: groupId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showMembersAction({ groupId }));
  }, [dispatch, groupId]);

  const {
    members: { members },
    loading,
    error,
    group: { group },
  } = useSelector((state) => state?.groups);

  const handleDelete = (memberId) => {
    dispatch(removeMemberAction({ groupId, memberId }));
  };

  const { userAuth } = useSelector((state) => state?.users);

  const userId = userAuth?.userInfo?.userFound?.id;
  const isAdmin = userId === group?.group?.Admin ? true : false;

  return (
    <DashboardLayout title="All Member">
      {error && <ErrorMsg message={error?.message} />}
      {/* Members List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">Members List</h3>
        </div>

        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fullname
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Groups
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members?.length > 0 ? (
                  members?.map((member) => (
                    <tr key={member?._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {member?.fullname}
                      </td>
                      <td className="px-4 py-3">
                        <div className="truncate max-w-[200px]">
                          {member?.username}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-blue-500 whitespace-nowrap">
                        {member?.groups?.map((group, idx) => {
                          return idx < member?.groups.length - 1
                            ? group?.name + ", "
                            : group?.name;
                        })}
                      </td>
                      <td
                        className={
                          isAdmin
                            ? "px-4 py-3 text-red-500 whitespace-nowrap"
                            : "px-4 py-3 text-gray-500 whitespace-nowrap"
                        }
                      >
                        <button
                          disabled={!isAdmin}
                          onClick={() => {
                            handleDelete(member?._id);
                          }}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      Members not added.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ShowMembers;
