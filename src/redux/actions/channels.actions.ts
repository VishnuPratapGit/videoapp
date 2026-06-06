import { createAsyncThunk } from "@reduxjs/toolkit";
import { EndPoints } from "../common/endpoints";
import { API } from "../common/api";

export const getChannelList = createAsyncThunk("getChannelList", async () => {
  const res = await API({ url: EndPoints.Channel });
  return res;
});
