import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItemAction } from "../../redux/slices/items/itemsSlice";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../redux/slices/globalActions/globalActions";

const AddItems = () => {
  const dispatch = useDispatch();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [name, setItemName] = useState("");
  const [cost, setItemCost] = useState("");

  const {
    groups: { groups },
  } = useSelector((state) => state?.groups);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createItemAction({ selectedGroupId, name, cost }));
  };

  const { isAdded, error, loading } = useSelector((state) => state?.items);

  useEffect(() => {
    if (isAdded) {
      setSelectedGroupId("");
      setItemName("");
      setItemCost("");
    }
  }, [isAdded]);

  useEffect(() => {
    if (isAdded) {
      dispatch(resetSuccessAction());
    }
    if (error) {
      dispatch(resetErrAction());
    }
  }, [isAdded, error, dispatch]);

  return (
    <DashboardLayout title="Add Item">
      {error && <ErrorMsg message={error.message} />}
      {isAdded && <SuccessMsg message="Item added Successfully" />}
      {/* Form Container */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleFormSubmit} className="p-4 md:p-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="groupSelectId"
                className="block text-sm font-medium text-gray-700"
              >
                Select Group
              </label>
              <select
                id="groupSelectId"
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2.5 text-sm"
                required
              >
                <option value="" disabled>
                  Select a group
                </option>
                {groups?.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2.5 text-sm"
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700"
              >
                Item Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <input
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setItemCost(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-2.5 pl-6 text-sm"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
            {loading ? (
              <LoadingComponent />
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                Add Item
              </button>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddItems;
