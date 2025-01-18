import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleTransaction,
  fetchSingleTransaction,
  makeItemPaidAction,
} from "../../redux/slices/transactions/transactionsSlice";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { resetSuccessAction } from "../../redux/slices/globalActions/globalActions";
import SuccessMsg from "../SuccessMsg/SuccessMsg";

const SingleTransaction = () => {
  const { itemId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleTransaction({ itemId }));
  }, [dispatch, itemId]);

  const {
    transaction: { transaction },
    loading,
    error,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state?.transactions);

  const groupId = transaction?.group._id;
  const totalMembers = transaction?.group?.members?.length;

  useEffect(() => {
    if (isDeleted) {
      navigate(`/group/${groupId}`);
      dispatch(resetSuccessAction());
    }
    if (isUpdated) {
      dispatch(resetSuccessAction());
    }
  }, [isDeleted, navigate, groupId, dispatch, isUpdated]);

  const handleDelete = () => {
    dispatch(deleteSingleTransaction({ itemId, groupId }));
    setShowDeleteConfirm(false);
  };

  const userId = useSelector(
    (state) => state?.users?.userAuth?.userInfo?.userFound?.id
  );

  //handle mark paid
  const handlePaid = () => {
    dispatch(makeItemPaidAction({ itemId, userId }));
  };

  //   const [transaction, setTransaction] = useState({
  //     name: "Office Supplies",
  //     cost: 2500,
  //     createdAt: "2024-01-08",
  //     purchasedBy: {
  //       fullname: "John Doe",
  //       email: "john@example.com",
  //     },
  //     paid: false,
  //     membersRemainingForPayment: [
  //       { fullname: "Alice Smith", email: "alice@example.com" },
  //       { fullname: "Bob Wilson", email: "bob@example.com" },
  //     ],
  //   });

  return (
    <DashboardLayout title="Transactions">
      {error && <ErrorMsg message={error.message} />}
      {isUpdated && <SuccessMsg message="item marked as paid successfully" />}
      {loading ? (
        <LoadingComponent />
      ) : !transaction ? (
        <div className="min-h-screen flex items-center justify-center">
          No transaction found
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Link
                to={`/group/${groupId}`}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Group
              </Link>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Transaction
              </button>
            </div>
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Confirm Delete
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Are you sure you want to delete this transaction? This
                    action cannot be undone.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {transaction.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Transaction ID: {itemId}
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                {/* Grid Layout for Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Amount
                      </p>
                      <p className="text-lg font-semibold text-blue-600">
                        ₹{transaction.cost}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-gray-900">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Purchased By */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Purchased By
                      </p>
                      <p className="text-gray-900">
                        {transaction.purchasedBy.fullname}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.purchasedBy.email}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-3">
                    {transaction.paid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <p
                        className={`font-medium ${
                          transaction.paid ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.paid ? "Paid" : "Pending Payment"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Members Remaining Section */}
                {!transaction.paid &&
                  transaction.membersRemainingForPayment.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Members Yet to Pay{" "}
                        <span className="text-red-500">
                          ₹ {(transaction.cost / totalMembers).toFixed(2)} each
                        </span>
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          {transaction.membersRemainingForPayment.map(
                            (member, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm"
                              >
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {member.fullname}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {member.email}
                                  </p>
                                </div>
                                {member._id === userId ? (
                                  <button
                                    onClick={handlePaid}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                  >
                                    Mark as Paid
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="px-4 py-2 bg-gray-400 text-gray-600 rounded-md transition-colors text-sm"
                                  >
                                    Mark as Paid
                                  </button>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SingleTransaction;
