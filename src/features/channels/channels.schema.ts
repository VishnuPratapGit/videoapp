import mongoose, { Schema, Types } from "mongoose";

export interface IChannel {
  _id: Types.ObjectId;
  name: string;
  banner: string;
  avatar: string;
  description: string;
  channelUrl: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  handle: string;
}

const ChannelSchema = new Schema<IChannel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    banner: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    channelUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema?.Types?.ObjectId,
      ref: "User",
      required: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const Channel = mongoose.models.Channel || mongoose.model<IChannel>('Channel', ChannelSchema);
