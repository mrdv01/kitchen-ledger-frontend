import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTotalSpentForAllGroupsAction,
  fetchMonthlySpendingForAllGroupsAction,
  fetchPendingBillsForAllGroupsAction,
  fetchRecentTransactionsAction,
} from "../../redux/slices/group/groupsSlice";
import { Link, useSearchParams } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month") || null;
  const year = searchParams.get("year") || null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalSpentForAllGroupsAction());
    dispatch(fetchPendingBillsForAllGroupsAction());
    dispatch(fetchMonthlySpendingForAllGroupsAction({ month, year }));
    dispatch(fetchRecentTransactionsAction({ limit: 10 }));
  }, [dispatch, month, year]);

  const {
    groups: { groups },
    totalSpentForAll,
    monthlySpendingForAll,
    pendingBillsForAll,
    recentTransactions,
    loading,
    error,
  } = useSelector((state) => state?.groups);

  const totalGroups = groups?.length || 0;
  const options = { year: "numeric", month: "short", day: "numeric" };
  const btn = (
    <Link
      to="/addgroup"
      className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
    >
      + Add Group
    </Link>
  );

  return (
    <DashboardLayout title="Dashboard" btn={btn}>
      {/* error */}
      {error && <ErrorMsg message={error?.message} />}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          <p className="text-xl md:text-2xl font-bold text-blue-500 mt-1">
            ₹{totalSpentForAll}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Monthly Spending
          </h3>
          <p className="text-xl md:text-2xl font-bold text-green-500 mt-1">
            ₹{monthlySpendingForAll}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Groups</h3>
          <p className="text-xl md:text-2xl font-bold text-purple-500 mt-1">
            {totalGroups}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending Bills</h3>
          <p className="text-xl md:text-2xl font-bold text-red-500 mt-1">
            ₹{pendingBillsForAll}
          </p>
        </div>
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
                    Group
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions?.length > 0 ? (
                  recentTransactions?.map((item) => (
                    <tr key={item?._id} className="hover:bg-gray-50">
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
                          {item?.groupName || "N/A"}
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
