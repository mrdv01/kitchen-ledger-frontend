import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initial state

const initialState = {
    loading: false,
    error: null,
    user: null,
    users: [],
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    isUpdated: false

}

//register action
export const registerUserAction = createAsyncThunk("users/register", async (payload, { rejectWithValue }) => {
    try {
        console.log(payload)
        const { username, email, password, fullname } = payload;
        //make request
        const { data } = await axios.post(`${baseUrl}/users/register`, {
            email,
            username,
            password,
            fullname
        })
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }

})

//login action
export const loginUserAction = createAsyncThunk("users/login", async (payload, { rejectWithValue }) => {
    try {

        const { email, password } = payload;
        //make request
        const { data } = await axios.post(`${baseUrl}/users/login`, {
            email,

            password,

        })
        //save the user into local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }

})

//login action
export const fetchUserProfile = createAsyncThunk("users/profile", async (__, { rejectWithValue, getState }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        //make request
        const { data } = await axios.get(`${baseUrl}/users/profile`, config)

        return data.user;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }

})

//logout user profile action
export const logoutAction = createAsyncThunk(
    "users/profile-logout",
    async () => {


        localStorage.removeItem("userInfo")
        return true;

    }
);

//update user profile
export const updateUserProfileAction = createAsyncThunk('users/updateProfile', async (userData, { rejectWithValue, getState }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${baseUrl}/users/update-profile`, userData, config);
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})

//update user password
export const updateUserPasswordAction = createAsyncThunk('users/updatePassword', async (passwordData, { rejectWithValue, getState }) => {
    try {
        const token = getState().users?.userAuth?.userInfo?.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${baseUrl}/users/update-password`, passwordData, config);
        return data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data);
    }
})



//users slice
const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;

        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload;

            state.loading = false;

        });
        //logout
        builder.addCase(logoutAction.fulfilled, (state) => {
            state.userAuth.userInfo = null// Store user info from the action payload

        });
        //login
        builder.addCase(loginUserAction.pending, (state) => {
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.loading = false;
            state.userAuth.userInfo = action.payload;
            state.userAuth.error = null;

        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload;

            state.userAuth.loading = false;

        });
        //user profile
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;

        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.error = action.payload;

            state.loading = false;

        });
        //update user profile action
        builder.addCase(updateUserProfileAction.pending, (state) => {
            state.loading = true;
            state.isUpdated = false;
        });
        builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.isUpdated = true;

        });
        builder.addCase(updateUserProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.isUpdated = false;
            state.loading = false;

        });
        //update user password action
        builder.addCase(updateUserPasswordAction.pending, (state) => {
            state.loading = true;
            state.isUpdated = false;
        });
        builder.addCase(updateUserPasswordAction.fulfilled, (state) => {
            state.loading = false;

            state.error = null;
            state.isUpdated = true;

        });
        builder.addCase(updateUserPasswordAction.rejected, (state, action) => {
            state.error = action.payload;
            state.isUpdated = false;
            state.loading = false;

        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null;
            state.userAuth.error = null;
        })
        //reset sucesss
        builder.addCase(resetSuccessAction.pending, (state) => {


            state.isUpdated = false;
        })

    }
})

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;