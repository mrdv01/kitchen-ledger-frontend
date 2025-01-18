import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { fetchUserProfile } from "../users/usersSlice";

//intial state
const initialState = {
    groups: [],
    group: {
        group: {},
        monthlySpent: 0,
        pendingBills: 0,
        recentTransactions: [],
    },
    totalSpent: 0,
    totalSpentForAll: 0,
    monthlySpendingForAll: 0,
    pendingBillsForAll: 0,
    recentTransactions: [],
    members: [],
    member: {},
    isAdded: false,
    error: null,
    loading: false,
    isDeleted: false,
    isUpdated: false,
};

//crete group action
export const createGroupAction = createAsyncThunk('group/create', async ({ name }, { rejectWithValue, getState }) => {
    try {
        //get token 
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await axios.post(`${baseUrl}/group/create`, { name }, config)

        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//add member  action
export const addMemberAction = createAsyncThunk('group/add-member', async ({ username, groupId }, { rejectWithValue, getState }) => {
    try {
        //get token 
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await axios.post(`${baseUrl}/group/addmember/${groupId}`, { username }, config)

        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//remove member  action
export const removeMemberAction = createAsyncThunk('group/remove-member', async ({ groupId, memberId }, { rejectWithValue, getState, dispatch }) => {
    try {
        //get token 
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await axios.delete(`${baseUrl}/group/${groupId}/${memberId}`, config)
        dispatch(showMembersAction({ groupId }));
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//show members  action
export const showMembersAction = createAsyncThunk('group/members-list', async ({ groupId }, { rejectWithValue, getState }) => {
    try {
        //get token 
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await axios.get(`${baseUrl}/group/members/${groupId}`, config)

        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//delete group actiono
export const deleteGroupAction = createAsyncThunk('group/delete', async ({ groupId, navigate }, { rejectWithValue, getState }) => {
    try {
        //get token 
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const { data } = await axios.delete(`${baseUrl}/group/delete/${groupId}`, config)

        if (navigate) {
            navigate('/dashboard');
        }

        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//fetch all group action
export const fetchAllGroupAction = createAsyncThunk('groups/list', async (__, { rejectWithValue, getState }) => {
    try {
        //get token
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseUrl}/group`, config);

        return data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//fetch single group action
export const fetchSingleGroupAction = createAsyncThunk('groups/single', async ({ groupId }, { rejectWithValue, getState }) => {
    try {
        //get token
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseUrl}/group/${groupId}`, config);

        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})

//fetch totalspent
export const fetchGroupTotalSpentAction = createAsyncThunk('group/totalSpent', async ({ groupId }, { rejectWithValue, getState }) => {
    try {
        //get token


        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseUrl}/group/${groupId}/totalspent`, config);

        return data.totalSpent;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//fetch totalspent
export const fetchGroupMonthlySpentAction = createAsyncThunk('group/monthlyspent-single', async ({ groupId }, { rejectWithValue, getState }) => {
    try {
        //get token


        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseUrl}/group/${groupId}/monthlyspent`, config);

        return data.monthlySpent;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//fetch pendingbills
export const fetchGroupPendingBillsAction = createAsyncThunk('group/pendingBills-single', async ({ groupId }, { rejectWithValue, getState }) => {
    try {
        //get token


        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${baseUrl}/group/${groupId}/pendingbills`, config);

        return data.pendingBills;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})

export const fetchTotalSpentForAllGroupsAction = createAsyncThunk(
    "groups/totalSpentForAll",
    async (_, { rejectWithValue, getState }) => {
        try {
            // Get token for authentication
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(`${baseUrl}/group/totalspent`, config);

            return data.totalSpent;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);


export const fetchMonthlySpendingForAllGroupsAction = createAsyncThunk(
    "groups/monthlySpendingForAll",
    async ({ month, year }, { rejectWithValue, getState }) => {

        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            console.log(month, year);
            const { data } = await axios.get(`${baseUrl}/group/monthlyspent`, {
                params: { month, year },
                ...config,
            });

            return data.monthlySpending;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchPendingBillsForAllGroupsAction = createAsyncThunk(
    "groups/pendingBillsForAll",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/group/pendingbills`, config);

            return data.pendingBills;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchRecentTransactionsAction = createAsyncThunk(
    "groups/recentTransactions",
    async ({ limit = 10 }, { rejectWithValue, getState }) => {
        try {
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/group/transactions/recent?limit=${limit}`, config);

            return data.recentTransactions;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const fetchRecentTransactionsForSingleGrpAction = createAsyncThunk(
    "groups/recentTransactions-single",
    async ({ groupId, page = 1, limit = 10 }, { rejectWithValue, getState }) => {
        try {
            console.log(page, limit);
            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/group/transactions/recent/${groupId}?page=${page}&limit=${limit}`,
                config
            );

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);
//update group name
export const updateGroupNameAction = createAsyncThunk('group/updateGroupName', async (groupData, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${baseUrl}/group/update-group`, groupData, config);
        dispatch(fetchUserProfile());
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})




//create slice

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    extraReducers: (builder) => {
        // create 
        builder.addCase(createGroupAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createGroupAction.fulfilled, (state, action) => {
            state.group.group = action.payload;
            state.loading = false;

            state.isAdded = true;
        });
        builder.addCase(createGroupAction.rejected, (state, action) => {
            state.loading = false;
            state.group.group = null;
            state.isAdded = false;
            state.error = action.payload
        });
        // add member 
        builder.addCase(addMemberAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addMemberAction.fulfilled, (state, action) => {
            state.member = action.payload;
            state.loading = false;

            state.isAdded = true;
        });
        builder.addCase(addMemberAction.rejected, (state, action) => {
            state.loading = false;
            state.member = null;
            state.isAdded = false;
            state.error = action.payload
        });
        // remove member 
        builder.addCase(removeMemberAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeMemberAction.fulfilled, (state) => {

            state.loading = false;

            state.isDeleted = true;
        });
        builder.addCase(removeMemberAction.rejected, (state, action) => {
            state.loading = false;

            state.error = action.payload
        });
        // show memberslist 
        builder.addCase(showMembersAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(showMembersAction.fulfilled, (state, action) => {
            state.members = action.payload;
            state.loading = false;


        });
        builder.addCase(showMembersAction.rejected, (state, action) => {
            state.loading = false;
            state.members = null;

            state.error = action.payload
        });
        // delete group 
        builder.addCase(deleteGroupAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteGroupAction.fulfilled, (state, action) => {

            state.loading = false;
            if (state.groups?.groups) {
                state.groups.groups = state.groups.groups.filter(
                    group => group._id !== action.payload.group._id
                );
            }

            state.isDeleted = true;
        });
        builder.addCase(deleteGroupAction.rejected, (state, action) => {
            state.loading = false;

            state.error = action.payload
        });
        //fetch all group
        builder.addCase(fetchAllGroupAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllGroupAction.fulfilled, (state, action) => {
            state.loading = false;
            state.groups = action.payload;
        });
        builder.addCase(fetchAllGroupAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //fetch single group
        builder.addCase(fetchSingleGroupAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSingleGroupAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group.group = action.payload;
        });
        builder.addCase(fetchSingleGroupAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //fetch all group
        builder.addCase(fetchGroupTotalSpentAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGroupTotalSpentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.totalSpent = action.payload;
        });
        builder.addCase(fetchGroupTotalSpentAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchGroupMonthlySpentAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGroupMonthlySpentAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group.monthlySpent = action.payload; // Save monthly spending
        });
        builder.addCase(fetchGroupMonthlySpentAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchGroupPendingBillsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchGroupPendingBillsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group.pendingBills = action.payload; // Save monthly spending
        });
        builder.addCase(fetchGroupPendingBillsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchRecentTransactionsForSingleGrpAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRecentTransactionsForSingleGrpAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group.recentTransactions = action.payload; // Save recent transactions
        });
        builder.addCase(fetchRecentTransactionsForSingleGrpAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchTotalSpentForAllGroupsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTotalSpentForAllGroupsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.totalSpentForAll = action.payload;
        });
        builder.addCase(fetchTotalSpentForAllGroupsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchMonthlySpendingForAllGroupsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMonthlySpendingForAllGroupsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.monthlySpendingForAll = action.payload; // Save monthly spending
        });
        builder.addCase(fetchMonthlySpendingForAllGroupsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchPendingBillsForAllGroupsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPendingBillsForAllGroupsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.pendingBillsForAll = action.payload; // Save pending bills
        });
        builder.addCase(fetchPendingBillsForAllGroupsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchRecentTransactionsAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRecentTransactionsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.recentTransactions = action.payload; // Save recent transactions
        });
        builder.addCase(fetchRecentTransactionsAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //update group
        builder.addCase(updateGroupNameAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateGroupNameAction.fulfilled, (state) => {
            state.loading = false;
            state.isUpdated = true;
            state.error = null;

        });
        builder.addCase(updateGroupNameAction.rejected, (state, action) => {
            state.loading = false;
            state.isUpdated = false;
            state.error = action.payload;
        });






        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;

        });
        //reset sucesss
        builder.addCase(resetSuccessAction.pending, (state) => {
            state.isAdded = false;
            state.isDeleted = false;
            state.isUpdated = false;
        })
    }

})

//reducer

const groupsReducer = groupsSlice.reducer;

export default groupsReducer;



