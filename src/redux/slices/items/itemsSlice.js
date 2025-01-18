import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//intial state
const initialState = {
    items: [],
    item: {},
    isAdded: false,
    error: null,
    loading: false,
    isDeleted: false,
    isUpdated: false,
};


//action 
//create item action
export const createItemAction = createAsyncThunk('create/item', async ({ selectedGroupId, name, cost }, { rejectWithValue, getState }) => {
    try {
        // Get token for authentication
        const token = getState()?.users?.userAuth?.userInfo?.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${baseUrl}/group/item/${selectedGroupId}`, { name, cost }, config)

        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error?.response?.data);
    }
})



//item slice

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createItemAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createItemAction.fulfilled, (state, action) => {
            state.item = action.payload;
            state.loading = false;

            state.isAdded = true;
        });
        builder.addCase(createItemAction.rejected, (state, action) => {
            state.loading = false;
            state.item = null;
            state.isAdded = false;
            state.error = action.payload
        });

        //mark as paid 



        //reset erro
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
        })
        //reset sucesss
        builder.addCase(resetSuccessAction.pending, (state) => {
            state.isAdded = false;
        })
    }

})

//generate reducer

const itemsReducer = itemsSlice.reducer;

export default itemsReducer;


