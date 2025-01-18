import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

const initialState = {
    transactions: [],
    transaction: {},
    isAdded: false,
    isDeleted: false,
    loading: false,
    isUpdated: false,
    error: null
};

//delete single transaction
export const deleteSingleTransaction = createAsyncThunk('transaction/delete', async ({ itemId, groupId }, { rejectWithValue, getState }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`${baseUrl}/transactions/${itemId}/${groupId}`, config);
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})
//fetch single transaction
export const fetchSingleTransaction = createAsyncThunk('transaction/single', async ({ itemId }, { rejectWithValue, getState }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${baseUrl}/transactions/${itemId}`, config);
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})

//mark a item paid action
export const makeItemPaidAction = createAsyncThunk('transaction/paid', async ({ itemId, userId }, { rejectWithValue, getState, dispatch }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };



        const { data } = await axios.post(`${baseUrl}/transactions/paid/${itemId}/${userId}`, {}, config);
        dispatch(fetchSingleTransaction({ itemId }));
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})

//fetch all transactions
export const fetchAllTransactionAction = createAsyncThunk(
    "transactions/list",
    async ({ page = 1, limit = 10 }, { rejectWithValue, getState }) => {
        try {

            const token = getState()?.users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/transactions?page=${page}&limit=${limit}`,
                config
            );

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    }
);

//create slice

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSingleTransaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchSingleTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transaction = action.payload;
        })
        builder.addCase(fetchSingleTransaction.rejected, (state, action) => {
            state.loading = false;
            state.transaction = null;
            state.error = action.payload;

        })
        builder.addCase(fetchAllTransactionAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAllTransactionAction.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
        })
        builder.addCase(fetchAllTransactionAction.rejected, (state, action) => {
            state.loading = false;
            state.transactions = [];
            state.error = action.payload;

        })
        //delete
        builder.addCase(deleteSingleTransaction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteSingleTransaction.fulfilled, (state) => {
            state.loading = false;
            state.isDeleted = true;
        })
        builder.addCase(deleteSingleTransaction.rejected, (state, action) => {
            state.loading = false;
            state.isDeleted = false;
            state.error = action.payload;

        })
        //mark item paid
        builder.addCase(makeItemPaidAction.pending, (state) => {
            state.isUpdated = false;
        });
        builder.addCase(makeItemPaidAction.fulfilled, (state) => {


            state.isUpdated = true;
        });
        builder.addCase(makeItemPaidAction.rejected, (state, action) => {

            state.isUpdated = false;
            state.error = action.payload
        });

        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
        })

        //reset success action
        builder.addCase(resetSuccessAction.pending, (state) => {
            state.isAdded = false;
            state.isDeleted = false;
            state.isUpdated = false;
        })
    }
})

//reducer

const transactionsReducer = transactionsSlice.reducer;

export default transactionsReducer;