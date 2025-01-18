import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../Layout/DashboardLayout";
import { useEffect, useState } from "react";
import { fetchAllTransactionAction } from "../../redux/slices/transactions/transactionsSlice";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const AllTransactions = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactionAction({ page, limit }));
  }, [dispatch, page, limit]);

  const {
    transactions: transactions,

    loading,
  } = useSelector((state) => state?.transactions);

  const allTransactions = transactions?.allTransactions;
  const pagination = transactions?.pagination;

  const handleNext = () => {
    if (pagination?.next) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (pagination?.prev) setPage(page - 1);
  };

  const handleRowClick = (itemId, groupId) => {
    navigate(`/transactions/single/${itemId}?groupId=${groupId}`);
  };

  const options = { year: "numeric", month: "short", day: "numeric" };

  console.log(pagination);

  return (
    <DashboardLayout title="All transactions">
      {/* Transactions */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allTransactions?.length > 0 ? (
                  allTransactions.map((item) => (
                    <tr
                      key={item?._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        handleRowClick(item?._id, item?.group);
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
                          {item?.groupName || "N/A"}
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

export default AllTransactions;
