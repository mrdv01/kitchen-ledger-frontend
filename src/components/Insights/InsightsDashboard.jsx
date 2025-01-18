import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchMonthlySpendingForAllGroupsAction,
  fetchPendingBillsForAllGroupsAction,
  fetchRecentTransactionsAction,
  fetchTotalSpentForAllGroupsAction,
} from "../../redux/slices/group/groupsSlice";
import { useEffect } from "react";
import { fetchAllTransactionAction } from "../../redux/slices/transactions/transactionsSlice";
import DashboardLayout from "../Layout/DashboardLayout";

const InsightsDashboard = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month") || null;
  const year = searchParams.get("year") || null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTotalSpentForAllGroupsAction());
    dispatch(fetchPendingBillsForAllGroupsAction());
    dispatch(fetchMonthlySpendingForAllGroupsAction({ month, year }));
    dispatch(fetchRecentTransactionsAction({ limit: 10 }));
    dispatch(fetchAllTransactionAction({ page, limit }));
  }, [dispatch, month, year]);

  const {
    totalSpentForAll,
    monthlySpendingForAll,
    pendingBillsForAll,
    transactions,
  } = useSelector((state) => ({
    totalSpentForAll: state.groups.totalSpentForAll,
    monthlySpendingForAll: state.groups.monthlySpendingForAll,
    pendingBillsForAll: state.groups.pendingBillsForAll,
    transactions: state.transactions.transactions?.transactions || [],
  }));

  // Process transactions data for monthly trend
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + transaction.cost;
    return acc;
  }, {});

  const monthlyTrendData = Object.entries(monthlyData).map(
    ([month, amount]) => ({ month, amount })
  );

  // Process group contributions instead of member contributions
  const groupContributions = transactions.reduce((acc, transaction) => {
    const group = transaction.groupName || "Unassigned";
    acc[group] = (acc[group] || 0) + transaction.cost;
    return acc;
  }, {});

  const groupData = Object.entries(groupContributions).map(
    ([name, contribution]) => ({ name, contribution })
  );

  // Calculate category distribution
  const categoryData = transactions.reduce((acc, transaction) => {
    const category = transaction.name.split(" ")[0];
    acc[category] = (acc[category] || 0) + transaction.cost;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <DashboardLayout title="INSIGHTS">
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kitchen Insights</h1>
          <p className="text-gray-600">
            Financial overview and spending patterns
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Spent Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-semibold text-blue-500">
                ₹{totalSpentForAll || 0}
              </p>
            </div>
          </div>

          {/* Monthly Spending Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">
              Monthly Spending
            </p>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-semibold text-green-500">
                ₹{monthlySpendingForAll || 0}
              </p>
            </div>
          </div>

          {/* Pending Bills Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-600">Pending Bills</p>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-semibold text-red-500">
                ₹{pendingBillsForAll || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Spending Trend */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Monthly Spending Trend
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Spending"
                      stroke="#0088FE"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Spending by Category
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Group Contributions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Group Contributions
              </h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={groupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="contribution"
                      name="Amount Contributed"
                      fill="#0088FE"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.groupName || "Unassigned"}:{" "}
                          {transaction.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{transaction.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InsightsDashboard;
