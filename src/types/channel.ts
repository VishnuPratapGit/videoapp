export interface ChannelInterface {
  _id: string;
  name: string;
  avatar?: string;
  handle?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type ChannelList = ChannelInterface[];
