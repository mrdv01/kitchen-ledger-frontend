import { createAsyncThunk } from "@reduxjs/toolkit";

export const resetErrAction = createAsyncThunk('reserErr-Action', () => {
    return {};
})

export const resetSuccessAction = createAsyncThunk('resetSuccess-Action', () => {
    return {};
})