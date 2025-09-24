import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItemAction } from "../../redux/slices/items/itemsSlice";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SuccessMsg from "../SuccessMsg/SuccessMsg";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import baseUrl from "../../utils/baseUrl";
import {
  resetErrAction,
  resetSuccessAction,
} from "../../redux/slices/globalActions/globalActions";
import axios from "axios";

const AddItems = () => {
  const dispatch = useDispatch();

  // modes: manual or receipt
  const [mode, setMode] = useState("manual");

  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [name, setItemName] = useState("");
  const [cost, setItemCost] = useState("");

  const [file, setFile] = useState(null);
  const [parsedItems, setParsedItems] = useState([]);
  const [isParsing, setIsParsing] = useState(false);
  const token = useSelector((state) => state.users?.userAuth?.userInfo?.token);

  const {
    groups: { groups },
  } = useSelector((state) => state?.groups);

  const { isAdded, error, loading } = useSelector((state) => state?.items);

  //Handlers
  const handleManualSubmit = (e) => {
    e.preventDefault();
    dispatch(createItemAction({ selectedGroupId, name, cost }));
  };

  // Bulk create items after receipt preview
  const bulkCreateItems = async () => {
    if (parsedItems.length === 0 || !selectedGroupId) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(selectedGroupId, config);

      await axios.post(
        `${baseUrl}/group/item/bulk/${selectedGroupId}`,
        { items: parsedItems },
        config
      );

      alert("Items added successfully");
      setParsedItems([]);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add items");
    }
  };

  // Handle form submission for receipt mode
  const handleReceiptSubmit = async (e) => {
    e.preventDefault();
    await bulkCreateItems();
  };

  const handleReceiptUpload = async () => {
    if (!file || !selectedGroupId) return;
    setIsParsing(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", selectedGroupId);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/group/item/receipt/upload`,
        formData,
        config,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setParsedItems(data.items);
    } catch (err) {
      console.error(err);
      alert("Error parsing receipt");
    } finally {
      setIsParsing(false);
    }
  };

  useEffect(() => {
    if (isAdded) {
      setSelectedGroupId("");
      setItemName("");
      setItemCost("");
      setFile(null);
    }
  }, [isAdded]);

  useEffect(() => {
    if (isAdded) dispatch(resetSuccessAction());
    if (error) dispatch(resetErrAction());
  }, [isAdded, error, dispatch]);

  return (
    <DashboardLayout title="Add Item">
      {error && <ErrorMsg message={error.message} />}
      {isAdded && <SuccessMsg message="Item(s) added successfully" />}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-6 space-y-5">
          {/* Mode Toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setMode("manual")}
              className={`flex-1 px-4 py-2 rounded ${
                mode === "manual"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Add Manually
            </button>
            <button
              onClick={() => setMode("receipt")}
              className={`flex-1 px-4 py-2 rounded ${
                mode === "receipt"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Upload Receipt
            </button>
          </div>

          {/* Group select (common) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Group
            </label>
            <select
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

          {/* Manual Form */}
          {mode === "manual" && (
            <form onSubmit={handleManualSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm p-2.5 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Item Cost
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setItemCost(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm p-2.5 text-sm"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {loading ? (
                <LoadingComponent />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700"
                >
                  Add Item
                </button>
              )}
            </form>
          )}

          {/* Receipt Upload */}
          {mode === "receipt" && (
            <form onSubmit={handleReceiptSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Receipt
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={handleReceiptUpload}
                  disabled={!file || isParsing}
                  className="bg-gray-600 text-white px-4 py-2 rounded mt-2"
                >
                  {isParsing ? "Parsing..." : "Parse Receipt"}
                </button>
              </div>

              {/* Preview */}
              {parsedItems.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Preview Items</h3>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2">Name</th>
                        <th className="p-2">Qty</th>
                        <th className="p-2">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedItems.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <input
                              value={item.name}
                              onChange={(e) => {
                                const copy = [...parsedItems];
                                copy[i].name = e.target.value;
                                setParsedItems(copy);
                              }}
                              className="border p-1"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.qty || 1}
                              onChange={(e) => {
                                const copy = [...parsedItems];
                                copy[i].qty = e.target.value;
                                setParsedItems(copy);
                              }}
                              className="border p-1 w-16"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.cost}
                              onChange={(e) => {
                                const copy = [...parsedItems];
                                copy[i].cost = e.target.value;
                                setParsedItems(copy);
                              }}
                              className="border p-1 w-20"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {loading ? (
                <LoadingComponent />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-blue-700"
                  disabled={parsedItems.length === 0}
                >
                  Confirm Items
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddItems;
