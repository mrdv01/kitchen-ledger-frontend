import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllGroupAction } from "../../redux/slices/group/groupsSlice";

const DashboardLayout = ({ children, title, btn = null }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);

  const {
    groups: { groups },
    isAdded,
  } = useSelector((state) => state?.groups);

  useEffect(() => {
    dispatch(fetchAllGroupAction());
  }, [dispatch, isAdded]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleGroups = () => {
    setIsGroupsOpen(!isGroupsOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-blue-900 text-white w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 lg:w-72`}
      >
        <div className="flex flex-col h-full p-4">
          <h1 className="text-xl md:text-2xl font-bold mb-6">KitchenLedger</h1>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-3 rounded hover:bg-blue-800 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="flex items-center p-3 rounded hover:bg-blue-800 transition-colors"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="flex items-center p-3 rounded hover:bg-blue-800 transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleGroups}
                  className="flex items-center justify-between w-full p-3 rounded hover:bg-blue-800 transition-colors"
                >
                  <span>Groups</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isGroupsOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isGroupsOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {groups?.length > 0 ? (
                      groups.map((group) => (
                        <li key={group?._id}>
                          <Link
                            to={`/group/${group?._id}`}
                            className="block p-2 rounded hover:bg-blue-800 transition-colors"
                          >
                            {group?.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-300 p-2">No groups available.</p>
                    )}
                  </ul>
                )}
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center p-3 rounded hover:bg-blue-800 transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
          <footer className="text-sm text-gray-300 mt-4 p-2">
            &copy; 2024 KitchenLedger
          </footer>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className={`${
            !btn
              ? "sticky top-0 z-10 bg-white shadow-sm p-4 flex  gap-4"
              : "sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between gap-4"
          }`}
        >
          <button
            className="md:hidden text-blue-500 hover:text-blue-700"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 truncate">
            {title}
          </h2>
          {btn}
          {/* {isDashboardPage ? (
            <Link
              to="/addgroup"
              className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
            >
              + Add Group
            </Link>
          ) : (
            !isAddItemPage && (
              <Link
                to="/additems"
                className="bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
              >
                + Add Item
              </Link>
            )
          )} */}
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
