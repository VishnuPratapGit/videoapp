import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);