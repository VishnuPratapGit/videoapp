import mongoose, { Document, Schema } from "mongoose";

export interface IChannel extends Document {
  name: string;
  banner: string;
  avatar: string;
  description: string;
  channelUrl: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

export const Channel = mongoose.models.Channel || mongoose.model<IChannel>('Channel', ChannelSchema);
