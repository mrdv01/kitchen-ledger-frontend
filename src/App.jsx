import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import GetStarted from "./components/GetStarted/GetStarted";
import Login from "./components/Users/Forms/Login";
import AboutPage from "./components/AboutPage/AboutPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import GroupDashboard from "./components/Groups/GroupDashboard";
import AddItems from "./components/Items/AddItems";
import AddGroup from "./components/Groups/AddGroup";
import AddMember from "./components/Groups/AddMember";
import ShowMembers from "./components/Groups/ShowMembers";
import SingleTransaction from "./components/Transcations/SingleTransaction";
import AllTransactions from "./components/Transcations/AllTransactions";
import Transaction from "./components/Transcations/Transaction";
import InsightsDashboard from "./components/Insights/InsightsDashboard";
import Setting from "./components/Setting/Setting";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* public links */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        {/* private links */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/group/:id"
          element={
            <AuthRoute>
              <GroupDashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/additems"
          element={
            <AuthRoute>
              <AddItems />
            </AuthRoute>
          }
        />
        <Route
          path="/addgroup"
          element={
            <AuthRoute>
              <AddGroup />
            </AuthRoute>
          }
        />
        <Route
          path="/group/addmember/:id"
          element={
            <AuthRoute>
              <AddMember />
            </AuthRoute>
          }
        />
        <Route
          path="/group/members/:id"
          element={
            <AuthRoute>
              <ShowMembers />
            </AuthRoute>
          }
        />
        <Route
          path="/transactions/:itemId"
          element={
            <AuthRoute>
              <SingleTransaction />
            </AuthRoute>
          }
        />
        <Route
          path="/transactions/single/:itemId"
          element={
            <AuthRoute>
              <Transaction />
            </AuthRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <AuthRoute>
              <AllTransactions />
            </AuthRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <AuthRoute>
              <InsightsDashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthRoute>
              <Setting />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
