import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import groupsReducer from "../slices/group/groupsSlice";
import itemsReducer from "../slices/items/itemsSlice";
import transactionsReducer from "../slices/transactions/transactionsSlice";

import notificationsReducer from "../slices/notifications/notificationsSlice"


//store
const store = configureStore({
    reducer: {
        users: usersReducer,
        groups: groupsReducer,
        items: itemsReducer,
        transactions: transactionsReducer,
        notifications: notificationsReducer,
    },
});

export default store;