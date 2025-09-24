import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: {
        list: [],
        unreadCount: 0,
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
            state.unreadCount += 1;
        },
        markAllRead: (state) => {
            state.unreadCount = 0;
        },
        clearNotifications: (state) => {
            state.list = [];
            state.unreadCount = 0;
        },
    },
});

export const { addNotification, markAllRead, clearNotifications } =
    notificationsSlice.actions;

export default notificationsSlice.reducer;
