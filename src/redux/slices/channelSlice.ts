import { createSlice } from "@reduxjs/toolkit";
import { getChannelList } from "../actions/channels.actions";
import type { RootState } from "../store";

const initialState: {
  loading: boolean;
  channels: any | null;
  error: string | null;
} = {
  loading: false,
  channels: null,
  error: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChannelList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getChannelList.fulfilled, (state, action) => {
      state.loading = false;
      state.channels = action.payload;
    });
    builder.addCase(getChannelList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to get channel list";
    });
  },
});

export const channelActions = channelSlice.actions;

// Selectors
export const selectChannelState = (state: RootState) => state.channel;

export default channelSlice.reducer;
