/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { markAllRead } from "../../redux/slices/notifications/notificationsSlice";

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const { list, unreadCount } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
    if (unreadCount > 0) {
      dispatch(markAllRead());
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full transition-transform duration-200 hover:scale-110"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg max-h-80 overflow-y-auto z-50">
          {list.length === 0 ? (
            <p className="p-3 text-gray-500 text-sm">No notifications</p>
          ) : (
            list.map((n, i) => (
              <div key={i} className="p-3 border-b text-sm hover:bg-gray-50">
                {n.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
