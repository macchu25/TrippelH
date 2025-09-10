// connectionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ async thunk to fetch connections
export const fetchConnection = createAsyncThunk(
    "connections/fetchConnection",
    async (token) => {
        const res = await fetch("http://localhost:5000/api/connections", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return await res.json();
    }
);

const initialState = {
    connections: [],
    pendingConnections: [],
    followers: [],
    following: [],
    status: "idle",
};

const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConnection.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchConnection.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.connections = action.payload; // adjust according to API response
            })
            .addCase(fetchConnection.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default connectionsSlice.reducer;
