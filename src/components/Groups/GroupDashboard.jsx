import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteGroupAction,
  fetchGroupMonthlySpentAction,
  fetchGroupPendingBillsAction,
  fetchGroupTotalSpentAction,
  fetchRecentTransactionsForSingleGrpAction,
  fetchSingleGroupAction,
} from "../../redux/slices/group/groupsSlice";
import DashboardLayout from "../Layout/DashboardLayout";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";

const GroupDashboard = () => {
  const navigate = useNavigate();
  const { id: groupId } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    dispatch(fetchSingleGroupAction({ groupId }));
    dispatch(fetchGroupTotalSpentAction({ groupId }));
    dispatch(fetchGroupPendingBillsAction({ groupId }));
    dispatch(fetchGroupMonthlySpentAction({ groupId }));
    dispatch(fetchRecentTransactionsForSingleGrpAction({ groupId }));
  }, [dispatch, groupId]);

  useEffect(() => {
    dispatch(
      fetchRecentTransactionsForSingleGrpAction({ groupId, page, limit })
    );
  }, [dispatch, groupId, page, limit]);

  const handleNext = () => {
    if (pagination?.next) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (pagination?.prev) setPage(page - 1);
  };

  const { group, totalSpent, loading, error, isDeleted } = useSelector(
    (state) => state?.groups
  );

  const {
    monthlySpent,
    pendingBills,
    recentTransactions: { recentTransactions },
  } = group;

  const pagination = group?.recentTransactions?.pagination;
  const grp = group?.group?.group;
  const options = { year: "numeric", month: "short", day: "numeric" };

  const btn = (
    <Link
      to="/additems"
      className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
    >
      + Add Items
    </Link>
  );

  const handleDelete = (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?"))
      dispatch(deleteGroupAction({ groupId, navigate }));
  };

  useEffect(() => {
    if (isDeleted) {
      dispatch(resetSuccessAction());
    }
  }, [isDeleted, dispatch]);

  const handleRowClick = (itemId) => {
    navigate(`/transactions/${itemId}?groupId=${groupId}`);
  };

  return (
    <DashboardLayout title={grp?.name || "Loading..."} btn={btn}>
      {/* Stats Grid */}
      {isDeleted && (
        <SuccessMsg message={`${grp?.name} deleted successfully`} />
      )}
      {error && <ErrorMsg message={error?.message} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="text-xl md:text-2xl font-bold text-blue-500 mt-1">
            ₹{totalSpent || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Monthly Spending
          </h3>
          <p className="text-xl md:text-2xl font-bold text-green-500 mt-1">
            ₹{monthlySpent || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Members</h3>
          <p className="text-xl md:text-2xl font-bold text-purple-500 mt-1">
            {grp?.members?.length || 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Bills</h3>
          <p className="text-xl md:text-2xl font-bold text-red-500 mt-1">
            ₹{pendingBills || 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg py-4 px-4 flex justify-between items-center">
        <Link
          to={`/group/addmember/${groupId}`}
          className="px-3 py-2 text-sm rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Member
        </Link>
        <Link
          to={`/group/members/${groupId}`}
          className="px-3 py-2 text-sm rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600"
        >
          Show Members
        </Link>
        <button
          onClick={() => {
            handleDelete(groupId);
          }}
          className="px-3 py-2 text-sm rounded-lg transition-colors bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">
            Recent Transactions
          </h3>
        </div>

        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PurchasedBy
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions?.length > 0 ? (
                  recentTransactions.map((item) => (
                    <tr
                      key={item?._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        handleRowClick(item?._id);
                      }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(item?.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="truncate max-w-[200px]">
                          {item?.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-blue-500 whitespace-nowrap">
                        ₹{item?.cost}
                      </td>
                      <td className="px-4 py-3">
                        <div className="truncate max-w-[150px]">
                          {item?.purchasedBy?.fullname || "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="truncate max-w-[150px]">
                          {item.paid ? (
                            <span className="text-green-500">paid</span>
                          ) : (
                            <span className="text-red-500">not paid</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No recent transactions available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <button
            onClick={handlePrevious}
            disabled={!pagination?.prev}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              pagination?.prev
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!pagination?.next}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              pagination?.next
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GroupDashboard;
