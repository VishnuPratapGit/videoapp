export interface ChannelInterface {
  _id?: string;
  id?: string;
  name: string;
  banner?: string;
  avatar?: string | null;
  description?: string;
  channelUrl?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  handle?: string;
  status?: "live" | "offline" | "idle";
  statusText?: string;
  __v?: number;
}

export type ChannelList = ChannelInterface[];
